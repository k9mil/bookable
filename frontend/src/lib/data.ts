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
    title: "Local Marketplace App",
    description:
      "A digital marketplace that enables local artisans to showcase and sell their handcrafted products directly to community members. The platform simplifies the buying process with basic vendor profiles and a straightforward search system.",
    author: "Sarah Chen",
    date: "2024-02-15",
    status: "View Summary",
    version: "1.0 - Draft",
    keyFeatures: [
      "Basic vendor profiles",
      "Product listings",
      "Simple search function",
      "Contact form",
    ],
    timeline: {
      development: "2-3 weeks",
      mvp: "1 week",
      budget: "£2K-3K",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "2",
    title: "Clinic Appointment System",
    description:
      "A streamlined booking system designed to help small medical clinics manage their daily patient appointments efficiently. The system includes basic patient record management and automated email notifications to reduce administrative overhead.",
    author: "Michael Rodriguez",
    date: "2024-02-14",
    status: "View Summary",
    version: "2.1 - Beta",
    keyFeatures: [
      "Appointment booking",
      "Email notifications",
      "Basic patient records",
      "Calendar view",
    ],
    timeline: {
      development: "3-4 weeks",
      mvp: "2 weeks",
      budget: "£4K-5K",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "3",
    title: "Study Group Platform",
    description:
      "A collaborative platform that connects students with similar academic interests to form and participate in study groups. The system facilitates knowledge sharing through integrated discussion boards and simple file-sharing capabilities.",
    author: "Emma Watson",
    date: "2024-02-13",
    status: "View Summary",
    version: "3.0",
    keyFeatures: [
      "Group creation",
      "Study material sharing",
      "Discussion board",
      "Event scheduling",
    ],
    timeline: {
      development: "4-5 weeks",
      mvp: "2 weeks",
      budget: "£3K-4K",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "4",
    title: "Neighborhood Watch App",
    description:
      "A community safety application that enables residents to report and track incidents in their local area. The platform features a real-time alert system and a community message board to keep neighbors informed and connected.",
    author: "David Park",
    date: "2024-02-12",
    status: "View Summary",
    version: "0.5 - Alpha",
    keyFeatures: [
      "Incident reporting",
      "Alert notifications",
      "Community message board",
      "Emergency contacts",
    ],
    timeline: {
      development: "5-6 weeks",
      mvp: "3 weeks",
      budget: "£5K-6K",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=400",
  },
];
