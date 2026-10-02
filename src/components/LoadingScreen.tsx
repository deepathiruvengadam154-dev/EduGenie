import { useEffect } from 'react';
import { GraduationCap } from 'lucide-react';

export default function LoadingScreen() {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-gray-950">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-accent-500 shadow-lg shadow-brand-600/30 animate-pulse">
            <GraduationCap className="h-10 w-10 text-white" />
          </div>
        </div>
        <div className="flex gap-1">
          <span className="h-2 w-2 animate-bounce rounded-full bg-brand-500 [animation-delay:-0.3s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-brand-500 [animation-delay:-0.15s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-brand-500" />
        </div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Loading EduGenie...</p>
      </div>
    </div>
  );
}
