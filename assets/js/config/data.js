// Blog Data Configuration
const blogConfig = {
  site: {
    author: "Abdulmalik Apata",
    title: "Abdulmalik's Blog",
    description:
      "Notes on backend systems, distributed systems, and things I learn while building.",
    baseUrl: "/",
  },

  navigation: [
    { label: "Blog", href: "/blog", active: true },
    { label: "Papers", href: "/papers" },
    { label: "Projects", href: "/projects" },
    { label: "Portfolio", href: "/" },
  ],

  blogPosts: [
    {
      title: "Redis 101: From a Beginner's POV",
      slug: "redis-101",
      date: "2025-01-15",
      readTime: "8 min read",
      excerpt:
        "Understanding Redis fundamentals - what it is, why it exists, and when to use it.",
      tags: ["Redis", "Databases", "Caching"],
      published: true,
    },
    {
      title: "Distributed Systems 101: From a Beginner's POV",
      slug: "distributed-systems-101",
      date: "2025-01-08",
      readTime: "12 min read",
      excerpt:
        "A beginner-friendly introduction to distributed systems concepts and challenges.",
      tags: ["Distributed Systems", "Architecture"],
      published: true,
    },
    {
      title: "Sockets 101: From a Beginner's POV",
      slug: "sockets-101",
      date: "2024-12-20",
      readTime: "10 min read",
      excerpt:
        "Low-level networking fundamentals - understanding sockets and how they work.",
      tags: ["Networking", "Systems Programming"],
      published: true,
    },
    {
      title: "Recursion 101",
      slug: "recursion-101",
      date: null,
      readTime: null,
      excerpt: "Deep dive into recursive thinking and problem solving.",
      tags: ["Algorithms"],
      published: false,
    },
  ],

  papers: [
    {
      title: "In Search of an Understandable Consensus Algorithm",
      slug: "raft",
      authors: "Diego Ongaro, John Ousterhout",
      year: "2014",
      venue: "USENIX ATC",
      pdfUrl: "https://raft.github.io/raft.pdf",
      websiteUrl: "https://raft.github.io/",
      excerpt:
        "Raft is designed to be more understandable than Paxos while providing equivalent fault tolerance.",
      tags: ["Distributed Systems", "Consensus"],
    },
    {
      title: "MapReduce: Simplified Data Processing on Large Clusters",
      slug: "mapreduce",
      authors: "Jeffrey Dean, Sanjay Ghemawat",
      year: "2004",
      venue: "Google",
      pdfUrl: "https://research.google/pubs/pub62/",
      excerpt:
        "The MapReduce programming model that changed distributed computing.",
      tags: ["Distributed Systems", "Big Data"],
    },
  ],

  projects: [
    {
      title: "HTTP/2 from Scratch",
      slug: "http2-scratch",
      description:
        "A complete HTTP/2 implementation built in Go to understand the protocol at a fundamental level.",
      tags: ["Go", "Networking", "Protocols"],
      githubUrl: "https://github.com/yourusername/http2-go",
      liveUrl: null,
      writeupUrl: null,
    },
    {
      title: "HTTP/1.1 from Scratch",
      slug: "http1-scratch",
      description:
        "Building HTTP/1.1 from the ground up using raw TCP sockets.",
      tags: ["Go", "Networking", "Protocols"],
      githubUrl: "https://github.com/yourusername/http1-go",
      liveUrl: null,
      writeupUrl: null,
    },
  ],

  socialLinks: [
    {
      name: "GitHub",
      url: "https://github.com/yourusername",
      icon: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>',
    },
    {
      name: "Twitter",
      url: "https://twitter.com/yourusername",
      icon: '<path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>',
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/yourusername",
      icon: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
    },
  ],
};

// Helper functions
const formatDate = (dateString) => {
  if (!dateString) return "—";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getPublishedPosts = () => {
  return blogConfig.blogPosts.filter((post) => post.published);
};

const sortPostsByDate = (posts) => {
  return posts.sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date) - new Date(a.date);
  });
};
