from fastapi import APIRouter, File, UploadFile, HTTPException, Depends, Query
from typing import Annotated
from sqlmodel import select, Session
from ..models.job_model import Job
from ..deps.db import get_session

router = APIRouter()
SessionDep = Annotated[Session, Depends(get_session)]


@router.get("/jobs", tags=["jobs"])
async def read_jobs(
    session: SessionDep, offset: int = 0, limit: Annotated[int, Query(le=100)] = 100
) -> list[Job]:
    jobs = session.exec(select(Job).offset(offset).limit(limit)).all()
    return jobs


@router.post("/jobs/upload", tags=["jobs"], response_model=Job)
async def create_job(job: Job, file: UploadFile, session: SessionDep) -> Job:
    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=400, detail="Invalid file type. Only PDFs are allowed."
        )

    session.add(job)
    session.commit()
    session.refresh(job)

    return {"status": "queued", id: job.id}


@router.post("/jobs/url", tags=["jobs"], response_model=Job)
async def create_job(job: Job, session: SessionDep) -> Job:
    session.add(job)
    session.commit()
    session.refresh(job)

    return {"status": "queued", id: job.id}
