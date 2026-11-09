/** Site copy and structure — taken verbatim (lightly polished) from the institute's content document. */

export const SITE = {
  name: "Harveen Dynamics",
  logoUrl:
    "https://customer-assets-cm19k8pv.emergentagent.net/job_new-institute--78n4wrx0/artifacts/ee4d5e2bfb358d43_Harveen%20LOGO%20PNG.png",
  tagline: "Learn Today. Build Tomorrow. Advance Your Career.",
  logoTagline: "Learn Build Advance",
  email: "crmtraining.96@gmail.com",
  phoneDisplay: "+91 85008 10002",
  phoneHref: "tel:+918500810002",
  location: "Online Training | India",
  whatsappNumber: "918500810002",
};

export function whatsappLink(
  message = "Hi Harveen Dynamics, I am interested in Microsoft Dynamics 365 CRM and Power Platform training. Please share batch details.",
): string {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Learning Journey", href: "/learning-journey" },
  { label: "Careers", href: "/careers" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact", href: "/contact" },
] as const;

export interface Program {
  id: string;
  title: string;
  summary: string;
  topics: string[];
}

export const PROGRAMS: Program[] = [
  {
    id: "d365-crm",
    title: "Dynamics 365 CRM Training",
    summary: "Learn how to configure and manage Dynamics 365 CRM applications.",
    topics: [
      "CRM fundamentals",
      "Dynamics 365 Sales",
      "Customer Service",
      "Dataverse",
      "Security roles",
      "Configurations and customizations",
      "Business process flows",
      "Practical implementation project",
    ],
  },
  {
    id: "power-platform",
    title: "Microsoft Power Platform Training",
    summary: "Automate business processes and build apps across the Microsoft Power Platform.",
    topics: [
      "Model-Driven Apps",
      "JavaScript & Plugins",
      "Cloud flows",
      "Workflow automation",
    ],
  },
  {
    id: "d365-advanced",
    title: "Dynamics 365 Advanced Configuration & Customization",
    summary: "Go beyond the fundamentals with advanced configuration and implementation practice.",
    topics: [
      "Advanced configurations",
      "Solutions and environment management",
      "Business rules",
      "Security configurations",
      "Automation scenarios",
      "Practical implementation exercises",
    ],
  },
];

export const PROGRAM_CHOICES = [
  ...PROGRAMS.map((p) => ({ value: p.id, label: p.title })),
  { value: "unsure", label: "Not sure yet — please guide me" },
];

export const programLabel = (value: string): string =>
  PROGRAM_CHOICES.find((c) => c.value === value)?.label ?? value;

export const WHY_US = [
  {
    title: "Practical, Hands-on Learning",
    description:
      "Learn by working with CRM applications, configurations, automation and practical exercises.",
  },
  {
    title: "Industry-Oriented Curriculum",
    description:
      "Explore concepts and business scenarios relevant to real-world Dynamics 365 implementations.",
  },
  {
    title: "Step-by-Step Guidance",
    description:
      "Learn from foundational concepts to advanced configurations through structured training.",
  },
  {
    title: "Real-World Projects",
    description:
      "Apply your knowledge through implementation-based assignments and practical projects.",
  },
  {
    title: "Career-Focused Learning",
    description: "Build technical knowledge, practical confidence and interview readiness.",
  },
  {
    title: "Flexible Online Learning",
    description:
      "Learn remotely through online instructor-led sessions and supporting learning resources.",
  },
] as const;

export const METHODOLOGY = [
  {
    step: "01",
    name: "Understand",
    description: "Learn CRM fundamentals, concepts and business requirements.",
  },
  {
    step: "02",
    name: "Explore",
    description: "Understand Dynamics 365 applications and the Power Platform ecosystem.",
  },
  {
    step: "03",
    name: "Configure",
    description: "Work with tables, forms, views, security roles and business processes.",
  },
  {
    step: "04",
    name: "Automate",
    description: "Build cloud flows and automate business processes using Power Automate.",
  },
  {
    step: "05",
    name: "Implement",
    description: "Work on practical scenarios and end-to-end implementation projects.",
  },
  {
    step: "06",
    name: "Evaluate",
    description: "Complete assignments, assessments and project presentations.",
  },
] as const;

export const CAREER_ROLES = [
  "Dynamics 365 CRM Functional Consultant",
  "Dynamics 365 CRM Administrator",
  "Power Platform Functional Consultant",
  "CRM Business Analyst",
  "Power Automate Developer",
  "Junior CRM Consultant",
] as const;

export const FAQS = [
  {
    q: "Do I need an IT background to learn Dynamics 365?",
    a: "Not necessarily. Beginners can start with CRM fundamentals and gradually progress to Dynamics 365 configurations and practical concepts. Basic computer knowledge is helpful.",
  },
  {
    q: "Are the classes conducted online?",
    a: "Yes. Our training programs are designed for online learning, with instructor-led sessions and practical demonstrations.",
  },
  {
    q: "Will I get hands-on practice?",
    a: "Our training methodology includes practical exercises and implementation-based projects. Lab access and its availability will be explained before enrollment.",
  },
  {
    q: "Do you provide certificates?",
    a: "Eligible learners who successfully complete the academy's training requirements will receive a Harveen Dynamics Certificate of Completion. This is an academy-issued certificate, not a Microsoft certification.",
  },
  {
    q: "Do you provide interview preparation?",
    a: "Career-oriented guidance, technical interview preparation and project explanation sessions can be included in the relevant training program.",
  },
  {
    q: "Can working professionals join?",
    a: "Yes. Our online learning model is intended to accommodate freshers, working professionals and individuals looking to transition into CRM technology.",
  },
] as const;

export const HERO = {
  badge: "Microsoft Dynamics 365 CRM | Power Platform | Cloud Automation",
  title: "Kickstart your career in Microsoft CRM Dynamics 365 with Harveen Dynamics",
  body: "At Harveen Dynamics, we help aspiring professionals and working individuals develop in-demand technology skills through structured learning, hands-on practice and real-world implementation scenarios. From CRM fundamentals to advanced configurations, customizations and workflow automation — take your learning beyond theory.",
  image:
    "https://images.unsplash.com/photo-1579389083078-4e7018379f7e?crop=entropy&cs=srgb&fm=jpg&q=85",
};

export const HERO_SLIDES = [
  {
    src: "https://images.unsplash.com/photo-1579389083078-4e7018379f7e?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400",
    alt: "Learner attending an online Dynamics 365 training session",
    caption: "Live, instructor-led online sessions",
  },
  {
    src: "https://images.unsplash.com/photo-1758874383467-9aead920c794?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400",
    alt: "Professional configuring a CRM application on a laptop",
    caption: "Hands-on configuration & customization",
  },
  {
    src: "https://images.unsplash.com/photo-1659241869140-3cb7cdff42fd?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400",
    alt: "Team collaborating on a practical implementation project",
    caption: "Real-world implementation projects",
  },
  {
    src: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400",
    alt: "Professionals discussing career growth in a corporate office",
    caption: "Career guidance & interview preparation",
  },
];

export const ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?crop=entropy&cs=srgb&fm=jpg&q=85";

export const STATS = [
  { value: "3", label: "Training Tracks" },
  { value: "6", label: "Learning Stages" },
  { value: "100%", label: "Online — Instructor-led" },
  { value: "1:1", label: "Project Guidance" },
] as const;
