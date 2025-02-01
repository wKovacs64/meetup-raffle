export function LoadingSpinner() {
  return (
    <div className="mt-4 flex shrink-0 grow flex-wrap items-center justify-center sm:mt-8 sm:items-start">
      <div
        className="text-primary relative inline-block size-[var(--size)] [--size:128px]"
        data-testid="loading"
      >
        <div className="animate-ripple absolute rounded-full border-4 border-current opacity-0" />
        <div className="animate-ripple absolute rounded-full border-4 border-current opacity-0 [animation-delay:0.33s]" />
        <div className="animate-ripple absolute rounded-full border-4 border-current opacity-0 [animation-delay:0.66s]" />
      </div>
    </div>
  );
}
