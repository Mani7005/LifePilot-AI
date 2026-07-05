import { motion } from "framer-motion";
import {
  Wallet,
  Target,
  TrendingUp,
  Gauge,
  Utensils,
  Tv,
  ShoppingCart,
  Train,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import PageShell from "../components/ui/PageShell.jsx";
import SectionHeading from "../components/ui/SectionHeading.jsx";
import GlassCard from "../components/ui/GlassCard.jsx";
import RecommendationCard from "../components/ui/RecommendationCard.jsx";
import { transactions, recommendations } from "../data/mockData.js";

const txnIcons = {
  utensils: Utensils,
  tv: Tv,
  "shopping-cart": ShoppingCart,
  "trending-up": TrendingUp,
  train: Train,
  wallet: Wallet,
};

const summaryCards = [
  {
    icon: Wallet,
    label: "Total Balance",
    value: "₹2,84,620",
    delta: "+4.2%",
    positive: true,
    color: "from-sbi-blue to-sbi-cyan",
  },
  {
    icon: Target,
    label: "Savings Goal — iPhone 16 Pro",
    value: "₹68,000 / ₹1,20,000",
    delta: "57%",
    positive: true,
    color: "from-sbi-violet to-sbi-blue",
    progress: 57,
  },
  {
    icon: TrendingUp,
    label: "Investment Portfolio",
    value: "₹4,12,340",
    delta: "+11.8%",
    positive: true,
    color: "from-emerald-500 to-sbi-cyan",
  },
  {
    icon: Gauge,
    label: "Credit Score",
    value: "782",
    delta: "Excellent",
    positive: true,
    color: "from-sbi-gold to-sbi-blue",
  },
];

export default function DashboardPage() {
  return (
    <PageShell>
      <section className="section">
        <SectionHeading
          eyebrow="Financial Dashboard"
          title="Ananya, here's your money — clearly."
          align="left"
        />

        {/* Summary cards */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {summaryCards.map((card, i) => (
            <GlassCard key={card.label} delay={i * 0.08} className="relative overflow-hidden">
              <div className={`absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br ${card.color} opacity-20 blur-2xl`} />
              <div className="flex items-center justify-between">
                <div className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${card.color} bg-opacity-20 text-white`}>
                  <card.icon size={17} />
                </div>
                <span className={`flex items-center gap-1 font-mono text-[11px] ${card.positive ? "text-emerald-300" : "text-rose-300"}`}>
                  {card.positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {card.delta}
                </span>
              </div>
              <p className="mt-5 text-xs text-mist-400">{card.label}</p>
              <p className="mt-1 font-display text-xl font-bold text-white">{card.value}</p>
              {card.progress && (
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${card.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="h-full bg-gradient-to-r from-sbi-violet to-sbi-cyan"
                  />
                </div>
              )}
            </GlassCard>
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          {/* Transactions */}
          <GlassCard hover={false} className="!p-0">
            <div className="flex items-center justify-between p-6 pb-0">
              <h3 className="font-display text-base font-semibold text-white">Recent Transactions</h3>
              <span className="font-mono text-[11px] text-mist-400">Last 7 days</span>
            </div>
            <div className="mt-4 divide-y divide-white/[0.06]">
              {transactions.map((t, i) => {
                const Icon = txnIcons[t.icon] || Wallet;
                const positive = t.amount > 0;
                return (
                  <motion.div
                    key={t.id}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center justify-between px-6 py-4"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/[0.06] text-mist-200">
                        <Icon size={16} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{t.merchant}</p>
                        <p className="text-xs text-mist-400">{t.category} · {t.date}</p>
                      </div>
                    </div>
                    <span className={`font-display text-sm font-semibold ${positive ? "text-emerald-300" : "text-mist-100"}`}>
                      {positive ? "+" : "-"}₹{Math.abs(t.amount).toLocaleString("en-IN")}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </GlassCard>

          {/* Mini insight panel */}
          <GlassCard hover={false} className="flex flex-col justify-between">
            <div>
              <h3 className="font-display text-base font-semibold text-white">This Month, at a Glance</h3>
              <div className="mt-6 space-y-5">
                {[
                  { label: "Income", value: "₹78,500", width: 100, color: "bg-emerald-400" },
                  { label: "Spent", value: "₹32,400", width: 41, color: "bg-sbi-cyan" },
                  { label: "Invested", value: "₹3,000", width: 4, color: "bg-sbi-violet" },
                  { label: "Idle in savings", value: "₹18,200", width: 23, color: "bg-sbi-gold" },
                ].map((row) => (
                  <div key={row.label}>
                    <div className="flex justify-between text-xs">
                      <span className="text-mist-400">{row.label}</span>
                      <span className="font-medium text-white">{row.value}</span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${row.width}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className={`h-full ${row.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 rounded-2xl border border-sbi-cyan/20 bg-sbi-cyan/[0.06] p-4">
              <p className="text-xs leading-relaxed text-mist-200">
                <span className="font-semibold text-sbi-cyan">Financial Coach:</span> Your idle savings could
                earn 4x more if moved into a SIP. See recommendation below.
              </p>
            </div>
          </GlassCard>
        </div>

        {/* Recommendations */}
        <div className="mt-16">
          <SectionHeading
            eyebrow="Proactive Intelligence"
            title="LifePilot Recommendations"
            description="Generated autonomously by the Recommendation Agent based on your live financial behavior."
            align="left"
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {recommendations.map((rec, i) => (
              <RecommendationCard key={rec.id} rec={rec} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
