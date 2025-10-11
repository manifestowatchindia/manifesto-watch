"""
FastAPI Main Application
Manifesto Watch API - Track government promises
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
import os
from dotenv import load_dotenv

from app.database import execute_query
from app.models import (
    PromiseResponse, 
    PromiseUpdate, 
    ProgressUpdateModel,
    TrackingUpdateCreate
)

load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="Manifesto Watch API",
    description="API for tracking BJP+ 2024 manifesto promises and progress",
    version="1.0.0"
)

# CORS Configuration
origins = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================
# HEALTH CHECK ENDPOINTS
# ============================================

@app.get("/")
async def root():
    """API root endpoint"""
    return {
        "message": "Manifesto Watch API",
        "version": "1.0.0",
        "status": "running"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    try:
        # Test database connection
        execute_query("SELECT 1")
        return {
            "status": "healthy",
            "database": "connected"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

# ============================================
# PROMISE ENDPOINTS
# ============================================

@app.get("/api/promises", response_model=List[PromiseResponse])
async def get_all_promises():
    """Get all promises"""
    try:
        query = """
            SELECT 
                id, title, manifesto_id, category_id, sub_theme, description,
                type, timeline, geography, status, progress, measurable,
                metric, has_budget_mention, citations,
                manifesto_page_number, manifesto_line_reference,
                created_at, updated_at
            FROM promises
            ORDER BY id
        """
        promises = execute_query(query)
        return promises
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/promises/{promise_id}", response_model=PromiseResponse)
async def get_promise(promise_id: str):
    """Get a single promise by ID"""
    try:
        query = """
            SELECT 
                id, title, manifesto_id, category_id, sub_theme, description,
                type, timeline, geography, status, progress, measurable,
                metric, has_budget_mention, citations,
                manifesto_page_number, manifesto_line_reference,
                created_at, updated_at
            FROM promises
            WHERE id = %s
        """
        promises = execute_query(query, (promise_id,))
        
        if not promises:
            raise HTTPException(status_code=404, detail="Promise not found")
        
        return promises[0]
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/promises/category/{category_id}", response_model=List[PromiseResponse])
async def get_promises_by_category(
    category_id: str,
    manifesto_id: Optional[str] = None,
    status: Optional[str] = None
):
    """
    Get promises by category
    Optional filters: manifesto_id, status
    """
    try:
        query = """
            SELECT 
                id, title, manifesto_id, category_id, sub_theme, description,
                type, timeline, geography, status, progress, measurable,
                metric, has_budget_mention, citations,
                manifesto_page_number, manifesto_line_reference,
                created_at, updated_at
            FROM promises
            WHERE category_id = %s
        """
        params = [category_id]
        
        if manifesto_id:
            query += " AND manifesto_id = %s"
            params.append(manifesto_id)
        
        if status:
            query += " AND status = %s"
            params.append(status)
        
        query += " ORDER BY id"
        
        promises = execute_query(query, tuple(params))
        return promises
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/promises/manifesto/{manifesto_id}", response_model=List[PromiseResponse])
async def get_promises_by_manifesto(manifesto_id: str):
    """Get all promises for a specific manifesto"""
    try:
        query = """
            SELECT 
                id, title, manifesto_id, category_id, sub_theme, description,
                type, timeline, geography, status, progress, measurable,
                metric, has_budget_mention, citations,
                manifesto_page_number, manifesto_line_reference,
                created_at, updated_at
            FROM promises
            WHERE manifesto_id = %s
            ORDER BY category_id, id
        """
        promises = execute_query(query, (manifesto_id,))
        return promises
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ============================================
# UPDATE ENDPOINTS (ADMIN)
# ============================================

@app.put("/api/promises/{promise_id}", response_model=PromiseResponse)
async def update_promise(promise_id: str, promise_update: PromiseUpdate):
    """
    Update a promise (Admin only - add auth later)
    Updates any fields provided in the request
    """
    try:
        # Build dynamic UPDATE query
        update_fields = []
        params = []
        
        for field, value in promise_update.dict(exclude_unset=True).items():
            if value is not None:
                update_fields.append(f"{field} = %s")
                params.append(value)
        
        if not update_fields:
            raise HTTPException(status_code=400, detail="No fields to update")
        
        params.append(promise_id)
        
        query = f"""
            UPDATE promises
            SET {', '.join(update_fields)}, updated_at = NOW()
            WHERE id = %s
            RETURNING *
        """
        
        result = execute_query(query, tuple(params), fetch=False)
        
        # Fetch updated promise
        updated_promise = execute_query(
            "SELECT * FROM promises WHERE id = %s",
            (promise_id,)
        )
        
        if not updated_promise:
            raise HTTPException(status_code=404, detail="Promise not found")
        
        return updated_promise[0]
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.patch("/api/promises/{promise_id}/progress", response_model=PromiseResponse)
async def update_promise_progress(promise_id: str, progress_update: ProgressUpdateModel):
    """
    Update only the progress and optionally status of a promise
    Simpler endpoint for quick updates
    """
    try:
        # Auto-set status based on progress if not provided
        status = progress_update.status
        if not status:
            if progress_update.progress == 100:
                status = "Delivered"
            elif progress_update.progress >= 60:
                status = "Under implementation"
            elif progress_update.progress >= 1:
                status = "Actioned"
            else:
                status = "Announced"
        
        query = """
            UPDATE promises
            SET progress = %s, status = %s, updated_at = NOW()
            WHERE id = %s
            RETURNING *
        """
        
        execute_query(query, (progress_update.progress, status, promise_id), fetch=False)
        
        # Fetch updated promise
        updated_promise = execute_query(
            "SELECT * FROM promises WHERE id = %s",
            (promise_id,)
        )
        
        if not updated_promise:
            raise HTTPException(status_code=404, detail="Promise not found")
        
        return updated_promise[0]
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ============================================
# TRACKING UPDATES ENDPOINTS
# ============================================

@app.get("/api/tracking-updates/{promise_id}")
async def get_tracking_updates(promise_id: str):
    """Get timeline of updates for a promise"""
    try:
        query = """
            SELECT *
            FROM tracking_updates
            WHERE promise_id = %s
            ORDER BY update_date DESC
        """
        updates = execute_query(query, (promise_id,))
        return updates
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/tracking-updates")
async def create_tracking_update(update: TrackingUpdateCreate):
    """Create a new tracking update"""
    try:
        query = """
            INSERT INTO tracking_updates (
                promise_id, update_date, old_status, new_status,
                old_progress, new_progress, update_text, source_url
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING *
        """
        params = (
            update.promise_id,
            update.update_date,
            update.old_status,
            update.new_status,
            update.old_progress,
            update.new_progress,
            update.update_text,
            update.source_url
        )
        
        execute_query(query, params, fetch=False)
        
        # Fetch created update
        created_update = execute_query(
            "SELECT * FROM tracking_updates WHERE promise_id = %s ORDER BY id DESC LIMIT 1",
            (update.promise_id,)
        )
        
        return created_update[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ============================================
# STATS ENDPOINTS
# ============================================

@app.get("/api/stats/overall")
async def get_overall_stats():
    """Get overall statistics across all promises"""
    try:
        query = """
            SELECT 
                COUNT(*) as total_promises,
                COUNT(CASE WHEN measurable = true THEN 1 END) as measurable_count,
                COUNT(CASE WHEN has_budget_mention = true THEN 1 END) as with_budget_count,
                AVG(progress) as avg_progress,
                COUNT(CASE WHEN status = 'Delivered' THEN 1 END) as delivered_count,
                COUNT(CASE WHEN status = 'Under implementation' THEN 1 END) as under_implementation_count,
                COUNT(CASE WHEN status = 'Actioned' THEN 1 END) as actioned_count,
                COUNT(CASE WHEN status = 'Announced' THEN 1 END) as announced_count,
                COUNT(CASE WHEN status = 'Deferred' THEN 1 END) as deferred_count
            FROM promises
            WHERE manifesto_id = 'bjp-2024'
        """
        stats = execute_query(query)
        
        if stats and stats[0]:
            result = stats[0]
            total = result['total_promises'] or 0
            
            return {
                "totalPromises": total,
                "measurablePercent": round((result['measurable_count'] or 0) / total * 100, 1) if total > 0 else 0,
                "withBudgetPercent": round((result['with_budget_count'] or 0) / total * 100, 1) if total > 0 else 0,
                "avgProgress": round(result['avg_progress'] or 0, 1),
                "statusBreakdown": {
                    "Delivered": round((result['delivered_count'] or 0) / total * 100, 1) if total > 0 else 0,
                    "Under implementation": round((result['under_implementation_count'] or 0) / total * 100, 1) if total > 0 else 0,
                    "Actioned": round((result['actioned_count'] or 0) / total * 100, 1) if total > 0 else 0,
                    "Announced": round((result['announced_count'] or 0) / total * 100, 1) if total > 0 else 0,
                    "Deferred": round((result['deferred_count'] or 0) / total * 100, 1) if total > 0 else 0
                }
            }
        return {}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/stats/category/{category_id}")
async def get_category_stats(category_id: str):
    """Get statistics for a specific category"""
    try:
        query = """
            SELECT 
                COUNT(*) as total_promises,
                AVG(progress) as avg_progress,
                COUNT(CASE WHEN measurable = true THEN 1 END) as measurable_count,
                COUNT(CASE WHEN has_budget_mention = true THEN 1 END) as with_budget_count
            FROM promises
            WHERE category_id = %s AND manifesto_id = 'bjp-2024'
        """
        stats = execute_query(query, (category_id,))
        
        if stats and stats[0]:
            result = stats[0]
            total = result['total_promises'] or 0
            
            return {
                "totalPromises": total,
                "avgProgress": round(result['avg_progress'] or 0, 1),
                "measurablePercent": round((result['measurable_count'] or 0) / total * 100, 1) if total > 0 else 0,
                "withBudgetPercent": round((result['with_budget_count'] or 0) / total * 100, 1) if total > 0 else 0
            }
        return {}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("API_PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port, reload=True)
