from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.endpoints import schools, payments  # Added payments here

app = FastAPI(
    title="EduBook SaaS API",
    description="A modern School Management System backend built for African schools.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(schools.router, prefix="/api/v1/schools", tags=["Schools"])
app.include_router(payments.router, prefix="/api/v1/payments", tags=["Payments"])  # Added payments route

@app.get("/")
def read_root():
    return {"message": "Welcome to EduBook SaaS API. Head over to /docs for the API interactive documentation."}