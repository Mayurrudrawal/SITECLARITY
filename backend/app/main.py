"""
FastAPI Backend Application for SIH 2026 Infrastructure Project Monitoring
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Infrastructure Project Progress & Evidence Monitor API",
    description="SIH 2026 End-to-End Vertical Slice: Schedule -> Evidence -> AI Extraction -> Activity Matching -> Progress Engine -> Planned vs Actual -> Evidence Traceability",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health_check():
    return {"status": "ok", "service": "FastAPI Project Monitor"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
