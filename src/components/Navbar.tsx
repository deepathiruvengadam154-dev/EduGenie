import { useEffect, useRef, useState } from 'react';
import { GraduationCap, Menu, X, Moon, Sun, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { navigate } from '@/lib/router';

const links = [
  { label: 'Home', path: '' },
  { label: 'About', path: 'about' },
  { label: 'Courses', path: 'courses' },
  { label: 'Quiz', path: 'quiz' },
  { label: 'Contact', path: 'contact' },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentHash, setCurrentHash] = useState(window.location.hash);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onHash = () => {
      setCurrentHash(window.location.hash);
      setMobileOpen(false);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const isActive = (path: string) => {
    const hash = currentHash.replace(/^#\/?/, '');
    if (path === '') return hash === '' || hash === 'home';
    return hash.startsWith(path);
  };

  const go = (path: string) => {
    navigate(path);
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass shadow-md border-b border-gray-200/50 dark:border-gray-800/50'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-max flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <button onClick={() => go('')} className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-accent-500 shadow-lg shadow-brand-600/30 transition-transform group-hover:scale-110">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-extrabold tracking-tight">
            Edu<span className="gradient-text">Genie</span>
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <button
              key={link.path}
              onClick={() => go(link.path)}
              className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                isActive(link.path)
                  ? 'text-brand-600 dark:text-brand-400'
                  : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
              }`}
            >
              {link.label}
              {isActive(link.path) && (
                <span className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-brand-600 dark:bg-brand-400" />
              )}
            </button>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>

          {user ? (
            <>
              <button
                onClick={() => go('dashboard')}
                className="hidden items-center gap-2 rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:bg-brand-700 active:scale-95 sm:flex"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </button>
              <button
                onClick={() => {
                  logout();
                  navigate('login');
                }}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-600 transition-colors hover:bg-red-50 hover:text-red-600 dark:text-gray-300 dark:hover:bg-red-900/20"
                aria-label="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </>
          ) : (
            <button
              onClick={() => go('login')}
              className="hidden rounded-xl bg-brand-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:bg-brand-700 active:scale-95 sm:block"
            >
              Sign In
            </button>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 md:hidden"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div ref={menuRef} className="glass border-t border-gray-200/50 dark:border-gray-800/50 md:hidden">
          <div className="flex flex-col gap-1 px-4 py-4">
            {links.map((link) => (
              <button
                key={link.path}
                onClick={() => go(link.path)}
                className={`rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-brand-50 text-brand-600 dark:bg-brand-900/20 dark:text-brand-400'
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                }`}
              >
                {link.label}
              </button>
            ))}
            {user ? (
              <button
                onClick={() => go('dashboard')}
                className="rounded-xl px-4 py-3 text-left text-sm font-medium text-brand-600 hover:bg-brand-50 dark:text-brand-400 dark:hover:bg-brand-900/20"
              >
                Dashboard
              </button>
            ) : (
              <button
                onClick={() => go('login')}
                className="rounded-xl bg-brand-600 px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
