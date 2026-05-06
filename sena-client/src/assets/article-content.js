const articles = [
  {
    name: 'react-components',
    title: 'Understanding React Components',
    image:
      'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1200&q=80',
    content: [
      'React components are the building blocks of a React application. Each component is a reusable piece of UI that can accept data through props and manage its own behavior when needed.',
      'A component can be as small as a button or as large as an entire page section. By breaking interfaces into components, developers can build applications that are easier to understand, maintain, and reuse.',
      'Functional components are the most common modern approach in React. They work especially well with hooks, making state and side effects easier to manage in a clean and readable way.',
    ],
  },
  {
    name: 'props-and-state',
    title: 'Props and State in React',
    image:
      'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=1200&q=80',
    content: [
      'Props are used to pass data from one component to another, usually from a parent component down to a child component. They help make components dynamic and reusable.',
      'State, on the other hand, is data managed inside a component. When state changes, React updates the component so the UI stays in sync with the latest data.',
      'A good rule is to use props for external input and state for internal values that can change over time, such as form fields, counters, or toggles.',
    ],
  },
  {
    name: 'react-routing',
    title: 'Routing with React Router',
    image:
      'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=1200&q=80',
    content: [
      'React Router allows developers to create multi-page experiences in a single-page application. Instead of loading a completely new HTML page, it swaps components based on the current URL.',
      'Routes can be nested, which is useful for layouts such as dashboards. For example, a dashboard layout can stay visible while different child pages like reports or users render inside it.',
      'This approach creates smoother navigation and helps organize app structure in a way that feels familiar to users.',
    ],
  },
  {
    name: 'hooks-overview',
    title: 'A Beginner Overview of React Hooks',
    image:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    content: [
      'Hooks are special functions in React that let functional components use features like state, effects, and context. They made function components much more powerful and flexible.',
      'Some of the most common hooks are useState for managing values, useEffect for side effects, and useRef for storing values between renders without triggering updates.',
      'For beginners, learning hooks is important because most modern React codebases use them heavily in everyday development.',
    ],
  },
];

export default articles;
