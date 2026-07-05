import { Link } from "react-router-dom";
import { Sparkles, Code2, Users, Rss } from "lucide-react";

const columns = [
  {
    title: "Product",
    links: [
      { label: "AI Journey", to: "/journey" },
      { label: "Agent Dashboard", to: "/agents" },
      { label: "Financial Dashboard", to: "/dashboard" },
      { label: "Goal Planner", to: "/goal-planner" },
    ],
  },
  {
    title: "Trust & Safety",
    links: [
      { label: "Fraud Guardian", to: "/fraud-guardian" },
      { label: "Onboarding & KYC", to: "/onboarding" },
      { label: "About Agentic AI", to: "/about-agentic-ai" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-ink-900/60">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sbi-blue to-sbi-cyan shadow-glow-blue">
                <Sparkles size={18} className="text-white" strokeWidth={2.5} />
              </div>
              <p className="font-display text-[15px] font-semibold text-white">
                SBI LifePilot AI
              </p>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-mist-400">
              An autonomous financial relationship manager, built on collaborative
              agentic AI, guiding every customer from their first rupee to
              retirement.
            </p>
            <div className="mt-6 flex gap-3">
              {[Code2, Users, Rss].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-9 w-9 place-items-center rounded-lg glass text-mist-400 transition-colors hover:text-white"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="eyebrow">{col.title}</p>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-sm text-mist-300 transition-colors hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 text-xs text-mist-400 sm:flex-row">
          <p>© 2026 SBI LifePilot AI — Hackathon Prototype. Not an official SBI product.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-mono uppercase tracking-wide">
            <span className="rounded-full glass px-3 py-1">Hackathon Project</span>
            <span className="rounded-full glass px-3 py-1">SBI Hackathon</span>
            <span className="rounded-full glass px-3 py-1">Agentic AI</span>
            <span className="rounded-full glass px-3 py-1">Made with React + AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
