import type { User, UserData, QuizResult, EnrolledCourse, Activity } from '@/types';

const USERS_KEY = 'edugenie_users';
const SESSION_KEY = 'edugenie_session';
const THEME_KEY = 'edugenie_theme';

function getUserDataKey(email: string): string {
  return `edugenie_data_${email}`;
}

// ---------- Users ----------
export function getUsers(): User[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveUser(user: User): void {
  const users = getUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function findUser(email: string): User | undefined {
  return getUsers().find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function validateLogin(email: string, password: string): User | null {
  const user = findUser(email);
  if (user && user.password === password) return user;
  return null;
}

// ---------- Session ----------
export function setSession(email: string, remember: boolean): void {
  const value = JSON.stringify({ email, remember });
  if (remember) {
    localStorage.setItem(SESSION_KEY, value);
  } else {
    sessionStorage.setItem(SESSION_KEY, value);
  }
}

export function getSession(): { email: string; remember: boolean } | null {
  const raw = localStorage.getItem(SESSION_KEY) || sessionStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(SESSION_KEY);
}

// ---------- User Data (enrollments, quizzes, activities) ----------
function emptyUserData(): UserData {
  return { enrolledCourses: [], quizResults: [], activities: [] };
}

export function getUserData(email: string): UserData {
  try {
    const raw = localStorage.getItem(getUserDataKey(email));
    return raw ? JSON.parse(raw) : emptyUserData();
  } catch {
    return emptyUserData();
  }
}

export function saveUserData(email: string, data: UserData): void {
  localStorage.setItem(getUserDataKey(email), JSON.stringify(data));
}

export function enrollCourse(email: string, courseId: string): void {
  const data = getUserData(email);
  if (data.enrolledCourses.some((c) => c.courseId === courseId)) return;
  data.enrolledCourses.push({
    courseId,
    enrolledAt: new Date().toISOString(),
    progress: 0,
  });
  data.activities.unshift({
    id: crypto.randomUUID(),
    type: 'enroll',
    description: `Enrolled in a new course`,
    timestamp: new Date().toISOString(),
  });
  saveUserData(email, data);
}

export function updateCourseProgress(email: string, courseId: string, progress: number): void {
  const data = getUserData(email);
  const course = data.enrolledCourses.find((c) => c.courseId === courseId);
  if (course) {
    course.progress = Math.min(100, Math.max(course.progress, progress));
    if (course.progress === 100) {
      data.activities.unshift({
        id: crypto.randomUUID(),
        type: 'complete',
        description: `Completed a course`,
        timestamp: new Date().toISOString(),
      });
    }
    saveUserData(email, data);
  }
}

export function saveQuizResult(email: string, result: QuizResult): void {
  const data = getUserData(email);
  data.quizResults.push(result);
  data.activities.unshift({
    id: crypto.randomUUID(),
    type: 'quiz',
    description: `Scored ${result.percentage}% on ${result.quizTitle}`,
    timestamp: new Date().toISOString(),
  });
  saveUserData(email, data);
}

export function isEnrolled(email: string, courseId: string): boolean {
  const data = getUserData(email);
  return data.enrolledCourses.some((c) => c.courseId === courseId);
}

export function getEnrolledCourses(email: string): EnrolledCourse[] {
  return getUserData(email).enrolledCourses;
}

export function getQuizResults(email: string): QuizResult[] {
  return getUserData(email).quizResults;
}

export function getActivities(email: string): Activity[] {
  return getUserData(email).activities;
}

export function getAverageScore(email: string): number {
  const results = getQuizResults(email);
  if (results.length === 0) return 0;
  const total = results.reduce((sum, r) => sum + r.percentage, 0);
  return Math.round(total / results.length);
}

export function getOverallProgress(email: string): number {
  const enrolled = getEnrolledCourses(email);
  if (enrolled.length === 0) return 0;
  const total = enrolled.reduce((sum, c) => sum + c.progress, 0);
  return Math.round(total / enrolled.length);
}

// ---------- Theme ----------
export function getTheme(): 'light' | 'dark' {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === 'dark' || stored === 'light') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function setTheme(theme: 'light' | 'dark'): void {
  localStorage.setItem(THEME_KEY, theme);
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}
