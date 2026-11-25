/* ============================================================
   SITE CONFIG — এটাই তোমার সহজ কন্ট্রোল প্যানেল
   শুধু এই ফাইলের লেখাগুলো বদলালেই পুরো সাইট বদলে যাবে।
   কোনো secret / API key এখানে লিখবে না।
   ============================================================ */

const SITE_CONFIG = {
  // TODO: তোমার আসল তথ্য বসাও
  name: "Muhammad Ashik Madani",
  firstName: "Muhammad Ashik",
  // EXAMPLE: নিচের role / bio / stats / services / projects
  // রেফারেন্স ডিজাইন থেকে নেওয়া উদাহরণ — নিজেরটা বসিয়ে নাও।
  role: "Product Designer",
  location: "Bangladesh",
  tagline: "Hello There!",
  bio: "I'm an experienced Product Designer, collaborating with various companies and startups. Replace this bio with your own story.",
  email: "you@example.com", // TODO: আসল ইমেইল বসাও
  github: "https://github.com/muhammadashikmadani08-tech",
  facebook: "", // TODO: চাইলে ফেসবুক প্রোফাইল লিংক বসাও, না চাইলে খালি রাখো
  // Contact form: খালি রাখলে ফর্ম mailto + copy draft হিসেবে কাজ করবে।
  // Formspree ব্যবহার করতে চাইলে এখানে শুধু form ID বসাও (এটা secret নয়)।
  // উদাহরণ: "abcdwxyz" — আসল ID https://formspree.io থেকে নিতে হবে।
  formspreeFormId: "",

  stats: [
    { value: "600+", label: "Project Completed" },
    { value: "50+", label: "Industry Covered" },
    { value: "18+", label: "Years of Experience" },
  ],

  services: [
    {
      title: "UI/UX Design",
      description: "User-friendly interfaces and smooth experiences, from research to final screens.",
      icon: "◈",
    },
    {
      title: "Application Design",
      description: "Mobile and web app design with clear flows, wireframes and prototypes.",
      icon: "▣",
    },
    {
      title: "Website Design",
      description: "Modern, responsive websites that look good on phone, tablet and desktop.",
      icon: "▤",
    },
  ],

  marquee: ["App Design", "Website Design", "Dashboard", "Wireframe", "UI/UX Design"],

  tools: ["Figma", "Adobe XD", "Photoshop", "Illustrator", "Sketch", "Framer"],

  projects: [
    { title: "E-commerce App Design", category: "App Design", description: "A clean shopping app with simple checkout flow.", year: "2025" },
    { title: "Business Website", category: "Website Design", description: "A fast, responsive website for a local business.", year: "2025" },
    { title: "Analytics Dashboard", category: "Dashboard", description: "Charts and reports that are easy to read at a glance.", year: "2024" },
    { title: "Travel App Wireframe", category: "Wireframe", description: "Wireframes and user flows for a travel booking app.", year: "2024" },
    { title: "Portfolio Website", category: "Website Design", description: "A personal portfolio with services, projects and contact.", year: "2024" },
    { title: "Food Delivery App", category: "App Design", description: "Ordering flow designed for speed and clarity.", year: "2023" },
  ],

  process: [
    { step: "01", title: "Discover", description: "Understand the goal, users and requirements." },
    { step: "02", title: "Design", description: "Wireframes, UI design and interactive prototypes." },
    { step: "03", title: "Deliver", description: "Handoff, feedback and final polish." },
  ],
};

// Make it available to script.js and admin.html
if (typeof window !== "undefined") window.SITE_CONFIG = SITE_CONFIG;
