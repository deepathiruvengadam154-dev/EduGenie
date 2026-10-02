import {
  GraduationCap,
  BookOpen,
  Trophy,
  TrendingUp,
  Brain,
  Target,
  Users,
  Clock,
  Award,
  ArrowRight,
  Star,
  Quote,
} from 'lucide-react';
import { navigate } from '@/lib/router';
import { courses } from '@/lib/data';

const features = [
  {
    icon: BookOpen,
    title: 'Expert-Crafted Courses',
    description: 'Learn from industry experts with carefully structured courses covering Java, Web Dev, SQL, Data Structures, and more.',
  },
  {
    icon: Brain,
    title: 'Smart Recommendations',
    description: 'Get personalized learning suggestions based on your quiz performance and progress data.',
  },
  {
    icon: Trophy,
    title: 'Interactive Quizzes',
    description: 'Test your knowledge with MCQ quizzes, instant scoring, and detailed performance feedback.',
  },
  {
    icon: TrendingUp,
    title: 'Progress Tracking',
    description: 'Visualize your learning journey with progress bars, performance charts, and activity logs.',
  },
];

const benefits = [
  { icon: Target, title: 'Goal-Oriented Learning', description: 'Set and achieve learning milestones with clear progress indicators.' },
  { icon: Clock, title: 'Learn at Your Pace', description: 'Access course materials anytime and learn at a speed that suits you.' },
  { icon: Award, title: 'Skill Verification', description: 'Validate your knowledge through quizzes and track improvement over time.' },
  { icon: Users, title: 'Community Learning', description: 'Join thousands of students on the same learning journey as you.' },
];

const testimonials = [
  {
    name: 'Ananya Patel',
    role: 'Computer Science Student',
    rating: 5,
    text: 'EduGenie transformed my learning experience. The personalized recommendations helped me focus on areas where I needed the most improvement.',
  },
  {
    name: 'Rahul Verma',
    role: 'IT Graduate',
    rating: 5,
    text: 'The quiz system is fantastic. I could track my progress over time and see exactly where I was improving. It prepared me perfectly for placements.',
  },
  {
    name: 'Sneha Reddy',
    role: 'Software Engineering Student',
    rating: 5,
    text: 'The course variety is excellent. From Java to Data Structures, everything is well-structured. The progress charts keep me motivated!',
  },
];

const stats = [
  { value: '5', label: 'Expert Courses' },
  { value: '40+', label: 'Quiz Questions' },
  { value: '75K+', label: 'Students Enrolled' },
  { value: '4.8', label: 'Average Rating' },
];

export default function HomePage() {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-accent-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" />
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-brand-200/30 blur-3xl dark:bg-brand-900/20" />
          <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-accent-200/30 blur-3xl dark:bg-accent-900/20" />
        </div>

        <div className="container-max px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="animate-fade-in-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-xs font-semibold text-brand-700 dark:border-brand-800 dark:bg-brand-900/20 dark:text-brand-300">
                <Brain className="h-3.5 w-3.5" />
                AI-Powered Learning Platform
              </span>
              <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
                Learn Smarter with{' '}
                <span className="gradient-text">EduGenie</span>
              </h1>
              <p className="mt-6 max-w-lg text-lg text-gray-600 dark:text-gray-300">
                Your personalized learning companion. Master new skills through interactive courses,
                quizzes, and progress tracking — tailored to your unique learning journey.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <button onClick={() => navigate('register')} className="btn-primary">
                  Get Started Free
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button onClick={() => navigate('courses')} className="btn-secondary">
                  <BookOpen className="h-4 w-4" />
                  Explore Courses
                </button>
              </div>

              {/* Stats */}
              <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-2xl font-extrabold text-brand-600 dark:text-brand-400">{stat.value}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero image */}
            <div className="relative animate-scale-in">
              <div className="relative rounded-3xl bg-white p-2 shadow-2xl dark:bg-gray-900">
                <img
                  src="https://images.pexels.com/photos/5212666/pexels-photo-5212666.jpeg?auto=compress&cs=tinysrgb&h=600&w=800"
                  alt="Students learning online"
                  className="h-[400px] w-full rounded-2xl object-cover"
                />
                <div className="absolute -bottom-4 -left-4 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-xl dark:bg-gray-800">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 dark:bg-brand-900/30">
                    <Trophy className="h-6 w-6 text-brand-600 dark:text-brand-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">Quiz Champion</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">85% avg score</p>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-xl dark:bg-gray-800">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-900/30">
                    <TrendingUp className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">Progress Up</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">+24% this week</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding">
        <div className="container-max">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold text-brand-600 dark:text-brand-400">FEATURES</span>
            <h2 className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Everything You Need to Learn Effectively
            </h2>
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              EduGenie brings together courses, quizzes, progress tracking, and personalized
              recommendations in one seamless platform.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className="card p-6 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 dark:bg-brand-900/30">
                  <feature.icon className="h-6 w-6 text-brand-600 dark:text-brand-400" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-gradient-to-b from-brand-50/50 to-white py-16 dark:from-gray-900 dark:to-gray-950">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="text-sm font-semibold text-brand-600 dark:text-brand-400">BENEFITS</span>
              <h2 className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                Why Students Love EduGenie
              </h2>
              <p className="mt-4 text-gray-500 dark:text-gray-400">
                We've designed every feature with the student in mind. From personalized learning paths
                to real-time progress tracking, EduGenie adapts to your needs.
              </p>
              <div className="mt-8 space-y-4">
                {benefits.map((benefit) => (
                  <div key={benefit.title} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand-100 dark:bg-brand-900/30">
                      <benefit.icon className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{benefit.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.pexels.com/photos/8199557/pexels-photo-8199557.jpeg?auto=compress&cs=tinysrgb&h=600&w=800"
                alt="Student studying"
                className="rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 rounded-2xl bg-white px-6 py-4 shadow-xl dark:bg-gray-800">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="h-8 w-8 rounded-full border-2 border-white bg-gradient-to-br from-brand-400 to-accent-400 dark:border-gray-800"
                      />
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">75,000+ Students</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Learning right now</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Courses Preview */}
      <section className="section-padding">
        <div className="container-max">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-sm font-semibold text-brand-600 dark:text-brand-400">COURSES</span>
              <h2 className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                Popular Courses
              </h2>
            </div>
            <button onClick={() => navigate('courses')} className="hidden btn-ghost sm:flex">
              View All
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.slice(0, 3).map((course) => (
              <div key={course.id} className="card overflow-hidden">
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-700">
                    {course.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 dark:text-white">{course.title}</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{course.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="flex items-center gap-1 text-sm text-amber-500">
                      <Star className="h-4 w-4 fill-current" />
                      {course.rating}
                    </span>
                    <span className="text-sm font-semibold text-brand-600 dark:text-brand-400">{course.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <button onClick={() => navigate('courses')} className="btn-secondary">
              View All Courses
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gradient-to-b from-white to-brand-50/50 py-16 dark:from-gray-950 dark:to-gray-900">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold text-brand-600 dark:text-brand-400">TESTIMONIALS</span>
            <h2 className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              What Our Students Say
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className="card p-6 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <Quote className="h-8 w-8 text-brand-200 dark:text-brand-800" />
                <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">{t.text}</p>
                <div className="mt-4 flex items-center gap-1">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-accent-500 text-sm font-bold text-white">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{t.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-max">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 px-6 py-16 text-center shadow-2xl sm:px-12">
            <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-accent-400/20 blur-2xl" />
            <div className="relative">
              <GraduationCap className="mx-auto h-12 w-12 text-white" />
              <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
                Ready to Start Your Learning Journey?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-brand-100">
                Join thousands of students who are learning smarter with EduGenie. Sign up free today
                and get personalized course recommendations.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => navigate('register')}
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-brand-700 shadow-lg transition-all hover:bg-brand-50 active:scale-95"
                >
                  Sign Up Free
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => navigate('about')}
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10 active:scale-95"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
