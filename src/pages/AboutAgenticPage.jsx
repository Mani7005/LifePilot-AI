import { motion } from "framer-motion";
import { Eye, Brain, ListChecks, Zap, GraduationCap, ArrowRight, MessageSquareOff, RadioTower } from "lucide-react";
import PageShell from "../components/ui/PageShell.jsx";
import SectionHeading from "../components/ui/SectionHeading.jsx";
import { agenticSteps } from "../data/mockData.js";

const icons = { observe: Eye, reason: Brain, plan: ListChecks, act: Zap, learn: GraduationCap };
const colors = ["#22D3EE", "#7C6CF0", "#0D47F0", "#F2B441", "#34D399"];

const comparison = [
  {
    icon: MessageSquareOff,
    title: "A Chatbot",
    points: ["Waits for you to ask", "Answers one question at a time", "Forgets after the session ends"],
  },
  {
    icon: RadioTower,
    title: "Agentic AI",
    points: ["Acts before you ask", "Multiple agents reason together", "Learns continuously across your lifetime"],
  },
];

export default function AboutAgenticPage() {
  return (
    <PageShell>
      <section className="section">
        <SectionHeading
          eyebrow="Under the Hood"
          title="This is Agentic AI, not a chatbot"
          description="Five continuous phases run in a loop, every second, for every customer — no prompt required."
        />

        {/* Loop */}
        <div className="relative mt-16 flex flex-col items-center gap-6 md:flex-row md:justify-between md:gap-4">
          {agenticSteps.map((step, i) => {
            const Icon = icons[step.key];
            return (
              <motion.div
                key={step.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="flex w-full flex-col items-center md:w-auto"
              >
                <div className="glass-card flex w-full flex-col items-center gap-3 p-6 text-center md:w-44">
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.2 }}
                    className="grid h-14 w-14 place-items-center rounded-2xl shadow-glow"
                    style={{ background: `${colors[i]}22`, color: colors[i] }}
                  >
                    <Icon size={22} strokeWidth={1.8} />
                  </motion.div>
                  <p className="font-display text-sm font-semibold text-white">{step.title}</p>
                  <p className="text-xs leading-relaxed text-mist-400">{step.description}</p>
                </div>
                {i < agenticSteps.length - 1 && (
                  <motion.div
                    animate={{ x: [0, 6, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                    className="my-3 rotate-90 text-mist-400 md:my-0 md:rotate-0"
                  >
                    <ArrowRight size={18} />
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Loop back indicator */}
        <div className="mt-6 flex justify-center">
          <div className="flex items-center gap-2 rounded-full glass px-4 py-1.5 font-mono text-[11px] text-mist-400">
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="inline-block h-2 w-2 rounded-full border border-sbi-cyan border-t-transparent"
            />
            Learn feeds back into Observe — the loop never stops
          </div>
        </div>

        {/* Comparison */}
        <div className="mt-24 grid gap-6 sm:grid-cols-2">
          {comparison.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`glass-card p-8 ${i === 1 ? "border-sbi-cyan/30" : ""}`}
            >
              <div className={`grid h-12 w-12 place-items-center rounded-2xl ${i === 1 ? "bg-sbi-cyan/15 text-sbi-cyan" : "bg-white/[0.06] text-mist-400"}`}>
                <c.icon size={20} />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-white">{c.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {c.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-mist-300">
                    <span className={`mt-1.5 h-1 w-1 shrink-0 rounded-full ${i === 1 ? "bg-sbi-cyan" : "bg-mist-400"}`} />
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
