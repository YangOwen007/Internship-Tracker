"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";

const TOUR_START_EVENT = "internship-tracker:start-tour";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "dashboard", label: "Analytics" },
  { id: "pipeline", label: "Pipeline" },
  { id: "next-actions", label: "Next actions" },
  { id: "applications", label: "Workspace" },
] as const;

function MenuIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
    >
      <path d="M5 7h14" />
      <path d="M5 12h14" />
      <path d="M5 17h14" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    >
      <path d="M4 4l8 8" />
      <path d="M12 4L4 12" />
    </svg>
  );
}

export function QuickJumpMenu() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  function jumpToSection(sectionId: string) {
    const section = document.getElementById(sectionId);

    if (!section) {
      return;
    }

    // Closing first keeps the panel from trailing behind the viewport
    // movement once the scroll animation begins.
    setIsOpen(false);
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function replayTutorial() {
    setIsOpen(false);
    window.dispatchEvent(new Event(TOUR_START_EVENT));
  }

  return (
    <div className="fixed left-4 top-24 z-40 hidden xl:block">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open actions menu"
        aria-expanded={isOpen}
        aria-controls="quick-actions-sidebar"
        className="panel inline-flex h-14 w-14 items-center justify-center rounded-full text-slate-700 shadow-[0_18px_45px_rgba(15,23,42,0.1)] transition-transform hover:-translate-y-0.5"
      >
        <MenuIcon />
      </button>

      <button
        type="button"
        aria-label="Close actions menu"
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 transition-opacity duration-200 ${
          isOpen
            ? "pointer-events-auto bg-slate-950/24 opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        id="quick-actions-sidebar"
        aria-label="Quick actions"
        className={`fixed left-4 top-24 flex w-72 flex-col rounded-[1.5rem] border border-[color:var(--border)] bg-[#fffaf4] p-4 shadow-[0_24px_60px_rgba(15,23,42,0.16)] transition-all duration-300 ease-out ${
          isOpen
            ? "translate-x-0 opacity-100"
            : "-translate-x-[calc(100%+1rem)] pointer-events-none opacity-0"
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="eyebrow text-[11px]">Quick actions</p>
            <h2 className="mt-1 text-lg font-semibold text-slate-950">
              Navigate and manage
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close actions menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-700"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="mt-4 grid gap-2">
          <Link
            href="/applications/new"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-between rounded-[1rem] bg-[color:var(--foreground)] px-4 py-3 text-left text-sm font-medium !text-white transition-colors hover:bg-slate-800"
          >
            <span className="!text-white">Add application</span>
            <span aria-hidden="true" className="text-white/80">
              +
            </span>
          </Link>

          <button
            type="button"
            onClick={replayTutorial}
            className="flex items-center justify-between rounded-[1rem] border border-slate-200 bg-white px-4 py-3 text-left text-sm font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50"
          >
            <span>Replay tutorial</span>
            <span aria-hidden="true" className="text-slate-400">
              ↺
            </span>
          </button>
        </div>

        <div className="mt-5">
          <p className="eyebrow text-[11px]">Jump to section</p>
          <div className="mt-2 grid gap-2">
            {sections.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => jumpToSection(section.id)}
                className="flex items-center justify-between rounded-[1rem] border border-slate-200 bg-white px-4 py-3 text-left text-sm font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50"
              >
                <span>{section.label}</span>
                <span aria-hidden="true" className="text-slate-400">
                  →
                </span>
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="mt-5 flex items-center justify-between rounded-[1rem] border border-rose-200 bg-rose-50 px-4 py-3 text-left text-sm font-medium text-rose-700 transition-colors hover:border-rose-300 hover:bg-rose-100"
        >
          <span>Sign out</span>
          <span aria-hidden="true" className="text-rose-400">
            ↗
          </span>
        </button>
      </aside>
    </div>
  );
}
