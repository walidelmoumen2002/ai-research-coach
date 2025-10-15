from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import jobs
from .deps.db import create_db_and_tables

DATABASE_URL = (
    "postgresql://postgres:@db.punzcoguhgsmciopjozx.supabase.co:5432/postgres"
)

app = FastAPI()
origins = [
    "http://localhost:3010",
]
app.include_router(jobs.router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    create_db_and_tables()


@app.get("/")
async def root():
    return {"message": "Hello World"}
