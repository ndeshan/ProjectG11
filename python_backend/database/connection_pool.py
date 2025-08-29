from sqlalchemy import create_engine, event
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import QueuePool
import os
import logging

logger = logging.getLogger(__name__)

# Database connection optimization
def create_optimized_engine():
    database_url = os.getenv("DATABASE_URL")
    
    if not database_url:
        raise ValueError("DATABASE_URL environment variable is required")
    
    # Optimized engine configuration
    engine = create_engine(
        database_url,
        poolclass=QueuePool,
        pool_size=20,  # Number of connections to maintain
        max_overflow=30,  # Additional connections beyond pool_size
        pool_pre_ping=True,  # Verify connections before use
        pool_recycle=3600,  # Recycle connections every hour
        echo=False,  # Set to True for SQL debugging
        connect_args={
            "charset": "utf8mb4",
            "connect_timeout": 60,
            "read_timeout": 30,
            "write_timeout": 30
        }
    )
    
    # Connection event listeners
    @event.listens_for(engine, "connect")
    def set_sqlite_pragma(dbapi_connection, connection_record):
        if 'mysql' in database_url:
            cursor = dbapi_connection.cursor()
            cursor.execute("SET SESSION sql_mode='STRICT_TRANS_TABLES'")
            cursor.execute("SET SESSION innodb_lock_wait_timeout=50")
            cursor.close()
    
    @event.listens_for(engine, "checkout")
    def receive_checkout(dbapi_connection, connection_record, connection_proxy):
        logger.debug("Connection checked out from pool")
    
    @event.listens_for(engine, "checkin")
    def receive_checkin(dbapi_connection, connection_record):
        logger.debug("Connection checked in to pool")
    
    return engine

# Optimized session factory
def create_session_factory(engine):
    return sessionmaker(
        autocommit=False,
        autoflush=False,
        bind=engine,
        expire_on_commit=False
    )

# Database health check
def check_database_health(engine):
    try:
        with engine.connect() as connection:
            result = connection.execute("SELECT 1")
            return result.fetchone() is not None
    except Exception as e:
        logger.error(f"Database health check failed: {e}")
        return False

# Connection context manager
class DatabaseConnection:
    def __init__(self, session_factory):
        self.session_factory = session_factory
        
    def __enter__(self):
        self.session = self.session_factory()
        return self.session
        
    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_type:
            self.session.rollback()
        else:
            self.session.commit()
        self.session.close()

# Initialize optimized database components
optimized_engine = create_optimized_engine()
OptimizedSessionLocal = create_session_factory(optimized_engine)

def get_optimized_db():
    db = OptimizedSessionLocal()
    try:
        yield db
    finally:
        db.close()