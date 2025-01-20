const dummyPosts = [
    {
      id: 1,
      content: "React is a popular JavaScript library for building user interfaces. Learn React today and start building amazing web applications!",
      created: "2025-01-01",
      visibility: "public",
    },
    {
      id: 2,
      content: "Node.js is a runtime environment for executing JavaScript on the server side. It's fast, efficient, and widely used.",
      created: "2025-01-02",
      visibility: "public",
    },
    {
      id: 3,
      content: "CSS is essential for creating visually appealing web applications. Master CSS and bring your designs to life!",
      created: "2025-01-03",
      visibility: "private",
    },
    {
      id: 4,
      content: "Framer Motion provides powerful tools for animations in React. Create smooth, interactive animations easily.",
      created: "2025-01-04",
      visibility: "public",
    },
    {
      id: 5,
      content: "JavaScript is the backbone of modern web development. Learn the fundamentals and advanced topics to excel in your career.",
      created: "2025-01-05",
      visibility: "private",
    },
    {
      id: 6,
      content: "TailwindCSS simplifies styling with utility-first classes. Build responsive, modern UIs faster than ever.",
      created: "2025-01-06",
      visibility: "public",
    },
  ];
  
  localStorage.setItem("myPosts", JSON.stringify(dummyPosts));
  