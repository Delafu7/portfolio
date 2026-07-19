import { useI18n } from "../i18n/LanguageContext";

export default function Profile() {
  const { t } = useI18n();

  const socialLinks = [
    { key: "github", icon: GithubIcon, href: "https://github.com/Delafu7" },
    { key: "linkedin", icon: LinkedinIcon, href: "https://www.linkedin.com/in/eneko-de-la-fuente-6031b1299" },
  ];

  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:gap-16">
          {/* Profile Image */}
          <div className="relative shrink-0">
            <div className="relative h-40 w-40 overflow-hidden rounded-full border-2 border-dracula-purple sm:h-52 sm:w-52 border-glow-purple">
              <img
                src={`${import.meta.env.BASE_URL}profile.jpg`}
                alt={t("profile.imageAlt")}
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextElementSibling.style.display = "flex";
                }}
              />
              {/* Fallback placeholder */}
              <div
                className="absolute inset-0 hidden items-center justify-center bg-dracula-current/40"
                style={{ display: "none" }}
              >
                <span className="text-4xl text-dracula-comment sm:text-5xl">
                  {">_"}
                </span>
              </div>
            </div>
            {/* Decorative ring */}
            <div className="absolute -inset-2 rounded-full border border-dracula-cyan/20" />
            <div className="absolute -inset-4 rounded-full border border-dracula-purple/10" />
          </div>

          {/* Info + Social */}
          <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
            {/* Role badge */}
            <span className="mb-3 inline-block rounded-full border border-dracula-current bg-dracula-current/30 px-3 py-1 text-[10px] font-bold tracking-widest text-dracula-cyan uppercase">
              {t("profile.role")}
            </span>

            {/* Resume download */}
            <a
              href={`${import.meta.env.BASE_URL}resume.pdf`}
              download
              className="mb-8 inline-flex items-center gap-2 rounded border border-dracula-green/40 bg-dracula-green/5 px-4 py-2 text-xs font-medium text-dracula-green transition-all hover:bg-dracula-green/10 hover:shadow-[0_0_16px_rgba(80,250,123,0.2)] sm:text-sm"
            >
              <DownloadIcon />
              {t("profile.resumeBtn")}
            </a>

            {/* Social links as env config */}
            <div className="w-full max-w-md overflow-hidden rounded-lg border border-dracula-current bg-dracula-bg/80">
              <div className="flex items-center gap-2 border-b border-dracula-current px-4 py-2">
                <span className="h-2.5 w-2.5 rounded-full bg-dracula-red" />
                <span className="h-2.5 w-2.5 rounded-full bg-dracula-yellow" />
                <span className="h-2.5 w-2.5 rounded-full bg-dracula-green" />
                <span className="ml-2 text-[10px] text-dracula-comment">
                  .env.production
                </span>
              </div>
              <div className="p-4 text-xs leading-relaxed sm:text-sm">
                <p className="env-comment mb-2">
                  {`# ${t("profile.social.title")}`}
                </p>
                {socialLinks.map(({ key, icon: Icon, href }) => (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 rounded px-1 py-1 transition-colors hover:bg-dracula-current/30"
                  >
                    <span className="env-key">process.env.{key.toUpperCase()}</span>
                    <span className="env-eq">=</span>
                    <span className="env-str">
                      &quot;{t(`profile.social.${key}`)}&quot;
                    </span>
                    <span className="ml-auto opacity-0 transition-opacity group-hover:opacity-100">
                      <Icon />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DownloadIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg className="h-4 w-4 text-dracula-fg/40 transition-colors group-hover:text-dracula-fg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg className="h-4 w-4 text-dracula-fg/40 transition-colors group-hover:text-[#0a66c2]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
