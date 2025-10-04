# bookable

We built bookable, an AI-powered consultation platform that transforms rough client ideas into comprehensive Product Requirements Documents (PRDs) through conversational AI.

![Bookable Product](https://github.com/user-attachments/assets/c93888cd-d0d7-49f7-a45a-122d1f43971e)

## 🎯 Project Overview

*bookable* streamlines the client onboarding process for consultants and agencies by using AI to:
- Conduct intelligent consultations with clients
- Gather requirements through natural conversation
- Generate professional PRD documents automatically
- Provide structured project summaries with timelines and budgets

## 🌟 Hackathon Achievement

This project was built during the Entrepreneur First Fall 2024 Hackathon and received **4th place** with an honorable mention *(some judges gave us third)*!

## 💻 Tech Stack

- [Lovable](https://lovable.dev/) – for rapid prototyping
- [Python](https://www.python.org/) – backend language
- [FastAPI](https://fastapi.tiangolo.com/) – backend framework
- [TypeScript](https://www.typescriptlang.org/) – frontend language
- [React](https://react.dev/) – frontend framework
- [OpenAI](https://openai.com/) – LLM & transcription models
- [shadcn/ui](https://ui.shadcn.com/) – the standard for components

## 🎬 Demo

The video below shows an example run-through of the bookable platform, which includes showcasing the requirement gathering through natural conversation, project estimation, and general look & feel of the system. The slides are available [here](./assets/bookable-pitch.pdf).

https://github.com/user-attachments/assets/19f0a34c-018f-42ee-a929-1c33e59e9dde

## 🚀 Getting Started

### Prerequisites
- Node.js (v20+)
- Python 3.12+
- OpenAI API Key

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

After the frontend setup, the server will run on `http://localhost:8080`.

### Backend Setup

```bash
cd backend

uv init
uv install -r requirements.txt
export OPENAI_API_KEY='your-api-key-here'

python asgi.py
```

After the backend setup, the server will run on `http://127.0.0.1:5000`.

## Team

- <a href="https://www.linkedin.com/in/kamilzak00/">Kamil Zak</a>
- <a href="https://www.linkedin.com/in/fabian-salge/">Fabian Salge</a>
- <a href="https://www.linkedin.com/in/finley-braund/">Finley Braund</a>
- <a href="https://www.linkedin.com/in/ethan-luc/">Ethan Luc</a>