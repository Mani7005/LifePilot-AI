import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Activity, X } from "lucide-react";
import PageShell from "../components/ui/PageShell.jsx";
import SectionHeading from "../components/ui/SectionHeading.jsx";
import AgentCard from "../components/ui/AgentCard.jsx";
import { agents } from "../data/mockData.js";

const topRow = agents.slice(0, 3);
const bottomRow = agents.slice(3, 6);

function Connector({ flip = false }) {
  return (
    <div className="relative mx-auto hidden h-14 w-px lg:block">
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-white/5" />
      <motion.span
        className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-sbi-cyan shadow-[0_0_8px_2px_rgba(34,211,238,0.6)]"
        animate={{ top: flip ? ["100%", "0%"] : ["0%", "100%"] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

export default function AgentDashboard() {
  const [selected, setSelected] = useState(null);

  return (
    <PageShell>
      <section className="section">
        <SectionHeading
          eyebrow="Agentic AI, Visualized"
          title="Six Agents. One Brain. Zero Idle Time."
          description="Every agent operates autonomously, but nothing happens in isolation — insights flow continuously into the LifePilot Brain and back out again."
        />

        <div className="mx-auto mt-16 max-w-6xl">
          {/* Top row of agents */}
          <div className="grid gap-5 sm:grid-cols-3">
            {topRow.map((agent, i) => (
              <AgentCard key={agent.id} agent={agent} delay={i * 0.08} onSelect={setSelected} selected={selected?.id === agent.id} />
            ))}
          </div>

          {/* Connectors down to brain */}
          <div className="grid grid-cols-3 justify-items-center">
            <Connector />
            <div />
            <Connector />
          </div>

          {/* Brain */}
          <div className="flex justify-center">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
              className="relative grid h-36 w-36 place-items-center rounded-full bg-gradient-to-br from-sbi-blue via-sbi-violet to-sbi-cyan shadow-glow-blue sm:h-40 sm:w-40"
            >
              <div className="absolute inset-0 animate-pulse-glow rounded-full bg-white/20 blur-2xl" />
              <div className="relative text-center">
                <Brain size={28} className="mx-auto mb-1.5 text-white" strokeWidth={1.6} />
                <p className="font-display text-sm font-bold text-white">LifePilot</p>
                <p className="font-mono text-[9px] uppercase tracking-wider text-white/80">Brain</p>
              </div>
            </motion.div>
          </div>

          {/* Connectors down to bottom row */}
          <div className="grid grid-cols-3 justify-items-center">
            <Connector flip />
            <div />
            <Connector flip />
          </div>

          {/* Bottom row of agents */}
          <div className="grid gap-5 sm:grid-cols-3">
            {bottomRow.map((agent, i) => (
              <AgentCard key={agent.id} agent={agent} delay={0.3 + i * 0.08} onSelect={setSelected} selected={selected?.id === agent.id} />
            ))}
          </div>
        </div>

        {/* Detail drawer */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="glass-card fixed bottom-6 left-1/2 z-40 w-[92%] max-w-xl -translate-x-1/2 border-white/20 p-6 shadow-2xl"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="grid h-10 w-10 place-items-center rounded-xl"
                    style={{ background: `${selected.color}22`, color: selected.color }}
                  >
                    <Activity size={18} />
                  </div>
                  <div>
                    <p className="font-display text-sm font-semibold text-white">{selected.name}</p>
                    <p className="text-xs text-mist-400">{selected.role}</p>
                  </div>
                </div>
                <button onClick={() => setSelected(null)} className="text-mist-400 hover:text-white">
                  <X size={18} />
                </button>
              </div>
              <div className="mt-4 space-y-2">
                {selected.logs.map((log, i) => (
                  <div key={i} className="flex items-start gap-2 rounded-lg bg-black/20 p-2.5">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-sbi-cyan" />
                    <p className="font-mono text-[11px] leading-relaxed text-mist-200">{log}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </PageShell>
  );
}

