export function getRecommendation(avgScore: number): { message: string; level: 'basic' | 'intermediate' | 'advanced' } {
  if (avgScore < 40) {
    return {
      message: 'Revise basic concepts and retake quizzes.',
      level: 'basic',
    };
  }
  if (avgScore <= 70) {
    return {
      message: 'Practice intermediate-level questions.',
      level: 'intermediate',
    };
  }
  return {
    message: 'You are ready for advanced learning modules.',
    level: 'advanced',
  };
}

export function getRecommendationColor(level: 'basic' | 'intermediate' | 'advanced'): string {
  switch (level) {
    case 'basic':
      return 'text-amber-600 dark:text-amber-400';
    case 'intermediate':
      return 'text-brand-600 dark:text-brand-400';
    case 'advanced':
      return 'text-emerald-600 dark:text-emerald-400';
  }
}

export function getRecommendationBg(level: 'basic' | 'intermediate' | 'advanced'): string {
  switch (level) {
    case 'basic':
      return 'bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800';
    case 'intermediate':
      return 'bg-brand-50 border-brand-200 dark:bg-brand-900/20 dark:border-brand-800';
    case 'advanced':
      return 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800';
  }
}
