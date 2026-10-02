import type { Course, Quiz } from '@/types';

export const courses: Course[] = [
  {
    id: 'java',
    title: 'Java Programming',
    description: 'Master Java from fundamentals to advanced OOP concepts, collections, and multithreading.',
    longDescription:
      'This comprehensive Java course takes you from the basics of syntax and variables through object-oriented programming, exception handling, collections framework, and multithreading. You will build real-world applications and gain the skills needed for Java certification.',
    duration: '12 weeks',
    level: 'Beginner to Advanced',
    category: 'Programming',
    lessons: 48,
    students: 12400,
    rating: 4.8,
    instructor: 'Dr. Sarah Mitchell',
    image: 'https://images.pexels.com/photos/7325498/pexels-photo-7325498.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
    topics: ['Variables & Data Types', 'Control Flow', 'OOP Principles', 'Collections', 'Exception Handling', 'Multithreading', 'File I/O', 'Lambda Expressions'],
  },
  {
    id: 'web-dev',
    title: 'Web Development',
    description: 'Build modern, responsive websites and web apps with HTML, CSS, JavaScript, and React.',
    longDescription:
      'Learn full-stack web development starting with HTML5 and CSS3, advancing through JavaScript ES6+, React.js, REST APIs, and deployment. By the end, you will have built a portfolio of responsive, interactive web applications.',
    duration: '10 weeks',
    level: 'Beginner to Intermediate',
    category: 'Web',
    lessons: 40,
    students: 18600,
    rating: 4.9,
    instructor: 'Prof. James Anderson',
    image: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
    topics: ['HTML5 Semantics', 'CSS3 & Flexbox', 'Responsive Design', 'JavaScript ES6+', 'DOM Manipulation', 'React Basics', 'REST APIs', 'Deployment'],
  },
  {
    id: 'sql',
    title: 'SQL Fundamentals',
    description: 'Learn database design, SQL queries, joins, subqueries, and performance optimization.',
    longDescription:
      'This SQL course covers everything from basic SELECT statements to complex joins, subqueries, stored procedures, and database normalization. You will work with real datasets and learn to write efficient, optimized queries.',
    duration: '6 weeks',
    level: 'Beginner',
    category: 'Database',
    lessons: 24,
    students: 9800,
    rating: 4.7,
    instructor: 'Dr. Emily Roberts',
    image: 'https://images.pexels.com/photos/669613/pexels-photo-669613.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
    topics: ['Database Design', 'SELECT & WHERE', 'JOINs', 'GROUP BY', 'Subqueries', 'Indexes', 'Normalization', 'Stored Procedures'],
  },
  {
    id: 'dsa',
    title: 'Data Structures',
    description: 'Master arrays, linked lists, trees, graphs, sorting, and searching algorithms.',
    longDescription:
      'A deep dive into data structures and algorithms. Learn arrays, linked lists, stacks, queues, trees, graphs, hashing, and sorting/searching algorithms with hands-on coding exercises. Essential for coding interviews.',
    duration: '8 weeks',
    level: 'Intermediate',
    category: 'Algorithms',
    lessons: 36,
    students: 15200,
    rating: 4.8,
    instructor: 'Prof. Michael Chen',
    image: 'https://images.pexels.com/photos/4976712/pexels-photo-4976712.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
    topics: ['Arrays', 'Linked Lists', 'Stacks & Queues', 'Trees', 'Graphs', 'Hashing', 'Sorting Algorithms', 'Searching Algorithms'],
  },
  {
    id: 'aptitude',
    title: 'Aptitude Training',
    description: 'Sharpen quantitative, logical reasoning, and verbal skills for placement exams.',
    longDescription:
      'Prepare for campus placement exams with comprehensive aptitude training. Cover quantitative aptitude, logical reasoning, verbal ability, and data interpretation. Includes timed practice tests and detailed solutions.',
    duration: '4 weeks',
    level: 'All Levels',
    category: 'Career Prep',
    lessons: 20,
    students: 21000,
    rating: 4.6,
    instructor: 'Ms. Priya Sharma',
    image: 'https://images.pexels.com/photos/5561915/pexels-photo-5561915.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
    topics: ['Quantitative Aptitude', 'Logical Reasoning', 'Verbal Ability', 'Data Interpretation', 'Time & Work', 'Probability', 'Number Series', 'Blood Relations'],
  },
];

export const quizzes: Quiz[] = [
  {
    id: 'quiz-java',
    courseId: 'java',
    title: 'Java Programming Quiz',
    description: 'Test your knowledge of Java fundamentals, OOP, and collections.',
    questions: [
      {
        id: 'q1',
        question: 'Which keyword is used to define a class in Java?',
        options: ['class', 'Class', 'define', 'struct'],
        correctIndex: 0,
      },
      {
        id: 'q2',
        question: 'What is the size of int in Java?',
        options: ['2 bytes', '4 bytes', '8 bytes', 'Depends on system'],
        correctIndex: 1,
      },
      {
        id: 'q3',
        question: 'Which of these is not an OOP principle?',
        options: ['Encapsulation', 'Inheritance', 'Compilation', 'Polymorphism'],
        correctIndex: 2,
      },
      {
        id: 'q4',
        question: 'Which collection allows unique elements only?',
        options: ['ArrayList', 'LinkedList', 'HashSet', 'Vector'],
        correctIndex: 2,
      },
      {
        id: 'q5',
        question: 'What does JVM stand for?',
        options: ['Java Virtual Machine', 'Java Variable Method', 'Java Verified Module', 'Java Visual Manager'],
        correctIndex: 0,
      },
      {
        id: 'q6',
        question: 'Which keyword is used for inheritance in Java?',
        options: ['implements', 'extends', 'inherits', 'super'],
        correctIndex: 1,
      },
      {
        id: 'q7',
        question: 'Which method is the entry point of a Java application?',
        options: ['start()', 'init()', 'main()', 'run()'],
        correctIndex: 2,
      },
      {
        id: 'q8',
        question: 'Which of these is a checked exception?',
        options: ['NullPointerException', 'IOException', 'ArrayIndexOutOfBoundsException', 'ArithmeticException'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'quiz-web-dev',
    courseId: 'web-dev',
    title: 'Web Development Quiz',
    description: 'Test your HTML, CSS, JavaScript, and React knowledge.',
    questions: [
      {
        id: 'q1',
        question: 'What does HTML stand for?',
        options: ['Hyper Text Markup Language', 'High Text Machine Language', 'Hyper Tabular Markup Language', 'None of these'],
        correctIndex: 0,
      },
      {
        id: 'q2',
        question: 'Which CSS property controls text size?',
        options: ['text-size', 'font-size', 'text-style', 'font-style'],
        correctIndex: 1,
      },
      {
        id: 'q3',
        question: 'Which HTML tag is used for the largest heading?',
        options: ['<head>', '<h6>', '<heading>', '<h1>'],
        correctIndex: 3,
      },
      {
        id: 'q4',
        question: 'Inside which HTML element do we put JavaScript?',
        options: ['<js>', '<javascript>', '<script>', '<scripting>'],
        correctIndex: 2,
      },
      {
        id: 'q5',
        question: 'How do you declare a constant in JavaScript (ES6)?',
        options: ['const', 'let', 'var', 'constant'],
        correctIndex: 0,
      },
      {
        id: 'q6',
        question: 'What is JSX?',
        options: ['A JavaScript library', 'A syntax extension for JavaScript', 'A CSS framework', 'A database'],
        correctIndex: 1,
      },
      {
        id: 'q7',
        question: 'Which hook manages state in React?',
        options: ['useEffect', 'useState', 'useContext', 'useReducer'],
        correctIndex: 1,
      },
      {
        id: 'q8',
        question: 'What does API stand for?',
        options: ['Application Programming Interface', 'Application Protocol Interface', 'Advanced Programming Interface', 'Application Process Interface'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'quiz-sql',
    courseId: 'sql',
    title: 'SQL Fundamentals Quiz',
    description: 'Test your SQL querying, joins, and database knowledge.',
    questions: [
      {
        id: 'q1',
        question: 'Which SQL statement is used to retrieve data?',
        options: ['GET', 'SELECT', 'FETCH', 'RETRIEVE'],
        correctIndex: 1,
      },
      {
        id: 'q2',
        question: 'Which clause is used to filter results?',
        options: ['FILTER', 'WHERE', 'CONDITION', 'SEARCH'],
        correctIndex: 1,
      },
      {
        id: 'q3',
        question: 'Which JOIN returns all rows from both tables?',
        options: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL OUTER JOIN'],
        correctIndex: 3,
      },
      {
        id: 'q4',
        question: 'Which keyword eliminates duplicate rows?',
        options: ['UNIQUE', 'DISTINCT', 'SINGLE', 'NODUP'],
        correctIndex: 1,
      },
      {
        id: 'q5',
        question: 'What does DDL stand for?',
        options: ['Data Definition Language', 'Data Description Language', 'Data Design Language', 'Data Declaring Language'],
        correctIndex: 0,
      },
      {
        id: 'q6',
        question: 'Which function counts the number of rows?',
        options: ['TOTAL()', 'NUMBER()', 'COUNT()', 'SUM()'],
        correctIndex: 2,
      },
      {
        id: 'q7',
        question: 'Which normal form eliminates transitive dependencies?',
        options: ['1NF', '2NF', '3NF', 'BCNF'],
        correctIndex: 2,
      },
      {
        id: 'q8',
        question: 'Which command removes all records but keeps the table structure?',
        options: ['DELETE', 'DROP', 'TRUNCATE', 'REMOVE'],
        correctIndex: 2,
      },
    ],
  },
  {
    id: 'quiz-dsa',
    courseId: 'dsa',
    title: 'Data Structures Quiz',
    description: 'Test your knowledge of arrays, trees, graphs, and algorithms.',
    questions: [
      {
        id: 'q1',
        question: 'What is the time complexity of binary search?',
        options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
        correctIndex: 1,
      },
      {
        id: 'q2',
        question: 'Which data structure uses LIFO order?',
        options: ['Queue', 'Stack', 'Array', 'Linked List'],
        correctIndex: 1,
      },
      {
        id: 'q3',
        question: 'What is the height of a balanced binary tree with n nodes?',
        options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'],
        correctIndex: 1,
      },
      {
        id: 'q4',
        question: 'Which sorting algorithm has the best average time complexity?',
        options: ['Bubble Sort', 'Selection Sort', 'Quick Sort', 'Insertion Sort'],
        correctIndex: 2,
      },
      {
        id: 'q5',
        question: 'In a graph, what is BFS?',
        options: ['Best First Search', 'Breadth First Search', 'Binary First Search', 'Branch First Search'],
        correctIndex: 1,
      },
      {
        id: 'q6',
        question: 'Which data structure is best for implementing a priority queue?',
        options: ['Array', 'Linked List', 'Heap', 'Stack'],
        correctIndex: 2,
      },
      {
        id: 'q7',
        question: 'What is the worst-case time complexity of Quick Sort?',
        options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
        correctIndex: 2,
      },
      {
        id: 'q8',
        question: 'A hash table with chaining has average search complexity of?',
        options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'],
        correctIndex: 2,
      },
    ],
  },
  {
    id: 'quiz-aptitude',
    courseId: 'aptitude',
    title: 'Aptitude Training Quiz',
    description: 'Test your quantitative, logical, and verbal aptitude.',
    questions: [
      {
        id: 'q1',
        question: 'If a train travels 60 km in 45 minutes, what is its speed?',
        options: ['60 km/h', '70 km/h', '80 km/h', '90 km/h'],
        correctIndex: 2,
      },
      {
        id: 'q2',
        question: 'Find the next number: 2, 6, 12, 20, 30, ?',
        options: ['40', '42', '44', '46'],
        correctIndex: 1,
      },
      {
        id: 'q3',
        question: 'A shop gives 20% discount on a $50 item. What is the sale price?',
        options: ['$35', '$38', '$40', '$42'],
        correctIndex: 2,
      },
      {
        id: 'q4',
        question: 'If 5x = 45, then x = ?',
        options: ['7', '8', '9', '10'],
        correctIndex: 2,
      },
      {
        id: 'q5',
        question: 'Choose the synonym of "Abundant":',
        options: ['Scarce', 'Plentiful', 'Limited', 'Empty'],
        correctIndex: 1,
      },
      {
        id: 'q6',
        question: 'A is the father of B. But B is not the son of A. How is B related to A?',
        options: ['Niece', 'Daughter', 'Cousin', 'Nephew'],
        correctIndex: 1,
      },
      {
        id: 'q7',
        question: 'What is 15% of 200?',
        options: ['25', '30', '35', '40'],
        correctIndex: 1,
      },
      {
        id: 'q8',
        question: 'Complete the series: A, C, E, G, ?',
        options: ['H', 'I', 'J', 'K'],
        correctIndex: 1,
      },
    ],
  },
];

export function getCourseById(id: string): Course | undefined {
  return courses.find((c) => c.id === id);
}

export function getQuizByCourseId(courseId: string): Quiz | undefined {
  return quizzes.find((q) => q.courseId === courseId);
}

export function getQuizById(id: string): Quiz | undefined {
  return quizzes.find((q) => q.id === id);
}
