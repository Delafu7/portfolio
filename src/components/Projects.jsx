import { useI18n } from "../i18n/LanguageContext";

export default function Projects() {
  const { t } = useI18n();
  const items = t("projects.items");

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

        <div className="grid gap-5 sm:grid-cols-2">
          {Array.isArray(items) &&
            items.map((item, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-lg border border-dracula-current bg-dracula-current/10 p-6 transition-all hover:border-dracula-green/40 hover:bg-dracula-current/20"
              >
                <div className="mb-1 text-[10px] font-bold tracking-widest text-dracula-comment">
                  ARTIFACT-{String(i + 1).padStart(3, "0")}
                </div>
                <h3 className="mb-2 text-lg font-bold text-dracula-fg group-hover:text-dracula-green transition-colors">
                  {item.name}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-dracula-fg/60">
                  {item.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-dracula-green/10 px-2 py-0.5 text-[10px] font-medium text-dracula-green"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
