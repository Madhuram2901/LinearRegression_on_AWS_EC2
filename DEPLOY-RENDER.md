# Deploy frontend to Render

## Option A: Dashboard (recommended)

1. **Go to [Render Dashboard](https://dashboard.render.com)** → **New** → **Static Site**.

2. **Connect repository**
   - Connect **GitHub** and select **Madhuram2901/LinearRegression_on_AWS_EC2**.

3. **Settings**
   - **Name:** `linear-regression-ui` (or any name)
   - **Branch:** `main`
   - **Root Directory:** `LinearRegressionUI` ← **required** (frontend lives in this folder)
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`

4. **Environment (optional but important)**
   - If your API runs on EC2 or elsewhere, add:
   - **Key:** `VITE_API_URL`
   - **Value:** `http://YOUR_EC2_PUBLIC_IP:8000` (or your API URL; use `https://` if you have SSL)

   Without this, the app uses `http://localhost:8000` and Predict will fail from the deployed site.

5. **Create Static Site**  
   Render will build and deploy. You’ll get a URL like `https://linear-regression-ui.onrender.com`.

---

## Option B: Blueprint (render.yaml)

1. Commit and push `render.yaml` (it’s at the repo root).
2. In Render: **New** → **Blueprint** → connect **Madhuram2901/LinearRegression_on_AWS_EC2**.
3. Render will read `render.yaml` and create the Static Site. Then add **VITE_API_URL** in the service’s **Environment** tab (see step 4 above).

---

## After deploy

- Open the Render URL and test **Predict**.
- If you see “Could not reach the API…”, set **VITE_API_URL** in Render and **redeploy** (new build needed for Vite env vars).
- For SPA routing (if you add React Router later), add a **Redirect/Rewrite**: `/*` → `/index.html` (Rewrite).
