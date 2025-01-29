export function LoadingSpinner() {
  return (
    <div className="mt-4 flex flex-shrink-0 flex-grow flex-wrap items-center justify-center sm:mt-8 sm:items-start">
      <div
        className="relative inline-block size-[var(--size)] text-primary [--size:128px]"
        data-testid="loading"
      >
        <div className="absolute animate-ripple rounded-full border-4 border-current opacity-0" />
        <div className="absolute animate-ripple rounded-full border-4 border-current opacity-0 [animation-delay:0.33s]" />
        <div className="absolute animate-ripple rounded-full border-4 border-current opacity-0 [animation-delay:0.66s]" />
      </div>
    </div>
  );
}
