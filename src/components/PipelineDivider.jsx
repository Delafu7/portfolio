export default function PipelineDivider({ stage }) {

  return (
    <div className="flex items-center justify-center gap-4 px-4 py-6 sm:px-6">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-dracula-current to-dracula-current/50" />
      <span className="flex items-center gap-2 text-[10px] tracking-widest text-dracula-comment/60">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-dracula-green/40" />
        {stage}
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-dracula-green/40" />
      </span>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-dracula-current to-dracula-current/50" />
    </div>
  );
}
