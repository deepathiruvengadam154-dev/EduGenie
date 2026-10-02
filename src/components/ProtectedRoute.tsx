import { Lock } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { navigate } from '@/lib/router';
import type { ReactNode } from 'react';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 dark:bg-brand-900/20">
            <Lock className="h-8 w-8 text-brand-600 dark:text-brand-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Login Required</h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Please sign in to access this page.
          </p>
          <button onClick={() => navigate('login')} className="btn-primary mt-6">
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
