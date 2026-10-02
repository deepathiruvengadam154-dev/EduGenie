import { useState } from 'react';
import { Search, BookOpen, X, CheckCircle2 } from 'lucide-react';
import CourseCard from '@/components/CourseCard';
import { courses } from '@/lib/data';
import { useAuth } from '@/context/AuthContext';
import { enrollCourse, isEnrolled, getEnrolledCourses } from '@/lib/storage';
import { navigate } from '@/lib/router';

export default function CoursesPage() {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [enrolledIds, setEnrolledIds] = useState<Set<string>>(
    user ? new Set(getEnrolledCourses(user.email).map((e) => e.courseId)) : new Set()
  );
  const [toast, setToast] = useState('');

  const categories = ['All', ...Array.from(new Set(courses.map((c) => c.category)))];

  const filtered = courses.filter((c) => {
    const matchSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase()) ||
      c.topics.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchCategory = category === 'All' || c.category === category;
    return matchSearch && matchCategory;
  });

  const handleEnroll = (courseId: string, courseTitle: string) => {
    if (!user) {
      navigate('login');
      return;
    }
    enrollCourse(user.email, courseId);
    setEnrolledIds(new Set([...enrolledIds, courseId]));
    setToast(`Enrolled in ${courseTitle}!`);
    setTimeout(() => setToast(''), 3000);
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="absolute -top-12 right-0 h-64 w-64 rounded-full bg-brand-200/30 blur-3xl dark:bg-brand-900/20" />
        <div className="container-max relative px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-sm font-semibold text-brand-600 dark:text-brand-400">COURSES</span>
            <h1 className="mt-2 text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
              Explore Our Courses
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-gray-600 dark:text-gray-300">
              Choose from our expertly crafted courses designed to help you master in-demand skills.
            </p>
          </div>

          {/* Search */}
          <div className="mx-auto mt-8 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search courses, topics..."
                className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-12 pr-12 text-sm shadow-sm transition-all focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>

          {/* Category filters */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  category === cat
                    ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/25'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-brand-300 hover:text-brand-600 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="section-padding">
        <div className="container-max">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <BookOpen className="h-12 w-12 text-gray-300 dark:text-gray-600" />
              <p className="mt-4 text-lg font-semibold text-gray-500 dark:text-gray-400">No courses found</p>
              <p className="text-sm text-gray-400 dark:text-gray-500">Try a different search or category</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((course, i) => (
                <div
                  key={course.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <CourseCard
                    course={course}
                    enrolled={enrolledIds.has(course.id)}
                    progress={enrolledIds.has(course.id) ? (getEnrolledCourses(user?.email || '').find((e) => e.courseId === course.id)?.progress || 0) : 0}
                    onEnroll={() => handleEnroll(course.id, course.title)}
                    onView={() => showToast(`You're enrolled in ${course.title}`)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 animate-fade-in-up">
          <div className="flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white shadow-xl dark:bg-white dark:text-gray-900">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 dark:text-emerald-600" />
            {toast}
          </div>
        </div>
      )}
    </div>
  );
}
