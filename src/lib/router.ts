import { useEffect, useState, useCallback } from 'react';

export type Route =
  | { name: 'home' }
  | { name: 'about' }
  | { name: 'register' }
  | { name: 'login' }
  | { name: 'dashboard' }
  | { name: 'courses' }
  | { name: 'quiz' }
  | { name: 'quiz-take'; quizId: string }
  | { name: 'progress' }
  | { name: 'contact' }
  | { name: 'not-found' };

function parseHash(): Route {
  const hash = window.location.hash.replace(/^#\/?/, '') || '';
  const [path, query] = hash.split('?');

  switch (path) {
    case '':
    case 'home':
      return { name: 'home' };
    case 'about':
      return { name: 'about' };
    case 'register':
      return { name: 'register' };
    case 'login':
      return { name: 'login' };
    case 'dashboard':
      return { name: 'dashboard' };
    case 'courses':
      return { name: 'courses' };
    case 'quiz':
      return { name: 'quiz' };
    case 'quiz/take': {
      const params = new URLSearchParams(query || '');
      const quizId = params.get('id') || '';
      return { name: 'quiz-take', quizId };
    }
    case 'progress':
      return { name: 'progress' };
    case 'contact':
      return { name: 'contact' };
    default:
      return { name: 'not-found' };
  }
}

export function useRouter() {
  const [route, setRoute] = useState<Route>(parseHash());

  useEffect(() => {
    const onHashChange = () => {
      setRoute(parseHash());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = useCallback((path: string) => {
    window.location.hash = path;
  }, []);

  return { route, navigate };
}

export function navigate(path: string) {
  window.location.hash = path;
}
