# deps/db.py
from sqlmodel import create_engine, SQLModel, Session

DATABASE_URL = "postgresql://postgres:@127.0.0.1:5432/paperpilot"

engine = create_engine(DATABASE_URL, echo=True)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session
