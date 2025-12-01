
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-background to-muted">
      <div className="flex flex-col items-center gap-6">
        {/* Custom Animated Loading Dots */}
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-4 w-4 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-4 w-4 rounded-full bg-primary animate-bounce"></div>
        </div>
        
        {/* Loading Text with Pulse */}
        <div className="flex flex-col items-center gap-2">
          <p className="text-lg font-medium animate-pulse">Memuat</p>
          <div className="flex gap-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-muted-foreground animate-pulse [animation-delay:-0.3s]"></span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-muted-foreground animate-pulse [animation-delay:-0.15s]"></span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-muted-foreground animate-pulse"></span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-1 bg-muted rounded-full overflow-hidden relative">
          <div className="absolute inset-0 bg-primary rounded-full loading-progress"></div>
        </div>
      </div>
    </div>
  );
}
