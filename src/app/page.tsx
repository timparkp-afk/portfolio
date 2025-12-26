"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [emailCopied, setEmailCopied] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
      return savedTheme || "dark";
    }
    return "dark";
  });
  
  const projects = [
    {
      id: 3,
      title: "One-off Sales Tasks",
      category: "Unify",
    },
    {
      id: 1,
      title: "Email Reply Classification",
      category: "Unify",
    },
    {
      id: 2,
      title: "Notifications",
      category: "Unify",
    },
    {
      id: 7,
      title: "Track Social Signals",
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
      id: 8,
      title: "Design System",
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
  };

  const handleEmailClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText("timparkp@gmail.com");
      setEmailCopied(true);
      setTimeout(() => {
        setEmailCopied(false);
      }, 3000);
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error("Failed to copy email:", err);
      }
    }
  };

  return (
    <main className="min-h-screen bg-background px-6 py-6 md:px-[200px] md:py-[60px] lg:px-[320px] xl:px-[400px] 2xl:px-[400px] 2xl:py-[60px]">
      <div className="2xl:max-w-[1192px] 2xl:mx-auto">
      {/* Header */}
      <header className="flex items-center justify-between pb-12 md:pb-16 animate-fade-in-up" style={{ animationDelay: '0ms' }}>
        <h1 className="text-[14px] font-medium text-foreground">
          Tim Park
        </h1>
        <nav className="flex items-center" aria-label="Main navigation">
          <div className={`flex gap-2 p-1 rounded-[12px] border ${
            theme === "dark" 
              ? "bg-[#1A1A1A] border-[#2A2A2A]" 
              : "bg-foreground/5 border-foreground/10"
          }`}>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={`relative p-1 rounded-[8px] transition-colors flex items-center justify-center group ${
                theme === "dark" 
                  ? "hover:bg-[#252525] text-foreground" 
                  : "hover:bg-foreground/10 text-foreground"
              }`}
              aria-label="View resume"
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
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              <span className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 ${
                theme === "dark" 
                  ? "bg-[#2A2A2A] text-foreground border border-[#404040]" 
                  : "bg-white text-foreground border border-foreground/20"
              }`}>
                See resume
              </span>
            </a>
            <button 
              type="button"
              onClick={handleEmailClick}
              className={`relative p-1 rounded-[8px] transition-colors flex items-center justify-center group ${
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
          <span className="font-medium">Hi, I&apos;m Tim -</span> Product Designer based in NYC. Recently I was at{" "}
          <a 
            href="https://www.unifygtm.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`underline text-foreground transition-colors ${theme === "dark" ? "hover:text-[#D0D0D0]" : "hover:opacity-70"}`}
          >
            Unify
          </a>{" "}
          designing lorem ipsum dolor amiset color power. Before that I was on the design teams over at{" "}
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
          .
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
              onClick={() => router.push(`/projects/${project.id}`)}
              className="cursor-pointer relative"
              role="button"
              tabIndex={0}
              aria-label={`${project.title} - ${project.category}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
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
                      strokeWidth="2"
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
          {hoveredProject === 1 && (
            <div 
              className={`absolute left-full top-0 rounded-[8px] overflow-hidden transition-opacity duration-300 hidden md:block ${
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
                alt="Email Reply Classification"
                width={1200}
                height={675}
                className="w-full h-auto rounded-[8px]"
                unoptimized
              />
            </div>
          )}
          {hoveredProject === 2 && (
            <div 
              className={`absolute left-full top-0 rounded-[8px] overflow-hidden transition-opacity duration-300 hidden md:block ${
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
                alt="Notifications"
                width={1200}
                height={675}
                className="w-full h-auto rounded-[8px]"
                unoptimized
              />
            </div>
          )}
          {hoveredProject === 3 && (
            <div 
              className={`absolute left-full top-0 rounded-[8px] overflow-hidden transition-opacity duration-300 hidden md:block ${
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
                alt="One-off Sales Tasks"
                width={1200}
                height={675}
                className="w-full h-auto rounded-[8px]"
                unoptimized
              />
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-12 md:pt-16 pb-6 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
        <div className="flex items-center justify-between text-[14px]">
          <p className={`${theme === "dark" ? "text-[#A0A0A0]" : "text-[#525252]"}`}>
            © Tim Park 2025
          </p>
            <p className={`${theme === "dark" ? "text-[#A0A0A0]" : "text-[#525252]"}`}>
              Made with Cursor ❤️
            </p>
        </div>
      </footer>
      </div>
    </main>
  );
}
