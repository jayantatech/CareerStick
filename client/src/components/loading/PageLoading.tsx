"use client";

export default function PageLoading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-950/90 backdrop-blur-md z-50">
      <div className="flex flex-col items-center gap-6 text-center">
        {/* Main message */}
        <h2 className="max-lg:text-3xl lg:text-5xl font-extrabold text-[#3B41E9] font-heading capitalize">
          Let AI simplify your resume journey
        </h2>

        {/* Loading indicator with animated dots */}
        <div className="flex items-center gap-1">
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Loading
          </p>
          <span className="flex gap-1 mt-4">
            <span className="h-3 w-3 rounded-full bg-[#3B41E9] animate-bounce [animation-delay:-0.3s]" />
            <span className="h-3 w-3 rounded-full bg-[#3B41E9] animate-bounce [animation-delay:-0.15s]" />
            <span className="h-3 w-3 rounded-full bg-[#3B41E9] animate-bounce" />
          </span>
        </div>
      </div>
    </div>
  );
}

// Usage in your page:
// app/your-page/loading.tsx
