// export default function SubLoading() {
//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-white/90 dark:bg-gray-950/90 backdrop-blur-md">
//       <div className="flex flex-col items-center gap-6 text-center">
//         {/* Larger main message */}
//         <h2 className="max-lg:text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-gray-100">
//           Stand Out From The Crowd! ✨
//         </h2>

//         {/* Animated loading text */}
//         <div className="flex items-center gap-1">
//           <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
//             Creating Excellence
//           </p>
//           <span className="flex gap-1">
//             <span className="h-3 w-3 rounded-full bg-blue-600 dark:bg-blue-400 animate-bounce [animation-delay:-0.3s]" />
//             <span className="h-3 w-3 rounded-full bg-blue-600 dark:bg-blue-400 animate-bounce [animation-delay:-0.15s]" />
//             <span className="h-3 w-3 rounded-full bg-blue-600 dark:bg-blue-400 animate-bounce" />
//           </span>
//         </div>

//         {/* Motivational subtext */}
//         <p className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text">
//           Your success story begins here
//         </p>
//       </div>
//     </div>
//   );
// }

// app/components/loading.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SubLoading() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/dashboard"); // Replace with your target route
    }, 1500);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/90 dark:bg-gray-950/90 backdrop-blur-md">
      <div className="flex flex-col items-center gap-6 text-center">
        {/* Main message */}
        <h2 className="max-lg:text-3xl lg:text-4xl font-extrabold text-[#3B41E9]">
          Your Career Game-Changer! 🚀
        </h2>

        {/* Loading indicator with animated dots */}
        <div className="flex items-center gap-1">
          <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Preparing Greatness
          </p>
          <span className="flex gap-1">
            <span className="h-3 w-3 rounded-full bg-[#3B41E9] animate-bounce [animation-delay:-0.3s]" />
            <span className="h-3 w-3 rounded-full bg-[#3B41E9] animate-bounce [animation-delay:-0.15s]" />
            <span className="h-3 w-3 rounded-full bg-[#3B41E9] animate-bounce" />
          </span>
        </div>

        {/* Motivational subtext */}
        <p className="text-lg font-bold text-gray-600 dark:text-gray-300">
          Don't miss your chance to shine!
        </p>
      </div>
    </div>
  );
}

// Usage in your page:
// app/your-page/loading.tsx
