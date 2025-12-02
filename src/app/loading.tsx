export default function Loading() {
  return (
    <div className="from-background to-muted flex min-h-screen items-center justify-center bg-linear-to-br">
      <div className="flex flex-col items-center gap-6">
        {/* Custom Animated Loading Dots */}
        <div className="flex items-center gap-2">
          <div className="bg-primary h-4 w-4 animate-bounce rounded-full [animation-delay:-0.3s]"></div>
          <div className="bg-primary h-4 w-4 animate-bounce rounded-full [animation-delay:-0.15s]"></div>
          <div className="bg-primary h-4 w-4 animate-bounce rounded-full"></div>
        </div>

        {/* Loading Text with Pulse */}
        <div className="flex flex-col items-center gap-2">
          <p className="animate-pulse text-lg font-medium">Memuat</p>
          <div className="flex gap-1">
            <span className="bg-muted-foreground inline-block h-1.5 w-1.5 animate-pulse rounded-full [animation-delay:-0.3s]"></span>
            <span className="bg-muted-foreground inline-block h-1.5 w-1.5 animate-pulse rounded-full [animation-delay:-0.15s]"></span>
            <span className="bg-muted-foreground inline-block h-1.5 w-1.5 animate-pulse rounded-full"></span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-muted relative h-1 w-64 overflow-hidden rounded-full">
          <div className="bg-primary loading-progress absolute inset-0 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
