import { useEffect, useState } from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { useRouter } from '@/lib/router';
import Layout from '@/components/Layout';
import LoadingScreen from '@/components/LoadingScreen';
import ProtectedRoute from '@/components/ProtectedRoute';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import RegisterPage from '@/pages/RegisterPage';
import LoginPage from '@/pages/LoginPage';
import DashboardPage from '@/pages/DashboardPage';
import CoursesPage from '@/pages/CoursesPage';
import QuizPage from '@/pages/QuizPage';
import QuizTakePage from '@/pages/QuizTakePage';
import ProgressPage from '@/pages/ProgressPage';
import ContactPage from '@/pages/ContactPage';

function NotFoundPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="text-center">
        <p className="text-7xl font-extrabold gradient-text">404</p>
        <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">Page Not Found</h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          The page you're looking for doesn't exist.
        </p>
        <a href="#/" className="btn-primary mt-6 inline-flex">
          Go Home
        </a>
      </div>
    </div>
  );
}

function AppRoutes() {
  const { route } = useRouter();

  const pagesWithoutFooter = new Set(['register', 'login', 'quiz-take']);
  const showFooter = !pagesWithoutFooter.has(route.name);

  let content;
  switch (route.name) {
    case 'home':
      content = <HomePage />;
      break;
    case 'about':
      content = <AboutPage />;
      break;
    case 'register':
      content = <RegisterPage />;
      break;
    case 'login':
      content = <LoginPage />;
      break;
    case 'dashboard':
      content = (
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      );
      break;
    case 'courses':
      content = <CoursesPage />;
      break;
    case 'quiz':
      content = <QuizPage />;
      break;
    case 'quiz-take':
      content = <QuizTakePage quizId={route.quizId} />;
      break;
    case 'progress':
      content = (
        <ProtectedRoute>
          <ProgressPage />
        </ProtectedRoute>
      );
      break;
    case 'contact':
      content = <ContactPage />;
      break;
    default:
      content = <NotFoundPage />;
  }

  return <Layout showFooter={showFooter}>{content}</Layout>;
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <ThemeProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
