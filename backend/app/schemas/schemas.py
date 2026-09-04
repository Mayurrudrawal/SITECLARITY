from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field

class ProjectBase(BaseModel):
    name: str
    description: Optional[str] = None
    location: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None

class ProjectCreate(ProjectBase):
    pass

class ProjectResponse(ProjectBase):
    id: str

    class Config:
        from_attributes = True

class ActivityBase(BaseModel):
    activity_code: str
    name: str
    wbs: str
    location: str
    start_date: str
    finish_date: str
    planned_quantity: float
    unit: str
    planned_progress: float = 0.0
    weight: float = 0.01

class ActivityResponse(ActivityBase):
    id: str
    project_id: str
    actual_quantity: float = 0.0
    actual_progress: float = 0.0
    variance_percent: Optional[int] = 0
    status: Optional[str] = "On Track"

    class Config:
        from_attributes = True

class ExtractionRequest(BaseModel):
    raw_text: str
    file_name: Optional[str] = None

class ExtractionResponse(BaseModel):
    date: str
    activity: str
    quantity: float
    unit: str
    location: str
    chainage: Optional[str] = None
    status: str = "completed"
    confidence: float
    provider: Optional[str] = None
    reasoning: Optional[str] = None

class MatchScoreBreakdown(BaseModel):
    raw: float
    score: int
    max: int
    label: str

class MatchCandidateResponse(BaseModel):
    activity_id: str
    activity_code: str
    activity_name: str
    wbs: str
    location: str
    planned_quantity: float
    unit: str
    current_progress: int
    breakdown: Dict[str, MatchScoreBreakdown]
    confidence_percent: int
    confidence_score: float
    match_status: str
    is_best_match: bool

class MatchingRunRequest(BaseModel):
    execution_record_id: Optional[str] = None
    execution_data: Optional[Dict[str, Any]] = None

class MatchingRunResponse(BaseModel):
    match_id: Optional[str] = None
    top_candidate: Optional[MatchCandidateResponse] = None
    candidates: List[MatchCandidateResponse]

class ProgressUpdateResponse(BaseModel):
    activity_id: str
    activity_code: str
    activity_name: str
    previous_quantity: float
    added_quantity: float
    actual_quantity: float
    planned_quantity: float
    unit: str
    actual_progress: int
    planned_progress: int
    variance: int

class DashboardMetrics(BaseModel):
    overallPlannedProgress: int
    overallActualProgress: int
    scheduleVariance: int
    delayedActivitiesCount: int
    criticalActivitiesCount: int
    evidenceRecordsCount: int
    totalActivitiesCount: int

class DashboardResponse(BaseModel):
    project: ProjectResponse
    metrics: DashboardMetrics
    chartData: List[Dict[str, Any]]
    recentAlerts: List[Dict[str, Any]]
    activities: List[ActivityResponse]
