"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

// Project data - same as home page
const projects = [
  {
    id: 1,
    title: "AI Driven Email Reply Classifications",
    category: "Unify",
  },
  {
    id: 2,
    title: "Notifications",
    category: "Unify",
  },
  {
    id: 3,
    title: "One-off Sales Tasks",
    category: "Unify",
  },
  {
    id: 5,
    title: "Select Product Wins",
    category: "Unify",
  },
  {
    id: 6,
    title: "Investing in CRE",
    category: "Cadre",
  },
  {
    id: 7,
    title: "Track Social Signals",
    category: "Unify",
  },
  {
    id: 8,
    title: "Design System",
    category: "Cadre",
  },
];

export default function ProjectPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = parseInt(params.id as string);
  const project = projects.find((p) => p.id === projectId);
  
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState("");
  const [showJumpToTop, setShowJumpToTop] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [projectCardModalOpen, setProjectCardModalOpen] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
  
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
      return savedTheme || "dark";
    }
    return "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.style.setProperty("--background", "#0A0A0A");
      root.style.setProperty("--foreground", "#FFFFFF");
    } else {
      root.style.setProperty("--background", "#F7F6F4");
      root.style.setProperty("--foreground", "#000000");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "timpark2026") {
      setIsAuthenticated(true);
      setError("");
      // Store authentication in sessionStorage for all projects
      if (typeof window !== "undefined") {
        sessionStorage.setItem("project-auth", "true");
      }
    } else {
      setError("Incorrect password. Please try again.");
      setPassword("");
    }
  };

  useEffect(() => {
    // Check if already authenticated for any project
    if (typeof window !== "undefined") {
      const authStatus = sessionStorage.getItem("project-auth");
      if (authStatus === "true") {
        setIsAuthenticated(true);
      }
    }
  }, []);

  useEffect(() => {
    // Close modal on ESC key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && imageModalOpen) {
        setImageModalOpen(false);
      }
      if (e.key === "Escape" && projectCardModalOpen) {
        setProjectCardModalOpen(false);
        setSelectedCardIndex(null);
      }
    };
    if (imageModalOpen || projectCardModalOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [imageModalOpen, projectCardModalOpen]);

  useEffect(() => {
    // Track scroll direction for "Jump to top" button
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Only show if scrolled down a bit (e.g., more than 200px)
      if (currentScrollY > 200) {
        // Scrolling up
        if (currentScrollY < lastScrollY) {
          setShowJumpToTop(true);
        } 
        // Scrolling down
        else if (currentScrollY > lastScrollY) {
          setShowJumpToTop(false);
        }
      } else {
        setShowJumpToTop(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleJumpToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!project) {
    return (
      <main className="min-h-screen bg-background px-6 py-6 md:px-[200px] md:py-[60px] lg:px-[320px] xl:px-[400px] 2xl:px-[400px] 2xl:py-[60px]">
        <div className="2xl:max-w-[1192px] 2xl:mx-auto">
          <p className="text-foreground">Project not found</p>
        </div>
      </main>
    );
  }

  // Password protection screen
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-background px-6 py-6 md:px-[200px] md:py-[60px] lg:px-[320px] xl:px-[400px] 2xl:px-[400px] 2xl:py-[60px] flex items-center justify-center">
        <div className="2xl:max-w-[1192px] 2xl:mx-auto w-full">
          <div className="flex flex-col items-center justify-center">
            <form onSubmit={handlePasswordSubmit} className="w-full max-w-xs">
              <div className="mb-4">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  className={`w-full px-4 py-2 rounded-lg text-[14px] font-normal ${
                    theme === "dark" 
                      ? "bg-[#1A1A1A] border border-[#2A2A2A] text-foreground focus:border-[#404040]" 
                      : "bg-foreground/5 border border-foreground/10 text-foreground focus:border-foreground/20"
                  } focus:outline-none transition-colors`}
                  placeholder="Enter password"
                  autoFocus
                />
                {error && (
                  <p className={`mt-2 text-[14px] ${
                    theme === "dark" ? "text-[#FF6B6B]" : "text-red-600"
                  }`}>
                    {error}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className={`w-full px-4 py-2 rounded-lg text-[14px] font-normal transition-colors ${
                  theme === "dark"
                    ? "bg-foreground/10 border border-foreground/20 hover:bg-foreground/20 text-foreground"
                    : "bg-foreground/10 border border-foreground/20 hover:bg-foreground/20 text-foreground"
                }`}
              >
                Enter
              </button>
            </form>
            <button
              type="button"
              onClick={() => router.push('/')}
              className={`mt-4 text-[14px] font-normal transition-colors ${
                theme === "dark" ? "text-[#A0A0A0] hover:text-[#D0D0D0]" : "text-[#525252] hover:text-[#000000]"
              }`}
            >
              Go back
            </button>
          </div>
        </div>

        {/* Theme Toggle Button */}
        <button
          type="button"
          onClick={toggleTheme}
          className="fixed bottom-4 right-4 md:bottom-[40px] md:right-[40px] z-50 w-10 h-10 rounded-full bg-foreground/10 hover:bg-foreground/20 border border-foreground/20 flex items-center justify-center transition-all duration-200 hover:scale-110"
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 text-foreground"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="m4.93 4.93 1.41 1.41" />
              <path d="m17.66 17.66 1.41 1.41" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="m6.34 17.66-1.41 1.41" />
              <path d="m19.07 4.93-1.41 1.41" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 text-foreground"
              aria-hidden="true"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>
      </main>
    );
  }

  const tocItems = project.id === 1 ? [
    { id: 'team', title: 'Team' },
    { id: 'context', title: 'Context' },
    { id: 'problem', title: 'Problem' },
    { id: 'goals', title: 'Goals' },
    { id: 'early-exploration', title: 'Framing and explorations' },
    { id: 'designs', title: 'Designs' },
    { id: 'impact', title: 'Dashboard metrics' },
    { id: 'outcomes', title: 'Outcomes' },
  ] : project.id === 2 ? [
    { id: 'problem', title: 'Problem' },
    { id: 'goals', title: 'Goals' },
    // { id: 'solution', title: 'Solution' }, // Hidden for now
    { 
      id: 'key-design-decisions', 
      title: 'Key Design Decisions',
      children: [
        { id: 'notification-buckets', title: '1) Notification buckets that match user intent' },
        { id: 'reply-notifications', title: '2) Reply notifications optimized for urgency' },
        { id: 'admin-vs-rep', title: '3) Admin vs rep mental models' },
      ]
    },
    { id: 'technical-considerations', title: 'System considerations' },
    { id: 'early-iterations', title: 'Early iterations' },
    { id: 'outcomes', title: 'Outcomes' },
    { id: 'rollout', title: 'Rollout plan' },
  ] : project.id === 3 ? [
    { id: 'team', title: 'Team' },
    { id: 'context', title: 'Context' },
    { id: 'problem', title: 'Problem' },
    { id: 'solutioning', title: 'Goals and Solutions' },
    { 
      id: 'core-design-decisions', 
      title: 'Core Design Decisions',
      children: [
        { id: 'tasks-dashboard', title: '1. Tasks Dashboard' },
        { id: 'person-details', title: '2. Person Details' },
        { id: 'plays-automate', title: '3. Plays to Automate Task Creation' },
        { id: 'scheduling-tasks', title: '4. Scheduling tasks for later' },
        { id: 'exclusions-sequences', title: '5. Exclusions and Sequences' },
        { id: 'manual-emails', title: '6. Manual emails and managing replies' },
      ]
    },
    { id: 'outcomes', title: 'Outcomes and Beta Cohort' },
  ] : project.id === 6 ? [
    { id: 'role', title: 'Role' },
    { id: 'overview', title: 'Overview' },
    { id: 'problem', title: 'The Problem' },
    { id: 'data', title: 'The Data' },
    { id: 'problem-alignment', title: 'Problem Alignment & Hypothesis' },
    { id: 'design-principles', title: 'Design Principles' },
    { id: 'building-onboarding', title: 'Building a New Onboarding Experience' },
    { id: 'user-testing', title: 'User Testing & Validating Signal' },
    { id: 'success-metrics', title: 'How we plan to measure success' },
    { id: 'leadership', title: 'Words from leadership' },
  ] : project.id === 8 ? [
    { id: 'role', title: 'Role' },
    { id: 'overview', title: 'Overview' },
    { id: 'key-responsibilities', title: 'Key responsibilities' },
    { id: 'redesigned', title: 'REDESIGNED' },
    { id: 'goals', title: 'GOALS' },
    { id: 'colors', title: 'Colors' },
    { id: 'typography', title: 'Typography' },
    { id: 'elevation', title: 'Elevation' },
    { id: 'icons', title: 'Icons' },
    { id: 'new-experiences', title: 'New experiences brought to market' },
  ] : [];

  return (
    <main className="min-h-screen bg-background px-6 py-6 md:px-[200px] md:py-[60px] lg:px-[320px] xl:px-[400px] 2xl:px-[400px] 2xl:py-[60px]">
      {/* Table of Contents - Desktop Only */}
      {tocItems.length > 0 && (
        <nav className="hidden lg:block fixed left-0 top-[60px] bottom-0 pl-[40px] pt-[60px] z-40" aria-label="Table of contents">
          <div className="sticky top-[60px] max-w-[200px]">
            <ul className="space-y-2">
              {tocItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleScrollToSection(e, item.id)}
                    className={`text-[14px] font-normal transition-colors block truncate ${
                      theme === "dark" 
                        ? "text-[#A0A0A0] hover:text-[#D0D0D0]" 
                        : "text-[#525252] hover:text-[#000000]"
                    }`}
                    title={item.title}
                  >
                    {item.title}
                  </a>
                  {item.children && (
                    <ul className="mt-2 ml-4 space-y-1">
                      {item.children.map((child) => (
                        <li key={child.id}>
                          <a
                            href={`#${child.id}`}
                            onClick={(e) => handleScrollToSection(e, child.id)}
                            className={`text-[14px] font-normal transition-colors block truncate ${
                              theme === "dark" 
                                ? "text-[#A0A0A0] hover:text-[#D0D0D0]" 
                                : "text-[#525252] hover:text-[#000000]"
                            }`}
                            title={child.title}
                          >
                            {child.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            {/* Jump to top button */}
            <button
              type="button"
              onClick={handleJumpToTop}
              className={`mt-6 px-2 py-1 rounded-[8px] text-[12px] font-normal transition-all duration-300 flex items-center ${
                showJumpToTop 
                  ? "opacity-100 visible" 
                  : "opacity-0 invisible"
              } ${
                theme === "dark" 
                  ? "bg-[#1A1A1A] border border-[#2A2A2A] text-foreground hover:bg-[#252525]" 
                  : "bg-foreground/5 border border-foreground/10 text-foreground hover:bg-foreground/10"
              }`}
              aria-label="Jump to top"
              style={{ gap: '4px' }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-3 h-3 flex-shrink-0"
                aria-hidden="true"
              >
                <path d="M12 19V5" />
                <path d="M5 12l7-7 7 7" />
              </svg>
              Jump to top
            </button>
          </div>
        </nav>
      )}
      <div className="2xl:max-w-[1192px] 2xl:mx-auto">
        {/* Back Button */}
        <div className="pb-8 animate-fade-in-up" style={{ animationDelay: '0ms' }}>
          <button
            type="button"
            onClick={() => router.push('/')}
            className={`flex items-center text-[14px] font-normal transition-colors ${theme === "dark" ? "text-[#A0A0A0] hover:text-[#D0D0D0]" : "text-[#525252] hover:text-[#000000]"}`}
            style={{ gap: '8px' }}
            aria-label="Go back to home"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
              aria-hidden="true"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            Back
          </button>
        </div>

        {/* Project Title */}
        <section className="pb-12 md:pb-16 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <h2 className="text-[16px] font-medium text-foreground mb-1">
            {project.id === 1 ? "Email Reply Classifications" : project.id === 2 ? "Multi Channel Notifications" : project.id === 3 ? "One-off tasks" : project.id === 6 ? "Investing in Commercial Real Estate" : project.id === 8 ? "Cadre Design System" : project.title}
          </h2>
          <p className={`text-sm ${theme === "dark" ? "text-[#808080]" : "text-foreground/60"} mb-4`}>
            {project.category === "Cadre" ? "Cadre (Acquired by Willow Wealth)" : project.category}
          </p>
          {project.id === 1 && (
            <p className="text-[14px] leading-relaxed text-foreground mb-6">
              Bridging intent, automation, and signal clarity in outbound sales
            </p>
          )}
          {project.id === 2 && (
            <p className="text-[14px] leading-relaxed text-foreground mb-6">
              Building a scalable notification system on Unify to pave the way for Product Led Growth
            </p>
          )}
          {project.id === 3 && (
            <p className="text-[14px] leading-relaxed text-foreground mb-6">
              Enabling timely, high-intent sales actions and reminders outside of automated sequences
            </p>
          )}
          {project.id === 6 && (
            <p className="text-[14px] leading-relaxed text-foreground mb-6">
              Redesigning a complex investment experience
            </p>
          )}
          {project.id === 8 && (
            <p className="text-[14px] leading-relaxed text-foreground mb-6">
              Building a simple and effective design system for CRE investing
            </p>
          )}
          {project.id === 1 && (
            <div 
              className={`w-full rounded-[8px] overflow-hidden cursor-pointer ${
                theme === "dark" 
                  ? "shadow-[0_2px_8px_rgba(0,0,0,0.3)]" 
                  : "shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
              }`}
              onClick={() => {
                setModalImageSrc("/images/reply-classification/reply-hero.png");
                setImageModalOpen(true);
              }}
            >
              <Image
                src="/images/reply-classification/reply-hero.png"
                alt="Email Reply Classification"
                width={1200}
                height={675}
                className="w-full h-auto rounded-[8px]"
                unoptimized
              />
            </div>
          )}
          {project.id === 2 && (
            <div 
              className={`w-full rounded-[8px] overflow-hidden cursor-pointer ${
                theme === "dark" 
                  ? "shadow-[0_2px_8px_rgba(0,0,0,0.3)]" 
                  : "shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
              }`}
              onClick={() => {
                setModalImageSrc("/images/notifications/notifications-hero.png?v=2");
                setImageModalOpen(true);
              }}
            >
              <Image
                src="/images/notifications/notifications-hero.png?v=2"
                alt="Notifications"
                width={1200}
                height={675}
                className="w-full h-auto rounded-[8px]"
                unoptimized
              />
            </div>
          )}
          {project.id === 3 && (
            <div 
              className={`w-full rounded-[8px] overflow-hidden cursor-pointer ${
                theme === "dark" 
                  ? "shadow-[0_2px_8px_rgba(0,0,0,0.3)]" 
                  : "shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
              }`}
              onClick={() => {
                setModalImageSrc("/images/tasks/tasks-hero.png?v=3");
                setImageModalOpen(true);
              }}
            >
              <Image
                src="/images/tasks/tasks-hero.png?v=3"
                alt="One-off Sales Tasks"
                width={1200}
                height={675}
                className="w-full h-auto rounded-[8px]"
                unoptimized
              />
            </div>
          )}
          {project.id === 6 && (
            <div className="space-y-4">
              <div 
                className={`w-full rounded-[8px] overflow-hidden cursor-pointer ${
                  theme === "dark" 
                    ? "shadow-[0_2px_8px_rgba(0,0,0,0.3)]" 
                    : "shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                }`}
                onClick={() => {
                  setModalImageSrc("/images/cre/before.png");
                  setImageModalOpen(true);
                }}
              >
                <Image
                  src="/images/cre/before.png"
                  alt="Before"
                  width={1200}
                  height={675}
                  className="w-full h-auto rounded-[8px]"
                  unoptimized
                />
              </div>
              <div 
                className={`w-full rounded-[8px] overflow-hidden cursor-pointer ${
                  theme === "dark" 
                    ? "shadow-[0_2px_8px_rgba(0,0,0,0.3)]" 
                    : "shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                }`}
                onClick={() => {
                  setModalImageSrc("/images/cre/after.png");
                  setImageModalOpen(true);
                }}
              >
                <Image
                  src="/images/cre/after.png"
                  alt="After"
                  width={1200}
                  height={675}
                  className="w-full h-auto rounded-[8px]"
                  unoptimized
                />
              </div>
            </div>
          )}
          {project.id === 7 && (
            <div 
              className={`w-full rounded-[8px] overflow-hidden cursor-pointer ${
                theme === "dark" 
                  ? "shadow-[0_2px_8px_rgba(0,0,0,0.3)]" 
                  : "shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
              }`}
              onClick={() => {
                setModalImageSrc("/images/social-signals/add-signal.gif");
                setImageModalOpen(true);
              }}
            >
              <img
                src="/images/social-signals/add-signal.gif"
                alt="Track Social Signals"
                className="w-full h-auto rounded-[8px]"
              />
            </div>
          )}
        </section>

        {/* Project Content */}
        {project.id === 1 && (
          <div className="space-y-16 md:space-y-20 pb-12 md:pb-16">
            {/* Team */}
            <section id="team" className="animate-fade-in-up scroll-mt-[60px]" style={{ animationDelay: '200ms' }}>
              <h3 className="text-[15px] font-medium text-foreground mb-4">Team</h3>
              <ul className="space-y-2 text-[14px] leading-relaxed text-foreground">
                <li>1 Product Designer (Me)</li>
                <li>1 AI Engineer</li>
                <li>1 Full Stack Engineer</li>
              </ul>
            </section>

            {/* Context */}
            <section id="context" className="animate-fade-in-up scroll-mt-[60px]" style={{ animationDelay: '300ms' }}>
              <h3 className="text-[15px] font-medium text-foreground mb-4">Context</h3>
              <div className="space-y-4 text-[14px] leading-relaxed text-foreground">
                <p>
                  At Unify, Email Sequences are the main drivers of outbound motion. When a prospect replies to an email, that reply is often the most important signal a seller can receive. Before this project, every reply was treated the same - any reply, regardless of intent, was marked as a &quot;Finished - Replied&quot; status.
                </p>
                <p>
                  At a high level, the lack of nuance made it difficult for users to reliably prioritize high intent replies, which meant that Sales teams were stuck manually handling responses where valuable engagement could be buried in a sea of noise.
                </p>
                <p>
                  As Unify scaled across automated outbound and sales workflows, this became a critical gap in how we surfaced and acted on positive email replies.
                </p>
              </div>
            </section>

            {/* Problem */}
            <section id="problem" className="animate-fade-in-up scroll-mt-[60px]" style={{ animationDelay: '400ms' }}>
              <h3 className="text-[15px] font-medium text-foreground mb-4">Problem</h3>
              <div className="space-y-4 text-[14px] leading-relaxed text-foreground">
                <p className="font-medium">
                  How might we help sales teams instantly understand which replies matter, while also automating away low value busy work, without disrupting sequence flows?
                </p>
                <ul className="space-y-2 ml-4 list-disc">
                  <li>How might we also distinguish positive intent in an email reply from automated and negative responses?</li>
                  <li>How might we also do this in a way that is scalable across reporting, workflows, and future features?</li>
                </ul>
              </div>
            </section>

            {/* Goals */}
            <section id="goals" className="animate-fade-in-up scroll-mt-[60px]" style={{ animationDelay: '500ms' }}>
              <h3 className="text-[15px] font-medium text-foreground mb-4">Goals</h3>
              <p className="text-[14px] leading-relaxed text-foreground mb-4">
                We had two clear objectives
              </p>
              <ul className="space-y-2 text-[14px] leading-relaxed text-foreground ml-4 list-disc">
                <li>Surface high intent replies in a reliable and actionable way</li>
                <li>Create a foundational layer to build new automation systems based on reply classifications</li>
              </ul>
              <div className="mt-6">
                <div 
                  className={`w-full rounded-[8px] overflow-hidden cursor-pointer ${
                    theme === "dark" 
                      ? "shadow-[0_2px_8px_rgba(0,0,0,0.3)]" 
                      : "shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                  }`}
                  onClick={() => {
                    setModalImageSrc("/images/reply-classification/reply-notifs.png?v=3");
                    setImageModalOpen(true);
                  }}
                >
                  <Image
                    src="/images/reply-classification/reply-notifs.png?v=3"
                    alt="Reply Notifications"
                    width={1200}
                    height={675}
                    className="w-full h-auto rounded-[8px]"
                    unoptimized
                  />
                </div>
                <p className={`text-[12px] mt-2 ${
                  theme === "dark" 
                    ? "text-[#808080]" 
                    : "text-foreground/50"
                }`}>
                  Classifications scaled up for email reply notifications
                </p>
              </div>
            </section>

            {/* Framing and explorations */}
            <section id="early-exploration" className="animate-fade-in-up scroll-mt-[60px]" style={{ animationDelay: '600ms' }}>
              <h3 className="text-[15px] font-medium text-foreground mb-4">Framing and explorations</h3>
              <div className="space-y-4 text-[14px] leading-relaxed text-foreground">
                <p>
                  Before designing, we focused on modeling the problem correctly. We knew early on that email replies could not be bucketed in a single state. Rather they were a combination of
                </p>
                <ul className="space-y-2 ml-4 list-disc">
                  <li>Seeing who sent it (A real person vs. an automated response like OOO)</li>
                  <li>What the response says (intent and sentiment)</li>
                </ul>
                <div 
                  className={`w-full rounded-[8px] overflow-hidden cursor-pointer ${
                    theme === "dark" 
                      ? "shadow-[0_2px_8px_rgba(0,0,0,0.3)]" 
                      : "shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                  }`}
                  onClick={() => {
                    setModalImageSrc("/images/reply-classification/reply-framework.png");
                    setImageModalOpen(true);
                  }}
                >
                  <Image
                    src="/images/reply-classification/reply-framework.png"
                    alt="Reply Framework"
                    width={1200}
                    height={675}
                    className="w-full h-auto rounded-[8px]"
                    unoptimized
                  />
                </div>
                <div 
                  className={`w-full rounded-[8px] overflow-hidden cursor-pointer ${
                    theme === "dark" 
                      ? "shadow-[0_2px_8px_rgba(0,0,0,0.3)]" 
                      : "shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                  }`}
                  onClick={() => {
                    setModalImageSrc("/images/reply-classification/reply-framework-2.png");
                    setImageModalOpen(true);
                  }}
                >
                  <Image
                    src="/images/reply-classification/reply-framework-2.png"
                    alt="Reply Framework 2"
                    width={1200}
                    height={675}
                    className="w-full h-auto rounded-[8px]"
                    unoptimized
                  />
                </div>
                <p>
                  This led us to frame replies as classifications with multiple tags, and not a single status on the Person.
                </p>
                <p>
                  The tag based classification system we landed on supported multiple truths at once. For example a reply could be both from a real person with a positive tone, be willing to meet for a demo, but say the timing just isn&apos;t right.
                </p>
                <p>
                  We also needed to account for responses that were automated and whether it was an OOO response or a bounce.
                </p>
                <p>
                  This also opened up a path for us to build in the future a system to automatically pause a person&apos;s place in a Sequence based on an OOO response and start again after the date the person comes back.
                </p>
                <div>
                  <div 
                    className={`w-full rounded-[8px] overflow-hidden cursor-pointer ${
                      theme === "dark" 
                        ? "shadow-[0_2px_8px_rgba(0,0,0,0.3)]" 
                        : "shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                    }`}
                    onClick={() => {
                      setModalImageSrc("/images/reply-classification/early-1.png");
                      setImageModalOpen(true);
                    }}
                  >
                    <Image
                      src="/images/reply-classification/early-1.png"
                      alt="Early Exploration 1"
                      width={1200}
                      height={675}
                      className="w-full h-auto rounded-[8px]"
                      unoptimized
                    />
                  </div>
                  <p className={`text-[12px] mt-2 ${
                    theme === "dark" 
                      ? "text-[#808080]" 
                      : "text-foreground/50"
                  }`}>
                    Early exploration
                  </p>
                </div>
                <div>
                  <div 
                    className={`w-full rounded-[8px] overflow-hidden cursor-pointer ${
                      theme === "dark" 
                        ? "shadow-[0_2px_8px_rgba(0,0,0,0.3)]" 
                        : "shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                    }`}
                    onClick={() => {
                      setModalImageSrc("/images/reply-classification/early-2.png");
                      setImageModalOpen(true);
                    }}
                  >
                    <Image
                      src="/images/reply-classification/early-2.png"
                      alt="Early Exploration 2"
                      width={1200}
                      height={675}
                      className="w-full h-auto rounded-[8px]"
                      unoptimized
                    />
                  </div>
                  <p className={`text-[12px] mt-2 ${
                    theme === "dark" 
                      ? "text-[#808080]" 
                      : "text-foreground/50"
                  }`}>
                    Early exploration
                  </p>
                </div>
              </div>
            </section>

            {/* Designs */}
            <section id="designs" className="animate-fade-in-up scroll-mt-[60px]" style={{ animationDelay: '700ms' }}>
              <h3 className="text-[15px] font-medium text-foreground mb-4">Designs</h3>
              <div className="space-y-4 text-[14px] leading-relaxed text-foreground">
                <p className="font-medium">
                  Visual Language: These chips are color coded for quick scanning
                </p>
                <div>
                  <div 
                    className={`w-full rounded-[8px] overflow-hidden cursor-pointer ${
                      theme === "dark" 
                        ? "shadow-[0_2px_8px_rgba(0,0,0,0.3)]" 
                        : "shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                    }`}
                    onClick={() => {
                      setModalImageSrc("/images/reply-classification/tags-final.png?v=2");
                      setImageModalOpen(true);
                    }}
                  >
                    <Image
                      src="/images/reply-classification/tags-final.png?v=2"
                      alt="Tags Final"
                      width={1200}
                      height={675}
                      className="w-full h-auto rounded-[8px]"
                      unoptimized
                    />
                  </div>
                  <p className={`text-[12px] mt-2 ${
                    theme === "dark" 
                      ? "text-[#808080]" 
                      : "text-foreground/50"
                  }`}>
                    Final
                  </p>
                </div>
                <p>
                  These tags would touch nearly every part of the product and we designed it to appear consistently across
                </p>
                <ul className="space-y-2 ml-4 list-disc">
                  <li>Sequence activity tables</li>
                  <li>Reply inboxes</li>
                  <li>Notifications</li>
                  <li>Dashboards</li>
                  <li>Audience filters for list building</li>
                </ul>
                <div 
                  className={`w-full rounded-[8px] overflow-hidden cursor-pointer ${
                    theme === "dark" 
                      ? "shadow-[0_2px_8px_rgba(0,0,0,0.3)]" 
                      : "shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                  }`}
                  onClick={() => {
                    setModalImageSrc("/images/reply-classification/outbox.png");
                    setImageModalOpen(true);
                  }}
                >
                  <Image
                    src="/images/reply-classification/outbox.png"
                    alt="Outbox"
                    width={1200}
                    height={675}
                    className="w-full h-auto rounded-[8px]"
                    unoptimized
                  />
                </div>
                <div 
                  className={`w-full rounded-[8px] overflow-hidden cursor-pointer ${
                    theme === "dark" 
                      ? "shadow-[0_2px_8px_rgba(0,0,0,0.3)]" 
                      : "shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                  }`}
                  onClick={() => {
                    setModalImageSrc("/images/reply-classification/audience-filter.png");
                    setImageModalOpen(true);
                  }}
                >
                  <Image
                    src="/images/reply-classification/audience-filter.png"
                    alt="Audience Filter"
                    width={1200}
                    height={675}
                    className="w-full h-auto rounded-[8px]"
                    unoptimized
                  />
                </div>
                <div 
                  className={`w-full rounded-[8px] overflow-hidden cursor-pointer ${
                    theme === "dark" 
                      ? "shadow-[0_2px_8px_rgba(0,0,0,0.3)]" 
                      : "shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                  }`}
                  onClick={() => {
                    setModalImageSrc("/images/reply-classification/activity-reply.png");
                    setImageModalOpen(true);
                  }}
                >
                  <Image
                    src="/images/reply-classification/activity-reply.png"
                    alt="Activity Reply"
                    width={1200}
                    height={675}
                    className="w-full h-auto rounded-[8px]"
                    unoptimized
                  />
                </div>
              </div>
            </section>

            {/* Dashboard metrics */}
            <section id="impact" className="animate-fade-in-up scroll-mt-[60px]" style={{ animationDelay: '800ms' }}>
              <h3 className="text-[15px] font-medium text-foreground mb-4">Dashboard metrics</h3>
              <div className="space-y-4 text-[14px] leading-relaxed text-foreground">
                <p>
                  A major driver of this project was metrics accountability with our users. Previously, all reply metrics were inflated by noise from automated responses and bounces.
                </p>
                <div 
                  className={`w-full rounded-[8px] overflow-hidden cursor-pointer ${
                    theme === "dark" 
                      ? "shadow-[0_2px_8px_rgba(0,0,0,0.3)]" 
                      : "shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                  }`}
                  onClick={() => {
                    setModalImageSrc("/images/reply-classification/metrics.png");
                    setImageModalOpen(true);
                  }}
                >
                  <Image
                    src="/images/reply-classification/metrics.png"
                    alt="Metrics"
                    width={1200}
                    height={675}
                    className="w-full h-auto rounded-[8px]"
                    unoptimized
                  />
                </div>
                <p>
                  After this change we were able to allow flexible filtering to allow users to
                </p>
                <ul className="space-y-2 ml-4 list-disc">
                  <li>Filter out OOO replies to count as engagement</li>
                  <li>Allow teams to report on all reply types, especially positive replies</li>
                  <li>Sales teams can be graded on meaningful outcomes</li>
                </ul>
                <p>
                  We also laid the groundwork for future dashboard improvements
                </p>
                <ul className="space-y-2 ml-4 list-disc">
                  <li>Replies by sentiment over time</li>
                  <li>Sequence performance by intent quality</li>
                  <li>Rep/User performance based on positive engagement</li>
                </ul>
                <div 
                  className={`w-full rounded-[8px] overflow-hidden cursor-pointer ${
                    theme === "dark" 
                      ? "shadow-[0_2px_8px_rgba(0,0,0,0.3)]" 
                      : "shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                  }`}
                  onClick={() => {
                    setModalImageSrc("/images/reply-classification/reply-task-settings.png?v=2");
                    setImageModalOpen(true);
                  }}
                >
                  <Image
                    src="/images/reply-classification/reply-task-settings.png?v=2"
                    alt="Reply Task Settings"
                    width={1200}
                    height={675}
                    className="w-full h-auto rounded-[8px]"
                    unoptimized
                  />
                </div>
              </div>
            </section>

            {/* Outcomes */}
            <section id="outcomes" className="animate-fade-in-up scroll-mt-[60px]" style={{ animationDelay: '900ms' }}>
              <h3 className="text-[15px] font-medium text-foreground mb-4">Outcomes</h3>
              <div className="space-y-4 text-[14px] leading-relaxed text-foreground">
                <p>
                  This feature became a foundational layer for how Unify understands engagement and added a wow factor to how sales teams can understand the quality of their Sequences based on reply sentiments classified by AI.
                </p>
                <p className="font-medium">Impact</p>
                <ul className="space-y-2 ml-4 list-disc">
                  <li>Users and even our own reps were able to prioritize responses more quickly and book meets much sooner</li>
                  <li>Teams gained visibility into real response data</li>
                  <li>Automation of classifications meaningfully reduced manual sequence maintenance</li>
                </ul>
                <p>
                  This also unlocked
                </p>
                <ul className="space-y-2 ml-4 list-disc">
                  <li>Building AI driven task prioritization for reps</li>
                  <li>Smarter notifications to take quick action</li>
                  <li>Future autoresponse and objection handling workflows for Sequences</li>
                </ul>
              </div>
            </section>
          </div>
        )}

        {/* Project Content for One-off Sales Tasks */}
        {project.id === 3 && (
          <div className="space-y-16 md:space-y-20 pb-12 md:pb-16">
            {/* Team */}
            <section id="team" className="animate-fade-in-up scroll-mt-[60px]" style={{ animationDelay: '200ms' }}>
              <h3 className="text-[15px] font-medium text-foreground mb-4">Team</h3>
              <ul className="space-y-2 text-[14px] leading-relaxed text-foreground">
                <li>1 Product Designer (Me)</li>
                <li>1 Product Manager</li>
                <li>3 Engineers</li>
              </ul>
            </section>

            {/* Context */}
            <section id="context" className="animate-fade-in-up scroll-mt-[60px]" style={{ animationDelay: '300ms' }}>
              <h3 className="text-[15px] font-medium text-foreground mb-4">Context</h3>
              <div className="space-y-4 text-[14px] leading-relaxed text-foreground">
                <p>
                  Sales teams use Unify to automate outreach such as sending a series of emails or calls over time. These automated flows are called Sequences and can be built with multiple steps to automatically send emails, create tasks to call prospects, or engage with people on LinkedIn.
                </p>
                <p>
                  They work well for predictable outreach at scale, but real human conversations are rarely a linear path like that.
                </p>
                <div 
                  className={`w-full rounded-[8px] overflow-hidden cursor-pointer ${
                    theme === "dark" 
                      ? "shadow-[0_2px_8px_rgba(0,0,0,0.3)]" 
                      : "shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                  }`}
                  onClick={() => {
                    setModalImageSrc("/images/tasks/sequence_engagement.png?v=2");
                    setImageModalOpen(true);
                  }}
                >
                  <Image
                    src="/images/tasks/sequence_engagement.png?v=2"
                    alt="Sequence Engagement"
                    width={1200}
                    height={675}
                    className="w-full h-auto rounded-[8px]"
                    unoptimized
                  />
                </div>
                <p className={`text-[12px] mt-2 ${
                  theme === "dark" 
                    ? "text-[#808080]" 
                    : "text-foreground/50"
                }`}>
                  Prospects would only show tasks associated with automated sequence steps
                </p>
              </div>
            </section>

            {/* Problem */}
            <section id="problem" className="animate-fade-in-up scroll-mt-[60px]" style={{ animationDelay: '400ms' }}>
              <h3 className="text-[15px] font-medium text-foreground mb-4">Problem</h3>
              <div className="space-y-4 text-[14px] leading-relaxed text-foreground">
                <p>
                  Unify was originally centered around deeply intuitive and flexible automated workflows, designed to scale outreach efficiently. However, day-to-day sales work often requires fast, contextual, and human judgement.
                </p>
                <p className="font-medium">
                  We found that customers and even our own Sales reps frequently needed to:
                </p>
                <ul className="space-y-2 ml-4 list-disc">
                  <li>Reach out immediately when a prospect shows strong interest and act in real time on signals such as replies, website visits, or other intent spikes.</li>
                  <li>Add a single action item on top of an existing and running automated Sequence</li>
                  <li>Be reminded to follow up with a prospect in the future without losing context months later</li>
                </ul>
                <p>
                  Before this feature, reps were forced into awkward workarounds such as logging a reminder in their Google Calendars, which was difficult to add in context, or pause Sequences completely and jot down notes manually.
                </p>
                <p>
                  These workarounds added unnecessary setup time and made Unify feel rigid at times when compared to legacy tools like Outreach or Salesloft.
                </p>
                <div className={`rounded-[8px] border p-3 ${
                  theme === "dark" 
                    ? "bg-[#1A1A1A] border-[#2A2A2A]" 
                    : "bg-foreground/5 border-foreground/10"
                }`}>
                  <p className={`text-[14px] leading-relaxed ${
                    theme === "dark" 
                      ? "text-[#B0B0B0]" 
                      : "text-foreground/70"
                  }`}>
                    &quot;We want to be able to send a one off email or call that follow on separate on AOB sequence. Problem is they are blocked by sequence re-enrollment for X days.I like to keep by Call steps separate from AOB sometimes&quot;
                  </p>
                  <p className={`text-[14px] mt-2 ${
                    theme === "dark" 
                      ? "text-[#808080]" 
                      : "text-foreground/60"
                  }`}>
                    <span className={theme === "dark" ? "text-[#606060]" : "text-foreground/40"}>–</span> Unify BDR
                  </p>
                </div>
                <div className={`rounded-[8px] border p-3 ${
                  theme === "dark" 
                    ? "bg-[#1A1A1A] border-[#2A2A2A]" 
                    : "bg-foreground/5 border-foreground/10"
                }`}>
                  <p className={`text-[14px] leading-relaxed ${
                    theme === "dark" 
                      ? "text-[#B0B0B0]" 
                      : "text-foreground/70"
                  }`}>
                    &quot;I&apos;m a new BDR 🙂. Still getting into the swing of things, just started learning Unify &amp; had a couple questions. 1.) Does Unify have the ability to do one-off outreach/follow-up tasks, or just sequences?&quot;
                  </p>
                  <p className={`text-[14px] mt-2 ${
                    theme === "dark" 
                      ? "text-[#808080]" 
                      : "text-foreground/60"
                  }`}>
                    <span className={theme === "dark" ? "text-[#606060]" : "text-foreground/40"}>–</span> BDR @ <a href="https://www.laurel.ai/" target="_blank" rel="noopener noreferrer" className={`underline transition-colors ${theme === "dark" ? "hover:text-[#B0B0B0]" : "hover:opacity-70"}`}>Laurel</a>
                  </p>
                </div>
                <div className={`rounded-[8px] border p-3 ${
                  theme === "dark" 
                    ? "bg-[#1A1A1A] border-[#2A2A2A]" 
                    : "bg-foreground/5 border-foreground/10"
                }`}>
                  <p className={`text-[14px] leading-relaxed ${
                    theme === "dark" 
                      ? "text-[#B0B0B0]" 
                      : "text-foreground/70"
                  }`}>
                    &quot;A huge piece of GTM, that we preach, is moving at the right time with the right information. Often times, there is NEW information that surfaces the need to send a one off tasks or email, or set up a task to enroll someone at a later time.&quot;
                  </p>
                  <p className={`text-[14px] mt-2 ${
                    theme === "dark" 
                      ? "text-[#808080]" 
                      : "text-foreground/60"
                  }`}>
                    <span className={theme === "dark" ? "text-[#606060]" : "text-foreground/40"}>–</span> Growth Leader @ <a href="https://chalk.ai/" target="_blank" rel="noopener noreferrer" className={`underline transition-colors ${theme === "dark" ? "hover:text-[#B0B0B0]" : "hover:opacity-70"}`}>Chalk</a>
                  </p>
                </div>
              </div>
            </section>

            {/* Goals and Solutions */}
            <section id="solutioning" className="animate-fade-in-up scroll-mt-[60px]" style={{ animationDelay: '500ms' }}>
              <h3 className="text-[15px] font-medium text-foreground mb-4">Goals and Solutions</h3>
              <div className="space-y-4 text-[14px] leading-relaxed text-foreground">
                <p>
                  I led the end-to-end design of One-off Tasks, a flexible system that lets users create, schedule, and automate individual actions outside of automated Sequences - keeping tasks and emails tracked and synced simultaneously.
                </p>
                <div 
                  className={`w-full rounded-[8px] overflow-hidden cursor-pointer ${
                    theme === "dark" 
                      ? "shadow-[0_2px_8px_rgba(0,0,0,0.3)]" 
                      : "shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                  }`}
                  onClick={() => {
                    setModalImageSrc("/images/tasks/phone-task.png?v=4");
                    setImageModalOpen(true);
                  }}
                >
                  <Image
                    src="/images/tasks/phone-task.png?v=4"
                    alt="Phone Task"
                    width={1200}
                    height={675}
                    className="w-full h-auto rounded-[8px]"
                    unoptimized
                  />
                </div>
                <p className="font-medium">Supported actions include</p>
                <ul className="space-y-2 ml-4 list-disc">
                  <li>Phone Calls</li>
                  <li>Manual emails</li>
                  <li>Action item reminders</li>
                  <li>LinkedIn Engagement Reminders (not automated)</li>
                </ul>
                <p className="font-medium">Ways we decided to allow one-off task creation:</p>
                <ul className="space-y-2 ml-4 list-disc">
                  <li>Manually by individual users</li>
                  <li>Manually by admins to assign to their users</li>
                  <li>Automatically when a defined signal occurs (through Unify Plays)</li>
                  <li>In the future, set by scheduling for the task to appear as a &quot;To do&quot; and remind users</li>
                </ul>
                <p className="font-medium">Success meant</p>
                <ul className="space-y-2 ml-4 list-disc">
                  <li>Users can act immediately on a prospect without building workarounds outside of Unify</li>
                  <li>Manual and automated actions feel cohesive and not fragmented</li>
                </ul>
              </div>
            </section>

            {/* Core Design Decisions */}
            <section id="core-design-decisions" className="animate-fade-in-up scroll-mt-[60px]" style={{ animationDelay: '700ms' }}>
              <h3 className="text-[15px] font-medium text-foreground mb-4">Core Design Decisions</h3>
              <div className="space-y-4 text-[14px] leading-relaxed text-foreground">
                <p>
                  One of the earliest and most important decisions to be made was where this feature would live, as it cut across multiple surfaces: Dashboards, Prospect details, Scheduling, and even CRM syncing.
                </p>
                <p>
                  The biggest design challenge was introducing flexibility without fragmenting the product or breaking user workflows.
                </p>
                <p id="tasks-dashboard" className={`text-[15px] font-medium mt-12 underline decoration-1 underline-offset-1 scroll-mt-[60px] ${
                  theme === "dark" ? 'decoration-[#404040]' : 'decoration-[#D0D0D0]'
                }`}>1. Tasks Dashboard</p>
                <p>
                  One-off tasks would be treated as first-class objects in the Tasks page, a dashboard for users to manage daily tasks to engage with prospects. This is where an entry point to create one-off tasks would live as well.
                </p>
                <p>
                  Rather than creating a separate view or mode, one-off tasks created would appear in the same table users already relied on for daily work. This minimized cognitive load to learn a new place for a new concept.
                </p>
                <div 
                  className={`w-full rounded-[8px] overflow-hidden cursor-pointer ${
                    theme === "dark" 
                      ? "shadow-[0_2px_8px_rgba(0,0,0,0.3)]" 
                      : "shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                  }`}
                  onClick={() => {
                    setModalImageSrc("/images/tasks/task-dashboard.png?v=2");
                    setImageModalOpen(true);
                  }}
                >
                  <Image
                    src="/images/tasks/task-dashboard.png?v=2"
                    alt="Task Dashboard"
                    width={1200}
                    height={675}
                    className="w-full h-auto rounded-[8px]"
                    unoptimized
                  />
                </div>
                <p className="font-medium">Additional decisions</p>
                <ul className="space-y-2 ml-4 list-disc">
                  <li>Clear labeling to mark which tasks are One-offs, from automated Sequences, or from Plays</li>
                  <li>Dedicated filter to allow users to view One-offs only</li>
                  <li>Views to view completed or skipped tasks flows just like any other task</li>
                </ul>
                <div 
                  className={`w-full rounded-[8px] overflow-hidden cursor-pointer ${
                    theme === "dark" 
                      ? "shadow-[0_2px_8px_rgba(0,0,0,0.3)]" 
                      : "shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                  }`}
                  onClick={() => {
                    setModalImageSrc("/images/tasks/filters-zoomed.png");
                    setImageModalOpen(true);
                  }}
                >
                  <Image
                    src="/images/tasks/filters-zoomed.png"
                    alt="Filters Zoomed"
                    width={1200}
                    height={675}
                    className="w-full h-auto rounded-[8px]"
                    unoptimized
                  />
                </div>
                <div 
                  className={`w-full rounded-[8px] overflow-hidden cursor-pointer ${
                    theme === "dark" 
                      ? "shadow-[0_2px_8px_rgba(0,0,0,0.3)]" 
                      : "shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                  }`}
                  onClick={() => {
                    setModalImageSrc("/images/tasks/filters-applied.png");
                    setImageModalOpen(true);
                  }}
                >
                  <Image
                    src="/images/tasks/filters-applied.png"
                    alt="Filters Applied"
                    width={1200}
                    height={675}
                    className="w-full h-auto rounded-[8px]"
                    unoptimized
                  />
                </div>

                <p id="person-details" className={`text-[15px] font-medium mt-12 underline decoration-1 underline-offset-1 scroll-mt-[60px] ${
                  theme === "dark" ? 'decoration-[#404040]' : 'decoration-[#D0D0D0]'
                }`}>2. Person Details</p>
                <p>
                  Early on, there was some debates on whether One-off tasks should live in a separate &quot;Tasks&quot; tab at the person level. While this conceptually felt clean, this would introduce split context and force users to mentally understand and navigate multiple task histories.
                </p>
                <p>
                  Instead, we expanded the existing &quot;Sequences&quot; tab into a broader &quot;Engagement tab&quot; with tasks ordered chronologically. The type of tasks would include:
                </p>
                <ul className="space-y-2 ml-4 list-disc">
                  <li>New One-off Tasks</li>
                  <li>Automated Sequence tasks</li>
                  <li>Replies and email threads</li>
                </ul>
                <p>
                  This helped preserve a single source of truth for users to understand &quot;What happened with this prospect?&quot;
                </p>
                <div 
                  className={`w-full rounded-[8px] overflow-hidden cursor-pointer ${
                    theme === "dark" 
                      ? "shadow-[0_2px_8px_rgba(0,0,0,0.3)]" 
                      : "shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                  }`}
                  onClick={() => {
                    setModalImageSrc("/images/tasks/person-details.png");
                    setImageModalOpen(true);
                  }}
                >
                  <Image
                    src="/images/tasks/person-details.png"
                    alt="Person Details"
                    width={1200}
                    height={675}
                    className="w-full h-auto rounded-[8px]"
                    unoptimized
                  />
                </div>
                <p>
                  While these One-off tasks appeared visually alongside automated Sequence tasks, they were intentionally not associated with any sequence or automation. I solved for this with designs so that
                </p>
                <ul className="space-y-2 ml-4 list-disc">
                  <li>Task rows never show a sequence name</li>
                  <li>Tasks are explicitly labeled as &quot;One-off&quot; or via &quot;Play&quot; when relevant</li>
                  <li>Clicking a task from the Task Dashboard (see above) always deeplinks to open the exact task with context</li>
                </ul>

                <p id="plays-automate" className={`text-[15px] font-medium mt-12 underline decoration-1 underline-offset-1 scroll-mt-[60px] ${
                  theme === "dark" ? 'decoration-[#404040]' : 'decoration-[#D0D0D0]'
                }`}>3. Plays to Automate Task Creation</p>
                <p>
                  We also wanted to support the ability for tasks to be created using Plays.
                </p>
                <p>
                  Plays are automated workflows that let teams orchestrate outbound motion at scale by linking signals and data to watch out for meaningful events and trigger customized workflows for outreach, task creation, AI research, or list building. This ensures teams can act at the right moment and capture intent without manual oversight.
                </p>
                <p>
                  We added a &quot;Create task&quot; action step to the Play builder so users could define task details directly through automation.
                </p>
                <p>
                  This would be particularly helpful for users who need to create individual Tasks at scale but don&apos;t need or want to go through creating a multi-step Sequence.
                </p>
                <div 
                  className={`w-full rounded-[8px] overflow-hidden cursor-pointer ${
                    theme === "dark" 
                      ? "shadow-[0_2px_8px_rgba(0,0,0,0.3)]" 
                      : "shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                  }`}
                  onClick={() => {
                    setModalImageSrc("/images/tasks/play-tasks-1.png");
                    setImageModalOpen(true);
                  }}
                >
                  <Image
                    src="/images/tasks/play-tasks-1.png"
                    alt="Play Tasks 1"
                    width={1200}
                    height={675}
                    className="w-full h-auto rounded-[8px]"
                    unoptimized
                  />
                </div>
                <div 
                  className={`w-full rounded-[8px] overflow-hidden cursor-pointer ${
                    theme === "dark" 
                      ? "shadow-[0_2px_8px_rgba(0,0,0,0.3)]" 
                      : "shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                  }`}
                  onClick={() => {
                    setModalImageSrc("/images/tasks/play-tasks-2.png");
                    setImageModalOpen(true);
                  }}
                >
                  <Image
                    src="/images/tasks/play-tasks-2.png"
                    alt="Play Tasks 2"
                    width={1200}
                    height={675}
                    className="w-full h-auto rounded-[8px]"
                    unoptimized
                  />
                </div>
                <div 
                  className={`w-full rounded-[8px] overflow-hidden cursor-pointer ${
                    theme === "dark" 
                      ? "shadow-[0_2px_8px_rgba(0,0,0,0.3)]" 
                      : "shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                  }`}
                  onClick={() => {
                    setModalImageSrc("/images/tasks/play-tasks-3.png");
                    setImageModalOpen(true);
                  }}
                >
                  <Image
                    src="/images/tasks/play-tasks-3.png"
                    alt="Play Tasks 3"
                    width={1200}
                    height={675}
                    className="w-full h-auto rounded-[8px]"
                    unoptimized
                  />
                </div>
                <div 
                  className={`w-full rounded-[8px] overflow-hidden cursor-pointer ${
                    theme === "dark" 
                      ? "shadow-[0_2px_8px_rgba(0,0,0,0.3)]" 
                      : "shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                  }`}
                  onClick={() => {
                    setModalImageSrc("/images/tasks/play-tasks-4.png?v=3");
                    setImageModalOpen(true);
                  }}
                >
                  <Image
                    src="/images/tasks/play-tasks-4.png?v=3"
                    alt="Play Tasks 4"
                    width={1200}
                    height={675}
                    className="w-full h-auto rounded-[8px]"
                    unoptimized
                  />
                </div>
                <p className="font-medium">Real world examples</p>
                <ul className="space-y-2 ml-4 list-disc">
                  <li>If a Sales Rep had a list of contacts he made from a recent conference and wanted to make sure he remembered to call every single person through one-off tasks, a Play could be created to feed that list and create tasks in scale</li>
                  <li>If a Sales Director wanted to give his team members prospects to do a highly targeted one-off outreach based on website visits, a Play could be created to route an equal number of site visitors to reps and have tasks created for them.</li>
                </ul>
                <p>
                  Ultimately Plays empower automation to surface high-intent actions (viewing pricing pages, repeated link clicks) and allowing individual Tasks to be created from them allows an element of human judgement and execution.
                </p>

                <p id="scheduling-tasks" className={`text-[15px] font-medium mt-12 underline decoration-1 underline-offset-1 scroll-mt-[60px] ${
                  theme === "dark" ? 'decoration-[#404040]' : 'decoration-[#D0D0D0]'
                }`}>4. Scheduling tasks for later</p>
                <p>
                  Scheduling tasks to surface and reminder users in the future needed also be a core functionality.
                </p>
                <div 
                  className={`w-full rounded-[8px] overflow-hidden cursor-pointer ${
                    theme === "dark" 
                      ? "shadow-[0_2px_8px_rgba(0,0,0,0.3)]" 
                      : "shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                  }`}
                  onClick={() => {
                    setModalImageSrc("/images/tasks/schedule-tasks.png");
                    setImageModalOpen(true);
                  }}
                >
                  <Image
                    src="/images/tasks/schedule-tasks.png"
                    alt="Schedule Tasks"
                    width={1200}
                    height={675}
                    className="w-full h-auto rounded-[8px]"
                    unoptimized
                  />
                </div>
                <div 
                  className={`w-full rounded-[8px] overflow-hidden cursor-pointer ${
                    theme === "dark" 
                      ? "shadow-[0_2px_8px_rgba(0,0,0,0.3)]" 
                      : "shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                  }`}
                  onClick={() => {
                    setModalImageSrc("/images/tasks/schedule-calendar.png?v=2");
                    setImageModalOpen(true);
                  }}
                >
                  <Image
                    src="/images/tasks/schedule-calendar.png?v=2"
                    alt="Schedule Calendar"
                    width={1200}
                    height={675}
                    className="w-full h-auto rounded-[8px]"
                    unoptimized
                  />
                </div>
                <p className="font-medium">Common use cases for scheduling</p>
                <ul className="space-y-2 ml-4 list-disc">
                  <li>When a prospect replies to a Sales rep and says &quot;Email me in 2 months to revisit this offer&quot;</li>
                  <li>When a user wants to time an outreach with a special event</li>
                  <li>When a Sales rep needs to set aside time to do more research on a Person or Company</li>
                  <li>To coordinate additional follow ups when a Person doesn&apos;t reply</li>
                </ul>
                <p>
                  Users would be able to Schedule tasks and Emails to be sent in the future as a Secondary action.
                </p>

                <p id="exclusions-sequences" className={`text-[15px] font-medium mt-12 underline decoration-1 underline-offset-1 scroll-mt-[60px] ${
                  theme === "dark" ? 'decoration-[#404040]' : 'decoration-[#D0D0D0]'
                }`}>5. Exclusions and Sequences</p>
                <p>
                  Unify has built in guardrails to make sure any Person or Company that falls under certain set exclusions (e.g. is a Closed Won status in the CRM or is on a Do Not Contact list) to not be added to a Sequence or Play.
                </p>
                <p>
                  Similarly, if a Person is currently going in a Sequence, Unify does not allow that person to be added to another sequence in order to prevent duplicate outreach.
                </p>
                <p>
                  For One-off Tasks we made a deliberate decision to allow users to still create one-offs even if a Person was either excluded or currently in a Sequence. This was to not block users from timely actions that could win deals and ensure flexible usage.
                </p>
                <p>
                  To supplement, I designed warning-first patterns with banners and explanations. Users can still create tasks but they have the information to decide for themselves if they want to proceed.
                </p>
                <div 
                  className={`w-full rounded-[8px] overflow-hidden cursor-pointer ${
                    theme === "dark" 
                      ? "shadow-[0_2px_8px_rgba(0,0,0,0.3)]" 
                      : "shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                  }`}
                  onClick={() => {
                    setModalImageSrc("/images/tasks/tasks-exclusions.gif?v=2");
                    setImageModalOpen(true);
                  }}
                >
                  <Image
                    src="/images/tasks/tasks-exclusions.gif?v=2"
                    alt="Tasks Exclusions"
                    width={1200}
                    height={675}
                    className="w-full h-auto rounded-[8px]"
                    unoptimized
                  />
                </div>

                <p id="manual-emails" className={`text-[15px] font-medium mt-12 underline decoration-1 underline-offset-1 scroll-mt-[60px] ${
                  theme === "dark" ? 'decoration-[#404040]' : 'decoration-[#D0D0D0]'
                }`}>6. Manual emails and managing replies</p>
                <div className="space-y-4 text-[14px] leading-relaxed text-foreground">
                  <p>
                    For sequence-based emails, replies automatically end the sequence. Any replies are shown as threaded conversations directly beneath the most recent email task that triggered the response, making it immediately clear which step a prospect replied to and why no further sequence actions will occur.
                  </p>
                  <p>
                    For manual one-off emails, a person can reply while additional tasks are already scheduled for that person. The UX needed to surface the reply clearly while preserving the temporal flow of upcoming tasks.
                  </p>
                  <p>
                    To support both cases, replies are displayed as collapsed threads by default, visually grouped under the relevant email task. Threads can be expanded on demand to provide full context, while future scheduled tasks remain visible and ordered chronologically.
                  </p>
                  <div 
                    className={`w-full rounded-[8px] overflow-hidden cursor-pointer ${
                      theme === "dark" 
                        ? "shadow-[0_2px_8px_rgba(0,0,0,0.3)]" 
                        : "shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                    }`}
                    onClick={() => {
                      setModalImageSrc("/images/tasks/replied-expanded.png");
                      setImageModalOpen(true);
                    }}
                  >
                    <Image
                      src="/images/tasks/replied-expanded.png"
                      alt="Replied Expanded"
                      width={1200}
                      height={675}
                      className="w-full h-auto rounded-[8px]"
                      unoptimized
                    />
                  </div>
                  <p>
                    From a UX perspective, this introduced some risks:
                  </p>
                  <ul className="space-y-2 ml-4 list-disc">
                    <li>Replies can interrupt but not cancel future tasks</li>
                    <li>Multiple tasks and replies compete for attention</li>
                    <li>Threading risks overwhelming the activity feed</li>
                  </ul>
                  <p>
                    Key UX decisions made this viable for an MVP:
                  </p>
                  <ul className="space-y-2 ml-4 list-disc">
                    <li>One-off replies surface without reordering scheduled tasks</li>
                    <li>Threads are collapsed by default to preserve scannability</li>
                    <li>Shared patterns across sequence and manual flows reduce cognitive overhead</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Outcomes and Beta Cohort */}
            <section id="outcomes" className="animate-fade-in-up scroll-mt-[60px]" style={{ animationDelay: '800ms' }}>
              <h3 className="text-[15px] font-medium text-foreground mb-4">Outcomes and Beta Cohort</h3>
              <div className="space-y-4 text-[14px] leading-relaxed text-foreground">
                <p>
                  We invited a select number of customers who have been asking for this feature along with our own Sales team to beta test.
                </p>
                <p>
                  During a 1 month beta test period, this feature became one of the most adopted workflows amongst early BDR teams.
                </p>
                <div className="flex gap-4 flex-wrap">
                  <div className={`flex-1 min-w-[250px] rounded-[8px] border p-3 ${
                    theme === "dark" 
                      ? "bg-[#1A1A1A] border-[#2A2A2A]" 
                      : "bg-foreground/5 border-foreground/10"
                  }`}>
                    <div className="flex items-start gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#166534"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4 flex-shrink-0 mt-0.5"
                        aria-hidden="true"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      <p className={`text-[14px] leading-relaxed ${
                        theme === "dark" 
                          ? "text-[#B0B0B0]" 
                          : "text-foreground/70"
                      }`}>
                        Reduced friction for Sale Reps that had very nuanced outbound strategies
                      </p>
                    </div>
                  </div>
                  <div className={`flex-1 min-w-[250px] rounded-[8px] border p-3 ${
                    theme === "dark" 
                      ? "bg-[#1A1A1A] border-[#2A2A2A]" 
                      : "bg-foreground/5 border-foreground/10"
                  }`}>
                    <div className="flex items-start gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#166534"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4 flex-shrink-0 mt-0.5"
                        aria-hidden="true"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      <p className={`text-[14px] leading-relaxed ${
                        theme === "dark" 
                          ? "text-[#B0B0B0]" 
                          : "text-foreground/70"
                      }`}>
                        Increased weekly active usage on Tasks overall with the addition of One-offs
                      </p>
                    </div>
                  </div>
                </div>
                <p className="font-medium mt-6">Over time we also planned to measure</p>
                <ul className="space-y-2 ml-4 list-disc">
                  <li>Weekly Active Users executing one-off tasks</li>
                  <li>Task types created and completed WoW</li>
                  <li>Number of Play automations created specifically for One-off tasks</li>
                </ul>
                <p>
                  And with these, we would see whether our North Star Metrics would be impacted positively
                </p>
                <ul className="space-y-2 ml-4 list-disc">
                  <li>Number of Positive Replies from Prospects</li>
                  <li>Number of Daily Active Users on Unify</li>
                  <li>Number of Active Plays per week and month</li>
                </ul>
              </div>
            </section>
          </div>
        )}

        {project.id === 2 && (
          <div className="space-y-16 md:space-y-20 pb-12 md:pb-16">
            {/* Problem */}
            <section id="problem" className="animate-fade-in-up scroll-mt-[60px]" style={{ animationDelay: '200ms' }}>
              <h3 className="text-[15px] font-medium text-foreground mb-4">Problem</h3>
              <div className="space-y-4 text-[14px] leading-relaxed text-foreground">
                <p>
                  Unify used to have no holistic notifications system. Customers only discovered issues by stumbling into broken states and high urgency moments like positive replies were easy to miss.
                </p>
                <p>
                  We saw three recurring pain points
                </p>
                <ol className="space-y-2 ml-4 list-decimal">
                  <li>Users lacked awareness of account issues that required action (mailbox disconnects, LinkedIn cookie expiration, broken plays, blocked enrollments)</li>
                  <li>Reps missed time-sensitive sales signals, such as positive replies, costing delays in meetings booked.</li>
                  <li>Product updates and onboarding value were hard to drive in a future self-serve PLG motion</li>
                </ol>
                <p>
                  As a result, users were burdened with reactive workflows, relied more on customer support, and experienced slower time-to-value.
                </p>
              </div>
            </section>

            {/* Goals */}
            <section id="goals" className="animate-fade-in-up scroll-mt-[60px]" style={{ animationDelay: '300ms' }}>
              <h3 className="text-[15px] font-medium text-foreground mb-4">Goals</h3>
              <div className="space-y-4 text-[14px] leading-relaxed text-foreground">
                <p>
                  Design and ship a multi-channel notifications system that
                </p>
                <ul className="space-y-2 ml-4 list-disc">
                  <li>Increases awareness of urgent actions and positive outcomes</li>
                  <li>Drives adoption of core workflows via smart defaults</li>
                  <li>Scales for PLG without becoming noisy</li>
                </ul>
                <div 
                  className={`w-full rounded-[8px] overflow-hidden cursor-pointer mt-4 ${
                    theme === "dark" 
                      ? "shadow-[0_2px_8px_rgba(0,0,0,0.3)]" 
                      : "shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                  }`}
                  onClick={() => {
                    setModalImageSrc("/images/notifications/notif-full.png");
                    setImageModalOpen(true);
                  }}
                >
                  <Image
                    src="/images/notifications/notif-full.png"
                    alt="Notifications Full"
                    width={1200}
                    height={675}
                    className="w-full h-auto rounded-[8px]"
                    unoptimized
                  />
                </div>
                {/* Hidden paragraph - can be restored if needed:
                <p>
                  To make sure users don&apos;t get bombarded with notifications, we anchored on a principle that guided every decision: <strong>When in doubt, do not notify.</strong>
                </p>
                */}
              </div>
            </section>

            {/* Solution - Hidden for now
            <section id="solution" className="animate-fade-in-up scroll-mt-[60px]" style={{ animationDelay: '400ms' }}>
              <h3 className="text-[15px] font-medium text-foreground mb-4">Solution</h3>
              <div className="space-y-4 text-[14px] leading-relaxed text-foreground">
                <p>
                  I led the end-to-end design for Unify Notifications: a multi-channel system that delivers relevant alerts via
                </p>
                <ul className="space-y-2 ml-4 list-disc">
                  <li>In-app (bell icon + side-nav feed)</li>
                  <li>Slack (fast path for urgent moments)</li>
                  <li>Email (batched, transactional, and preference-driven)</li>
                </ul>
              </div>
            </section>
            */}

            {/* Key Design Decisions */}
            <section id="key-design-decisions" className="animate-fade-in-up scroll-mt-[60px]" style={{ animationDelay: '500ms' }}>
              <h3 className="text-[15px] font-medium text-foreground mb-4">Key Design Decisions</h3>
              <div className="space-y-12 text-[14px] leading-relaxed text-foreground">
                {/* 1) Notification buckets */}
                <div id="notification-buckets">
                  <p className="text-[15px] font-medium mb-4">1) Notification buckets that match user intent</p>
                  <div className="space-y-4">
                    <p>
                      For the MVP, we grouped notifications into clear buckets to make preferences understandable and reduce noise
                    </p>
                    <ul className="space-y-2 ml-4 list-disc">
                      <li>Replies</li>
                      <li>Tasks</li>
                      <li>Needs attention</li>
                      <li>Success</li>
                    </ul>
                    <div 
                      className={`w-full rounded-[8px] overflow-hidden cursor-pointer mt-4 ${
                        theme === "dark" 
                          ? "shadow-[0_2px_8px_rgba(0,0,0,0.3)]" 
                          : "shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                      }`}
                      onClick={() => {
                        setModalImageSrc("/images/notifications/pieces.png");
                        setImageModalOpen(true);
                      }}
                    >
                      <Image
                        src="/images/notifications/pieces.png"
                        alt="Notification Pieces"
                        width={1200}
                        height={675}
                        className="w-full h-auto rounded-[8px]"
                        unoptimized
                      />
                    </div>
                    <p>
                      Plus non-optional buckets for PLG safety
                    </p>
                    <ul className="space-y-2 ml-4 list-disc">
                      <li>Billing</li>
                      <li>Onboarding</li>
                      <li>Security</li>
                    </ul>
                    <p>
                      This allowed defaults that are smart and minimal, with customization layered on later.
                    </p>
                  </div>
                </div>

                {/* 2) Reply notifications */}
                <div id="reply-notifications">
                  <p className="text-[15px] font-medium mb-4">2) Reply notifications optimized for urgency</p>
                  <div className="space-y-4">
                    <p>
                      From UX research from customers and internal team feedback, positive replies were the most consistently requested notification. With this knowledge, we intentionally chose to <strong>not notify on all reply types</strong> in the MVP. The focus was on the replies most likely to turn into meetings:
                    </p>
                    <ul className="space-y-2 ml-4 list-disc">
                      <li>Willing to meet</li>
                      <li>Needs more info</li>
                      <li>Positive</li>
                      <li>Neutral</li>
                    </ul>
                    <p className="text-[12px] text-foreground/60 italic">
                      (See <a href="/projects/1" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline transition-all">Reply Classifications</a> case study to learn more)
                    </p>
                    <p>
                      We also designed a precedence rule so notifications stay clear even if a reply has multiple tags
                    </p>
                    <ul className="space-y-2 ml-4 list-disc">
                      <li>Willing to meet → Needs more info → Positive → Neutral</li>
                    </ul>
                    <div 
                      className={`w-full rounded-[8px] overflow-hidden cursor-pointer mt-4 ${
                        theme === "dark" 
                          ? "shadow-[0_2px_8px_rgba(0,0,0,0.3)]" 
                          : "shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                      }`}
                      onClick={() => {
                        setModalImageSrc("/images/notifications/reply-notifs.png");
                        setImageModalOpen(true);
                      }}
                    >
                      <Image
                        src="/images/notifications/reply-notifs.png"
                        alt="Reply Notifications"
                        width={1200}
                        height={675}
                        className="w-full h-auto rounded-[8px]"
                        unoptimized
                      />
                    </div>
                    <p>
                      Later on, we included the ability for users to customize notifications for replies based on classifications.
                    </p>
                  </div>
                </div>

                {/* 3) Admin vs rep */}
                <div id="admin-vs-rep">
                  <p className="text-[15px] font-medium mb-4">3) Admin vs rep mental models</p>
                  <div className="space-y-4">
                    <p>
                      From speaking with customers, Admins often want a workspace-wide view, while individual Reps cared more about personal execution.
                    </p>
                    <p>
                      With this in mind, we designed permission-aware preferences:
                    </p>
                    <ul className="space-y-2 ml-4 list-disc">
                      <li>Admins can receive workspace notifications (all replies, all needs attention, etc.)</li>
                      <li>Reps receive only what impacts them (assigned tasks, their own success/needs attention)</li>
                      <li>Certain categories cannot be disabled (billing, onboarding)</li>
                    </ul>
                    <p>
                      This made notifications usable for both operational oversight and daily rep workflows without creating confusion.
                    </p>
                    <div 
                      className={`w-full rounded-[8px] overflow-hidden cursor-pointer mt-4 ${
                        theme === "dark" 
                          ? "shadow-[0_2px_8px_rgba(0,0,0,0.3)]" 
                          : "shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                      }`}
                      onClick={() => {
                        setModalImageSrc("/images/notifications/notif-settings.png");
                        setImageModalOpen(true);
                      }}
                    >
                      <Image
                        src="/images/notifications/notif-settings.png"
                        alt="Notification Settings"
                        width={1200}
                        height={675}
                        className="w-full h-auto rounded-[8px]"
                        unoptimized
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* System considerations */}
            <section id="technical-considerations" className="animate-fade-in-up scroll-mt-[60px]" style={{ animationDelay: '600ms' }}>
              <h3 className="text-[15px] font-medium text-foreground mb-4">System considerations</h3>
              <div className="space-y-4 text-[14px] leading-relaxed text-foreground">
                <p>
                  This project required designing UX that could scale across multiple channels and a vendor integration.
                </p>
                <p className="font-medium">
                  Key constraints we designed around
                </p>
                <ul className="space-y-2 ml-4 list-disc">
                  <li>Multi-channel delivery with consistent payload structure across in-app, Slack, and email</li>
                </ul>
                <div 
                  className={`w-full rounded-[8px] overflow-hidden cursor-pointer mt-4 ${
                    theme === "dark" 
                      ? "shadow-[0_2px_8px_rgba(0,0,0,0.3)]" 
                      : "shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                  }`}
                  onClick={() => {
                    setModalImageSrc("/images/notifications/slack.png");
                    setImageModalOpen(true);
                  }}
                >
                  <Image
                    src="/images/notifications/slack.png"
                    alt="Slack Notifications"
                    width={1200}
                    height={675}
                    className="w-full h-auto rounded-[8px]"
                    unoptimized
                  />
                </div>
                <p className={`text-[12px] mt-1 ${
                  theme === "dark" 
                    ? "text-[#808080]" 
                    : "text-foreground/50"
                }`}>
                  Slack alert templates
                </p>
                <ul className="space-y-2 ml-4 list-disc mt-4">
                  <li>Batching rules for email to reduce spam while maintaining urgency (10–15 minutes for high-priority types)</li>
                </ul>
                <div 
                  className={`w-full rounded-[8px] overflow-hidden cursor-pointer mt-4 ${
                    theme === "dark" 
                      ? "shadow-[0_2px_8px_rgba(0,0,0,0.3)]" 
                      : "shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                  }`}
                  onClick={() => {
                    setModalImageSrc("/images/notifications/batched-inapp.png?v=2");
                    setImageModalOpen(true);
                  }}
                >
                  <Image
                    src="/images/notifications/batched-inapp.png?v=2"
                    alt="Batched In-App Notifications"
                    width={1200}
                    height={675}
                    className="w-full h-auto rounded-[8px]"
                    unoptimized
                  />
                </div>
              </div>
            </section>

            {/* Early iterations */}
            <section id="early-iterations" className="animate-fade-in-up scroll-mt-[60px]" style={{ animationDelay: '650ms' }}>
              <h3 className="text-[15px] font-medium text-foreground mb-4">Early iterations</h3>
              <div className="space-y-4 text-[14px] leading-relaxed text-foreground">
                <div 
                  className={`w-full rounded-[8px] overflow-hidden cursor-pointer ${
                    theme === "dark" 
                      ? "shadow-[0_2px_8px_rgba(0,0,0,0.3)]" 
                      : "shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                  }`}
                  onClick={() => {
                    setModalImageSrc("/images/notifications/top-nav.png");
                    setImageModalOpen(true);
                  }}
                >
                  <Image
                    src="/images/notifications/top-nav.png"
                    alt="Top Nav Notifications"
                    width={1200}
                    height={675}
                    className="w-full h-auto rounded-[8px]"
                    unoptimized
                  />
                </div>
                <p className={`text-[12px] mt-1 ${
                  theme === "dark" 
                    ? "text-[#808080]" 
                    : "text-foreground/50"
                }`}>
                  I considered placing notifications in the top-nav at first, however it felt easy to miss my pov was that users would quickly deprioritize it once they entered a workflow. The side-nav is persistently visible and naturally scanned, making it more discoverable.
                </p>
                <div 
                  className={`w-full rounded-[8px] overflow-hidden cursor-pointer mt-16 ${
                    theme === "dark" 
                      ? "shadow-[0_2px_8px_rgba(0,0,0,0.3)]" 
                      : "shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                  }`}
                  onClick={() => {
                    setModalImageSrc("/images/notifications/settings-old.png");
                    setImageModalOpen(true);
                  }}
                >
                  <Image
                    src="/images/notifications/settings-old.png"
                    alt="Settings Old"
                    width={1200}
                    height={675}
                    className="w-full h-auto rounded-[8px]"
                    unoptimized
                  />
                </div>
                <p className={`text-[12px] mt-1 ${
                  theme === "dark" 
                    ? "text-[#808080]" 
                    : "text-foreground/50"
                }`}>
                  I initially considered placing notification settings in a modal to let users quickly change default alerts. However, this approach wouldn&apos;t scale as notification types, channels, and rules expanded. Moving notification settings to a dedicated surface provided the flexibility and hierarchy needed to support future additions and manageable over time.
                </p>
                <div 
                  className={`w-full rounded-[8px] overflow-hidden cursor-pointer mt-16 ${
                    theme === "dark" 
                      ? "shadow-[0_2px_8px_rgba(0,0,0,0.3)]" 
                      : "shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                  }`}
                  onClick={() => {
                    setModalImageSrc("/images/notifications/full-page.png");
                    setImageModalOpen(true);
                  }}
                >
                  <Image
                    src="/images/notifications/full-page.png"
                    alt="Full Page Notifications"
                    width={1200}
                    height={675}
                    className="w-full h-auto rounded-[8px]"
                    unoptimized
                  />
                </div>
                <p className={`text-[12px] mt-1 ${
                  theme === "dark" 
                    ? "text-[#808080]" 
                    : "text-foreground/50"
                }`}>
                  We also considered supporting a full history of notifications, but this added scope without clear immediate value. Our belief was that notifications are meant to be acted on quickly rather than be used as an audit log. For the MVP, we prioritized fr visibility and actionability, and planned to revisit history view once usage patterns and needs became clearer.
                </p>
              </div>
            </section>

            {/* Outcomes */}
            <section id="outcomes" className="animate-fade-in-up scroll-mt-[60px]" style={{ animationDelay: '700ms' }}>
              <h3 className="text-[15px] font-medium text-foreground mb-4">Outcomes</h3>
              <div className="space-y-4 text-[14px] leading-relaxed text-foreground">
                <p>
                  Notifications became a foundational layer for both sales responsiveness and PLG readiness.
                </p>
                <p className="font-medium">
                  The impact we saw:
                </p>
                <ul className="space-y-2 ml-4 list-disc">
                  <li>Faster rep response on high intent replies through Slack and in-app alerts</li>
                  <li>Reduced support dependency by proactively surfacing &quot;needs attention&quot; issues with direct paths to resolution</li>
                  <li>Increased visibility and adoption of core workflows through success notifications and product announcements</li>
                  <li>Established a scalable infrastructure to expand notification types without building one-off solutions</li>
                </ul>
                <p className="font-medium">
                  Success was measured through engagement and adoption signals
                </p>
                <ul className="space-y-2 ml-4 list-disc">
                  <li>Email open and click rates</li>
                  <li>In-app notification click-through rates</li>
                  <li>Downstream adoption of features promoted via one-time notifications</li>
                </ul>
              </div>
            </section>

            {/* Rollout plan */}
            <section id="rollout" className="animate-fade-in-up scroll-mt-[60px]" style={{ animationDelay: '800ms' }}>
              <h3 className="text-[15px] font-medium text-foreground mb-4">Rollout plan</h3>
              <div className="space-y-4 text-[14px] leading-relaxed text-foreground">
                <p>
                  We rolled out Notifications via a structured dogfood → beta → GA plan.
                </p>
                <ol className="space-y-4 ml-4 list-decimal">
                  <li>
                    Dogfooding first with Unify&apos;s internal Sales and GTM teams let us validate urgency, tone, and noise thresholds quickly.
                  </li>
                  <li>
                    Then we expanded into beta with a small set of key customers, iterating rapidly based on real workflows and feedback on
                    <ol className="space-y-2 ml-4 mt-2 list-decimal">
                      <li>Relevance (is this helpful or spammy)</li>
                      <li>Clarity (do I understand what happened and what to do next)</li>
                      <li>Reliability (is delivery consistent across channels)</li>
                    </ol>
                  </li>
                </ol>
                <p>
                  A huge advantage of designing at Unify was the ability to <strong>interview, dogfood, and test</strong> with our own sales org continuously. We weren&apos;t guessing what &quot;urgent&quot; meant because we could watch it in practice and tune the system until it felt genuinely useful under real quota pressure.
                </p>
              </div>
            </section>
          </div>
        )}

        {project.id === 6 && (
          <div className="space-y-16 md:space-y-20 pb-12 md:pb-16">
            {/* Role */}
            <section id="role" className="animate-fade-in-up scroll-mt-[60px]" style={{ animationDelay: '200ms' }}>
              <h3 className="text-[15px] font-medium text-foreground mb-4">Role</h3>
              <p className="text-[14px] leading-relaxed text-foreground">
                Design Lead - Product Design, Prototyping, User flows, QA
              </p>
              <div className="mt-4 space-y-2 text-[14px] leading-relaxed text-foreground">
                <p className="font-medium">Length & Status</p>
                <p>4 months, Launching Q4 2023</p>
                <p className="font-medium mt-4">Team</p>
                <ul className="space-y-1 ml-4 list-disc">
                  <li>Nelson Tang, PM</li>
                  <li>Jag Singh, SWE</li>
                  <li>Yonah Karp, SWE</li>
                </ul>
              </div>
            </section>

            {/* Overview */}
            <section id="overview" className="animate-fade-in-up scroll-mt-[60px]" style={{ animationDelay: '300ms' }}>
              <h3 className="text-[15px] font-medium text-foreground mb-4">Overview</h3>
              <div className="space-y-4 text-[14px] leading-relaxed text-foreground">
                <p>
                  In response to seeing low conversion of users making a CRE investment on Cadre, revamping the digital investor journey was made a priority OKR for H2 2023.
                </p>
                <p>
                  I led the end-to-end design direction of a new investing experience and played a crucial role in redefining success metrics for conversion.
                </p>
                <div className="mt-6">
                  <p className="font-medium mb-2">REDESIGNED & ENHANCED</p>
                  <p>
                    An end-to-end redesigned experience to allow new users to seamlessly set up their profile for CRE investing.
                  </p>
                </div>
              </div>
            </section>

            {/* The Problem */}
            <section id="problem" className="animate-fade-in-up scroll-mt-[60px]" style={{ animationDelay: '400ms' }}>
              <h3 className="text-[15px] font-medium text-foreground mb-4">The Problem</h3>
              <div className="space-y-4 text-[14px] leading-relaxed text-foreground">
                <p>
                  Cadre&apos;s goal is to simplify the complex processes of CRE Investing and democratize access to retail investors. Currently, users experience high friction and confusing steps when trying to make an investment, which involve two processes:
                </p>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium">Creating an entity (of multiple types)</p>
                    <p>
                      An investing entity is the vehicle that makes an investment in a commercial real estate offering. This includes verifying your identity and submitting tax documents to verify your status as an accredited investor. Investors can set up different entity types such as an Individual, Joint Tenants, LLC, Trust, and even through an IRA plan.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">Submitting an allocation</p>
                    <p>
                      Once an investor has created an entity, they will be able to submit a dollar allocation for a CRE offering using that entity vehicle, which further requires document signing and an approval period. Each allocation may have different questions and requirements, which depend on the type of entity the investor chooses to use.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* The Data */}
            <section id="data" className="animate-fade-in-up scroll-mt-[60px]" style={{ animationDelay: '500ms' }}>
              <h3 className="text-[15px] font-medium text-foreground mb-4">The Data</h3>
              <div className="space-y-4 text-[14px] leading-relaxed text-foreground">
                <p className="font-medium">
                  Solving for low intent shown in largest areas of drop off - Entity Creation & Investor Verification.
                </p>
                <p>
                  We consistently observed a high rate of drop offs due to low intent users and a high friction experience in verifying investors at the beginning of each investor journey.
                </p>
                <p>
                  Research shows that high intent investors see the investment process as straightforward, indicating the problem areas to be at the point of creating an entity - a daunting task for any user new to CRE.
                </p>
                <p>
                  In a survey earlier this year, we asked investors what the core investment process was like for them. The weighted score was 3.6 (1-hardest, 5-easiest). This told us that we didn&apos;t need to spend most of our efforts optimizing the questions to create an entity and make investments, but rather focus on entry/de-entry points as well as a guidance system for entity creation.
                </p>
              </div>
            </section>

            {/* Problem Alignment & Hypothesis */}
            <section id="problem-alignment" className="animate-fade-in-up scroll-mt-[60px]" style={{ animationDelay: '600ms' }}>
              <h3 className="text-[15px] font-medium text-foreground mb-4">Problem Alignment & Hypothesis</h3>
              <div className="space-y-4 text-[14px] leading-relaxed text-foreground">
                <p>
                  De-couple the entity creation and allocation experiences, which are the two largest points of drop-off. By doing so, we will be able to capture investors with higher intent while also improving conversion with an enhanced and guided investment process.
                </p>
              </div>
            </section>

            {/* Design Principles */}
            <section id="design-principles" className="animate-fade-in-up scroll-mt-[60px]" style={{ animationDelay: '700ms' }}>
              <h3 className="text-[15px] font-medium text-foreground mb-4">Design Principles</h3>
              <div className="space-y-4 text-[14px] leading-relaxed text-foreground">
                <ul className="space-y-3 ml-4 list-disc">
                  <li>
                    <span className="font-medium">Optimize to clarify investing requirements</span>
                    <br />
                    Communicate clear and guided steps while embedding opportunities for CRE education.
                  </li>
                  <li>
                    <span className="font-medium">Eliminate as much friction as possible</span>
                    <br />
                    Design multiple entry points into entity creation, build seamless saved states for re-entry, and simplify investing.
                  </li>
                  <li>
                    <span className="font-medium">Strive for product & design excellence</span>
                    <br />
                    Overdeliver on user expectations and implement smooth transitions between each step.
                  </li>
                </ul>
              </div>
            </section>

            {/* Building a New Onboarding Experience */}
            <section id="building-onboarding" className="animate-fade-in-up scroll-mt-[60px]" style={{ animationDelay: '800ms' }}>
              <h3 className="text-[15px] font-medium text-foreground mb-4">Building a New Onboarding Experience</h3>
              <div className="space-y-12 text-[14px] leading-relaxed text-foreground">
                {/* 1. Guided steps */}
                <div>
                  <p className="text-[15px] font-medium mb-4">1. Introducing guided steps and progression</p>
                  <p>
                    In order for new users to make an investment, they need create an account, create an investing entity, and link their bank account. To make sense of an otherwise unconventional set of requirements, I designed a nudge banner categorized with three steps for a new user to follow. These banner states will live on top of the user&apos;s page until all tasks are completed.
                  </p>
                </div>

                {/* 2. Multiple entry points */}
                <div>
                  <p className="text-[15px] font-medium mb-4">2. Creating multiple entry points for entity creation</p>
                  <p>
                    Entity creation requires intention and dedicated effort due to the requirements ranging from Identity Verification, Tax Document Upload, and Suitability affirmation. Not every user may be fully prepared to complete an entity in a single session. Not only that, investors have the ability to create multiple entity types to invest in different deals.
                  </p>
                  <p className="mt-2">
                    Introducing multiple entry points and the ability to save was a crucial principle in executing this new design flow.
                  </p>
                  <p className="mt-2">
                    I designed an elevated dialog that can be opened from any of these entry points with the ability to save and return whenever the user needs.
                  </p>
                </div>

                {/* 3. Complex entities */}
                <div>
                  <p className="text-[15px] font-medium mb-4">3. Designing a framework to support more complex entities</p>
                  <p>
                    While approximately 60% of our investor base create individual investing entities, the rest of Cadre&apos;s investors have allocated into deals using entities such as LLC and Trusts, which have more complex requirements to create and finalize.
                  </p>
                  <p className="mt-2">
                    Pulling in design system components and introducing a large action dialog, I was able to design consistent experiences for all entity types without causing increases in engineering scope and development time.
                  </p>
                </div>

                {/* 4. Optimize investment */}
                <div>
                  <p className="text-[15px] font-medium mb-4">4. Optimize making an investment and convert investors</p>
                  <p>
                    With the entity creation experience separated, that gave us room to significantly reduce the number of steps an investor would go through to submit an investment.
                  </p>
                  <p className="mt-2">
                    I took this opportunity to redesign the entire investment flow, following the design principles to build a clear, frictionless, and elegant experience.
                  </p>
                </div>
              </div>
            </section>

            {/* User Testing */}
            <section id="user-testing" className="animate-fade-in-up scroll-mt-[60px]" style={{ animationDelay: '900ms' }}>
              <h3 className="text-[15px] font-medium text-foreground mb-4">User Testing & Validating Signal</h3>
              <div className="space-y-4 text-[14px] leading-relaxed text-foreground">
                <p>
                  To gain qualitative data on the Nudge Banners and Entity Creation cover pages, I used the UserTesting tool to facilitate a group of users through a series of questions.
                </p>
              </div>
            </section>

            {/* Success Metrics */}
            <section id="success-metrics" className="animate-fade-in-up scroll-mt-[60px]" style={{ animationDelay: '1000ms' }}>
              <h3 className="text-[15px] font-medium text-foreground mb-4">How we plan to measure success</h3>
              <div className="space-y-4 text-[14px] leading-relaxed text-foreground">
                <p>
                  We planned to measure success based on these key results:
                </p>
                <ul className="space-y-2 ml-4 list-disc">
                  <li>
                    <span className="font-medium">30-Day Conversion</span>
                    <br />
                    Measure effectiveness of decoupling entity creation and allocation for ultimate conversion.
                  </li>
                  <li>
                    <span className="font-medium">Creating an entity</span>
                    <br />
                    Measure and aim to reduce time spent on creating an entity while also reducing drop offs.
                  </li>
                  <li>
                    <span className="font-medium">Business process</span>
                    <br />
                    Measure the end-to-end cycle of account sign up, investment, and document signed rates.
                  </li>
                </ul>
              </div>
            </section>

            {/* Leadership */}
            <section id="leadership" className="animate-fade-in-up scroll-mt-[60px]" style={{ animationDelay: '1100ms' }}>
              <h3 className="text-[15px] font-medium text-foreground mb-4">Words from leadership</h3>
              <div className="space-y-4 text-[14px] leading-relaxed text-foreground">
                <p>
                  Our work and presentation to senior leadership were met with positive reactions and was recognized as an effective way to really move the needle.
                </p>
                <div className={`rounded-[8px] border p-3 ${
                  theme === "dark" 
                    ? "bg-[#1A1A1A] border-[#2A2A2A]" 
                    : "bg-foreground/5 border-foreground/10"
                }`}>
                  <p className="text-[14px] leading-relaxed">
                    &quot;I love this nudge feature, onboarding users successfully with the complexities of CRE has always been a challenge; We&apos;ve even considered a similar approach with email campaigns, but having touch points in the product is much smarter.&quot;
                  </p>
                  <p className={`mt-2 text-[12px] ${
                    theme === "dark" 
                      ? "text-[#808080]" 
                      : "text-foreground/60"
                  }`}>
                    — Chief Marketing Officer
                  </p>
                </div>
                <div className={`rounded-[8px] border p-3 ${
                  theme === "dark" 
                    ? "bg-[#1A1A1A] border-[#2A2A2A]" 
                    : "bg-foreground/5 border-foreground/10"
                }`}>
                  <p className="text-[14px] leading-relaxed">
                    &quot;This is really exciting to see. When it&apos;s released to market, Cadre will be fully revamped and prepared to bring on a whole new user base [retail investors].&quot;
                  </p>
                  <p className={`mt-2 text-[12px] ${
                    theme === "dark" 
                      ? "text-[#808080]" 
                      : "text-foreground/60"
                  }`}>
                    — Head of Product
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}

        {project.id === 8 && (
          <div className="space-y-16 md:space-y-20 pb-12 md:pb-16">
            {/* Role */}
            <section id="role" className="animate-fade-in-up scroll-mt-[60px]" style={{ animationDelay: '200ms' }}>
              <h3 className="text-[15px] font-medium text-foreground mb-4">Role</h3>
              <p className="text-[14px] leading-relaxed text-foreground">
                Design Lead - UX & Visual Design, Prototyping, Project Management, QA
              </p>
              <div className="mt-4 space-y-2 text-[14px] leading-relaxed text-foreground">
                <p className="font-medium">Length & Status</p>
                <p>5 months, Launched in February 2023</p>
                <p className="font-medium mt-4">Collaborators</p>
                <ul className="space-y-1 ml-4 list-disc">
                  <li>2 Product Designers</li>
                  <li>2 Product Managers</li>
                  <li>6 Engineers</li>
                  <li>1 Marketing lead</li>
                </ul>
              </div>
            </section>

            {/* Overview */}
            <section id="overview" className="animate-fade-in-up scroll-mt-[60px]" style={{ animationDelay: '300ms' }}>
              <h3 className="text-[15px] font-medium text-foreground mb-4">Overview</h3>
              <div className="space-y-4 text-[14px] leading-relaxed text-foreground">
                <p>
                  Cadre Design System is a set of coded styles and components built to reinvent Cadre&apos;s platform with a unified design language. Since launching, we&apos;ve enabled a combined force of 2 designers, 7 product managers, and 16 engineers to build new investing experiences on Cadre with high velocity.
                </p>
                <p>
                  The goal was to replace an existing system that wasn&apos;t maintained nor scaled as the platform grew, which led to clunky and inconsistent products.
                </p>
              </div>
            </section>

            {/* Key responsibilities */}
            <section id="key-responsibilities" className="animate-fade-in-up scroll-mt-[60px]" style={{ animationDelay: '400ms' }}>
              <h3 className="text-[15px] font-medium text-foreground mb-4">Key responsibilities</h3>
              <ul className="space-y-2 text-[14px] leading-relaxed text-foreground ml-4 list-disc">
                <li>Led design, strategy, and roadmap</li>
                <li>Maintained and scaled in parallel with product roadmap</li>
                <li>Presented needs & outcomes to leadership as well as stakeholders across product and engineering to gather buy in</li>
              </ul>
            </section>

            {/* REDESIGNED */}
            <section id="redesigned" className="animate-fade-in-up scroll-mt-[60px]" style={{ animationDelay: '500ms' }}>
              <h3 className="text-[15px] font-medium text-foreground mb-4">REDESIGNED</h3>
              <div className="space-y-8 text-[14px] leading-relaxed text-foreground">
                <div>
                  <p className="font-medium mb-2">Browse page for Commercial Real Estate deals</p>
                  <p>
                    Improved investment submission rates with new browsing experience from 3.7% to 9.5%.
                  </p>
                </div>
                <div>
                  <p className="font-medium mb-2">Signing up for Cadre</p>
                  <p>
                    Improved sign up rates from 10.6% to 17.5% and enhanced investor qualifications to capture users most likely to convert down funnel.
                  </p>
                </div>
                <div>
                  <p className="font-medium mb-2">Mobile signup experience</p>
                  <p>
                    Improved mobile sign up rates from 16.1% to 19.3% & improved retention rate for Personal Identifiable Information (PII) input by 22.2%.
                  </p>
                </div>
              </div>
            </section>

            {/* GOALS */}
            <section id="goals" className="animate-fade-in-up scroll-mt-[60px]" style={{ animationDelay: '600ms' }}>
              <h3 className="text-[15px] font-medium text-foreground mb-4">GOALS</h3>
              <div className="space-y-4 text-[14px] leading-relaxed text-foreground">
                <p>
                  As a design team of 2, the Cadre Design System was built to be simple, light, and useful; to speed up designing while also not constraining the design process. We wanted to have a nimble DS that wouldn&apos;t be caught up by &quot;atomic&quot; principles and allow us to ship products quickly.
                </p>
              </div>
            </section>

            {/* Colors */}
            <section id="colors" className="animate-fade-in-up scroll-mt-[60px]" style={{ animationDelay: '700ms' }}>
              <h3 className="text-[15px] font-medium text-foreground mb-4">Colors</h3>
              <div className="space-y-4 text-[14px] leading-relaxed text-foreground">
                <p>
                  Colors placed into basic groups to quickly pull into designs and for engineers to recognize uses by name.
                </p>
              </div>
            </section>

            {/* Typography */}
            <section id="typography" className="animate-fade-in-up scroll-mt-[60px]" style={{ animationDelay: '800ms' }}>
              <h3 className="text-[15px] font-medium text-foreground mb-4">Typography</h3>
              <div className="space-y-4 text-[14px] leading-relaxed text-foreground">
                <p>
                  We wanted to make sure to build our typography system thoughtfully, as Cadre utilizes text quite often to display details about CRE deals on deal cards, investment information, important disclosures, and educational content.
                </p>
              </div>
            </section>

            {/* Elevation */}
            <section id="elevation" className="animate-fade-in-up scroll-mt-[60px]" style={{ animationDelay: '900ms' }}>
              <h3 className="text-[15px] font-medium text-foreground mb-4">Elevation</h3>
              <div className="space-y-4 text-[14px] leading-relaxed text-foreground">
                <p>
                  We built a set of shadows as we anticipated leveraging a number of overlays and elevated content across our redesigns as well as future products.
                </p>
              </div>
            </section>

            {/* Icons */}
            <section id="icons" className="animate-fade-in-up scroll-mt-[60px]" style={{ animationDelay: '1000ms' }}>
              <h3 className="text-[15px] font-medium text-foreground mb-4">Icons</h3>
              <div className="space-y-4 text-[14px] leading-relaxed text-foreground">
                <p>
                  Rather than spend bandwidth on creating custom icons, we decided to use Font Awesome to build our icon library. This was an effective move to as FA offers just the right styles with an endless supply of icons for our needs. We converted the .svgs into components that can be pulled into other components such as tags and buttons.
                </p>
              </div>
            </section>

            {/* New experiences brought to market */}
            <section id="new-experiences" className="animate-fade-in-up scroll-mt-[60px]" style={{ animationDelay: '1100ms' }}>
              <h3 className="text-[15px] font-medium text-foreground mb-4">New experiences brought to market</h3>
              <div className="space-y-6 text-[14px] leading-relaxed text-foreground">
                <div>
                  <p className="font-medium mb-2">Investor preferences</p>
                  <p>
                    A questionnaire given to users at signup to collect information on their investing behaviors.
                  </p>
                  <p className={`mt-2 text-[12px] ${
                    theme === "dark" 
                      ? "text-[#808080]" 
                      : "text-foreground/60"
                  }`}>
                    Designs by Tim Park • Released Q2 2023
                  </p>
                </div>
                <div>
                  <p className="font-medium mb-2">Entity Creation</p>
                  <p>
                    Vehicle that makes an investment in CRE offerings, required in order to make an investment
                  </p>
                  <p className={`mt-2 text-[12px] ${
                    theme === "dark" 
                      ? "text-[#808080]" 
                      : "text-foreground/60"
                  }`}>
                    Designs by Tim Park • Released Q4 2023
                  </p>
                </div>
                <div>
                  <p className="font-medium mb-2">Making an investment</p>
                  <p className={`mt-2 text-[12px] ${
                    theme === "dark" 
                      ? "text-[#808080]" 
                      : "text-foreground/60"
                  }`}>
                    Designs by Tim Park • Released Q4 2023
                  </p>
                </div>
                <div>
                  <p className="font-medium mb-2">Comparing deal offerings</p>
                  <p>
                    As investors are browsing between offerings, they can choose to add up to three offerings to be compared together.
                  </p>
                  <p className={`mt-2 text-[12px] ${
                    theme === "dark" 
                      ? "text-[#808080]" 
                      : "text-foreground/60"
                  }`}>
                    Released Q3 2023
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}

        {project.id === 5 && (
          <div className="space-y-16 md:space-y-20 pb-12 md:pb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 9 }).map((_, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedCardIndex(index);
                    setProjectCardModalOpen(true);
                  }}
                  className={`rounded-[8px] border overflow-hidden transition-all duration-200 cursor-pointer ${
                    theme === "dark"
                      ? "border-[#2A2A2A] bg-[#1A1A1A] hover:border-[#3A3A3A] hover:shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
                      : "border-foreground/10 bg-foreground/5 hover:border-foreground/20 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
                  }`}
                >
                  <div className="w-full aspect-square bg-foreground/10 flex items-center justify-center">
                    <span className={`text-[12px] ${
                      theme === "dark" ? "text-[#808080]" : "text-foreground/50"
                    }`}>
                      Image placeholder
                    </span>
                  </div>
                  <div className="p-4 space-y-1">
                    <h1 className="text-[14px] font-medium text-foreground">
                      Project Title {index + 1}
                    </h1>
                    <h2 className={`text-[12px] ${
                      theme === "dark" ? "text-[#808080]" : "text-foreground/60"
                    }`}>
                      Project Subtitle {index + 1}
                    </h2>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {project.id !== 1 && project.id !== 2 && project.id !== 3 && project.id !== 5 && project.id !== 6 && project.id !== 8 && (
          <section className="pb-12 md:pb-16">
            <p className="text-[14px] leading-relaxed text-foreground">
              Project content coming soon...
            </p>
          </section>
        )}

      </div>

      {/* Image Modal */}
      {imageModalOpen && (
        <>
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            onClick={() => setImageModalOpen(false)}
          />
          {/* Modal content */}
          <div
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
            onClick={() => setImageModalOpen(false)}
          >
            <div className="max-w-[90vw] max-h-[90vh] pointer-events-auto">
              <div className="relative inline-block">
                <button
                  type="button"
                  onClick={() => setImageModalOpen(false)}
                  className={`absolute top-0 left-full ml-4 p-1.5 rounded-full transition-colors ${
                    theme === "dark" 
                      ? "bg-[#1A1A1A] border border-[#2A2A2A] text-foreground hover:bg-[#252525]" 
                      : "bg-white border border-foreground/20 text-foreground hover:bg-foreground/5"
                  }`}
                  aria-label="Close modal"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
                <Image
                  src={modalImageSrc}
                  alt="Enlarged view"
                  width={2000}
                  height={1500}
                  className="max-w-full max-h-[90vh] object-contain rounded-[8px]"
                  unoptimized
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          </div>
        </>
      )}

      {/* Project Card Modal */}
      {projectCardModalOpen && selectedCardIndex !== null && (
        <>
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            onClick={() => {
              setProjectCardModalOpen(false);
              setSelectedCardIndex(null);
            }}
          />
          {/* Modal content */}
          <div
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none md:p-8"
            onClick={() => {
              setProjectCardModalOpen(false);
              setSelectedCardIndex(null);
            }}
          >
            <div
              className={`w-full h-full md:w-[80vw] md:h-[80vh] md:max-w-[1200px] md:max-h-[800px] rounded-[8px] overflow-hidden pointer-events-auto flex flex-col md:flex-row ${
                theme === "dark"
                  ? "bg-[#1A1A1A] border border-[#2A2A2A]"
                  : "bg-background border border-foreground/10"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image section - 2/3 width on desktop, full width on mobile */}
              <div className="w-full md:w-2/3 h-64 md:h-full bg-foreground/10 flex items-center justify-center relative">
                <span className={`text-[12px] ${
                  theme === "dark" ? "text-[#808080]" : "text-foreground/50"
                }`}>
                  Image placeholder
                </span>
              </div>
              {/* Text content section - 1/3 width on desktop, full width on mobile */}
              <div className="w-full md:w-1/3 p-6 overflow-y-auto relative">
                <button
                  type="button"
                  onClick={() => {
                    setProjectCardModalOpen(false);
                    setSelectedCardIndex(null);
                  }}
                  className={`absolute top-4 right-4 p-1.5 rounded-full transition-colors ${
                    theme === "dark" 
                      ? "bg-[#1A1A1A] border border-[#2A2A2A] text-foreground hover:bg-[#252525]" 
                      : "bg-white border border-foreground/20 text-foreground hover:bg-foreground/5"
                  }`}
                  aria-label="Close modal"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
                <div className="space-y-4">
                  <h1 className="text-[14px] font-medium text-foreground">
                    Project Title {selectedCardIndex + 1}
                  </h1>
                  <h2 className={`text-[12px] ${
                    theme === "dark" ? "text-[#808080]" : "text-foreground/60"
                  }`}>
                    Project Subtitle {selectedCardIndex + 1}
                  </h2>
                  <div className="text-[14px] leading-relaxed text-foreground space-y-4">
                    <p>
                      This is placeholder content for the project card modal. Replace this with actual project description and details.
                    </p>
                    <p>
                      The modal displays an image on the left (2/3 width) and text content on the right (1/3 width) on desktop, and stacks vertically on mobile.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Theme Toggle Button */}
      <button
        type="button"
        onClick={toggleTheme}
        className="fixed bottom-4 right-4 md:bottom-[40px] md:right-[40px] z-50 w-10 h-10 rounded-full bg-foreground/10 hover:bg-foreground/20 border border-foreground/20 flex items-center justify-center transition-all duration-200 hover:scale-110"
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      >
        {theme === "dark" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 text-foreground"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 text-foreground"
            aria-hidden="true"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </button>
    </main>
  );
}

