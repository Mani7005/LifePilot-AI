import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, Calendar, Wallet, TrendingUp, Target } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import PageShell from "../components/ui/PageShell.jsx";
import SectionHeading from "../components/ui/SectionHeading.jsx";
import GlassCard from "../components/ui/GlassCard.jsx";

const presets = [
  { label: "iPhone 16 Pro", cost: 149900, months: 8 },
  { label: "A trip to Bali", cost: 95000, months: 6 },
  { label: "A used Royal Enfield", cost: 180000, months: 10 },
  { label: "Wedding fund", cost: 800000, months: 24 },
];

function parseGoal(text) {
  const lower = text.toLowerCase();
  const found = presets.find((p) => lower.includes(p.label.toLowerCase().split(" ")[0]));
  if (found) return found;
  // fallback generic estimate based on text length / keywords
  if (lower.includes("iphone")) return presets[0];
  if (lower.includes("bali") || lower.includes("trip") || lower.includes("goa")) return presets[1];
  if (lower.includes("bike") || lower.includes("royal enfield") || lower.includes("motorcycle")) return presets[2];
  if (lower.includes("wedding")) return presets[3];
  return { label: text.trim() || "Your Goal", cost: 120000, months: 9 };
}

function buildChartData(cost, months) {
  const monthly = Math.ceil(cost / months);
  let cumulative = 0;
  const data = [];
  for (let i = 0; i <= months; i++) {
    cumulative = i === 0 ? 0 : Math.min(cumulative + monthly, cost);
    data.push({ month: `M${i}`, saved: cumulative, target: cost });
  }
  return { data, monthly };
}

export default function GoalPlannerPage() {
  const [input, setInput] = useState("");
  const [goal, setGoal] = useState(null);

  const handleGenerate = () => {
    const parsed = parseGoal(input || "iPhone 16 Pro");
    setGoal(parsed);
  };

  const chart = goal ? buildChartData(goal.cost, goal.months) : null;
  const completionDate = goal
    ? new Date(Date.now() + goal.months * 30 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", {
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <PageShell>
      <section className="section">
        <SectionHeading
          eyebrow="Goal Planner"
          title="Say your goal. LifePilot builds the plan."
          description="Type any financial goal in plain language — LifePilot instantly converts it into a savings roadmap."
        />

        <div className="mx-auto mt-12 max-w-2xl">
          <div className="glass-card flex items-center gap-3 p-3">
            <Sparkles size={18} className="ml-2 shrink-0 text-sbi-cyan" />
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
              placeholder="I want to buy an iPhone…"
              className="flex-1 bg-transparent text-sm text-white placeholder:text-mist-400 focus:outline-none"
            />
            <button onClick={handleGenerate} className="btn-primary !px-4 !py-2.5 !text-sm">
              <Send size={15} /> Plan it
            </button>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {presets.map((p) => (
              <button
                key={p.label}
                onClick={() => {
                  setInput(`I want ${p.label}`);
                  setGoal(p);
                }}
                className="rounded-full glass px-3.5 py-1.5 text-xs text-mist-300 hover:text-white"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {goal && (
            <motion.div
              key={goal.label}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5 }}
              className="mt-14"
            >
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { icon: Target, label: "Goal", value: goal.label },
                  { icon: Wallet, label: "Target Amount", value: `₹${goal.cost.toLocaleString("en-IN")}` },
                  { icon: TrendingUp, label: "Monthly Contribution", value: `₹${chart.monthly.toLocaleString("en-IN")}` },
                  { icon: Calendar, label: "Expected Completion", value: completionDate },
                ].map((stat, i) => (
                  <GlassCard key={stat.label} delay={i * 0.08}>
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-sbi-blue/15 text-sbi-cyan">
                      <stat.icon size={17} />
                    </div>
                    <p className="mt-4 text-xs text-mist-400">{stat.label}</p>
                    <p className="mt-1 font-display text-lg font-bold text-white">{stat.value}</p>
                  </GlassCard>
                ))}
              </div>

              <GlassCard hover={false} className="mt-8">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-base font-semibold text-white">
                    Savings Trajectory
                  </h3>
                  <span className="font-mono text-[11px] text-mist-400">{goal.months}-month plan</span>
                </div>
                <div className="mt-6 h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chart.data} margin={{ left: -20, right: 10, top: 10 }}>
                      <defs>
                        <linearGradient id="savedGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#22D3EE" stopOpacity={0.5} />
                          <stop offset="100%" stopColor="#22D3EE" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                      <XAxis dataKey="month" stroke="#8C97BE" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis
                        stroke="#8C97BE"
                        fontSize={11}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
                      />
                      <Tooltip
                        contentStyle={{
                          background: "#0A0F1E",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: 12,
                          fontSize: 12,
                        }}
                        labelStyle={{ color: "#F5F7FF" }}
                        formatter={(v) => [`₹${v.toLocaleString("en-IN")}`, "Saved"]}
                      />
                      <Area
                        type="monotone"
                        dataKey="saved"
                        stroke="#22D3EE"
                        strokeWidth={2.5}
                        fill="url(#savedGrad)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </GlassCard>

              <div className="mt-6 flex items-center gap-3 rounded-2xl border border-sbi-violet/25 bg-sbi-violet/[0.06] p-4">
                <Sparkles size={16} className="shrink-0 text-sbi-violet" />
                <p className="text-xs leading-relaxed text-mist-200">
                  LifePilot will auto-debit <span className="font-semibold text-white">₹{chart.monthly.toLocaleString("en-IN")}</span> on
                  the 1st of every month into a dedicated goal account, and notify you if you fall behind schedule.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </PageShell>
  );
}
