import { useState, useRef, useEffect, useCallback } from "react";
import { useI18n } from "../i18n/LanguageContext";

const CHAR_SPEED = 18;
const LINE_PAUSE = 120;

export default function QATestStage() {
  const { t } = useI18n();
  const [phase, setPhase] = useState("idle");
  const [results, setResults] = useState([]);
  const [currentText, setCurrentText] = useState("");
  const [testIdx, setTestIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const logRef = useRef(null);

  const tests = t("qa.tests");
  const passedCount = results.filter((r) => r.passed).length;

  const runTests = useCallback(() => {
    if (phase === "running") return;
    setPhase("running");
    setResults([]);
    setCurrentText("");
    setTestIdx(0);
    setCharIdx(0);
    setShowSummary(false);
  }, [phase]);

  useEffect(() => {
    if (phase !== "running") return;
    if (testIdx >= tests.length) {
      setTimeout(() => setShowSummary(true), 400);
      setPhase("passed");
      return;
    }

    const test = tests[testIdx];
    const line = `\u2713 ${test.id}: ${test.name} ... PASSED`;
    if (charIdx < line.length) {
      const timer = setTimeout(() => {
        setCurrentText(line.slice(0, charIdx + 1));
        setCharIdx((c) => c + 1);
      }, CHAR_SPEED);
      return () => clearTimeout(timer);
    }

    const delay = setTimeout(() => {
      setResults((prev) => [...prev, { ...test, passed: true, text: line }]);
      setCurrentText("");
      setTestIdx((i) => i + 1);
      setCharIdx(0);
    }, LINE_PAUSE);
    return () => clearTimeout(delay);
  }, [phase, testIdx, charIdx, tests]);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [results, currentText]);

  const getLayerBadge = (layer) => {
    const colors = {
      Unit: "border-dracula-green/40 text-dracula-green bg-dracula-green/10",
      Integration: "border-dracula-cyan/40 text-dracula-cyan bg-dracula-cyan/10",
      E2E: "border-dracula-purple/40 text-dracula-purple bg-dracula-purple/10",
    };
    return colors[layer] || colors.Unit;
  };

  const getSuiteTag = (suite) => {
    const colors = {
      jest: "text-dracula-red",
      pytest: "text-dracula-blue",
      cypress: "text-dracula-green",
    };
    return colors[suite] || "text-dracula-fg/50";
  };

  return (
    <section id="qa" className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 flex items-center gap-3">
          <span className="text-xs font-bold tracking-widest text-dracula-purple">
            {t("qa.stage")}
          </span>
          <span className="h-px flex-1 bg-dracula-current/50" />
        </div>
        <h2 className="mb-2 text-2xl font-bold text-dracula-fg sm:text-3xl">
          {t("qa.title")}
        </h2>
        <p className="mb-4 text-sm text-dracula-comment">{t("qa.subtitle")}</p>
        <p className="mb-12 max-w-2xl text-sm text-dracula-fg/60">
          {t("qa.subtitleDesc")}
        </p>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          {/* Left: Test config panel */}
          <div className="flex flex-col gap-4">
            <div className="rounded-lg border border-dracula-current bg-dracula-current/10 p-5">
              <h3 className="mb-2 text-sm font-bold text-dracula-purple">
                {t("qa.runnerTitle")}
              </h3>
              <p className="mb-5 text-xs leading-relaxed text-dracula-fg/50">
                {t("qa.runnerDesc")}
              </p>

              <button
                onClick={runTests}
                disabled={phase === "running"}
                className="w-full rounded border border-dracula-green bg-dracula-green/10 px-4 py-3 text-sm font-bold text-dracula-green transition-all hover:bg-dracula-green/20 hover:shadow-[0_0_20px_rgba(80,250,123,0.3)] disabled:cursor-not-allowed disabled:opacity-40 active:scale-95"
              >
                {phase === "running" ? t("qa.executing") : t("qa.executeBtn")}
              </button>
            </div>

            {/* Test layer legend */}
            <div className="rounded-lg border border-dracula-current bg-dracula-current/10 p-4">
              <div className="mb-3 text-[10px] font-bold tracking-widest text-dracula-comment uppercase">
                Test Layers
              </div>
              <div className="flex flex-col gap-2">
                {["Unit", "Integration", "E2E"].map((layer) => (
                  <div key={layer} className="flex items-center gap-2">
                    <span
                      className={`inline-block rounded border px-2 py-0.5 text-[10px] font-bold ${getLayerBadge(layer)}`}
                    >
                      {t(`qa.layers.${layer.toLowerCase()}`)}
                    </span>
                    <span className="text-[10px] text-dracula-comment">
                      {layer === "Unit" && "jest --coverage"}
                      {layer === "Integration" && "pytest -v"}
                      {layer === "E2E" && "cypress run"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary card */}
            {showSummary && (
              <div className="animate-fade-in rounded-lg border border-dracula-green/30 bg-dracula-green/5 p-5 border-glow-green">
                <div className="mb-2 flex items-center gap-2">
                  <span className="inline-block h-3 w-3 rounded-full bg-dracula-green animate-pulse-dot" />
                  <span className="text-sm font-bold text-dracula-green text-glow-green">
                    {t("qa.passed")}
                  </span>
                </div>
                <div className="flex flex-col gap-1 text-xs text-dracula-fg/70">
                  <span>
                    <span className="text-dracula-comment">{t("qa.summaryPrefix")}:</span>{" "}
                    <span className="text-dracula-green">{passedCount}</span> passed,{" "}
                    <span className="text-dracula-green">0</span> failed
                  </span>
                  <span>
                    <span className="text-dracula-comment">{t("qa.coverage")}:</span>{" "}
                    <span className="font-bold text-dracula-cyan">98.4%</span>
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Right: Terminal log */}
          <div className="overflow-hidden rounded-lg border border-dracula-current bg-dracula-bg shadow-2xl">
            <div className="flex items-center justify-between border-b border-dracula-current px-4 py-2">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-dracula-red" />
                <span className="h-3 w-3 rounded-full bg-dracula-yellow" />
                <span className="h-3 w-3 rounded-full bg-dracula-green" />
              </div>
              <span className="text-[10px] text-dracula-comment">
                {t("qa.runnerHeader")}
              </span>
              <div className="w-14" />
            </div>

            <div
              ref={logRef}
              className="h-72 overflow-y-auto p-4 font-mono text-xs leading-relaxed sm:h-96 sm:text-sm"
            >
              {phase === "idle" && (
                <p className="text-dracula-comment">{t("qa.idle")}</p>
              )}

              {phase !== "idle" && (
                <>
                  <p className="mb-2 text-dracula-cyan">
                    {t("qa.running")}
                  </p>
                  <p className="mb-1 text-dracula-fg/40">
                    {`$ npx ${tests[0]?.suite || "jest"} --ci --verbose`}
                  </p>
                  <p className="mb-4 text-dracula-fg/40">
                    {"=".repeat(48)}
                  </p>

                  {results.map((r, i) => (
                    <div
                      key={i}
                      className="animate-fade-in mb-1 flex flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-2"
                    >
                      <span className="text-dracula-green whitespace-nowrap">
                        {r.text}
                      </span>
                      <span className="hidden sm:inline">&nbsp;</span>
                      <span
                        className={`inline-block w-fit rounded border px-1.5 py-0 text-[9px] font-bold ${getLayerBadge(r.layer)}`}
                      >
                        {r.layer}
                      </span>
                      <span
                        className={`hidden text-[9px] sm:inline ${getSuiteTag(r.suite)}`}
                      >
                        [{r.suite}]
                      </span>
                    </div>
                  ))}

                  {currentText && (
                    <p className="text-dracula-fg/70">
                      {currentText}
                      <span className="animate-blink ml-0.5 inline-block h-3.5 w-1.5 bg-dracula-green" />
                    </p>
                  )}

                  {showSummary && (
                    <div className="mt-4 border-t border-dracula-current/50 pt-4">
                      <p className="text-dracula-fg/40">
                        {"=".repeat(48)}
                      </p>
                      <p className="mt-2 text-dracula-green font-bold">
                        {t("qa.summaryPrefix")}: {passedCount} passed, 0 failed
                      </p>
                      <p className="text-dracula-cyan">
                        {t("qa.coverage")}: 98.4% statements | 97.1% branches | 99.2% functions
                      </p>
                      <p className="mt-2 text-dracula-fg/40">
                        {`Tests:   ${passedCount} total`}
                      </p>
                      <p className="text-dracula-fg/40">
                        {"Time:   4.732s"}
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="border-t border-dracula-current px-4 py-2 text-[10px] text-dracula-comment">
              {phase === "passed"
                ? "exit 0"
                : phase === "running"
                  ? `executing ${Math.round(((testIdx + charIdx / (tests[testIdx] ? `\u2713 ${tests[testIdx].id}: ${tests[testIdx].name} ... PASSED`.length : 1)) / tests.length) * 100)}%`
                  : "waiting for command..."}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
