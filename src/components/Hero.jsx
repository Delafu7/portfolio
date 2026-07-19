import { useState, useRef, useEffect, useCallback } from "react";
import { useI18n } from "../i18n/LanguageContext";
import Profile from "./Profile";

const TYPING_SPEED = 28;
const LINE_DELAY = 80;

export default function Hero() {
  const { t } = useI18n();
  const [phase, setPhase] = useState("ready");
  const [lines, setLines] = useState([]);
  const [currentLine, setCurrentLine] = useState("");
  const [currentLineIdx, setCurrentLineIdx] = useState(0);
  const [currentCharIdx, setCurrentCharIdx] = useState(0);
  const termRef = useRef(null);
  const abortRef = useRef(false);

  const tests = t("hero.stressTests");

  const runTests = useCallback(() => {
    if (phase === "running") return;
    abortRef.current = false;
    setPhase("running");
    setLines([]);
    setCurrentLine("");
    setCurrentLineIdx(0);
    setCurrentCharIdx(0);
  }, [phase]);

  useEffect(() => {
    if (phase !== "running") return;
    if (currentLineIdx >= tests.length) {
      setPhase("passed");
      return;
    }

    const line = tests[currentLineIdx];
    if (currentCharIdx < line.length) {
      const timer = setTimeout(() => {
        if (abortRef.current) return;
        setCurrentLine(line.slice(0, currentCharIdx + 1));
        setCurrentCharIdx((c) => c + 1);
      }, TYPING_SPEED);
      return () => clearTimeout(timer);
    }

    const delay = setTimeout(() => {
      if (abortRef.current) return;
      setLines((prev) => [...prev, line]);
      setCurrentLine("");
      setCurrentLineIdx((i) => i + 1);
      setCurrentCharIdx(0);
    }, LINE_DELAY);
    return () => clearTimeout(delay);
  }, [phase, currentLineIdx, currentCharIdx, tests]);

  useEffect(() => {
    if (termRef.current) {
      termRef.current.scrollTop = termRef.current.scrollHeight;
    }
  }, [lines, currentLine]);

  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24">
      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.03]">
        <div className="animate-scanline absolute inset-x-0 h-32 bg-gradient-to-b from-transparent via-dracula-green to-transparent" />
      </div>

      <div className="mx-auto max-w-6xl">
        {/* Profile section */}
        <Profile />

        {/* Greeting line */}
        <p className="mb-4 mt-10 text-xs text-dracula-comment sm:text-sm">
          {t("hero.greeting")}
        </p>

        {/* Title */}
        <h1 className="mb-6 text-2xl font-bold leading-tight tracking-tight text-dracula-fg sm:text-4xl lg:text-5xl">
          {t("hero.title").split("\n").map((line, i) => (
            <span key={i} className="block">
              {i === 1 ? (
                <span className="text-dracula-green text-glow-green">{line}</span>
              ) : (
                line
              )}
            </span>
          ))}
        </h1>

        <p className="mb-10 max-w-2xl text-sm text-dracula-fg/60 sm:text-base">
          {t("hero.subtitle")}
        </p>

        {/* Health Check Widget */}
        <div className="w-full max-w-3xl overflow-hidden rounded-lg border border-dracula-current bg-dracula-bg shadow-2xl border-glow-green">
          {/* Terminal header */}
          <div className="flex items-center justify-between border-b border-dracula-current px-4 py-2">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-dracula-red" />
              <span className="h-3 w-3 rounded-full bg-dracula-yellow" />
              <span className="h-3 w-3 rounded-full bg-dracula-green" />
            </div>
            <span className="text-[10px] text-dracula-comment">
              health-check --verbose
            </span>
            <div className="w-14" />
          </div>

          {/* Terminal body */}
          <div
            ref={termRef}
            className="h-64 overflow-y-auto p-4 text-xs leading-relaxed sm:h-80 sm:text-sm"
          >
            {phase === "ready" && (
              <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                <span className="text-3xl sm:text-4xl">
                  {t("hero.statusReady")}
                </span>
                <span className="text-xs text-dracula-comment">
                  $ diagnostic-suite --target=self
                </span>
                <button
                  onClick={runTests}
                  className="mt-2 rounded border border-dracula-green bg-dracula-green/10 px-6 py-2.5 text-sm font-bold text-dracula-green transition-all hover:bg-dracula-green/20 hover:shadow-[0_0_20px_rgba(80,250,123,0.3)] active:scale-95"
                >
                  {t("hero.cta")}
                </button>
              </div>
            )}

            {phase === "running" && (
              <div>
                <p className="mb-3 text-dracula-cyan">
                  {t("hero.statusRunning")}
                </p>
                {lines.map((line, i) => (
                  <p
                    key={i}
                    className={
                      line.includes("PASSED") || line.includes("passed") || line.includes("VERIFIED")
                        ? "text-dracula-green"
                        : "text-dracula-fg/70"
                    }
                  >
                    {line}
                  </p>
                ))}
                {currentLine && (
                  <p className="text-dracula-fg/70">
                    {currentLine}
                    <span className="animate-blink ml-0.5 inline-block h-3.5 w-2 bg-dracula-green" />
                  </p>
                )}
              </div>
            )}

            {phase === "passed" && (
              <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                <div className="text-3xl text-dracula-green text-glow-green sm:text-5xl">
                  {t("hero.statusPassed")}
                </div>
                <button
                  onClick={runTests}
                  className="mt-2 rounded border border-dracula-current px-4 py-1.5 text-xs text-dracula-comment transition-all hover:border-dracula-cyan hover:text-dracula-cyan"
                >
                  Re-run diagnostics
                </button>
              </div>
            )}
          </div>

          {/* Terminal footer */}
          <div className="border-t border-dracula-current px-4 py-2 text-[10px] text-dracula-comment">
            {phase === "passed"
              ? "exit 0"
              : phase === "running"
                ? `process ${Math.round((currentLineIdx / tests.length) * 100)}%`
                : "waiting for input..."}
          </div>
        </div>
      </div>
    </section>
  );
}
