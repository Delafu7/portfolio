import { useI18n } from "../i18n/LanguageContext";

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-dracula-current/50 px-4 py-8 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-dracula-green/50" />
          <span className="text-xs text-dracula-comment">
            {t("footer.built")}
          </span>
        </div>
        <span className="text-[10px] tracking-widest text-dracula-comment/50">
          {t("footer.pipeline")}
        </span>
      </div>
    </footer>
  );
}
