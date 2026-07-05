export const agents = [
  {
    id: "acquisition",
    name: "Acquisition Agent",
    role: "Finds and engages prospective customers",
    status: "active",
    color: "#22D3EE",
    logs: [
      "Identified 1,204 salary-account leads in Ludhiana cluster",
      "Personalized outreach sent to 312 pre-approved leads",
      "Converted 47 leads into savings account applications",
    ],
  },
  {
    id: "onboarding",
    name: "Onboarding Agent",
    role: "Runs paperless KYC and account activation",
    status: "active",
    color: "#7C6CF0",
    logs: [
      "Aadhaar OCR completed for applicant #A1042 in 2.1s",
      "Video KYC auto-scheduled for 4:30 PM slot",
      "Account activated — welcome kit dispatched",
    ],
  },
  {
    id: "coach",
    name: "Financial Coach",
    role: "Nudges healthy money habits",
    status: "thinking",
    color: "#F2B441",
    logs: [
      "Detected irregular spending spike in dining category",
      "Drafting a personalized savings nudge",
      "Comparing peer benchmark for similar income bracket",
    ],
  },
  {
    id: "recommendation",
    name: "Recommendation Agent",
    role: "Matches products to life stage & goals",
    status: "active",
    color: "#0D47F0",
    logs: [
      "Scored 14 product fits for customer #C7743",
      "Top match: SBI Life Smart Shield (94% relevance)",
      "Recommendation queued for dashboard delivery",
    ],
  },
  {
    id: "fraud",
    name: "Fraud Guardian",
    role: "Monitors transactions for anomalies",
    status: "alert",
    color: "#F0546A",
    logs: [
      "Flagged ₹48,500 transaction — location mismatch",
      "Cross-checked device fingerprint — new device detected",
      "Risk score computed: 82/100 — awaiting customer action",
    ],
  },
  {
    id: "relationship",
    name: "Relationship Manager",
    role: "Owns the end-to-end customer relationship",
    status: "active",
    color: "#34D399",
    logs: [
      "Synced insights from 5 agents into unified customer view",
      "Scheduled quarterly portfolio review call",
      "Escalated fraud alert to customer via push notification",
    ],
  },
];

export const journeyStages = [
  { id: "student", label: "Student", detail: "Zero-balance student account opened" },
  { id: "savings", label: "Savings Account", detail: "SBI Digital Savings Account activated" },
  { id: "upi", label: "UPI", detail: "UPI linked for instant payments" },
  { id: "emergency", label: "Emergency Fund", detail: "3-month expense buffer goal created" },
  { id: "sip", label: "SIP", detail: "₹3,000/month mutual fund SIP started" },
  { id: "insurance", label: "Insurance", detail: "Term + health cover recommended" },
  { id: "homeloan", label: "Home Loan", detail: "Pre-approved home loan of ₹45L" },
  { id: "retirement", label: "Retirement", detail: "NPS account opened for long-term goal" },
];

export const transactions = [
  { id: 1, merchant: "Zomato", category: "Food & Dining", amount: -486, date: "Today, 1:04 PM", icon: "utensils" },
  { id: 2, merchant: "Salary — Infosys Ltd", category: "Income", amount: 78500, date: "Yesterday, 9:00 AM", icon: "wallet" },
  { id: 3, merchant: "Netflix", category: "Subscriptions", amount: -649, date: "Yesterday, 6:12 PM", icon: "tv" },
  { id: 4, merchant: "Big Bazaar", category: "Groceries", amount: -2340, date: "2 days ago", icon: "shopping-cart" },
  { id: 5, merchant: "SIP — Axis Bluechip Fund", category: "Investment", amount: -3000, date: "3 days ago", icon: "trending-up" },
  { id: 6, merchant: "IRCTC", category: "Travel", amount: -1120, date: "4 days ago", icon: "train" },
];

export const recommendations = [
  {
    id: "emergency",
    title: "Build a 3-month Emergency Fund",
    why: "Your average monthly expense is ₹32,400 but your liquid buffer covers only 12 days.",
    benefit: "Cushions against job loss or medical emergencies without breaking investments.",
    cta: "Start Emergency Fund",
    tag: "Safety",
  },
  {
    id: "sip",
    title: "Start a ₹5,000 SIP in Axis Bluechip Fund",
    why: "You have ₹18,200 idle in savings earning just 2.7% interest for over 90 days.",
    benefit: "Projected to grow to ₹9.8L in 10 years at 12% CAGR vs ₹2.4L in savings.",
    cta: "Start SIP",
    tag: "Grow",
  },
  {
    id: "insurance",
    title: "Get a ₹50L Term Insurance Plan",
    why: "You recently added a dependent and currently have zero life cover.",
    benefit: "Secures your family's future at just ₹687/month for a 25-year-old.",
    cta: "Get Covered",
    tag: "Protect",
  },
  {
    id: "card",
    title: "Upgrade to SBI Cashback Credit Card",
    why: "78% of your spends are online — this card gives 5% cashback on top merchants.",
    benefit: "Estimated savings of ₹9,600/year based on your spending pattern.",
    cta: "Apply Now",
    tag: "Optimize",
  },
  {
    id: "loan",
    title: "Pre-approved Personal Loan of ₹3.5L",
    why: "Your credit score of 782 qualifies you for our lowest interest slab.",
    benefit: "Available at 10.5% p.a. — 2.1% lower than your last credit inquiry.",
    cta: "View Offer",
    tag: "Access",
  },
];

export const fraudAlerts = [
  {
    id: "TXN-88213",
    merchant: "QuickBuy Electronics",
    amount: 48500,
    riskScore: 82,
    location: "Attempted from Lagos, Nigeria",
    homeLocation: "Registered device: Ludhiana, Punjab",
    reason:
      "Transaction location is 6,400 km from your last known device location, combined with a first-time merchant and unusual late-night timing.",
    time: "2 minutes ago",
    device: "Unrecognized Android device",
  },
];

export const agenticSteps = [
  {
    key: "observe",
    title: "Observe",
    description: "Continuously watches transactions, balances, and life events in real time.",
  },
  {
    key: "reason",
    title: "Reason",
    description: "Cross-references patterns, risk models, and goals across specialist agents.",
  },
  {
    key: "plan",
    title: "Plan",
    description: "Drafts the next best action — a product, a nudge, or a safeguard.",
  },
  {
    key: "act",
    title: "Act",
    description: "Executes autonomously: launches journeys, blocks fraud, books KYC slots.",
  },
  {
    key: "learn",
    title: "Learn",
    description: "Feeds outcomes back into the model to sharpen every future decision.",
  },
];
