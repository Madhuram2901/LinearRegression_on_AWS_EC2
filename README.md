# Linear Regression on AWS EC2

End-to-end ML app: React (Vite + shadcn/ui) frontend calling a FastAPI backend for linear regression prediction. Backend can run locally or on AWS EC2.

## Contents

- **`api.py`** – FastAPI backend: loads `linear_model.pkl`, exposes `POST /predict` with CORS for the frontend.
- **`linear_model.pkl`** – Trained model (slope `m`, intercept `b`) from `LinearRegressionReusable.py`.
- **`LinearRegressionUI/`** – React + Vite + Tailwind + shadcn/ui app; calls `VITE_API_URL/predict` (default `http://localhost:8000`).
- **`requirements-api.txt`** – Python deps for the API: `fastapi`, `uvicorn`, `joblib`.
- **`LinearRegressionReusable.py`** – Script that trains and saves the model (reference).

## Run locally

### 1. Backend (from repo root)

```bash
pip install -r requirements-api.txt
uvicorn api:app --reload --port 8000
```

### 2. Frontend

```bash
cd LinearRegressionUI
npm install
npm run dev
```

Open http://localhost:5173, enter a value, click **Predict**.

## Point frontend to EC2

Build with your API base URL:

```bash
cd LinearRegressionUI
set VITE_API_URL=http://YOUR_EC2_PUBLIC_IP:8000
npm run build
```

Serve the `dist/` folder (e.g. S3 + CloudFront, or any static host).

## Deploy API on EC2

1. Copy `api.py`, `linear_model.pkl`, `requirements-api.txt` to the instance.
2. Install deps: `pip install -r requirements-api.txt`
3. Run: `uvicorn api:app --host 0.0.0.0 --port 8000`
4. Open port 8000 in the security group if needed.
