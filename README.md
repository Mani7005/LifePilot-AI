# SBI LifePilot AI — "Your Autonomous Financial Relationship Manager"

A hackathon prototype of an **Agentic AI** platform for State Bank of India, where six
autonomous AI agents collaborate to proactively guide customers through their financial
journey — from student savings account to retirement.

This is **not a chatbot**. It's a set of always-on, collaborating agents visualized as a
premium fintech product (think Apple × Stripe × Revolut × CRED).

## Tech stack

- **React 18 + Vite** — fast dev/build tooling
- **Tailwind CSS** — utility-first styling with a custom design system (dark blue / white / SBI blue, glassmorphism)
- **Framer Motion** — page transitions, orbiting agent network, staggered reveals
- **React Router** — client-side routing across 9 pages
- **Recharts** — the Goal Planner's savings trajectory chart
- **Lucide React** — icon set

## Getting started

```bash
npm install
npm run dev       # start local dev server
npm run build     # production build (outputs to /dist)
npm run preview   # preview the production build
```

## Pages

| Route | Page | What it does |
|---|---|---|
| `/` | Landing Page | Hero with animated AI Core network, "How LifePilot Works" (Observe → Reason → Act) |
| `/journey` | AI Journey | Answer 6 questions; watch a personalized financial timeline build live |
| `/agents` | Agent Dashboard | 6 autonomous agents + central LifePilot Brain, live activity logs, click any agent for detail |
| `/onboarding` | Onboarding | Simulated Aadhaar upload → OCR scan animation → auto-filled form → Video KYC scheduling |
| `/dashboard` | Financial Dashboard | Balance, savings goal, investments, credit score, transactions, AI recommendations with one-click accept |
| `/goal-planner` | Goal Planner | Type a goal ("I want to buy an iPhone") → get a savings plan + chart |
| `/fraud-guardian` | Fraud Guardian | A flagged suspicious transaction with risk score, reasoning, and Approve / Block / Explain actions |
| `/about-agentic-ai` | About Agentic AI | Visual Observe → Reason → Plan → Act → Learn loop, and Chatbot vs Agentic AI comparison |
| `/get-started` | Final CTA | "Launch LifePilot" call to action |

## Notes for judges

- All banking data (transactions, balances, credit scores, fraud alerts) is **realistic mock data** — see `src/data/mockData.js`.
- The "AI" behaviors (OCR extraction, journey-stage reasoning, fraud risk scoring, goal-plan generation, fraud explanation) are implemented as **deterministic simulations** driven by real UI logic and timed animations, designed to demonstrate the intended agentic UX within a hackathon timebox — they are not calling a live LLM.
- Fully responsive, from a 390px phone to a widescreen desktop.

## Project structure

```
src/
  components/
    layout/       Navbar, Footer
    ui/            Reusable primitives (GlassCard, SectionHeading, AgentCard, RecommendationCard, PageShell)
    hero/          AgentNetwork (animated hero visual)
  data/
    mockData.js    All mock banking + agent data
  pages/
    LandingPage.jsx
    JourneyPage.jsx
    AgentDashboard.jsx
    OnboardingPage.jsx
    DashboardPage.jsx
    GoalPlannerPage.jsx
    FraudGuardianPage.jsx
    AboutAgenticPage.jsx
    FinalCtaPage.jsx
  App.jsx
  main.jsx
  index.css
```

---
Hackathon Project · SBI Hackathon · Agentic AI · Made with React + AI
