import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldAlert,
  MapPin,
  Smartphone,
  Store,
  CheckCircle2,
  XCircle,
  MessageCircleQuestion,
  Sparkles,
} from "lucide-react";
import PageShell from "../components/ui/PageShell.jsx";
import SectionHeading from "../components/ui/SectionHeading.jsx";
import GlassCard from "../components/ui/GlassCard.jsx";
import { fraudAlerts } from "../data/mockData.js";

const explanationSteps = [
  "Checked device fingerprint against your 14 known devices — no match found.",
  "Compared transaction geolocation with your last 5 verified locations — 6,412 km deviation detected.",
  "Cross-referenced merchant 'QuickBuy Electronics' against fraud registry — flagged in 212 prior reports.",
  "Combined risk factors using the Fraud Guardian model — composite score of 82/100, above the 70 auto-flag threshold.",
];

export default function FraudGuardianPage() {
  const alert = fraudAlerts[0];
  const [decision, setDecision] = useState(null); // 'approved' | 'blocked'
  const [showExplain, setShowExplain] = useState(false);
  const [explainStep, setExplainStep] = useState(0);

  const handleExplain = () => {
    setShowExplain(true);
    setExplainStep(0);
    explanationSteps.forEach((_, i) => {
      setTimeout(() => setExplainStep(i + 1), 500 * (i + 1));
    });
  };

  const riskColor = alert.riskScore >= 70 ? "#F0546A" : alert.riskScore >= 40 ? "#F2B441" : "#34D399";

  return (
    <PageShell>
      <section className="section">
        <SectionHeading
          eyebrow="Fraud Guardian"
          title="Every rupee, watched — before it moves."
          description="The Fraud Guardian agent scores transactions in real time and explains its reasoning in plain language."
        />

        <div className="mx-auto mt-14 max-w-3xl">
          <GlassCard hover={false} className="relative overflow-hidden border-rose-500/30 !p-0">
            <div className="flex items-center gap-3 border-b border-white/10 bg-rose-500/[0.08] px-6 py-4">
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1.4, repeat: Infinity }}
                className="grid h-9 w-9 place-items-center rounded-full bg-rose-500/20 text-rose-300"
              >
                <ShieldAlert size={17} />
              </motion.div>
              <div>
                <p className="text-sm font-semibold text-white">Suspicious transaction detected</p>
                <p className="text-xs text-mist-400">{alert.time} · Transaction ID {alert.id}</p>
              </div>
            </div>

            <div className="p-6">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-mono text-xs uppercase tracking-wide text-mist-400">Amount</p>
                  <p className="font-display text-3xl font-bold text-white">
                    ₹{alert.amount.toLocaleString("en-IN")}
                  </p>
                </div>

                {/* Risk gauge */}
                <div className="flex items-center gap-4">
                  <div className="relative h-20 w-20">
                    <svg viewBox="0 0 36 36" className="h-20 w-20 -rotate-90">
                      <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
                      <motion.circle
                        cx="18"
                        cy="18"
                        r="15.5"
                        fill="none"
                        stroke={riskColor}
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray={`${(alert.riskScore / 100) * 97.4} 97.4`}
                        initial={{ strokeDasharray: "0 97.4" }}
                        animate={{ strokeDasharray: `${(alert.riskScore / 100) * 97.4} 97.4` }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="font-display text-lg font-bold text-white">{alert.riskScore}</span>
                      <span className="font-mono text-[8px] uppercase text-mist-400">Risk</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-rose-300">High Risk</p>
                    <p className="text-xs text-mist-400">Auto-flag threshold: 70</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="flex items-start gap-2.5 rounded-xl bg-black/20 p-3.5">
                  <Store size={15} className="mt-0.5 shrink-0 text-mist-400" />
                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-mist-400">Merchant</p>
                    <p className="text-sm text-white">{alert.merchant}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 rounded-xl bg-black/20 p-3.5">
                  <MapPin size={15} className="mt-0.5 shrink-0 text-mist-400" />
                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-mist-400">Location</p>
                    <p className="text-sm text-white">{alert.location}</p>
                    <p className="text-[11px] text-mist-400">{alert.homeLocation}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 rounded-xl bg-black/20 p-3.5">
                  <Smartphone size={15} className="mt-0.5 shrink-0 text-mist-400" />
                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-mist-400">Device</p>
                    <p className="text-sm text-white">{alert.device}</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-xl border border-rose-500/20 bg-rose-500/[0.06] p-4">
                <p className="text-xs leading-relaxed text-mist-200">
                  <span className="font-semibold text-rose-300">Reason flagged: </span>
                  {alert.reason}
                </p>
              </div>

              {/* Decision */}
              {!decision ? (
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <button
                    onClick={() => setDecision("blocked")}
                    className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 px-4 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(240,84,106,0.35)] transition-transform hover:scale-[1.02]"
                  >
                    <XCircle size={16} /> Block
                  </button>
                  <button
                    onClick={() => setDecision("approved")}
                    className="flex items-center justify-center gap-2 rounded-xl glass px-4 py-3 text-sm font-semibold text-mist-100 transition-colors hover:bg-white/[0.08]"
                  >
                    <CheckCircle2 size={16} /> Approve
                  </button>
                  <button
                    onClick={handleExplain}
                    className="flex items-center justify-center gap-2 rounded-xl glass px-4 py-3 text-sm font-semibold text-mist-100 transition-colors hover:bg-white/[0.08]"
                  >
                    <MessageCircleQuestion size={16} /> Explain Decision
                  </button>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-6 flex items-center gap-3 rounded-xl p-4 ${
                    decision === "blocked" ? "bg-rose-500/10 text-rose-300" : "bg-emerald-500/10 text-emerald-300"
                  }`}
                >
                  {decision === "blocked" ? <XCircle size={18} /> : <CheckCircle2 size={18} />}
                  <p className="text-sm">
                    {decision === "blocked"
                      ? "Transaction blocked. Card temporarily frozen — a new virtual card has been issued."
                      : "Transaction approved. Fraud Guardian will monitor this merchant closely going forward."}
                  </p>
                </motion.div>
              )}

              <AnimatePresence>
                {showExplain && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-5 overflow-hidden rounded-xl border border-sbi-cyan/20 bg-sbi-cyan/[0.05] p-4"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <Sparkles size={14} className="text-sbi-cyan" />
                      <p className="text-xs font-semibold text-sbi-cyan">Fraud Guardian's Reasoning</p>
                    </div>
                    <div className="space-y-2">
                      {explanationSteps.map((step, i) => (
                        <AnimatePresence key={i}>
                          {explainStep > i && (
                            <motion.div
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="flex items-start gap-2 font-mono text-[11px] leading-relaxed text-mist-200"
                            >
                              <span className="mt-0.5 text-sbi-cyan">{`0${i + 1}`}</span>
                              <span>{step}</span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </GlassCard>
        </div>
      </section>
    </PageShell>
  );
}
