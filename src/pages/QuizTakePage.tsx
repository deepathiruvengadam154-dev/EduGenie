import { useState, useEffect } from 'react';
import {
  Trophy,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Award,
  Brain,
  Home,
} from 'lucide-react';
import { getQuizById, getCourseById } from '@/lib/data';
import { useAuth } from '@/context/AuthContext';
import { saveQuizResult, updateCourseProgress } from '@/lib/storage';
import { getRecommendation, getRecommendationBg, getRecommendationColor } from '@/lib/recommendation';
import { navigate } from '@/lib/router';
import type { QuizResult } from '@/types';

interface QuizTakePageProps {
  quizId: string;
}

export default function QuizTakePage({ quizId }: QuizTakePageProps) {
  const { user } = useAuth();
  const quiz = getQuizById(quizId);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);

  useEffect(() => {
    if (quiz) {
      setAnswers(new Array(quiz.questions.length).fill(-1));
    }
  }, [quiz]);

  if (!quiz) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Quiz Not Found</h2>
          <button onClick={() => navigate('quiz')} className="btn-primary mt-4">
            Back to Quizzes
          </button>
        </div>
      </div>
    );
  }

  const course = getCourseById(quiz.courseId);
  const question = quiz.questions[currentQ];
  const isLast = currentQ === quiz.questions.length - 1;
  const progress = ((currentQ + 1) / quiz.questions.length) * 100;

  const handleSelect = (index: number) => {
    setSelected(index);
    const newAnswers = [...answers];
    newAnswers[currentQ] = index;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (isLast) {
      handleSubmit();
    } else {
      setCurrentQ(currentQ + 1);
      setSelected(answers[currentQ + 1] !== -1 ? answers[currentQ + 1] : null);
    }
  };

  const handlePrev = () => {
    if (currentQ > 0) {
      setCurrentQ(currentQ - 1);
      setSelected(answers[currentQ - 1] !== -1 ? answers[currentQ - 1] : null);
    }
  };

  const handleSubmit = () => {
    let score = 0;
    quiz.questions.forEach((q, i) => {
      if (answers[i] === q.correctIndex) score++;
    });
    const percentage = Math.round((score / quiz.questions.length) * 100);
    const quizResult: QuizResult = {
      quizId: quiz.id,
      quizTitle: quiz.title,
      score,
      totalQuestions: quiz.questions.length,
      percentage,
      takenAt: new Date().toISOString(),
    };

    if (user) {
      saveQuizResult(user.email, quizResult);
      const newProgress = Math.round((percentage / 100) * 100);
      updateCourseProgress(user.email, quiz.courseId, newProgress);
    }

    setResult(quizResult);
    setSubmitted(true);
  };

  const handleRetake = () => {
    setCurrentQ(0);
    setAnswers(new Array(quiz.questions.length).fill(-1));
    setSelected(null);
    setSubmitted(false);
    setResult(null);
  };

  // Result Screen
  if (submitted && result) {
    const recommendation = getRecommendation(result.percentage);
    return (
      <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl animate-scale-in">
          <div className="card p-8 text-center">
            <div className={`mx-auto flex h-20 w-20 items-center justify-center rounded-2xl ${
              result.percentage >= 70 ? 'bg-emerald-100 dark:bg-emerald-900/30' :
              result.percentage >= 40 ? 'bg-brand-100 dark:bg-brand-900/30' :
              'bg-amber-100 dark:bg-amber-900/30'
            }`}>
              <Trophy className={`h-10 w-10 ${
                result.percentage >= 70 ? 'text-emerald-600 dark:text-emerald-400' :
                result.percentage >= 40 ? 'text-brand-600 dark:text-brand-400' :
                'text-amber-600 dark:text-amber-400'
              }`} />
            </div>

            <h1 className="mt-4 text-3xl font-extrabold text-gray-900 dark:text-white">
              Quiz Complete!
            </h1>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{quiz.title}</p>

            {/* Score */}
            <div className="mt-8 flex items-center justify-center gap-8">
              <div>
                <p className={`text-5xl font-extrabold ${
                  result.percentage >= 70 ? 'text-emerald-600 dark:text-emerald-400' :
                  result.percentage >= 40 ? 'text-brand-600 dark:text-brand-400' :
                  'text-amber-600 dark:text-amber-400'
                }`}>
                  {result.percentage}%
                </p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Score</p>
              </div>
              <div className="h-12 w-px bg-gray-200 dark:bg-gray-700" />
              <div>
                <p className="text-5xl font-extrabold text-gray-900 dark:text-white">
                  {result.score}/{result.totalQuestions}
                </p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Correct</p>
              </div>
            </div>

            {/* Recommendation */}
            <div className={`mt-8 rounded-2xl border p-5 text-left ${getRecommendationBg(recommendation.level)}`}>
              <div className="flex items-start gap-3">
                <Brain className="h-5 w-5 flex-shrink-0 text-brand-600 dark:text-brand-400" />
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Recommendation</p>
                  <p className={`mt-1 text-sm ${getRecommendationColor(recommendation.level)}`}>
                    {recommendation.message}
                  </p>
                </div>
              </div>
            </div>

            {/* Answer Review */}
            <div className="mt-8 text-left">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Answer Review</h3>
              <div className="mt-3 space-y-2">
                {quiz.questions.map((q, i) => {
                  const correct = answers[i] === q.correctIndex;
                  return (
                    <div
                      key={q.id}
                      className="flex items-start gap-3 rounded-xl bg-gray-50 px-4 py-3 dark:bg-gray-800"
                    >
                      {correct ? (
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-500" />
                      ) : (
                        <XCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {i + 1}. {q.question}
                        </p>
                        {!correct && (
                          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            Correct answer: {q.options[q.correctIndex]}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button onClick={handleRetake} className="btn-secondary">
                <RotateCcw className="h-4 w-4" />
                Retake Quiz
              </button>
              <button onClick={() => navigate('dashboard')} className="btn-primary">
                <Award className="h-4 w-4" />
                View Dashboard
              </button>
              <button onClick={() => navigate('quiz')} className="btn-ghost">
                <Home className="h-4 w-4" />
                All Quizzes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Taking Screen
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl animate-fade-in">
        <div className="card p-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">{quiz.title}</h1>
              {course && (
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{course.title}</p>
              )}
            </div>
            <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-900/20 dark:text-brand-300">
              {currentQ + 1} / {quiz.questions.length}
            </span>
          </div>

          {/* Progress bar */}
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Question */}
          <div className="mt-8">
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {question.question}
            </p>

            {/* Options */}
            <div className="mt-6 space-y-3">
              {question.options.map((option, i) => {
                const isSelected = selected === i;
                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    className={`flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3 text-left text-sm transition-all ${
                      isSelected
                        ? 'border-brand-500 bg-brand-50 text-brand-700 dark:border-brand-400 dark:bg-brand-900/20 dark:text-brand-300'
                        : 'border-gray-200 text-gray-700 hover:border-brand-300 hover:bg-brand-50/50 dark:border-gray-700 dark:text-gray-300 dark:hover:border-brand-700 dark:hover:bg-brand-900/10'
                    }`}
                  >
                    <span className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                      isSelected
                        ? 'bg-brand-600 text-white'
                        : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                    }`}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    {option}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={currentQ === 0}
              className="btn-ghost disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </button>

            <span className="text-xs text-gray-400 dark:text-gray-500">
              {answers.filter((a) => a !== -1).length} of {quiz.questions.length} answered
            </span>

            <button
              onClick={handleNext}
              disabled={selected === null}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLast ? (
                <>
                  Submit Quiz
                  <CheckCircle2 className="h-4 w-4" />
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
