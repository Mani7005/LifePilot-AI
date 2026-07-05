import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserPlus,
  ClipboardCheck,
  GraduationCap,
  Sparkles as SparklesIcon,
  ShieldAlert,
  Users,
} from "lucide-react";

const iconMap = {
  acquisition: UserPlus,
  onboarding: ClipboardCheck,
  coach: GraduationCap,
  recommendation: SparklesIcon,
  fraud: ShieldAlert,
  relationship: Users,
};

const statusStyles = {
  active: { label: "Active", dot: "bg-emerald-400", text: "text-emerald-300" },
  thinking: { label: "Thinking", dot: "bg-sbi-gold", text: "text-sbi-gold" },
  alert: { label: "Alert", dot: "bg-rose-400", text: "text-rose-300" },
};

export default function AgentCard({ agent, delay = 0, onSelect, selected }) {
  const [logIndex, setLogIndex] = useState(0);
  const Icon = iconMap[agent.id] || SparklesIcon;
  const status = statusStyles[agent.status];

  useEffect(() => {
    const interval = setInterval(() => {
      setLogIndex((i) => (i + 1) % agent.logs.length);
    }, 3200 + delay * 1000);
    return () => clearInterval(interval);
  }, [agent.logs.length, delay]);

  return (
    <motion.button
      onClick={() => onSelect?.(agent)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay }}
      className={`glass-card group relative w-full overflow-hidden p-6 text-left transition-all duration-300 hover:border-white/20 ${
        selected ? "border-sbi-cyan/50 bg-white/[0.06]" : ""
      }`}
    >
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-20 blur-3xl transition-opacity group-hover:opacity-30"
        style={{ background: agent.color }}
      />

      <div className="flex items-start justify-between">
        <div
          className="grid h-12 w-12 place-items-center rounded-2xl"
          style={{ background: `${agent.color}22`, color: agent.color }}
        >
          <Icon size={20} strokeWidth={1.8} />
        </div>
        <div className={`flex items-center gap-1.5 rounded-full glass px-2.5 py-1 ${status.text}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${status.dot} ${agent.status !== "active" ? "animate-pulse" : ""}`} />
          <span className="font-mono text-[10px] uppercase tracking-wide">
            {status.label}
          </span>
        </div>
      </div>

      <h3 className="mt-5 font-display text-base font-semibold text-white">
        {agent.name}
      </h3>
      <p className="mt-1 text-xs leading-relaxed text-mist-400">{agent.role}</p>

      <div className="mt-5 min-h-[52px] rounded-xl bg-black/20 p-3">
        <p className="mb-1.5 font-mono text-[9px] uppercase tracking-widest text-mist-400">
          Activity Log
        </p>
        <AnimatePresence mode="wait">
          <motion.p
            key={logIndex}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="font-mono text-[11px] leading-snug text-mist-200"
          >
            {agent.logs[logIndex]}
          </motion.p>
        </AnimatePresence>
      </div>
    </motion.button>
  );
}
