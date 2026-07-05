import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UploadCloud,
  ScanLine,
  CheckCircle2,
  Video,
  User,
  Calendar,
  MapPin,
  Fingerprint,
} from "lucide-react";
import PageShell from "../components/ui/PageShell.jsx";
import SectionHeading from "../components/ui/SectionHeading.jsx";

const extractedFields = [
  { key: "name", label: "Full Name", value: "Ananya Sharma", icon: User },
  { key: "dob", label: "Date of Birth", value: "14 / 03 / 1998", icon: Calendar },
  { key: "aadhaar", label: "Aadhaar Number", value: "XXXX XXXX 4821", icon: Fingerprint },
  { key: "address", label: "Address", value: "House 12, Model Town, Ludhiana, Punjab - 141002", icon: MapPin },
];

const steps = ["Upload", "OCR Extraction", "Auto-fill", "Video KYC", "Complete"];

export default function OnboardingPage() {
  const [stage, setStage] = useState(0); // 0 idle, 1 uploaded, 2 scanning, 3 extracted, 4 kyc scheduled, 5 done
  const [progress, setProgress] = useState(0);
  const timeoutsRef = useRef([]);

  const startFlow = () => {
    timeoutsRef.current.forEach(clearTimeout);
    setStage(1);
    setProgress(0);

    const t1 = setTimeout(() => setStage(2), 700);
    let p = 0;
    const interval = setInterval(() => {
      p += 4;
      setProgress(Math.min(p, 100));
      if (p >= 100) clearInterval(interval);
    }, 60);
    const t2 = setTimeout(() => setStage(3), 3200);
    const t3 = setTimeout(() => setStage(4), 4400);
    const t4 = setTimeout(() => setStage(5), 5600);
    timeoutsRef.current = [t1, t2, t3, t4];
  };

  const currentStepIndex = Math.min(stage, 4);

  return (
    <PageShell>
      <section className="section">
        <SectionHeading
          eyebrow="Paperless Onboarding"
          title="From Aadhaar to account, in under a minute"
          description="The Onboarding Agent handles document capture, OCR extraction, form-filling, and KYC scheduling — with zero manual data entry."
        />

        {/* Progress stepper */}
        <div className="mx-auto mt-14 flex max-w-3xl items-center justify-between">
          {steps.map((s, i) => (
            <div key={s} className="flex flex-1 items-center">
              <div className="flex flex-col items-center gap-2">
                <motion.div
                  animate={{
                    backgroundColor: i <= currentStepIndex ? "#22D3EE" : "rgba(255,255,255,0.08)",
                    scale: i === currentStepIndex ? 1.15 : 1,
                  }}
                  className="grid h-9 w-9 place-items-center rounded-full text-xs font-bold text-ink-950"
                >
                  {i < currentStepIndex || stage === 5 ? <CheckCircle2 size={16} /> : i + 1}
                </motion.div>
                <span className={`whitespace-nowrap text-center font-mono text-[10px] uppercase tracking-wide ${i <= currentStepIndex ? "text-white" : "text-mist-400"}`}>
                  {s}
                </span>
              </div>
              {i < steps.length - 1 && (
                <motion.div
                  animate={{ backgroundColor: i < currentStepIndex ? "#22D3EE" : "rgba(255,255,255,0.08)" }}
                  className="mx-2 h-px flex-1"
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {/* Upload / Scan panel */}
          <div className="glass-card relative overflow-hidden p-8">
            <p className="eyebrow">Step 1 – 3</p>
            <h3 className="mt-2 font-display text-xl font-semibold text-white">
              Aadhaar Document Scan
            </h3>

            <div className="relative mt-8 flex aspect-[16/10] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-ink-900">
              {stage === 0 && (
                <button
                  onClick={startFlow}
                  className="flex flex-col items-center gap-3 text-mist-400 transition-colors hover:text-white"
                >
                  <div className="grid h-16 w-16 place-items-center rounded-2xl glass">
                    <UploadCloud size={26} />
                  </div>
                  <span className="text-sm font-medium">Click to upload Aadhaar card</span>
                  <span className="text-xs text-mist-400">JPG, PNG or PDF · Max 5MB</span>
                </button>
              )}

              {stage >= 1 && (
                <div className="relative h-full w-full">
                  {/* Mock ID card */}
                  <div className="absolute inset-6 rounded-xl bg-gradient-to-br from-mist-200 to-mist-100 p-4 shadow-lg">
                    <div className="flex h-full gap-4">
                      <div className="h-full w-16 rounded-lg bg-ink-700/20" />
                      <div className="flex-1 space-y-2 pt-1">
                        <div className="h-2.5 w-3/4 rounded bg-ink-700/30" />
                        <div className="h-2 w-1/2 rounded bg-ink-700/20" />
                        <div className="h-2 w-full rounded bg-ink-700/20" />
                        <div className="h-2 w-2/3 rounded bg-ink-700/20" />
                        <div className="mt-4 h-2 w-1/3 rounded bg-ink-700/25" />
                      </div>
                    </div>
                  </div>

                  {/* Scanning line */}
                  {stage === 2 && (
                    <motion.div
                      initial={{ top: "6%" }}
                      animate={{ top: "94%" }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
                      className="absolute left-6 right-6 h-0.5 bg-sbi-cyan shadow-[0_0_16px_4px_rgba(34,211,238,0.6)]"
                    />
                  )}

                  {stage === 2 && (
                    <div className="absolute inset-x-0 bottom-3 flex flex-col items-center gap-2">
                      <div className="flex items-center gap-2 rounded-full bg-ink-950/80 px-3 py-1">
                        <ScanLine size={12} className="text-sbi-cyan" />
                        <span className="font-mono text-[10px] text-mist-200">
                          Extracting fields… {progress}%
                        </span>
                      </div>
                      <div className="h-1 w-2/3 overflow-hidden rounded-full bg-white/10">
                        <motion.div
                          className="h-full bg-gradient-to-r from-sbi-blue to-sbi-cyan"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {stage >= 3 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-x-0 bottom-3 flex justify-center"
                    >
                      <div className="flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 text-emerald-300">
                        <CheckCircle2 size={13} />
                        <span className="font-mono text-[10px]">Extraction complete</span>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </div>

            {stage >= 4 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 flex items-center gap-4 rounded-2xl border border-sbi-violet/30 bg-sbi-violet/[0.08] p-4"
              >
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-sbi-violet/20 text-sbi-violet">
                  <Video size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Video KYC scheduled</p>
                  <p className="text-xs text-mist-400">Today, 4:30 PM with agent Rohit Verma — link sent via SMS &amp; email.</p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Auto-filled form */}
          <div className="glass-card p-8">
            <p className="eyebrow">Auto-generated</p>
            <h3 className="mt-2 font-display text-xl font-semibold text-white">
              Application Form
            </h3>
            <div className="mt-8 space-y-4">
              {extractedFields.map((field, i) => (
                <div key={field.key}>
                  <label className="mb-1.5 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wide text-mist-400">
                    <field.icon size={11} /> {field.label}
                  </label>
                  <div className="relative overflow-hidden rounded-xl border border-white/10 bg-ink-900/60 px-4 py-3">
                    <AnimatePresence>
                      {stage >= 3 ? (
                        <motion.p
                          key="filled"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.12 }}
                          className="text-sm text-white"
                        >
                          {field.value}
                        </motion.p>
                      ) : (
                        <motion.p key="empty" exit={{ opacity: 0 }} className="text-sm text-mist-400/50">
                          Waiting for document scan…
                        </motion.p>
                      )}
                    </AnimatePresence>
                    {stage >= 3 && (
                      <motion.div
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0 }}
                        transition={{ delay: i * 0.12 + 0.4, duration: 0.3 }}
                        className="absolute inset-0 bg-gradient-to-r from-sbi-cyan/20 to-transparent"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <AnimatePresence>
              {stage === 5 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4"
                >
                  <CheckCircle2 size={20} className="shrink-0 text-emerald-400" />
                  <div>
                    <p className="text-sm font-semibold text-white">Application submitted</p>
                    <p className="text-xs text-mist-400">Account number will be issued instantly after Video KYC.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {stage === 0 && (
              <p className="mt-8 text-sm text-mist-400">
                Upload your Aadhaar to see LifePilot auto-fill this form live.
              </p>
            )}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
