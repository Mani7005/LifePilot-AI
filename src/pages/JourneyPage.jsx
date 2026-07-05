import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import PageShell from "../components/ui/PageShell.jsx";
import SectionHeading from "../components/ui/SectionHeading.jsx";
import { journeyStages } from "../data/mockData.js";

const questions = [
  {
    key: "age",
    label: "What's your age group?",
    options: ["18–24", "25–34", "35–44", "45+"],
  },
  {
    key: "occupation",
    label: "What best describes you?",
    options: ["Student", "Salaried", "Self-employed", "Retired"],
  },
  {
    key: "income",
    label: "Your monthly income range?",
    options: ["< ₹25K", "₹25K–₹75K", "₹75K–₹2L", "₹2L+"],
  },
  {
    key: "goal",
    label: "What matters most to you right now?",
    options: ["Building savings", "Growing wealth", "Buying a home", "Retirement security"],
  },
  {
    key: "risk",
    label: "Your risk appetite?",
    options: ["Conservative", "Balanced", "Aggressive"],
  },
  {
    key: "family",
    label: "Your family status?",
    options: ["Single", "Married", "Married + Kids", "Supporting parents"],
  },
];

function computeStageCount(answers) {
  // Deterministic mock "AI reasoning" — more life complexity unlocks more stages
  let count = 3;
  if (answers.occupation && answers.occupation !== "Student") count += 1;
  if (answers.income === "₹75K–₹2L" || answers.income === "₹2L+") count += 1;
  if (answers.goal === "Growing wealth") count += 1;
  if (answers.goal === "Buying a home") count = Math.max(count, 7);
  if (answers.family === "Married + Kids" || answers.family === "Supporting parents") count += 1;
  if (answers.goal === "Retirement security") count = 8;
  return Math.min(count, journeyStages.length);
}

export default function JourneyPage() {
  const [answers, setAnswers] = useState({});
  const activeCount = useMemo(() => {
    if (Object.keys(answers).length === 0) return 0;
    return computeStageCount(answers);
  }, [answers]);

  const allAnswered = Object.keys(answers).length === questions.length;

  return (
    <PageShell>
      <section className="section">
        <SectionHeading
          eyebrow="AI Journey Builder"
          title="Tell us about your life. We'll map the rest."
          description="As you answer, LifePilot's agents reason live and construct your personalized financial journey."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1fr]">
          {/* Questions */}
          <div className="space-y-6">
            {questions.map((q, qi) => (
              <motion.div
                key={q.key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: qi * 0.05 }}
                className="glass-card p-6"
              >
                <p className="font-display text-sm font-semibold text-white">
                  {q.label}
                </p>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {q.options.map((opt) => {
                    const selected = answers[q.key] === opt;
                    return (
                      <button
                        key={opt}
                        onClick={() =>
                          setAnswers((prev) => ({ ...prev, [q.key]: opt }))
                        }
                        className={`rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
                          selected
                            ? "bg-gradient-to-r from-sbi-blue to-sbi-cyan text-white shadow-glow"
                            : "glass text-mist-300 hover:border-white/20 hover:text-white"
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            ))}

            <AnimatePresence>
              {allAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-card flex items-center gap-3 border-sbi-cyan/30 bg-sbi-cyan/[0.06] p-5"
                >
                  <Sparkles size={18} className="shrink-0 text-sbi-cyan" />
                  <p className="text-sm text-mist-200">
                    LifePilot has mapped an{" "}
                    <span className="font-semibold text-white">
                      {activeCount}-stage financial journey
                    </span>{" "}
                    tailored to your profile.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Timeline */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="glass-card p-8">
              <p className="eyebrow">Live Preview</p>
              <h3 className="mt-2 font-display text-xl font-semibold text-white">
                Your Financial Journey Timeline
              </h3>
              <div className="mt-8 space-y-1">
                {journeyStages.map((stage, i) => {
                  const isActive = i < Math.max(activeCount, 1);
                  const isLast = i === journeyStages.length - 1;
                  return (
                    <div key={stage.id} className="relative flex gap-4 pb-1">
                      <div className="flex flex-col items-center">
                        <motion.div
                          animate={{
                            scale: isActive ? 1 : 0.85,
                            backgroundColor: isActive ? "#22D3EE" : "rgba(255,255,255,0.08)",
                          }}
                          transition={{ duration: 0.4 }}
                          className="z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full"
                        >
                          {isActive ? (
                            <CheckCircle2 size={16} className="text-ink-950" />
                          ) : (
                            <span className="h-2 w-2 rounded-full bg-white/30" />
                          )}
                        </motion.div>
                        {!isLast && (
                          <motion.div
                            animate={{
                              backgroundColor: isActive ? "#22D3EE" : "rgba(255,255,255,0.08)",
                            }}
                            transition={{ duration: 0.4 }}
                            className="h-full min-h-[36px] w-px flex-1"
                          />
                        )}
                      </div>
                      <motion.div
                        animate={{ opacity: isActive ? 1 : 0.4 }}
                        className="pb-6"
                      >
                        <p
                          className={`font-display text-sm font-semibold ${
                            isActive ? "text-white" : "text-mist-400"
                          }`}
                        >
                          {stage.label}
                        </p>
                        <p className="mt-0.5 text-xs leading-relaxed text-mist-400">
                          {stage.detail}
                        </p>
                      </motion.div>
                    </div>
                  );
                })}
              </div>

              {allAnswered && (
                <Link to="/onboarding" className="btn-primary mt-4 w-full justify-center">
                  Begin Onboarding <ArrowRight size={16} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
