import { useI18n } from "../i18n/LanguageContext";

const SKILL_DATA = {
  languages: ["Python", "JavaScript", "TypeScript", "Angular", "React", "Node.js", "Express.js"],
  devops: ["Docker", "GitHub Actions", "Azure DevOps", "Kubernetes", "Terraform", "Linux"],
  qa: ["Jest", "Cypress", "Playwright", "Selenium", "Postman", "JMeter"],
};

export default function About() {
  const { t } = useI18n();

  return (
    <section id="about" className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-12 flex items-center gap-3">
          <span className="text-xs font-bold tracking-widest text-dracula-purple">
            {t("about.stage")}
          </span>
          <span className="h-px flex-1 bg-dracula-current/50" />
        </div>

        <h2 className="mb-2 text-2xl font-bold text-dracula-fg sm:text-3xl">
          {t("about.title")}
        </h2>
        <p className="mb-8 text-sm text-dracula-comment">{t("about.subtitle")}</p>

        <p className="mb-12 max-w-3xl text-sm leading-relaxed text-dracula-fg/70 sm:text-base">
          {t("about.description")}
        </p>

        {/* Skills grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(SKILL_DATA).map(([category, skills]) => (
            <div
              key={category}
              className="rounded-lg border border-dracula-current bg-dracula-current/20 p-5 transition-all hover:border-dracula-purple/50 hover:border-glow-purple"
            >
              <h3 className="mb-4 text-sm font-bold text-dracula-purple">
                {t(`about.skills.${category}`)}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded bg-dracula-current/50 px-2.5 py-1 text-xs text-dracula-fg/80"
                  >
                    {skill}
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
