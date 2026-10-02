import { GraduationCap, Github, Twitter, Linkedin, Facebook, Mail } from 'lucide-react';
import { navigate } from '@/lib/router';

const footerLinks = {
  Platform: [
    { label: 'Home', path: '' },
    { label: 'Courses', path: 'courses' },
    { label: 'Quiz', path: 'quiz' },
    { label: 'Dashboard', path: 'dashboard' },
  ],
  Company: [
    { label: 'About Us', path: 'about' },
    { label: 'Contact', path: 'contact' },
    { label: 'Register', path: 'register' },
    { label: 'Login', path: 'login' },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="container-max px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-accent-500">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-extrabold">
                Edu<span className="gradient-text">Genie</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-gray-500 dark:text-gray-400">
              Smart personalized learning platform helping students learn effectively through courses,
              quizzes, progress tracking, and AI-driven recommendations.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { icon: Github, label: 'GitHub' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Linkedin, label: 'LinkedIn' },
                { icon: Facebook, label: 'Facebook' },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition-all hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600 dark:border-gray-700 dark:text-gray-400 dark:hover:border-brand-700 dark:hover:bg-brand-900/20"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{title}</h3>
              <ul className="mt-4 space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => navigate(link.path)}
                      className="text-sm text-gray-500 transition-colors hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-400"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-6 dark:border-gray-800 sm:flex-row">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} EduGenie. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Mail className="h-4 w-4" />
            <span>support@edugenie.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
