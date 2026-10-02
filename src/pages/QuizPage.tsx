import { Trophy, ArrowRight, BookOpen, Brain } from 'lucide-react';
import { quizzes, getCourseById } from '@/lib/data';
import { useAuth } from '@/context/AuthContext';
import { getQuizResults } from '@/lib/storage';
import { navigate } from '@/lib/router';

export default function QuizPage() {
  const { user } = useAuth();
  const results = user ? getQuizResults(user.email) : [];

  const getBestScore = (quizId: string): number | null => {
    const quizResults = results.filter((r) => r.quizId === quizId);
    if (quizResults.length === 0) return null;
    return Math.max(...quizResults.map((r) => r.percentage));
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="absolute -top-12 left-0 h-64 w-64 rounded-full bg-accent-200/30 blur-3xl dark:bg-accent-900/20" />
        <div className="container-max relative px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-accent-500 shadow-lg shadow-brand-600/30">
              <Trophy className="h-7 w-7 text-white" />
            </div>
            <h1 className="mt-4 text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
              Test Your Knowledge
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-gray-600 dark:text-gray-300">
              Take quizzes to assess your understanding and get personalized recommendations based on
              your performance.
            </p>
          </div>
        </div>
      </section>

      {/* Quiz List */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {quizzes.map((quiz, i) => {
              const course = getCourseById(quiz.courseId);
              const bestScore = getBestScore(quiz.id);
              return (
                <div
                  key={quiz.id}
                  className="card p-6 animate-fade-in-up"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  {course && (
                    <img
                      src={course.image}
                      alt={quiz.title}
                      loading="lazy"
                      className="h-32 w-full rounded-xl object-cover"
                    />
                  )}
                  <div className="mt-4">
                    <span className="inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-900/20 dark:text-brand-300">
                      {quiz.questions.length} Questions
                    </span>
                    <h3 className="mt-3 text-lg font-bold text-gray-900 dark:text-white">{quiz.title}</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{quiz.description}</p>

                    {bestScore !== null && (
                      <div className="mt-4 flex items-center gap-2 rounded-xl bg-gray-50 px-3 py-2 dark:bg-gray-800">
                        <Trophy className="h-4 w-4 text-amber-500" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">Best Score:</span>
                        <span className={`text-sm font-bold ${
                          bestScore >= 70 ? 'text-emerald-600 dark:text-emerald-400' :
                          bestScore >= 40 ? 'text-brand-600 dark:text-brand-400' :
                          'text-amber-600 dark:text-amber-400'
                        }`}>
                          {bestScore}%
                        </span>
                      </div>
                    )}

                    <button
                      onClick={() => navigate(`quiz/take?id=${quiz.id}`)}
                      className="btn-primary mt-4 w-full text-sm"
                    >
                      {bestScore !== null ? 'Retake Quiz' : 'Start Quiz'}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Info */}
      {!user && (
        <section className="container-max px-4 pb-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-brand-200 p-8 text-center dark:border-brand-800">
            <Brain className="h-10 w-10 text-brand-400" />
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
              Sign in to save your quiz results and get personalized recommendations.
            </p>
            <button onClick={() => navigate('login')} className="btn-secondary mt-4 text-sm">
              <BookOpen className="h-4 w-4" />
              Sign In
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
