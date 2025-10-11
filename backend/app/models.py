"""
Pydantic models for API request/response validation
"""
from typing import Optional, List
from pydantic import BaseModel

class MetricModel(BaseModel):
    label: str
    target: Optional[str] = None
    unit: Optional[str] = None

class CitationModel(BaseModel):
    label: str
    url: str

class PromiseBase(BaseModel):
    title: str
    manifesto_id: str
    category_id: str
    sub_theme: Optional[str] = None
    description: Optional[str] = None
    type: str  # policy, program, infrastructure, legal
    timeline: str  # 100d, 5yr, 2047
    geography: str  # national, state, urban, rural, mixed
    status: str  # Announced, Actioned, Under implementation, Delivered, Deferred
    progress: int = 0
    measurable: bool = False
    metric: Optional[MetricModel] = None
    has_budget_mention: bool = False
    citations: Optional[List[CitationModel]] = None
    manifesto_page_number: Optional[int] = None
    manifesto_line_reference: Optional[str] = None

class PromiseCreate(PromiseBase):
    """Model for creating a new promise"""
    pass

class PromiseUpdate(BaseModel):
    """Model for updating promise fields (all fields optional)"""
    title: Optional[str] = None
    sub_theme: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    progress: Optional[int] = None
    type: Optional[str] = None
    timeline: Optional[str] = None
    geography: Optional[str] = None
    measurable: Optional[bool] = None
    metric: Optional[MetricModel] = None
    has_budget_mention: Optional[bool] = None
    citations: Optional[List[CitationModel]] = None
    manifesto_page_number: Optional[int] = None
    manifesto_line_reference: Optional[str] = None

class PromiseResponse(PromiseBase):
    """Model for promise response with ID"""
    id: str
    created_at: Optional[str] = None
    updated_at: Optional[str] = None

class ProgressUpdateModel(BaseModel):
    """Model for updating just progress"""
    progress: int
    status: Optional[str] = None

class TrackingUpdateCreate(BaseModel):
    """Model for creating a tracking update"""
    promise_id: str
    update_date: str
    old_status: Optional[str] = None
    new_status: str
    old_progress: Optional[int] = None
    new_progress: int
    update_text: str
    source_url: Optional[str] = None
