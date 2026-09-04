from datetime import datetime
from sqlalchemy import Column, String, Float, Integer, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()

class Project(Base):
    __tablename__ = "projects"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    location = Column(String, nullable=True)
    start_date = Column(String, nullable=True)
    end_date = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    activities = relationship("Activity", back_populates="project", cascade="all, delete-orphan")
    execution_records = relationship("ExecutionRecord", back_populates="project", cascade="all, delete-orphan")
    evidence = relationship("Evidence", back_populates="project", cascade="all, delete-orphan")
    alerts = relationship("Alert", back_populates="project", cascade="all, delete-orphan")


class Activity(Base):
    __tablename__ = "activities"

    id = Column(String, primary_key=True, index=True)
    project_id = Column(String, ForeignKey("projects.id"), nullable=False)
    activity_code = Column(String, index=True, nullable=False)
    name = Column(String, nullable=False)
    wbs = Column(String, nullable=False)
    location = Column(String, nullable=False)
    start_date = Column(String, nullable=False)
    finish_date = Column(String, nullable=False)
    planned_quantity = Column(Float, nullable=False)
    unit = Column(String, nullable=False)
    planned_progress = Column(Float, default=0.0)
    weight = Column(Float, default=0.01)
    actual_quantity = Column(Float, default=0.0)
    actual_progress = Column(Float, default=0.0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    project = relationship("Project", back_populates="activities")
    matches = relationship("ActivityMatch", back_populates="activity")
    progress_records = relationship("ProgressRecord", back_populates="activity")
    alerts = relationship("Alert", back_populates="activity")


class ExecutionRecord(Base):
    __tablename__ = "execution_records"

    id = Column(String, primary_key=True, index=True)
    project_id = Column(String, ForeignKey("projects.id"), nullable=False)
    execution_date = Column(String, nullable=False)
    activity_description = Column(String, nullable=False)
    quantity = Column(Float, nullable=False)
    unit = Column(String, nullable=False)
    location = Column(String, nullable=True)
    chainage_start = Column(String, nullable=True)
    chainage_end = Column(String, nullable=True)
    status = Column(String, default="completed")
    raw_text = Column(Text, nullable=True)
    extraction_confidence = Column(Float, default=0.9)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    project = relationship("Project", back_populates="execution_records")
    evidence = relationship("Evidence", back_populates="execution_record", uselist=False)
    matches = relationship("ActivityMatch", back_populates="execution_record")
    progress_records = relationship("ProgressRecord", back_populates="execution_record")


class Evidence(Base):
    __tablename__ = "evidence"

    id = Column(String, primary_key=True, index=True)
    project_id = Column(String, ForeignKey("projects.id"), nullable=False)
    execution_record_id = Column(String, ForeignKey("execution_records.id"), nullable=False)
    file_name = Column(String, nullable=False)
    file_type = Column(String, nullable=False)
    file_path = Column(String, nullable=False)
    source_type = Column(String, default="Daily Site Report")
    raw_content = Column(Text, nullable=True)
    uploaded_at = Column(DateTime, default=datetime.utcnow)

    project = relationship("Project", back_populates="evidence")
    execution_record = relationship("ExecutionRecord", back_populates="evidence")


class ActivityMatch(Base):
    __tablename__ = "activity_matches"

    id = Column(String, primary_key=True, index=True)
    execution_record_id = Column(String, ForeignKey("execution_records.id"), nullable=False)
    activity_id = Column(String, ForeignKey("activities.id"), nullable=False)
    semantic_score = Column(Float, default=0.0)
    location_score = Column(Float, default=0.0)
    asset_score = Column(Float, default=0.0)
    date_score = Column(Float, default=0.0)
    quantity_score = Column(Float, default=0.0)
    confidence_score = Column(Float, default=0.0)
    match_status = Column(String, default="Pending")
    human_verified = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    execution_record = relationship("ExecutionRecord", back_populates="matches")
    activity = relationship("Activity", back_populates="matches")


class ProgressRecord(Base):
    __tablename__ = "progress_records"

    id = Column(String, primary_key=True, index=True)
    activity_id = Column(String, ForeignKey("activities.id"), nullable=False)
    execution_record_id = Column(String, ForeignKey("execution_records.id"), nullable=False)
    previous_quantity = Column(Float, default=0.0)
    added_quantity = Column(Float, default=0.0)
    actual_quantity = Column(Float, default=0.0)
    planned_quantity = Column(Float, default=0.0)
    actual_progress = Column(Float, default=0.0)
    planned_progress = Column(Float, default=0.0)
    variance = Column(Float, default=0.0)
    created_at = Column(DateTime, default=datetime.utcnow)

    activity = relationship("Activity", back_populates="progress_records")
    execution_record = relationship("ExecutionRecord", back_populates="progress_records")


class Alert(Base):
    __tablename__ = "alerts"

    id = Column(String, primary_key=True, index=True)
    project_id = Column(String, ForeignKey("projects.id"), nullable=False)
    activity_id = Column(String, ForeignKey("activities.id"), nullable=True)
    type = Column(String, nullable=False)
    severity = Column(String, nullable=False)  # Critical, Delayed, Warning, Info
    message = Column(Text, nullable=False)
    status = Column(String, default="Active")
    created_at = Column(DateTime, default=datetime.utcnow)

    project = relationship("Project", back_populates="alerts")
    activity = relationship("Activity", back_populates="alerts")


class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    role = Column(String, default="Engineer")
    created_at = Column(DateTime, default=datetime.utcnow)
