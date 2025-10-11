"""
Database connection module for Supabase PostgreSQL
"""
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

def get_db_connection():
    """Create and return a database connection"""
    try:
        conn = psycopg2.connect(
            DATABASE_URL,
            cursor_factory=RealDictCursor
        )
        return conn
    except Exception as e:
        print(f"Database connection error: {e}")
        raise

def execute_query(query: str, params: tuple = None, fetch: bool = True):
    """
    Execute a SQL query and return results
    
    Args:
        query: SQL query string
        params: Query parameters as tuple
        fetch: Whether to fetch results (SELECT) or just execute (INSERT/UPDATE)
    
    Returns:
        List of dicts for SELECT queries, None for INSERT/UPDATE
    """
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute(query, params)
            
            if fetch:
                result = cursor.fetchall()
                return result
            else:
                conn.commit()
                return None
    except Exception as e:
        conn.rollback()
        raise e
    finally:
        conn.close()
