export interface User {
  fullName: string;
  email: string;
  password: string;
  department: string;
  year: string;
  createdAt: string;
}

export interface QuizResult {
  quizId: string;
  quizTitle: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  takenAt: string;
}

export interface EnrolledCourse {
  courseId: string;
  enrolledAt: string;
  progress: number;
}

export interface Activity {
  id: string;
  type: 'enroll' | 'quiz' | 'complete';
  description: string;
  timestamp: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  duration: string;
  level: string;
  category: string;
  lessons: number;
  students: number;
  rating: number;
  instructor: string;
  image: string;
  topics: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
}

export interface Quiz {
  id: string;
  courseId: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
}

export interface UserData {
  enrolledCourses: EnrolledCourse[];
  quizResults: QuizResult[];
  activities: Activity[];
}
