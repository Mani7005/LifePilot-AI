import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";

const links = [
  { to: "/journey", label: "AI Journey" },
  { to: "/agents", label: "Agent Dashboard" },
  { to: "/onboarding", label: "Onboarding" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/goal-planner", label: "Goal Planner" },
  { to: "/fraud-guardian", label: "Fraud Guardian" },
  { to: "/about-agentic-ai", label: "About" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-ink-950/80 backdrop-blur-xl border-b border-white/[0.06]" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sbi-blue to-sbi-cyan shadow-glow-blue transition-transform group-hover:scale-105">
            <Sparkles size={18} className="text-white" strokeWidth={2.5} />
          </div>
          <div className="leading-tight">
            <p className="font-display text-[15px] font-semibold text-white">
              SBI LifePilot <span className="gradient-text">AI</span>
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `rounded-lg px-3.5 py-2 text-[13.5px] font-medium transition-colors ${
                  isActive
                    ? "bg-white/[0.06] text-white"
                    : "text-mist-400 hover:text-white hover:bg-white/[0.04]"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden lg:block">
          <Link to="/get-started" className="btn-primary !px-5 !py-2.5 !text-sm">
            Launch LifePilot
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="grid h-10 w-10 place-items-center rounded-xl glass text-white lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-white/[0.06] bg-ink-950/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `rounded-lg px-3.5 py-2.5 text-sm font-medium ${
                      isActive ? "bg-white/[0.06] text-white" : "text-mist-400"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <Link
                to="/get-started"
                onClick={() => setOpen(false)}
                className="btn-primary mt-2 !text-sm"
              >
                Launch LifePilot
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
