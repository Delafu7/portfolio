import { useState, useRef, useEffect, useCallback } from "react";
import { useI18n } from "../i18n/LanguageContext";

const LOG_SPEED = 55;

export default function DeployStage() {
  const { t } = useI18n();
  const [status, setStatus] = useState("healthy");
  const [logs, setLogs] = useState([]);
  const [currentLog, setCurrentLog] = useState("");
  const [logIdx, setLogIdx] = useState(0);
  const [formSent, setFormSent] = useState(false);
  const [formSending, setFormSending] = useState(false);
  const logRef = useRef(null);

  const chaosLogs = t("deploy.chaosLogs");
  const pipelineSteps = t("deploy.pipeline");

  const triggerChaos = useCallback(() => {
    if (status === "chaos") return;
    setStatus("chaos");
    setLogs([]);
    setCurrentLog("");
    setLogIdx(0);
  }, [status]);

  useEffect(() => {
    if (status !== "chaos") return;
    if (logIdx >= chaosLogs.length) {
      setTimeout(() => setStatus("healed"), 1000);
      return;
    }
    const line = chaosLogs[logIdx];
    if (currentLog.length < line.length) {
      const timer = setTimeout(() => {
        setCurrentLog(line.slice(0, currentLog.length + 1));
      }, LOG_SPEED);
      return () => clearTimeout(timer);
    }
    const delay = setTimeout(() => {
      setLogs((p) => [...p, line]);
      setCurrentLog("");
      setLogIdx((i) => i + 1);
    }, 80);
    return () => clearTimeout(delay);
  }, [status, logIdx, currentLog, chaosLogs]);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [logs, currentLog]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSending(true);
    setTimeout(() => {
      setFormSending(false);
      setFormSent(true);
    }, 1500);
  };

  const isHealthy = status === "healthy" || status === "healed";
  const statusText = status === "chaos"
    ? t("deploy.statusCritical")
    : status === "recovering"
      ? t("deploy.statusRecovering")
      : status === "healed"
        ? t("deploy.statusHealed")
        : t("deploy.statusHealthy");
  const statusColor = isHealthy ? "text-dracula-green" : "text-dracula-red";

  return (
    <section id="deploy" className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 flex items-center gap-3">
          <span className="text-xs font-bold tracking-widest text-dracula-purple">
            {t("deploy.stage")}
          </span>
          <span className="h-px flex-1 bg-dracula-current/50" />
        </div>
        <h2 className="mb-2 text-2xl font-bold text-dracula-fg sm:text-3xl">
          {t("deploy.title")}
        </h2>
        <p className="mb-4 text-sm text-dracula-comment">{t("deploy.subtitle")}</p>
        <p className="mb-12 max-w-2xl text-sm text-dracula-fg/60">
          {t("deploy.subtitleDesc")}
        </p>

        {/* Infra cards row */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Environment */}
          <div className="rounded-lg border border-dracula-current bg-dracula-current/10 p-5">
            <div className="mb-1 text-[10px] font-bold tracking-widest text-dracula-comment">
              {t("deploy.envLabel")}
            </div>
            <p className="break-all text-sm font-bold text-dracula-cyan sm:text-base">
              {t("deploy.envValue")}
            </p>
          </div>

          {/* Host */}
          <div className="rounded-lg border border-dracula-current bg-dracula-current/10 p-5">
            <div className="mb-1 text-[10px] font-bold tracking-widest text-dracula-comment">
              {t("deploy.hostLabel")}
            </div>
            <p className="text-sm font-bold text-dracula-purple sm:text-base">
              {t("deploy.hostValue")}
            </p>
          </div>

          {/* Health Status */}
          <div
            className={`rounded-lg border p-5 transition-all sm:col-span-2 lg:col-span-1 ${
              isHealthy
                ? "border-dracula-green/30 border-glow-green"
                : "border-dracula-red/50 animate-pulse-red ring-chaos"
            }`}
          >
            <div className="mb-1 text-[10px] font-bold tracking-widest text-dracula-comment">
              {t("deploy.statusLabel")}
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`inline-block h-3 w-3 rounded-full ${
                  isHealthy
                    ? "bg-dracula-green animate-pulse-dot"
                    : "bg-dracula-red animate-pulse-red"
                }`}
              />
              <span className={`text-sm font-bold sm:text-base ${statusColor}`}>
                {statusText}
              </span>
            </div>
            {status === "healed" && (
              <p className="mt-3 animate-fade-in text-xs text-dracula-green/80">
                {t("deploy.healedMessage")}
              </p>
            )}
          </div>
        </div>

        {/* Metrics */}
        <div className="mb-6 grid grid-cols-3 gap-3 sm:grid-cols-6">
          {[
            { key: "uptime", value: "99.99%", color: "text-dracula-green" },
            { key: "latency", value: "<45ms", color: "text-dracula-cyan" },
            { key: "ssl", value: "Active", color: "text-dracula-green" },
            { key: "workers", value: "3 Active", color: "text-dracula-purple" },
            { key: "buildId", value: "#7a3f2c1", color: "text-dracula-orange" },
            { key: "lastDeploy", value: "2m ago", color: "text-dracula-fg/70" },
          ].map(({ key, value, color }) => (
            <div
              key={key}
              className="rounded border border-dracula-current/50 bg-dracula-current/10 p-3 text-center"
            >
              <div className="mb-1 text-[9px] tracking-wider text-dracula-comment uppercase">
                {t(`deploy.metrics.${key}`)}
              </div>
              <div className={`text-sm font-bold ${color}`}>{value}</div>
            </div>
          ))}
        </div>

        {/* Pipeline visualization + Chaos button */}
        <div className="mb-6 grid gap-4 sm:grid-cols-[1fr_auto]">
          {/* Pipeline */}
          <div className="rounded-lg border border-dracula-current bg-dracula-current/10 p-4">
            <div className="mb-3 text-[10px] font-bold tracking-widest text-dracula-comment">
              {t("deploy.pipelineLabel")}
            </div>
            <div className="flex items-center gap-0 overflow-x-auto">
              {Array.isArray(pipelineSteps) &&
                pipelineSteps.map((step, i) => (
                  <div key={i} className="flex items-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-dracula-green/40 bg-dracula-green/10 text-[10px] font-bold text-dracula-green">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-[10px] text-dracula-fg/60">{step.step}</span>
                    </div>
                    {i < pipelineSteps.length - 1 && (
                      <span className="mx-1.5 mb-4 h-px w-6 bg-dracula-green/40 sm:w-10" />
                    )}
                  </div>
                ))}
            </div>
          </div>

          {/* Chaos button */}
          <div className="flex items-center">
            <button
              onClick={triggerChaos}
              disabled={status === "chaos"}
              className="w-full rounded border border-dracula-red/40 bg-dracula-red/5 px-5 py-4 text-xs font-bold text-dracula-red transition-all hover:bg-dracula-red/10 hover:shadow-[0_0_20px_rgba(255,85,85,0.25)] disabled:cursor-not-allowed disabled:opacity-40 active:scale-95 sm:text-sm"
            >
              <span className="block">{t("deploy.chaosBtn")}</span>
              <span className="mt-1 block text-[10px] font-normal text-dracula-red/60">
                {t("deploy.chaosSubtext")}
              </span>
            </button>
          </div>
        </div>

        {/* Chaos log stream */}
        {status === "chaos" && (
          <div className="mb-8 overflow-hidden rounded-lg border border-dracula-red/30 bg-dracula-bg">
            <div className="flex items-center gap-2 border-b border-dracula-red/20 bg-dracula-red/5 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-dracula-red animate-pulse-red" />
              <span className="text-[10px] font-bold tracking-wider text-dracula-red">
                CHAOS LOG STREAM
              </span>
            </div>
            <div
              ref={logRef}
              className="max-h-48 overflow-y-auto p-4 font-mono text-xs leading-relaxed sm:text-sm"
            >
              {logs.map((line, i) => {
                const isErr = line.includes("ALERT") || line.includes("ERROR");
                const isDone = line.includes("DONE");
                return (
                  <p
                    key={i}
                    className={
                      isErr
                        ? "text-dracula-red"
                        : isDone
                          ? "text-dracula-green"
                          : "text-dracula-orange"
                    }
                  >
                    {line}
                  </p>
                );
              })}
              {currentLog && (
                <p className="text-dracula-fg/70">
                  {currentLog}
                  <span className="animate-blink ml-0.5 inline-block h-3 w-1.5 bg-dracula-red" />
                </p>
              )}
            </div>
          </div>
        )}

        {/* Contact form */}
        <div className="rounded-lg border border-dracula-current bg-dracula-current/10 p-6 sm:p-8">
          <h3 className="mb-1 text-lg font-bold text-dracula-fg">
            {t("deploy.contactTitle")}
          </h3>
          <p className="mb-6 text-sm text-dracula-comment">
            {t("deploy.contactDesc")}
          </p>

          {formSent ? (
            <div className="rounded border border-dracula-green/30 bg-dracula-green/5 p-6 text-center border-glow-green">
              <p className="text-base font-bold text-dracula-green text-glow-green">
                {t("deploy.success")}
              </p>
              <p className="mt-1 text-xs text-dracula-fg/60">exit 0</p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder={t("deploy.name")}
                  required
                  className="rounded border border-dracula-current bg-dracula-bg/60 px-4 py-3 text-sm text-dracula-fg placeholder:text-dracula-comment/50 outline-none transition-colors focus:border-dracula-purple"
                />
                <input
                  type="email"
                  placeholder={t("deploy.email")}
                  required
                  className="rounded border border-dracula-current bg-dracula-bg/60 px-4 py-3 text-sm text-dracula-fg placeholder:text-dracula-comment/50 outline-none transition-colors focus:border-dracula-purple"
                />
              </div>
              <textarea
                placeholder={t("deploy.message")}
                required
                rows={4}
                className="resize-none rounded border border-dracula-current bg-dracula-bg/60 px-4 py-3 text-sm text-dracula-fg placeholder:text-dracula-comment/50 outline-none transition-colors focus:border-dracula-purple"
              />
              <button
                type="submit"
                disabled={formSending}
                className="self-start rounded border border-dracula-green bg-dracula-green/10 px-6 py-3 text-sm font-bold text-dracula-green transition-all hover:bg-dracula-green/20 hover:shadow-[0_0_20px_rgba(80,250,123,0.3)] disabled:opacity-50 active:scale-95"
              >
                {formSending ? t("deploy.sending") : t("deploy.send")}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
