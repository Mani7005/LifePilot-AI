import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, Eye, Brain, Zap, ShieldCheck, TrendingUp, Users } from "lucide-react";
import PageShell from "../components/ui/PageShell.jsx";
import SectionHeading from "../components/ui/SectionHeading.jsx";
import GlassCard from "../components/ui/GlassCard.jsx";
import AgentNetwork from "../components/hero/AgentNetwork.jsx";

const howItWorks = [
  {
    step: "01",
    icon: Eye,
    title: "Observe",
    description:
      "The AI continuously observes financial events — salary credits, spending spikes, life milestones — across your entire relationship with the bank.",
  },
  {
    step: "02",
    icon: Brain,
    title: "Reason",
    description:
      "Multiple AI agents collaborate — coaching, recommendation, fraud, and relationship agents debate and converge on the right next move for you.",
  },
  {
    step: "03",
    icon: Zap,
    title: "Act",
    description:
      "LifePilot autonomously launches banking journeys — opening goals, scheduling KYC, or blocking fraud — without waiting to be asked.",
  },
];

const stats = [
  { label: "Agents collaborating", value: "6" },
  { label: "Avg. decision time", value: "1.8s" },
  { label: "Fraud caught pre-loss", value: "₹2.4Cr+" },
  { label: "Customer NPS uplift", value: "+38" },
];

const pillars = [
  { icon: ShieldCheck, title: "Always Watching", text: "Fraud Guardian scores every transaction in real time, before money moves." },
  { icon: TrendingUp, title: "Always Growing", text: "Recommendation Agent finds the next best financial move for your life stage." },
  { icon: Users, title: "Always Personal", text: "Relationship Manager stitches every agent's insight into one coherent story." },
];

export default function LandingPage() {
  return (
    <PageShell>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-aurora" />
        <div className="section grid items-center gap-16 pt-16 md:grid-cols-2 md:pt-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5">
              <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-sbi-cyan" />
              <span className="font-mono text-xs uppercase tracking-widest text-mist-300">
                Agentic AI · Live Prototype
              </span>
            </div>

            <h1 className="text-balance font-display text-4xl font-bold leading-[1.08] text-white sm:text-5xl lg:text-6xl">
              Meet <span className="gradient-text">SBI LifePilot AI</span>
            </h1>

            <p className="mt-6 max-w-lg text-balance text-base leading-relaxed text-mist-400 md:text-lg">
              Your autonomous financial relationship manager that proactively
              guides customers throughout their financial journey using
              agentic AI.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link to="/journey" className="btn-primary">
                Start Journey <ArrowRight size={17} />
              </Link>
              <Link to="/agents" className="btn-secondary">
                <PlayCircle size={17} /> Watch Demo
              </Link>
            </div>

            <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-2xl font-bold text-white">{s.value}</p>
                  <p className="mt-1 text-xs leading-snug text-mist-400">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <AgentNetwork />
          </motion.div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="section !pt-0">
        <div className="grid gap-5 sm:grid-cols-3">
          {pillars.map((p, i) => (
            <GlassCard key={p.title} delay={i * 0.1} className="flex flex-col gap-4">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-sbi-blue/20 to-sbi-cyan/20 text-sbi-cyan">
                <p.icon size={20} strokeWidth={1.8} />
              </div>
              <div>
                <p className="font-display text-base font-semibold text-white">{p.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-mist-400">{p.text}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section">
        <SectionHeading
          eyebrow="The Agentic Loop"
          title="How LifePilot Works"
          description="Not a chatbot waiting for questions — an always-on system that observes, reasons, and acts on your behalf."
        />

        <div className="relative mt-16 grid gap-8 md:grid-cols-3">
          <div className="absolute left-0 right-0 top-[52px] hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent md:block" />
          {howItWorks.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative"
            >
              <div className="glass-card relative p-8">
                <div className="mb-6 flex items-center justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-sbi-blue to-sbi-cyan shadow-glow-blue">
                    <step.icon size={20} className="text-white" strokeWidth={1.8} />
                  </div>
                  <span className="font-mono text-3xl font-bold text-white/10">
                    {step.step}
                  </span>
                </div>
                <h3 className="font-display text-xl font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-mist-400">
                  {step.description}
                </p>
              </div>
              {i < howItWorks.length - 1 && (
                <div className="mx-auto -mt-1 mb-1 flex justify-center md:hidden">
                  <ArrowRight size={16} className="rotate-90 text-mist-400" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
