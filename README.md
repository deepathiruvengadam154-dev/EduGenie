# EduGenie – Smart Personalized Learning Platform

EduGenie is a modern, responsive educational platform that helps students learn effectively through interactive courses, quizzes, progress tracking, and personalized learning recommendations. Built with React, TypeScript, Tailwind CSS, and Chart.js, it delivers a polished, production-ready experience.

## Project Overview

EduGenie provides a complete learning experience — from discovering courses to taking quizzes and tracking progress with visual analytics. The platform uses a smart recommendation system that analyzes quiz performance and suggests the next steps for each student. All data is stored locally in the browser using Local Storage, so no backend database is required.

## Features

- **Home Page** – Hero section, feature highlights, benefits, testimonials, popular courses preview, and call-to-action
- **About Page** – Mission, vision, objectives, and reasons to choose EduGenie
- **Student Registration** – Full name, email, password, department, and year with validation; stored in Local Storage
- **Student Login** – Email/password login with "remember me" session support
- **Student Dashboard** – Welcome message, enrolled courses, quiz statistics, progress percentage, recent activity feed, and personalized recommendations
- **Courses Page** – Five sample courses (Java, Web Development, SQL, Data Structures, Aptitude) with search, category filters, and enrollment
- **Quiz Page** – Multiple-choice quizzes with next/previous navigation, auto-scoring, answer review, and result display
- **Progress Tracking** – Visual charts powered by Chart.js including line chart (quiz score trend), radar chart (course progress), and doughnut chart (completion overview)
- **Contact Page** – Contact form with validation and local storage persistence
- **Personalized Recommendations** – Score-based suggestions (<40%: basic, 40–70%: intermediate, >70%: advanced)
- **Dark Mode** – Toggle between light and dark themes with system preference detection
- **Responsive Design** – Fully responsive across mobile, tablet, and desktop
- **Smooth Scrolling** – Animated transitions and scroll behavior throughout
- **Mobile Navigation** – Slide-in mobile menu with outside-click dismissal
- **Loading Animation** – Branded loading screen on initial app load
- **Social Media Icons** – Footer with social media links

## Technologies Used

| Technology | Purpose |
|-----------|---------|
| React 18 | UI framework |
| TypeScript | Type safety |
| Vite | Build tool & dev server |
| Tailwind CSS | Styling & responsive design |
| Chart.js + react-chartjs-2 | Data visualization |
| Lucide React | Icons |
| Local Storage | Data persistence (users, sessions, enrollments, quiz results) |

## Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/edugenie.git
   cd edugenie
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

5. **Build for production**
   ```bash
   npm run build
   ```

6. **Preview production build**
   ```bash
   npm run preview
   ```


## Project Structure

```
EduGenie/
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.ts
├── tsconfig.json
├── README.md
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── types/
    │   └── index.ts
    ├── lib/
    │   ├── data.ts
    │   ├── storage.ts
    │   ├── recommendation.ts
    │   └── router.ts
    ├── context/
    │   ├── AuthContext.tsx
    │   └── ThemeContext.tsx
    ├── components/
    │   ├── Navbar.tsx
    │   ├── Footer.tsx
    │   ├── Layout.tsx
    │   ├── CourseCard.tsx
    │   ├── ProtectedRoute.tsx
    │   └── LoadingScreen.tsx
    └── pages/
        ├── HomePage.tsx
        ├── AboutPage.tsx
        ├── RegisterPage.tsx
        ├── LoginPage.tsx
        ├── DashboardPage.tsx
        ├── CoursesPage.tsx
        ├── QuizPage.tsx
        ├── QuizTakePage.tsx
        ├── ProgressPage.tsx
        └── ContactPage.tsx
```

## Personalized Recommendation Logic

| Score Range | Recommendation |
|------------|---------------|
| Below 40% | Revise basic concepts and retake quizzes. |
| 40% – 70% | Practice intermediate-level questions. |
| Above 70% | You are ready for advanced learning modules. |

Recommendations are displayed on the dashboard and on the quiz results page, adapting to each student's performance in real time.

## Future Enhancements

- Backend integration with Supabase for cloud-based data persistence
- Real-time collaborative learning features
- Video lecture streaming
- Discussion forums per course
- Certification generation upon course completion
- Gamification with badges and leaderboards
- AI-powered course content generation
- Email notifications for quiz results and recommendations
- Multi-language support

## Author Information

**Project:** EduGenie – Smart Personalized Learning Platform
**Author:** [Deepa T]
**Email:** support@edugenie.com
**GitHub:** [https://github.com/yourusername/edugenie](https://github.com/yourusername/edugenie)

---

© 2026 EduGenie. All rights reserved.
