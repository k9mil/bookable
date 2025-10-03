# 📝 bookable - AI-Powered PRD Generator

> 🏆 **4th Place with Honorable Mention** at EF Hackathon

An AI-powered consultation platform that transforms rough client ideas into comprehensive Product Requirements Documents (PRDs) through conversational AI.

## 🎯 Project Overview

**bookable** streamlines the client onboarding process for consultants and agencies by using AI to:
- Conduct intelligent consultations with clients
- Gather requirements through natural conversation
- Generate professional PRD documents automatically
- Provide structured project summaries with timelines and budgets

[📊 View Pitch Deck](./Pitch.pdf)

## 🌟 Hackathon Achievement

This project was built during the EF Hackathon and received **4th place with an honorable mention**.

---

## ✨ Key Features

- 🤖 **AI-Powered Conversations** - GPT-4o driven chat interface that guides clients through requirements gathering
- 🎤 **Voice Input** - Audio recording with automatic transcription using Whisper API
- 📋 **Smart Requirements Tracking** - Accepts/rejects feature suggestions intelligently
- 📄 **Automatic PRD Generation** - Converts conversations into professional documents
- 📊 **Dashboard Analytics** - Structured view of requirements, timelines, and budgets
- 🎨 **Modern UI** - Clean, responsive interface built with React and shadcn/ui

## 🛠️ Tech Stack

### Frontend
- React 18 + TypeScript
- Vite
- shadcn/ui (Radix UI)
- Tailwind CSS
- React Router
- TanStack Query

### Backend
- Python FastAPI
- OpenAI API (GPT-4o & Whisper)
- Pydantic
- Uvicorn

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Python 3.8+
- OpenAI API Key

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173`

### Backend Setup

```bash
cd backend
pip install -r requirements.txt

# Set your OpenAI API key
export OPENAI_API_KEY='your-api-key-here'

# Run the server
python asgi.py
```

The backend will run on `http://127.0.0.1:5000`

## 📖 How It Works

1. **Initial Consultation** - AI asks targeted questions to understand the product idea
2. **Requirements Gathering** - System suggests features and tracks client preferences
3. **PRD Generation** - AI creates a comprehensive PRD document
4. **Dashboard View** - Presents structured summary with actionable insights

## 🎨 Application Flow

```
Landing Page → Customer Dashboard → AI Consultation → PRD Document → Summary Dashboard
```

