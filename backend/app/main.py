from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.endpoints import schools, payments

# Import your database core assets and models
from app.core.database import engine
from app import models

# Safely attempt table generation without breaking the runtime process loop
try:
    models.Base.metadata.create_all(bind=engine)
except Exception as e:
    print(f"Database table generation skipped or handled asynchronously: {e}")

app = FastAPI(
    title="EduBook SaaS API",
    description="A modern School Management System backend built for African schools.",
    version="1.0.0"
)

# Explicitly trust your active live frontend URL for credentialed handshakes
origins = [
    "https://edubook-saas-yhhw.vercel.app",  # Your live frontend site
    "http://localhost:3000",                  # Local Next.js testing
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(schools.router, prefix="/api/v1/schools", tags=["Schools"])
app.include_router(payments.router, prefix="/api/v1/payments", tags=["Payments"])

@app.get("/")
def read_root():
    return {"message": "Welcome to EduBook SaaS API. Head over to /docs for the API interactive documentation."}