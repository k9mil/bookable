export interface PRD {
  id: string;
  title: string;
  description: string;
  author: string;
  date: string;
  status: "View Summary";
  version: string;
  keyFeatures: string[];
  timeline: {
    development: string;
    mvp: string;
    budget: string;
  };
  imageUrl: string;
}

export const samplePRDs: PRD[] = [
  {
    id: "1",
    title: "EcoCommerce Platform",
    description:
      "A sustainable e-commerce platform that connects eco-conscious consumers with verified sustainable product vendors.",
    author: "Sarah Chen",
    date: "2024-02-15",
    status: "View Summary",
    version: "1.0 - Draft",
    keyFeatures: [
      "Vendor sustainability verification system",
      "Carbon footprint tracking for shipments",
      "Eco-packaging options",
      "Product lifecycle transparency",
    ],
    timeline: {
      development: "4-6 months",
      mvp: "2-3 months",
      budget: "£150K-200K",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "2",
    title: "HealthTech Patient Portal",
    description:
      "A comprehensive patient management system with integrated telehealth capabilities.",
    author: "Michael Rodriguez",
    date: "2024-02-14",
    status: "View Summary",
    version: "2.1 - Beta",
    keyFeatures: [
      "Virtual consultations",
      "Medical records management",
      "Prescription tracking",
      "Appointment scheduling",
    ],
    timeline: {
      development: "6-8 months",
      mvp: "3-4 months",
      budget: "£200K-250K",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "3",
    title: "AI-Powered Learning Platform",
    description:
      "An adaptive learning platform that personalizes education using artificial intelligence.",
    author: "Emma Watson",
    date: "2024-02-13",
    status: "View Summary",
    version: "3.0",
    keyFeatures: [
      "Personalized learning paths",
      "Real-time progress tracking",
      "AI-driven content recommendations",
      "Interactive assessments",
    ],
    timeline: {
      development: "8-10 months",
      mvp: "4-5 months",
      budget: "£300K-350K",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "4",
    title: "Smart City Management System",
    description:
      "An integrated platform for managing urban infrastructure and services using IoT sensors.",
    author: "David Park",
    date: "2024-02-12",
    status: "View Summary",
    version: "0.5 - Alpha",
    keyFeatures: [
      "Real-time traffic monitoring",
      "Smart waste management",
      "Energy consumption optimization",
      "Public safety analytics",
    ],
    timeline: {
      development: "12-14 months",
      mvp: "6-7 months",
      budget: "£500K-600K",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=400",
  },
];
