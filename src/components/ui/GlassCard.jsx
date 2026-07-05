import { motion } from "framer-motion";

export default function GlassCard({
  children,
  className = "",
  hover = true,
  delay = 0,
  as: Component = motion.div,
}) {
  return (
    <Component
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`glass-card p-6 ${
        hover ? "transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]" : ""
      } ${className}`}
    >
      {children}
    </Component>
  );
}
