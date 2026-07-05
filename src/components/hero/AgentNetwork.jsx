import { motion } from "framer-motion";
import {
  Wallet,
  ShieldCheck,
  TrendingUp,
  Landmark,
  CreditCard,
  PiggyBank,
} from "lucide-react";

const nodes = [
  { icon: Wallet, label: "Savings", angle: 0 },
  { icon: TrendingUp, label: "Investments", angle: 60 },
  { icon: ShieldCheck, label: "Insurance", angle: 120 },
  { icon: Landmark, label: "Loans", angle: 180 },
  { icon: CreditCard, label: "Cards", angle: 240 },
  { icon: PiggyBank, label: "Goals", angle: 300 },
];

const RADIUS = 200;

function polar(angle, radius) {
  const rad = (angle * Math.PI) / 180;
  return {
    x: Math.cos(rad) * radius,
    y: Math.sin(rad) * radius,
  };
}

export default function AgentNetwork() {
  return (
    <div className="relative mx-auto h-[460px] w-[460px] max-w-full sm:h-[520px] sm:w-[520px]">
      {/* Ambient glow */}
      <div className="absolute inset-0 rounded-full bg-sbi-blue/20 blur-[100px]" />

      {/* Orbit rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-[340px] w-[340px] rounded-full border border-white/[0.06] sm:h-[400px] sm:w-[400px]" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center animate-spin-slower">
        <div className="h-[300px] w-[300px] rounded-full border border-dashed border-sbi-cyan/20 sm:h-[360px] sm:w-[360px]" />
      </div>

      {/* Floating particles */}
      {Array.from({ length: 14 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-sbi-cyan/70"
          style={{
            top: `${(i * 37) % 100}%`,
            left: `${(i * 61) % 100}%`,
          }}
          animate={{
            y: [0, -18, 0],
            opacity: [0.2, 0.9, 0.2],
          }}
          transition={{
            duration: 3 + (i % 5),
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Connection lines (SVG) */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="-250 -250 500 500"
        fill="none"
      >
        {nodes.map((n, i) => {
          const p = polar(n.angle, RADIUS * 0.78);
          return (
            <motion.line
              key={i}
              x1="0"
              y1="0"
              x2={p.x}
              y2={p.y}
              stroke="url(#lineGrad)"
              strokeWidth="1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 1.2, delay: 0.3 + i * 0.1 }}
            />
          );
        })}
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0D47F0" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {/* traveling pulse dots */}
        {nodes.map((n, i) => {
          const p = polar(n.angle, RADIUS * 0.78);
          return (
            <motion.circle
              key={`pulse-${i}`}
              r="3"
              fill="#22D3EE"
              initial={{ cx: 0, cy: 0, opacity: 0 }}
              animate={{
                cx: [0, p.x],
                cy: [0, p.y],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.35,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </svg>

      {/* Orbiting nodes */}
      {nodes.map((n, i) => {
        const p = polar(n.angle, RADIUS * 0.78);
        const Icon = n.icon;
        return (
          <motion.div
            key={n.label}
            className="absolute left-1/2 top-1/2 flex flex-col items-center gap-2"
            style={{ x: p.x - 28, y: p.y - 28 }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
          >
            <motion.div
              className="grid h-14 w-14 place-items-center rounded-2xl glass shadow-glow"
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 4 + i * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
            >
              <Icon size={20} className="text-sbi-cyan" strokeWidth={1.8} />
            </motion.div>
            <span className="whitespace-nowrap rounded-full bg-ink-900/80 px-2.5 py-0.5 font-mono text-[10px] text-mist-300">
              {n.label}
            </span>
          </motion.div>
        );
      })}

      {/* Core */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="relative grid h-28 w-28 place-items-center rounded-full bg-gradient-to-br from-sbi-blue via-sbi-violet to-sbi-cyan shadow-glow-blue sm:h-32 sm:w-32"
        >
          <div className="absolute inset-0 animate-pulse-glow rounded-full bg-white/20 blur-xl" />
          <div className="relative text-center">
            <p className="font-display text-[13px] font-bold leading-tight text-white">
              LifePilot
            </p>
            <p className="font-mono text-[9px] uppercase tracking-wider text-white/80">
              AI Core
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
