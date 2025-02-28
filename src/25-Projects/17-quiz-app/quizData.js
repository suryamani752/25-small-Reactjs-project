export const quizData = [
  {
    question: "What is the primary purpose of React.js?",
    options: [
      "Database management",
      "User interface development",
      "Server-side programming",
      "Mobile app development",
    ],
    correct: 1,
    difficulty: "easy",
    explanation:
      "React is a JavaScript library for building user interfaces, particularly single-page applications.",
  },
  {
    question: "Which hook is used to manage state in functional components?",
    options: ["useEffect", "useState", "useContext", "useReducer"],
    correct: 1,
    difficulty: "easy",
    explanation:
      "useState is the primary hook for adding state to functional components.",
  },
  {
    question: "What is the correct syntax to render a component in React?",
    options: [
      "<MyComponent>",
      "{MyComponent}",
      "<MyComponent />",
      "render(MyComponent)",
    ],
    correct: 2,
    difficulty: "easy",
    explanation:
      "Components are rendered using JSX syntax with self-closing tags when they don't have children.",
  },
  {
    question: "What is the virtual DOM in React?",
    options: [
      "A lightweight version of the actual DOM",
      "A backup of the real DOM",
      "A security feature in React",
      "A testing environment component",
    ],
    correct: 0,
    difficulty: "medium",
    explanation:
      "React uses a virtual DOM to optimize updates by comparing it with the real DOM and making minimal necessary changes.",
  },
  {
    question:
      "Which method is called after a component is rendered for the first time?",
    options: [
      "componentWillMount",
      "componentDidMount",
      "componentWillUpdate",
      "componentDidUpdate",
    ],
    correct: 1,
    difficulty: "medium",
    explanation:
      "componentDidMount is a lifecycle method called after the component is mounted to the DOM.",
  },
  {
    question: "What is the purpose of keys in React lists?",
    options: [
      "To provide unique identifiers for elements",
      "To improve component styling",
      "To handle form submissions",
      "To manage state transitions",
    ],
    correct: 0,
    difficulty: "medium",
    explanation:
      "Keys help React identify which items have changed, are added, or are removed in lists.",
  },
  {
    question: "What is the correct way to update state in React?",
    options: [
      "this.state.count = 5",
      "this.setState({ count: 5 })",
      "setState({ count: 5 })",
      "state.update({ count: 5 })",
    ],
    correct: 1,
    difficulty: "medium",
    explanation:
      "In class components, state should always be updated using setState() method.",
  },
  {
    question: "Which feature helps prevent unnecessary re-renders?",
    options: ["React.memo", "useReducer", "React.fallback", "useEffect"],
    correct: 0,
    difficulty: "hard",
    explanation:
      "React.memo is a higher-order component that memoizes the result to prevent unnecessary re-renders.",
  },
  {
    question: "What is the purpose of useCallback hook?",
    options: [
      "To handle side effects",
      "To memoize callback functions",
      "To manage context API",
      "To create custom hooks",
    ],
    correct: 1,
    difficulty: "hard",
    explanation:
      "useCallback memoizes callback functions to prevent unnecessary re-renders of child components.",
  },
  {
    question:
      "What is the difference between controlled and uncontrolled components?",
    options: [
      "Controlled components use state, uncontrolled use refs",
      "Controlled components use Redux",
      "Uncontrolled components are class-based",
      "They are identical in functionality",
    ],
    correct: 0,
    difficulty: "hard",
    explanation:
      "Controlled components manage form data through React state, while uncontrolled components use DOM references.",
  },
  {
    question: "Which tool is commonly used for server-side rendering in React?",
    options: ["React Router", "Next.js", "Redux", "Webpack"],
    correct: 1,
    difficulty: "hard",
    explanation:
      "Next.js is a popular React framework that supports server-side rendering out of the box.",
  },
  {
    question: "What is the purpose of error boundaries in React?",
    options: [
      "To catch JavaScript errors in component trees",
      "To handle network errors",
      "To validate form inputs",
      "To prevent XSS attacks",
    ],
    correct: 0,
    difficulty: "hard",
    explanation:
      "Error boundaries catch JavaScript errors anywhere in their child component tree and display a fallback UI.",
  },
];
