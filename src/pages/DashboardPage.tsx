import { useEffect, useState } from 'react';
import {
  BookOpen,
  Trophy,
  TrendingUp,
  Lightbulb,
  Clock,
  ArrowRight,
  Target,
  Award,
  CheckCircle2,
  Brain,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import {
  getEnrolledCourses,
  getQuizResults,
  getActivities,
  getAverageScore,
  getOverallProgress,
} from '@/lib/storage';
import { getCourseById } from '@/lib/data';
import { getRecommendation, getRecommendationBg, getRecommendationColor } from '@/lib/recommendation';
import { navigate } from '@/lib/router';
import type { EnrolledCourse, QuizResult, Activity } from '@/types';

export default function DashboardPage() {
  const { user } = useAuth();
  const [enrolled, setEnrolled] = useState<EnrolledCourse[]>([]);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [avgScore, setAvgScore] = useState(0);
  const [overallProgress, setOverallProgress] = useState(0);

  useEffect(() => {
    if (!user) return;
    setEnrolled(getEnrolledCourses(user.email));
    setQuizResults(getQuizResults(user.email));
    setActivities(getActivities(user.email));
    setAvgScore(getAverageScore(user.email));
    setOverallProgress(getOverallProgress(user.email));
  }, [user]);

  if (!user) return null;

  const recommendation = getRecommendation(avgScore);

  const stats = [
    { icon: BookOpen, label: 'Enrolled Courses', value: enrolled.length, color: 'brand' },
    { icon: Trophy, label: 'Quizzes Taken', value: quizResults.length, color: 'amber' },
    { icon: TrendingUp, label: 'Avg Score', value: `${avgScore}%`, color: 'emerald' },
    { icon: Target, label: 'Overall Progress', value: `${overallProgress}%`, color: 'accent' },
  ];

  const colorMap: Record<string, string> = {
    brand: 'bg-brand-100 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400',
    amber: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
    emerald: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
    accent: 'bg-accent-100 text-accent-600 dark:bg-accent-900/30 dark:text-accent-400',
  };

  return (
    <div className="animate-fade-in">
      {/* Welcome */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-600 to-brand-800 dark:from-brand-800 dark:to-brand-950">
        <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-accent-400/20 blur-2xl" />
        <div className="container-max relative px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-white">
                Welcome back, {user.fullName.split(' ')[0]}!
              </h1>
              <p className="mt-2 text-brand-100">
                {user.department} · {user.year}
              </p>
            </div>
            <button
              onClick={() => navigate('courses')}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-brand-700 shadow-lg transition-all hover:bg-brand-50 active:scale-95"
            >
              Browse Courses
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container-max px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="card p-5 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${colorMap[stat.color]}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <p className="mt-3 text-2xl font-extrabold text-gray-900 dark:text-white">{stat.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recommendation */}
      <section className="container-max px-4 pb-8 sm:px-6 lg:px-8">
        <div className={`rounded-2xl border p-6 ${getRecommendationBg(recommendation.level)}`}>
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white shadow-sm dark:bg-gray-800">
              <Brain className="h-6 w-6 text-brand-600 dark:text-brand-400" />
            </div>
            <div>
              <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white">
                Personalized Recommendation
                <Lightbulb className="h-4 w-4 text-amber-500" />
              </h3>
              <p className={`mt-1 text-sm font-semibold ${getRecommendationColor(recommendation.level)}`}>
                {recommendation.message}
              </p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Based on your average quiz score of {avgScore}%
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enrolled Courses */}
      <section className="container-max px-4 pb-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Enrolled Courses</h2>
          <button onClick={() => navigate('courses')} className="text-sm font-medium text-brand-600 hover:underline dark:text-brand-400">
            View All
          </button>
        </div>
        {enrolled.length === 0 ? (
          <div className="mt-4 flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 py-12 dark:border-gray-800">
            <BookOpen className="h-10 w-10 text-gray-300 dark:text-gray-600" />
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">No courses enrolled yet</p>
            <button onClick={() => navigate('courses')} className="btn-secondary mt-4 text-sm">
              Browse Courses
            </button>
          </div>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {enrolled.map((e, i) => {
              const course = getCourseById(e.courseId);
              if (!course) return null;
              return (
                <div
                  key={e.courseId}
                  className="card p-5 animate-fade-in-up"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <div className="flex items-center gap-3">
                    <img src={course.image} alt={course.title} className="h-12 w-12 rounded-xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <h3 className="truncate text-sm font-bold text-gray-900 dark:text-white">{course.title}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{course.duration}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500 dark:text-gray-400">Progress</span>
                      <span className="font-semibold text-brand-600 dark:text-brand-400">{e.progress}%</span>
                    </div>
                    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-500 transition-all duration-500"
                        style={{ width: `${e.progress}%` }}
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(`quiz`)}
                    className="btn-ghost mt-3 w-full text-sm"
                  >
                    Take Quiz
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Quiz Stats + Recent Activity */}
      <section className="container-max px-4 pb-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Quiz Stats */}
          <div className="card p-6">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-500" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Quiz Statistics</h3>
            </div>
            {quizResults.length === 0 ? (
              <div className="mt-4 flex flex-col items-center py-8 text-center">
                <Trophy className="h-8 w-8 text-gray-300 dark:text-gray-600" />
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">No quizzes taken yet</p>
                <button onClick={() => navigate('quiz')} className="btn-secondary mt-3 text-sm">
                  Take a Quiz
                </button>
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                {quizResults.slice(-5).reverse().map((r, i) => (
                  <div key={i} className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3 dark:bg-gray-800">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                        r.percentage >= 70 ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30' :
                        r.percentage >= 40 ? 'bg-brand-100 text-brand-600 dark:bg-brand-900/30' :
                        'bg-amber-100 text-amber-600 dark:bg-amber-900/30'
                      }`}>
                        <Award className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{r.quizTitle}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {r.score}/{r.totalQuestions} correct
                        </p>
                      </div>
                    </div>
                    <span className={`text-sm font-bold ${
                      r.percentage >= 70 ? 'text-emerald-600 dark:text-emerald-400' :
                      r.percentage >= 40 ? 'text-brand-600 dark:text-brand-400' :
                      'text-amber-600 dark:text-amber-400'
                    }`}>
                      {r.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Activity */}
          <div className="card p-6">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-brand-500" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent Activity</h3>
            </div>
            {activities.length === 0 ? (
              <div className="mt-4 flex flex-col items-center py-8 text-center">
                <Clock className="h-8 w-8 text-gray-300 dark:text-gray-600" />
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">No recent activity</p>
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                {activities.slice(0, 6).map((act) => (
                  <div key={act.id} className="flex items-start gap-3">
                    <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${
                      act.type === 'quiz' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30' :
                      act.type === 'enroll' ? 'bg-brand-100 text-brand-600 dark:bg-brand-900/30' :
                      'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30'
                    }`}>
                      {act.type === 'quiz' ? <Trophy className="h-4 w-4" /> :
                       act.type === 'enroll' ? <BookOpen className="h-4 w-4" /> :
                       <CheckCircle2 className="h-4 w-4" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-700 dark:text-gray-300">{act.description}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        {new Date(act.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Learning Recommendations */}
      <section className="container-max px-4 pb-12 sm:px-6 lg:px-8">
        <div className="card p-6">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-brand-500" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Learning Recommendations</h3>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-gray-100 p-4 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30">
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400">&lt;40</span>
                </div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Basic</p>
              </div>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Revise basic concepts and retake quizzes.</p>
            </div>
            <div className="rounded-xl border border-gray-100 p-4 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-100 dark:bg-brand-900/30">
                  <span className="text-xs font-bold text-brand-600 dark:text-brand-400">40-70</span>
                </div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Intermediate</p>
              </div>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Practice intermediate-level questions.</p>
            </div>
            <div className="rounded-xl border border-gray-100 p-4 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">&gt;70</span>
                </div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Advanced</p>
              </div>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Ready for advanced learning modules.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
