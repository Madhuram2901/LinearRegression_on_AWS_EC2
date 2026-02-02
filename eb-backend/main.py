from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import joblib
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_PATH = os.path.join(os.getcwd(), "linear_model.pkl")

try:
    params = joblib.load(MODEL_PATH)
    m = params["m"]
    b = params["b"]
except Exception as e:
    print("MODEL LOAD ERROR:", e)
    m, b = 0, 0   # prevent crash

class InputData(BaseModel):
    x: float

@app.get("/")
def root():
    return {"status": "ok"}

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/predict")
def predict(data: InputData):
    return {"prediction": m * data.x + b}
