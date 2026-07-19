import { useState } from "react";
import { useI18n } from "../i18n/LanguageContext";

const REPO_META = [
  {
    name: "Loresmith",
    repoUrl: "https://github.com/Delafu7/Loresmith",
    updated: "Jul 2026",
    tags: ["TypeScript", "WebSockets", "Real-time", "Monorepo"],
    flagship: true,
  },
  {
    name: "ProyectoAS",
    repoUrl: "https://github.com/Delafu7/ProyectoAS",
    updated: "Jul 2026",
    tags: ["Docker", "Kubernetes", "MySQL", "Redis"],
  },
  {
    name: "TetrisGame",
    repoUrl: "https://github.com/Delafu7/TetrisGame",
    updated: "Sep 2025",
    tags: ["Python", "Pygame", "Game Dev"],
  },
  {
    name: "R2D2_IA",
    repoUrl: "https://github.com/Delafu7/R2D2_IA",
    updated: "Oct 2025",
    tags: ["Python", "Flask", "AI/Robotics"],
  },
];

export default function Projects() {
  const { t } = useI18n();
  const items = t("projects.items");
  const [openSet, setOpenSet] = useState(() => new Set([0]));

  const toggle = (i) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(i)) {
        next.delete(i);
      } else {
        next.add(i);
      }
      return next;
    });
  };

  return (
    <section id="projects" className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex items-center gap-3">
          <span className="text-xs font-bold tracking-widest text-dracula-purple">
            {t("projects.stage")}
          </span>
          <span className="h-px flex-1 bg-dracula-current/50" />
        </div>

        <h2 className="mb-2 text-2xl font-bold text-dracula-fg sm:text-3xl">
          {t("projects.title")}
        </h2>
        <p className="mb-4 text-sm text-dracula-comment">{t("projects.subtitle")}</p>
        <p className="mb-12 text-sm text-dracula-fg/60">
          {t("projects.subtitleDesc")}
        </p>

        {/* Registry terminal panel */}
        <div className="overflow-hidden rounded-lg border border-dracula-current bg-dracula-bg shadow-2xl">
          <div className="flex items-center justify-between border-b border-dracula-current px-4 py-2">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-dracula-red" />
              <span className="h-3 w-3 rounded-full bg-dracula-yellow" />
              <span className="h-3 w-3 rounded-full bg-dracula-green" />
            </div>
            <span className="hidden text-[10px] text-dracula-comment sm:block">
              {t("projects.registryCmd")}
            </span>
            <div className="w-14 sm:w-auto" />
          </div>

          <div className="divide-y divide-dracula-current/50">
            {Array.isArray(items) &&
              items.map((item, i) => {
                const meta = REPO_META[i];
                if (!meta) return null;
                const isOpen = openSet.has(i);
                return (
                  <div key={meta.name}>
                    {/* Row header */}
                    <button
                      onClick={() => toggle(i)}
                      aria-expanded={isOpen}
                      className="group flex w-full items-center gap-3 px-4 py-4 text-left transition-colors hover:bg-dracula-current/10 sm:gap-4 sm:px-5"
                    >
                      <span className="flex h-2.5 w-2.5 shrink-0 items-center justify-center">
                        <span className="h-2 w-2 rounded-full bg-dracula-green animate-pulse-dot" />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                          <span className="font-bold text-dracula-fg group-hover:text-dracula-green transition-colors">
                            {meta.name}
                          </span>
                          {meta.flagship && (
                            <span className="rounded border border-dracula-purple/40 bg-dracula-purple/10 px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-dracula-purple">
                              FLAGSHIP
                            </span>
                          )}
                        </span>
                        <span className="mt-0.5 hidden text-[10px] text-dracula-comment sm:block">
                          {t("projects.updatedLabel")}: {meta.updated}
                        </span>
                      </span>

                      <span className="hidden shrink-0 gap-1.5 sm:flex">
                        {meta.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="rounded bg-dracula-current/40 px-2 py-0.5 text-[10px] text-dracula-fg/60"
                          >
                            {tag}
                          </span>
                        ))}
                      </span>

                      <svg
                        className={`h-4 w-4 shrink-0 text-dracula-comment transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Expandable manifest */}
                    <div
                      className="grid transition-[grid-template-rows] duration-300 ease-out"
                      style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                    >
                      <div className="overflow-hidden">
                        <div className="px-4 pb-5 pl-[2.375rem] sm:px-5 sm:pl-[3.25rem]">
                          <p className="mb-1 text-[10px] text-dracula-comment sm:hidden">
                            {t("projects.updatedLabel")}: {meta.updated}
                          </p>
                          <p className="mb-4 max-w-2xl text-sm leading-relaxed text-dracula-fg/70">
                            {item.desc}
                          </p>
                          <div className="mb-4 flex flex-wrap gap-2">
                            {meta.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded bg-dracula-green/10 px-2 py-0.5 text-[10px] font-medium text-dracula-green"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <a
                            href={meta.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-dracula-cyan transition-colors hover:text-glow-cyan"
                          >
                            {t("projects.viewSource")}
                            <span aria-hidden="true">&rarr;</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <a
            href="https://github.com/Delafu7?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded border border-dracula-current px-4 py-2 text-xs text-dracula-comment transition-all hover:border-dracula-green hover:text-dracula-green"
          >
            {t("projects.viewAll")}
            <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
