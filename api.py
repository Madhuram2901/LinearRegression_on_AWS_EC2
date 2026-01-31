"""
FastAPI backend for Linear Regression Predict.
Loads linear_model.pkl (m, b) and serves POST /predict.
Run from project root: uvicorn api:app --reload --port 8000
"""
import joblib
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Linear Regression Predict")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_PATH = Path(__file__).resolve().parent / "linear_model.pkl"
model = joblib.load(MODEL_PATH)
m, b = model["m"], model["b"]


class PredictRequest(BaseModel):
    x: float


class PredictResponse(BaseModel):
    prediction: float


@app.post("/predict", response_model=PredictResponse)
def predict(req: PredictRequest):
    prediction = m * req.x + b
    return PredictResponse(prediction=prediction)


@app.get("/")
def root():
    return {"message": "Linear Regression API", "endpoints": ["POST /predict"]}
