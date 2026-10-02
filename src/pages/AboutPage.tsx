import { Target, Eye, Rocket, CheckCircle2, GraduationCap, BookOpen, Trophy, TrendingUp } from 'lucide-react';
import { navigate } from '@/lib/router';

const objectives = [
  'Provide accessible, high-quality educational content to students worldwide.',
  'Personalize learning paths based on individual performance and preferences.',
  'Foster continuous assessment through interactive quizzes and instant feedback.',
  'Track and visualize student progress to maintain motivation and accountability.',
  'Bridge the gap between academic learning and industry-ready skills.',
];

const whyChoose = [
  { icon: BookOpen, title: 'Comprehensive Curriculum', description: 'Five in-demand courses covering programming, web development, databases, data structures, and aptitude.' },
  { icon: Trophy, title: 'Interactive Assessment', description: 'MCQ quizzes with instant scoring and detailed performance analytics.' },
  { icon: TrendingUp, title: 'Visual Progress Tracking', description: 'Beautiful charts and progress bars powered by Chart.js keep you motivated.' },
  { icon: GraduationCap, title: 'Personalized Recommendations', description: 'Smart suggestions based on your quiz scores guide your next learning steps.' },
];

export default function AboutPage() {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-brand-200/30 blur-3xl dark:bg-brand-900/20" />
        <div className="container-max px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-semibold text-brand-600 dark:text-brand-400">ABOUT US</span>
            <h1 className="mt-2 text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
              About <span className="gradient-text">EduGenie</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
              EduGenie is a smart personalized learning platform designed to help students learn
              effectively through interactive courses, quizzes, progress tracking, and AI-driven
              learning recommendations.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="card p-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-100 dark:bg-brand-900/30">
                <Target className="h-7 w-7 text-brand-600 dark:text-brand-400" />
              </div>
              <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">Our Mission</h2>
              <p className="mt-3 text-gray-600 dark:text-gray-300">
                To empower every student with personalized, accessible, and effective learning
                experiences. We believe that education should adapt to the learner — not the other way
                around. By leveraging data-driven insights and smart recommendations, we help students
                identify their strengths, address weaknesses, and achieve their academic goals.
              </p>
            </div>
            <div className="card p-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-100 dark:bg-accent-900/30">
                <Eye className="h-7 w-7 text-accent-600 dark:text-accent-400" />
              </div>
              <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">Our Vision</h2>
              <p className="mt-3 text-gray-600 dark:text-gray-300">
                To become the go-to platform for personalized education, where every student can learn
                at their own pace, track their progress visually, and receive intelligent guidance that
                maximizes their potential. We envision a world where learning is not one-size-fits-all
                but a tailored journey for each individual.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="bg-gradient-to-b from-brand-50/50 to-white py-16 dark:from-gray-900 dark:to-gray-950">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold text-brand-600 dark:text-brand-400">OBJECTIVES</span>
            <h2 className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              What We Aim to Achieve
            </h2>
          </div>
          <div className="mx-auto mt-10 max-w-3xl space-y-4">
            {objectives.map((obj, i) => (
              <div
                key={i}
                className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-600 dark:text-brand-400" />
                <p className="text-gray-700 dark:text-gray-300">{obj}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="section-padding">
        <div className="container-max">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold text-brand-600 dark:text-brand-400">WHY CHOOSE US</span>
            <h2 className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Why Choose EduGenie?
            </h2>
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              We combine technology, pedagogy, and design to create a learning experience that actually works.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyChoose.map((item, i) => (
              <div
                key={item.title}
                className="card p-6 text-center animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-100 dark:bg-brand-900/30">
                  <item.icon className="h-7 w-7 text-brand-600 dark:text-brand-400" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-max">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 px-6 py-12 text-center shadow-2xl sm:px-12">
            <Rocket className="mx-auto h-10 w-10 text-white" />
            <h2 className="mt-4 text-2xl font-extrabold text-white sm:text-3xl">
              Join the EduGenie Community
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-brand-100">
              Start your personalized learning journey today. It's free and takes less than a minute.
            </p>
            <button
              onClick={() => navigate('register')}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-brand-700 shadow-lg transition-all hover:bg-brand-50 active:scale-95"
            >
              Get Started
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
