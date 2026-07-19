import { useState } from "react";
import { useI18n } from "../i18n/LanguageContext";

const PIPELINE_STAGES = [
  { key: "about", id: "about" },
  { key: "artifacts", id: "projects" },
  { key: "qa", id: "qa" },
  { key: "deploy", id: "deploy" },
];

export default function Navbar() {
  const { lang, toggleLanguage, t } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-dracula-current/50 bg-dracula-bg/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group flex items-center gap-2"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-dracula-green animate-pulse-dot" />
          <span className="text-sm font-bold tracking-wider text-dracula-purple">
            ~/{t("nav.build").toLowerCase()}
          </span>
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {PIPELINE_STAGES.map((stage, i) => (
            <div key={stage.key} className="flex items-center">
              {i > 0 && (
                <span className="mx-1 text-xs text-dracula-comment select-none">
                  &rarr;
                </span>
              )}
              <button
                onClick={() => scrollTo(stage.id)}
                className="rounded px-3 py-1.5 text-xs font-medium text-dracula-fg/70 transition-all hover:bg-dracula-current/50 hover:text-dracula-green"
              >
                {t(`nav.${stage.key}`)}
              </button>
            </div>
          ))}
          <span className="ml-3 h-2 w-2 rounded-full bg-dracula-green/30" />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 rounded border border-dracula-current px-2.5 py-1 text-xs font-bold tracking-wider text-dracula-cyan transition-all hover:border-dracula-cyan hover:text-glow-cyan"
            title={lang === "en" ? "Cambiar a Espanol" : "Switch to English"}
          >
            {lang === "en" ? "ES" : "EN"}
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex flex-col gap-1 md:hidden"
            aria-label="Menu"
          >
            <span
              className={`block h-0.5 w-5 bg-dracula-fg transition-transform ${mobileOpen ? "translate-y-1.5 rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-dracula-fg transition-opacity ${mobileOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-dracula-fg transition-transform ${mobileOpen ? "-translate-y-1.5 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-dracula-current/50 bg-dracula-bg/95 backdrop-blur-md md:hidden">
          <div className="flex flex-col gap-1 px-4 py-3">
            {PIPELINE_STAGES.map((stage) => (
              <button
                key={stage.key}
                onClick={() => scrollTo(stage.id)}
                className="rounded px-3 py-2 text-left text-sm text-dracula-fg/70 transition-all hover:bg-dracula-current/50 hover:text-dracula-green"
              >
                <span className="mr-2 text-dracula-comment">
                  {PIPELINE_STAGES.indexOf(stage) + 1}.
                </span>
                {t(`nav.${stage.key}`)}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
