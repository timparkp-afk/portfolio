"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [emailCopied, setEmailCopied] = useState(false);
  const [showMobileToast, setShowMobileToast] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [profilePhotoHovered, setProfilePhotoHovered] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [clickedButton, setClickedButton] = useState<string | null>(null);
  
  const projects = [
    {
      id: 3,
      title: "Flexible Task Orchestration",
      category: "Unify",
    },
    {
      id: 1,
      title: "AI Powered Reply Intelligence",
      category: "Unify",
    },
    {
      id: 2,
      title: "Unified Notification System",
      category: "Unify",
    },
    {
      id: 7,
      title: "Real-time LinkedIn Signal Tracking",
      category: "Unify",
    },
    {
      id: 5,
      title: "Select Product Wins",
      category: "Unify",
    },
    {
      id: 6,
      title: "Multi-path Investment Journeys",
      category: "Cadre",
    },
    {
      id: 8,
      title: "Design System for Rapid Development",
      category: "Cadre",
    },
  ];
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
    setClickedButton("theme");
    setTimeout(() => setClickedButton(null), 300);
  };

  const handleEmailClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setClickedButton("email");
    setTimeout(() => setClickedButton(null), 300);
    try {
      await navigator.clipboard.writeText("timparkp@gmail.com");
      setEmailCopied(true);
      setTimeout(() => {
        setEmailCopied(false);
      }, 3000);
      
      // Show mobile toast
      setShowMobileToast(true);
      setTimeout(() => {
        setShowMobileToast(false);
      }, 1000);
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error("Failed to copy email:", err);
      }
    }
  };
  
  const handleLinkedInClick = () => {
    setClickedButton("linkedin");
    setTimeout(() => setClickedButton(null), 300);
  };

  return (
    <main className="min-h-screen bg-background px-6 py-6 md:px-[200px] md:py-[60px] lg:px-[320px] xl:px-[400px] 2xl:px-[400px] 2xl:py-[60px]">
      <div className="2xl:max-w-[1192px] 2xl:mx-auto">
      {/* Header */}
      <header className="flex items-center justify-between pb-12 md:pb-16 animate-fade-in-up" style={{ animationDelay: '0ms' }}>
        <div className="flex items-center relative">
          <Image
            src="/images/profilephoto.png"
            alt="Tim Park"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full border"
            style={{
              borderColor: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
              borderWidth: "1px"
            }}
            unoptimized
          />
        </div>
        <nav className="flex items-center" aria-label="Main navigation">
          <div className={`flex gap-[6px] p-1 rounded-[12px] border ${
            theme === "dark" 
              ? "bg-[#1A1A1A] border-[#2A2A2A]" 
              : "bg-foreground/5 border-foreground/10"
          }`}>
            <a
              href="https://www.linkedin.com/in/thetimpark/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLinkedInClick}
              className={`relative p-1 rounded-[8px] transition-colors flex items-center justify-center group ${
                clickedButton === "linkedin" ? "button-click-animation" : ""
              } ${
                theme === "dark" 
                  ? "hover:bg-[#252525] text-foreground" 
                  : "hover:bg-foreground/10 text-foreground"
              }`}
              aria-label="View LinkedIn profile"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={`w-3.5 h-3.5 ${theme === "light" ? "opacity-70" : ""}`}
                aria-hidden="true"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 ${
                theme === "dark" 
                  ? "bg-[#2A2A2A] text-foreground border border-[#404040]" 
                  : "bg-white text-foreground border border-foreground/20"
              }`}>
                View profile
              </span>
            </a>
            <button 
              type="button"
              onClick={handleEmailClick}
              className={`relative p-1 rounded-[8px] transition-colors flex items-center justify-center group ${
                clickedButton === "email" ? "button-click-animation" : ""
              } ${
                theme === "dark" 
                  ? "hover:bg-[#252525] text-foreground" 
                  : "hover:bg-foreground/10 text-foreground"
              }`}
              aria-label={emailCopied ? 'Email copied to clipboard' : 'Copy email to clipboard'}
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
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 ${
                theme === "dark" 
                  ? "bg-[#2A2A2A] text-foreground border border-[#404040]" 
                  : "bg-white text-foreground border border-foreground/20"
              }`}>
                {emailCopied ? 'Email copied' : 'Copy email'}
              </span>
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              className={`relative p-1 rounded-[8px] transition-colors flex items-center justify-center group ${
                clickedButton === "theme" ? "button-click-animation" : ""
              } ${
                theme === "dark" 
                  ? "hover:bg-[#252525] text-foreground" 
                  : "hover:bg-foreground/10 text-foreground"
              }`}
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
                  className="w-4 h-4"
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
                  className="w-4 h-4"
                  aria-hidden="true"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* About Section */}
      <section className="pb-12 md:pb-16 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
        <p className="text-[14px] leading-relaxed text-foreground">
          <span className="font-medium">Hi, I&apos;m Tim Park -</span> Product Designer based in NYC. Recently I was at{" "}
          <a 
            href="https://www.unifygtm.com/" 
            target="_blank"
            rel="noopener noreferrer"
            className={`underline text-foreground transition-colors ${theme === "dark" ? "hover:text-[#D0D0D0]" : "hover:opacity-70"}`}
          >
            Unify
          </a>{" "}
          designing AI-powered workflows that help sales teams reach the right customers at the right time. Before that I was a designer at{" "}
          <a 
            href="https://www.willowwealth.com/" 
            target="_blank"
            rel="noopener noreferrer"
            className={`underline text-foreground transition-colors ${theme === "dark" ? "hover:text-[#D0D0D0]" : "hover:opacity-70"}`}
          >
            Willow Wealth
          </a>{" "}
          and{" "}
          <a 
            href="https://www.vts.com/" 
            target="_blank"
            rel="noopener noreferrer"
            className={`underline text-foreground transition-colors ${theme === "dark" ? "hover:text-[#D0D0D0]" : "hover:opacity-70"}`}
          >
            VTS
          </a>
          . My experience spans across complex B2B and B2C systems, and I&apos;m excited to bring my perspective to new challenges.
        </p>
      </section>

      {/* Selected Work List */}
      <section className="relative min-h-[600px] animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        <div className="flex flex-col gap-5 w-fit relative">
          {projects.map((project) => (
            <div
              key={project.id}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => {
                setHoveredProject(null);
                router.push(`/projects/${project.id}`);
              }}
              className="cursor-pointer relative"
              role="button"
              tabIndex={0}
              aria-label={`${project.title} - ${project.category}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setHoveredProject(null);
                  router.push(`/projects/${project.id}`);
                }
              }}
            >
              {/* Title and Category */}
              <div>
                <div className="flex items-center gap-2">
                  <h2 
                    className={`text-[14px] font-medium underline decoration-1 underline-offset-1 ${
                      hoveredProject === project.id 
                        ? (theme === "dark" ? 'text-[#A0A0A0]' : 'text-foreground/70') 
                        : 'text-foreground'
                    } ${
                      theme === "dark" ? 'decoration-[#404040]' : 'decoration-[#D0D0D0]'
                    }`}
                    style={{
                      transition: `color 800ms ${hoveredProject === project.id ? 'ease-in' : 'ease-out'}`
                    }}
                  >
                    {project.title}
                  </h2>
                  {hoveredProject === project.id && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-3.5 h-3.5 transition-opacity duration-200"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  )}
                </div>
                <p 
                  className={`text-sm mt-1 ${theme === "dark" ? "text-[#808080]" : "text-foreground/60"}`}
                >
                  {project.category === "Cadre" ? "Cadre (Acquired by Willow Wealth)" : project.category}
                </p>
              </div>
            </div>
          ))}
          {/* Images - show on hover at the top of the container, aligned with first project */}
          <div 
            className={`absolute left-full top-0 rounded-[8px] overflow-hidden transition-opacity duration-200 ease-in-out hidden md:block ${
              hoveredProject === 1 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            } ${
              theme === "dark" ? "bg-[#1A1A1A] border border-[#2A2A2A]" : "bg-foreground/5 border border-foreground/10"
            }`}
            style={{
              width: '600px',
              marginLeft: '80px',
              zIndex: 10
            }}
          >
            <Image
              src="/images/reply-classification/reply-hero.png"
              alt="AI Powered Reply Intelligence"
              width={1200}
              height={675}
              className="w-full h-auto rounded-[8px]"
              unoptimized
            />
          </div>
          <div 
            className={`absolute left-full top-0 rounded-[8px] overflow-hidden transition-opacity duration-200 ease-in-out hidden md:block ${
              hoveredProject === 2 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            } ${
              theme === "dark" ? "bg-[#1A1A1A] border border-[#2A2A2A]" : "bg-foreground/5 border border-foreground/10"
            }`}
            style={{
              width: '360px',
              marginLeft: '80px',
              zIndex: 10
            }}
          >
            <Image
              src="/images/notifications/notifications-hero.png?v=2"
              alt="Unified Notification System"
              width={1200}
              height={675}
              className="w-full h-auto rounded-[8px]"
              unoptimized
            />
          </div>
          <div 
            className={`absolute left-full top-0 rounded-[8px] overflow-hidden transition-opacity duration-200 ease-in-out hidden md:block ${
              hoveredProject === 3 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            } ${
              theme === "dark" ? "bg-[#1A1A1A] border border-[#2A2A2A]" : "bg-foreground/5 border border-foreground/10"
            }`}
            style={{
              width: '600px',
              marginLeft: '80px',
              zIndex: 10
            }}
          >
            <Image
              src="/images/tasks/tasks-hero.png?v=3"
              alt="Flexible Task Orchestration"
              width={1200}
              height={675}
              className="w-full h-auto rounded-[8px]"
              unoptimized
            />
          </div>
          <div 
            className={`absolute left-full top-0 rounded-[8px] overflow-hidden transition-opacity duration-200 ease-in-out hidden md:block ${
              hoveredProject === 7 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            } ${
              theme === "dark" ? "bg-[#1A1A1A] border border-[#2A2A2A]" : "bg-foreground/5 border border-foreground/10"
            }`}
            style={{
              width: '600px',
              marginLeft: '80px',
              zIndex: 10
            }}
          >
            <Image
              src="/images/social-signals/linkedin-hero.png"
              alt="Real-time LinkedIn Signal Tracking"
              width={1200}
              height={675}
              className="w-full h-auto rounded-[8px]"
              unoptimized
            />
          </div>
          <div 
            className={`absolute left-full top-0 rounded-[8px] overflow-hidden transition-opacity duration-200 ease-in-out hidden md:block ${
              hoveredProject === 6 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
            style={{
              width: '600px',
              marginLeft: '80px',
              zIndex: 10
            }}
          >
            <Image
              src="/images/cre-investing/investing-hero.png"
              alt="Multi-path Investment Journeys"
              width={1200}
              height={675}
              className="w-full h-auto rounded-[8px]"
              unoptimized
            />
          </div>
          <div 
            className={`absolute left-full top-0 rounded-[8px] overflow-hidden transition-opacity duration-200 ease-in-out hidden md:block ${
              hoveredProject === 8 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
            style={{
              width: '600px',
              marginLeft: '80px',
              zIndex: 10
            }}
          >
            <Image
              src="/images/cadre-dls/cadre-dls-hero.png"
              alt="Design System for Rapid Development"
              width={1200}
              height={675}
              className="w-full h-auto rounded-[8px]"
              unoptimized
            />
          </div>
          <div 
            className={`absolute left-full top-0 rounded-[8px] overflow-hidden transition-opacity duration-200 ease-in-out hidden md:block ${
              hoveredProject === 5 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            } ${
              theme === "dark" ? "bg-[#1A1A1A] border border-[#2A2A2A]" : "bg-foreground/5 border border-foreground/10"
            }`}
            style={{
              width: '600px',
              marginLeft: '80px',
              zIndex: 10
            }}
          >
            <Image
              src="/images/product-wins/hover.png"
              alt="Select Product Wins"
              width={1200}
              height={675}
              className="w-full h-auto rounded-[8px]"
              unoptimized
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-12 md:pt-16 pb-6 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
        <div className="flex items-center justify-between text-[14px]">
          <p className={`${theme === "dark" ? "text-[#A0A0A0]" : "text-[#525252]"}`}>
            © Tim Park 2026
          </p>
            <p className={`${theme === "dark" ? "text-[#A0A0A0]" : "text-[#525252]"}`}>
              Made with Cursor ❤️
            </p>
        </div>
      </footer>
      
      {/* Mobile Toast - Email Copied */}
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden transition-opacity duration-300 ${
          showMobileToast ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className={`px-4 py-3 rounded-[8px] text-sm ${
            theme === "dark"
              ? "bg-[#2A2A2A] text-foreground border border-[#404040]"
              : "bg-white text-foreground border border-foreground/20 shadow-lg"
          }`}
        >
          Email copied
        </div>
      </div>
      </div>
    </main>
  );
}
