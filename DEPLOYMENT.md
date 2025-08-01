# Fintech LLM Project - Split Deployment Guide

This project is split into two parts for optimal deployment:
- **Backend (FastAPI)**: Deploy on Render
- **Frontend (React)**: Deploy on Vercel

## Project Structure
```
├── backend/
│   ├── enhanced_fintech_main.py  # FastAPI application
│   ├── requirements.txt          # Python dependencies
│   ├── render.yaml              # Render configuration
│   └── start.sh                 # Startup script
├── frontend/
│   ├── src/                     # React source code
│   ├── public/                  # Static assets
│   ├── package.json             # Node.js dependencies
│   ├── vercel.json              # Vercel configuration
│   └── .env.example             # Environment variables template
└── .gitignore                   # Git ignore rules
```

## 🚀 Backend Deployment (Render)

### 1. Push to GitHub
Ensure your project is pushed to GitHub with the new structure.

### 2. Deploy to Render
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `fintech-llm-backend`
   - **Root Directory**: `backend`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn enhanced_fintech_main:app --host 0.0.0.0 --port $PORT`
   - **Python Version**: `3.11.0`

### 3. Set Environment Variables on Render
Add these environment variables in Render dashboard:
```
HUGGING_FACE_API_TOKEN=your_hugging_face_token_here
ALPHA_VANTAGE_API_KEY=your_alpha_vantage_key_here
FINNHUB_API_KEY=your_finnhub_key_here
```

### 4. Note Your Backend URL
After deployment, copy your backend URL (e.g., `https://fintech-llm-backend.onrender.com`)

## 🎨 Frontend Deployment (Vercel)

### 1. Deploy to Vercel
1. Go to [Vercel](https://vercel.com/)
2. Click "New Project" and import your GitHub repository
3. Configure the project:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

### 2. Set Environment Variables on Vercel
In Vercel dashboard, add this environment variable:
```
REACT_APP_API_URL=https://your-backend-name.onrender.com
```
(Replace with your actual Render backend URL from step 4 above)

### 3. Deploy
Click "Deploy" and wait for the build to complete.

## 🔗 Connect Frontend to Backend

The frontend is already configured to use the `REACT_APP_API_URL` environment variable. Once both are deployed:

1. Update the Vercel environment variable with your Render backend URL
2. Redeploy the frontend if needed
3. Test the connection by using the chat interface

## 🛠️ Local Development

### Backend (Terminal 1)
```bash
cd backend
pip install -r requirements.txt
uvicorn enhanced_fintech_main:app --reload --port 8000
```

### Frontend (Terminal 2)
```bash
cd frontend
npm install
npm start
```

The frontend will run on `http://localhost:3000` and connect to the backend on `http://localhost:8000`.

## 📝 Important Notes

1. **Environment Variables**: Never commit your `.env` file. Use the platform's environment variable settings.

2. **CORS**: The backend is configured to allow all origins. For production, you may want to restrict this to your Vercel domain.

3. **Free Tier Limitations**:
   - Render free tier sleeps after 15 minutes of inactivity
   - First requests after sleep may be slow (30+ seconds)

4. **API Keys**: Make sure to add all your API keys to Render's environment variables for the backend to work properly.

## 🔧 Troubleshooting

### Backend Issues
- Check Render logs for startup errors
- Verify all environment variables are set
- Ensure the start command is correct

### Frontend Issues
- Check browser console for API connection errors
- Verify the `REACT_APP_API_URL` environment variable is set correctly
- Make sure the backend URL doesn't have a trailing slash

### Connection Issues
- Verify CORS is properly configured in the backend
- Check that the frontend is making requests to the correct backend URL
- Test the backend API directly using the `/health` endpoint

## 🎯 Success Verification

1. Backend health check: `https://your-backend.onrender.com/health`
2. Frontend loads: `https://your-frontend.vercel.app`
3. Chat interface works and connects to backend
4. Financial analysis requests return results

You're all set! Your fintech LLM application is now split and ready for professional deployment. 🚀
