import { Star, Clock, BookOpen, Users, CheckCircle } from 'lucide-react';
import type { Course } from '@/types';

interface CourseCardProps {
  course: Course;
  enrolled?: boolean;
  progress?: number;
  onEnroll?: () => void;
  onView?: () => void;
}

export default function CourseCard({ course, enrolled, progress = 0, onEnroll, onView }: CourseCardProps) {
  return (
    <div className="card group overflow-hidden flex flex-col animate-fade-in-up">
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <span className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-700 backdrop-blur">
          {course.category}
        </span>
        <span className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-amber-600 backdrop-blur">
          <Star className="h-3.5 w-3.5 fill-current" />
          {course.rating}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{course.title}</h3>
        <p className="mt-2 flex-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
          {course.description}
        </p>

        {/* Stats */}
        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {course.duration}
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5" />
            {course.lessons} lessons
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            {(course.students / 1000).toFixed(1)}k
          </span>
        </div>

        {/* Progress bar if enrolled */}
        {enrolled && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500 dark:text-gray-400">Progress</span>
              <span className="font-semibold text-brand-600 dark:text-brand-400">{progress}%</span>
            </div>
            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Instructor */}
        <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">By {course.instructor}</p>

        {/* Actions */}
        <div className="mt-4 flex gap-2">
          {enrolled ? (
            <button
              onClick={onView}
              className="btn-secondary flex-1 text-sm"
            >
              <CheckCircle className="h-4 w-4" />
              Enrolled
            </button>
          ) : (
            <button
              onClick={onEnroll}
              className="btn-primary flex-1 text-sm"
            >
              Enroll Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
