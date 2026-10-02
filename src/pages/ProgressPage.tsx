import { useEffect, useState } from 'react';
import {
  BarElement,
  CategoryScale,
  Chart,
  LinearScale,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
} from 'chart.js';
import { Line, Radar, Doughnut } from 'react-chartjs-2';
import { TrendingUp, Award, BookOpen, Trophy, Target, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import {
  getEnrolledCourses,
  getQuizResults,
  getAverageScore,
  getOverallProgress,
} from '@/lib/storage';
import { getCourseById, courses } from '@/lib/data';
import { navigate } from '@/lib/router';
import type { EnrolledCourse, QuizResult } from '@/types';

Chart.register(
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
  Legend,
  Filler,
  ArcElement
);

export default function ProgressPage() {
  const { user } = useAuth();
  const [enrolled, setEnrolled] = useState<EnrolledCourse[]>([]);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [avgScore, setAvgScore] = useState(0);
  const [overallProgress, setOverallProgress] = useState(0);

  useEffect(() => {
    if (!user) return;
    setEnrolled(getEnrolledCourses(user.email));
    setQuizResults(getQuizResults(user.email));
    setAvgScore(getAverageScore(user.email));
    setOverallProgress(getOverallProgress(user.email));
  }, [user]);

  if (!user) return null;

  const isDark = document.documentElement.classList.contains('dark');
  const gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)';
  const textColor = isDark ? '#9ca3af' : '#6b7280';

  // Quiz scores over time (line chart)
  const lineData = {
    labels: quizResults.map((r, i) => `Quiz ${i + 1}`),
    datasets: [
      {
        label: 'Quiz Score (%)',
        data: quizResults.map((r) => r.percentage),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59,130,246,0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#3b82f6',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: isDark ? '#1f2937' : '#fff',
        titleColor: isDark ? '#fff' : '#111',
        bodyColor: isDark ? '#d1d5db' : '#374151',
        borderColor: gridColor,
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: { color: gridColor },
        ticks: { color: textColor, callback: (v: string) => `${v}%` },
      },
      x: {
        grid: { display: false },
        ticks: { color: textColor },
      },
    },
  };

  // Course progress radar
  const radarData = {
    labels: enrolled.map((e) => getCourseById(e.courseId)?.title || ''),
    datasets: [
      {
        label: 'Course Progress (%)',
        data: enrolled.map((e) => e.progress),
        backgroundColor: 'rgba(6,182,212,0.15)',
        borderColor: '#06b6d4',
        borderWidth: 2,
        pointBackgroundColor: '#06b6d4',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
      },
    ],
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        grid: { color: gridColor },
        angleLines: { color: gridColor },
        pointLabels: { color: textColor, font: { size: 11 } },
        ticks: {
          color: textColor,
          backdropColor: 'transparent',
          callback: (v: string) => `${v}%`,
        },
      },
    },
  };

  // Completion doughnut
  const completedCourses = enrolled.filter((e) => e.progress === 100).length;
  const inProgressCourses = enrolled.length - completedCourses;
  const notEnrolled = courses.length - enrolled.length;

  const doughnutData = {
    labels: ['Completed', 'In Progress', 'Not Enrolled'],
    datasets: [
      {
        data: [completedCourses, inProgressCourses, notEnrolled],
        backgroundColor: ['#10b981', '#3b82f6', '#e5e7eb'],
        borderColor: isDark ? '#1f2937' : '#fff',
        borderWidth: 3,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: { color: textColor, padding: 16, font: { size: 12 } },
      },
    },
  };

  const stats = [
    { icon: BookOpen, label: 'Courses Enrolled', value: enrolled.length, color: 'text-brand-600' },
    { icon: CheckCircle2, label: 'Completed', value: completedCourses, color: 'text-emerald-600' },
    { icon: Trophy, label: 'Quizzes Taken', value: quizResults.length, color: 'text-amber-600' },
    { icon: Target, label: 'Avg Score', value: `${avgScore}%`, color: 'text-accent-600' },
  ];

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="absolute -top-12 right-0 h-64 w-64 rounded-full bg-brand-200/30 blur-3xl dark:bg-brand-900/20" />
        <div className="container-max relative px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-accent-500 shadow-lg shadow-brand-600/30">
              <TrendingUp className="h-7 w-7 text-white" />
            </div>
            <h1 className="mt-4 text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
              Your Progress
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-gray-600 dark:text-gray-300">
              Track your learning journey with detailed analytics and performance insights.
            </p>
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
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
              <p className="mt-3 text-2xl font-extrabold text-gray-900 dark:text-white">{stat.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Overall Progress Bar */}
      <section className="container-max px-4 pb-8 sm:px-6 lg:px-8">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Overall Progress</h3>
            <span className="text-2xl font-extrabold text-brand-600 dark:text-brand-400">{overallProgress}%</span>
          </div>
          <div className="mt-4 h-4 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-500 transition-all duration-700"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>
      </section>

      {/* Charts */}
      {quizResults.length === 0 && enrolled.length === 0 ? (
        <section className="container-max px-4 pb-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 py-16 text-center dark:border-gray-800">
            <TrendingUp className="h-12 w-12 text-gray-300 dark:text-gray-600" />
            <p className="mt-4 text-lg font-semibold text-gray-500 dark:text-gray-400">No progress data yet</p>
            <p className="text-sm text-gray-400 dark:text-gray-500">Enroll in courses and take quizzes to see your progress here</p>
            <button onClick={() => navigate('courses')} className="btn-primary mt-6">
              Browse Courses
            </button>
          </div>
        </section>
      ) : (
        <section className="container-max px-4 pb-8 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Quiz Score Trend */}
            {quizResults.length > 0 && (
              <div className="card p-6">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-brand-500" />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Quiz Score Trend</h3>
                </div>
                <div className="mt-4 h-64">
                  <Line data={lineData} options={lineOptions} />
                </div>
              </div>
            )}

            {/* Course Progress Radar */}
            {enrolled.length > 0 && (
              <div className="card p-6">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-accent-500" />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Course Progress</h3>
                </div>
                <div className="mt-4 h-64">
                  <Radar data={radarData} options={radarOptions} />
                </div>
              </div>
            )}

            {/* Completion Doughnut */}
            <div className={`card p-6 ${quizResults.length > 0 && enrolled.length > 0 ? 'lg:col-span-2' : ''}`}>
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-emerald-500" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Course Completion</h3>
              </div>
              <div className="mt-4 h-64">
                <Doughnut data={doughnutData} options={doughnutOptions} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Course Progress Detail */}
      {enrolled.length > 0 && (
        <section className="container-max px-4 pb-12 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Course Progress Details</h2>
          <div className="mt-4 space-y-4">
            {enrolled.map((e, i) => {
              const course = getCourseById(e.courseId);
              if (!course) return null;
              return (
                <div
                  key={e.courseId}
                  className="card p-5 animate-fade-in-up"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <div className="flex items-center gap-4">
                    <img src={course.image} alt={course.title} className="h-14 w-14 rounded-xl object-cover" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-gray-900 dark:text-white">{course.title}</h3>
                        <span className={`text-sm font-bold ${
                          e.progress === 100 ? 'text-emerald-600 dark:text-emerald-400' : 'text-brand-600 dark:text-brand-400'
                        }`}>
                          {e.progress}%
                        </span>
                      </div>
                      <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            e.progress === 100
                              ? 'bg-gradient-to-r from-emerald-500 to-emerald-400'
                              : 'bg-gradient-to-r from-brand-500 to-accent-500'
                          }`}
                          style={{ width: `${e.progress}%` }}
                        />
                      </div>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Enrolled on {new Date(e.enrolledAt).toLocaleDateString()}
                      </p>
                    </div>
                    {e.progress === 100 && (
                      <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
