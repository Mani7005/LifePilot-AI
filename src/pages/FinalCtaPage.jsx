import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Rocket, CheckCircle2 } from "lucide-react";
import PageShell from "../components/ui/PageShell.jsx";

export default function FinalCtaPage() {
  const [launched, setLaunched] = useState(false);

  return (
    <PageShell>
      <section className="section flex min-h-[70vh] items-center justify-center">
        <div className="relative w-full overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-ink-800 via-ink-850 to-ink-900 p-12 text-center shadow-card sm:p-20">
          <div className="absolute inset-0 bg-aurora opacity-70" />
          <div className="pointer-events-none absolute inset-0">
            {Array.from({ length: 10 }).map((_, i) => (
              <motion.span
                key={i}
                className="absolute h-1 w-1 rounded-full bg-sbi-cyan/70"
                style={{ top: `${(i * 23) % 100}%`, left: `${(i * 47) % 100}%` }}
                animate={{ opacity: [0.2, 0.8, 0.2], y: [0, -12, 0] }}
                transition={{ duration: 3 + (i % 4), repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <p className="eyebrow mb-5">The Journey Starts Now</p>
            <h1 className="mx-auto max-w-2xl text-balance font-display text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Ready to experience autonomous banking?
            </h1>
            <p className="mx-auto mt-5 max-w-lg text-balance text-mist-400">
              Six agents. One brain. Zero waiting. Launch LifePilot and let it
              start observing, reasoning, and acting on your behalf.
            </p>

            <div className="mt-10 flex justify-center">
              {!launched ? (
                <button onClick={() => setLaunched(true)} className="btn-primary !px-9 !py-4 !text-base">
                  <Rocket size={19} /> Launch LifePilot
                </button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-6 py-4"
                >
                  <CheckCircle2 size={20} className="text-emerald-400" />
                  <div className="text-left">
                    <p className="text-sm font-semibold text-white">LifePilot is now active</p>
                    <p className="text-xs text-mist-400">Your agents are already observing your first events.</p>
                  </div>
                </motion.div>
              )}
            </div>

            {launched && (
              <div className="mt-8">
                <Link to="/dashboard" className="text-sm font-medium text-sbi-cyan hover:underline">
                  Go to your dashboard →
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </PageShell>
  );
}
