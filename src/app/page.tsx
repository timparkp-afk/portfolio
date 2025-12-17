"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [emailCopied, setEmailCopied] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [hoveredUnify, setHoveredUnify] = useState(false);
  
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
      title: "Unify for Reps",
      category: "Unify",
    },
    {
      id: 4,
      title: "Lookalikes",
      category: "Unify",
    },
    {
      id: 5,
      title: "Exclusions",
      category: "Unify",
    },
    {
      id: 6,
      title: "Upload System",
      category: "Cadre",
    },
    {
      id: 7,
      title: "Social Signals",
      category: "Unify",
    },
    {
      id: 8,
      title: "Design Language System",
      category: "Cadre",
    },
  ];
  const handleEmailClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText("your-email@example.com"); // Replace with actual email
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
    <main className="min-h-screen bg-background px-6 py-6 md:px-[200px] md:py-[60px] lg:px-[320px] xl:px-[400px] 2xl:px-[160px] 2xl:py-[60px]">
      <div className="2xl:max-w-[1192px] 2xl:mx-auto">
      {/* Header */}
      <header className="flex items-center justify-between pb-12 md:pb-16">
        <h1 className="text-[14px] font-medium text-foreground">
          Tim Park
        </h1>
        <nav className="flex gap-3 text-[14px] items-center" aria-label="Main navigation">
          <a href="#" className="text-[#525252] font-normal hover:opacity-70 transition-opacity whitespace-nowrap" aria-label="View resume">
            Resume
          </a>
          <button 
            type="button"
            onClick={handleEmailClick}
            className="text-[#525252] font-normal hover:opacity-70 transition-opacity inline-block whitespace-nowrap bg-transparent border-none p-0 cursor-pointer"
            aria-label={emailCopied ? 'Email copied to clipboard' : 'Copy email to clipboard'}
          >
            {emailCopied ? 'Email copied!' : 'Email me'}
          </button>
        </nav>
      </header>

      {/* About Section */}
      <section className="pb-12 md:pb-16">
        <p className="text-[14px] leading-relaxed text-foreground">
          <span className="font-medium">Hi, I&apos;m Tim -</span> Product Designer based in NYC. Recently I was at{" "}
          <span className="relative inline-block">
            <a 
              href="https://www.unifygtm.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              onMouseEnter={() => setHoveredUnify(true)}
              onMouseLeave={() => setHoveredUnify(false)}
              className="underline text-foreground hover:opacity-70"
            >
              Unify
            </a>
            {hoveredUnify && (
              <span className="absolute top-full left-0 mt-2 w-[320px] h-[240px] z-[9999] pointer-events-none block" role="tooltip" aria-label="Unify homepage preview">
                <Image
                  src="/unify-screenshot.png"
                  alt="Unify homepage preview"
                  width={320}
                  height={240}
                  className="w-full h-full object-cover rounded-[12px]"
                  style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12)' }}
                  unoptimized
                />
              </span>
            )}
          </span>{" "}
          designing lorem ipsum dolor amiset color power. Before that I was on the design teams over at{" "}
          <a 
            href="https://www.willowwealth.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="underline text-foreground hover:opacity-70"
          >
            WillowWealth
          </a>{" "}
          and{" "}
          <a 
            href="https://www.vts.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="underline text-foreground hover:opacity-70"
          >
            VTS
          </a>
          .
        </p>
      </section>

      {/* Selected Work List */}
      <section className="relative min-h-[600px]">
        <div className="flex gap-4 items-start">
          {/* Project List */}
          <div className="flex-1">
            {projects.map((project) => (
              <div
                key={project.id}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                className="cursor-pointer py-3 relative"
                role="button"
                tabIndex={0}
                aria-label={`${project.title} - ${project.category}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setHoveredProject(project.id);
                  }
                }}
              >
                {hoveredProject === project.id && (
                  <button 
                    type="button"
                    className="hidden md:flex items-center px-[6px] py-1 rounded-full bg-[#E5E5E5] border border-[#D0D0D0] flex-shrink-0 absolute right-full top-1/2 -translate-y-1/2 mr-2 transition-all duration-[400ms] ease-out"
                    aria-label="Click for more information"
                  >
                    <span className="text-[12px] font-medium leading-none text-foreground whitespace-nowrap">Click for more!</span>
                  </button>
                )}
                <h2 className={`text-[14px] font-medium transition-opacity w-full ${hoveredProject === project.id ? 'text-foreground/70' : 'text-foreground'}`}>
                  {project.title}
                </h2>
                <p className="text-sm text-foreground/60 mt-1">
                  {project.category}
                </p>
              </div>
            ))}
          </div>

          {/* Image Preview Area - Centered to Project Section */}
          <div className="hidden lg:block flex-1 relative">
            <div className="sticky top-[60px]">
              {hoveredProject !== null && (
                <div className="w-full aspect-[9/16] max-w-[400px] mx-auto bg-foreground/5 rounded-[8px] transition-all duration-300 ease-in-out" aria-label="Project preview">
                  {/* Placeholder for project image */}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      </div>
    </main>
  );
}
