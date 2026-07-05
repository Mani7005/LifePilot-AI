import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, CheckCircle2, Sparkles } from "lucide-react";

const tagColors = {
  Safety: "bg-emerald-500/15 text-emerald-300",
  Grow: "bg-sbi-cyan/15 text-sbi-cyan",
  Protect: "bg-sbi-violet/15 text-sbi-violet",
  Optimize: "bg-sbi-gold/15 text-sbi-gold",
  Access: "bg-sbi-blue/15 text-blue-300",
};

export default function RecommendationCard({ rec, delay = 0 }) {
  const [open, setOpen] = useState(false);
  const [accepted, setAccepted] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay }}
      className="glass-card p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-sbi-blue/15 text-sbi-cyan">
            <Sparkles size={16} />
          </div>
          <div>
            <span className={`mb-1.5 inline-block rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide ${tagColors[rec.tag]}`}>
              {rec.tag}
            </span>
            <h3 className="font-display text-base font-semibold text-white">{rec.title}</h3>
          </div>
        </div>
      </div>

      <button
        onClick={() => setOpen(!open)}
        className="mt-4 flex items-center gap-1.5 text-xs font-medium text-mist-300 hover:text-white"
      >
        Why this? <ChevronDown size={13} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-3 space-y-2 rounded-xl bg-black/20 p-3.5">
              <p className="text-xs leading-relaxed text-mist-300">
                <span className="font-semibold text-mist-100">Why: </span>
                {rec.why}
              </p>
              <p className="text-xs leading-relaxed text-mist-300">
                <span className="font-semibold text-mist-100">Expected benefit: </span>
                {rec.benefit}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setAccepted(true)}
        disabled={accepted}
        className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
          accepted
            ? "bg-emerald-500/15 text-emerald-300"
            : "bg-gradient-to-r from-sbi-blue to-sbi-cyan text-white shadow-glow-blue hover:scale-[1.02] active:scale-[0.98]"
        }`}
      >
        {accepted ? (
          <>
            <CheckCircle2 size={15} /> Accepted
          </>
        ) : (
          rec.cta
        )}
      </button>
    </motion.div>
  );
}
