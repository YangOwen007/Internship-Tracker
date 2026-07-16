"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type TourStep = {
  body: string;
  id: string;
  placement: "bottom" | "left" | "right" | "top";
  targetId: string;
  title: string;
};

type ViewportSize = {
  height: number;
  width: number;
};

const TOUR_PREFERENCE_KEY = "internship-tracker:tour-preference:v1";
const TOUR_START_EVENT = "internship-tracker:start-tour";
const POPUP_WIDTH = 360;
const POPUP_HEIGHT = 252;
const SPOTLIGHT_PADDING = 12;
const VIEWPORT_PADDING = 20;

const steps: TourStep[] = [
  {
    id: "hero-actions",
    targetId: "hero-actions",
    title: "Start from the top",
    body: "These are your main shortcuts. Jump into the workspace, add a new application, or review your analytics from here.",
    placement: "bottom",
  },
  {
    id: "quick-snapshot",
    targetId: "quick-snapshot",
    title: "Quick snapshot",
    body: "This card gives you a fast read on active opportunities, deadlines, response rate, and interview momentum.",
    placement: "left",
  },
  {
    id: "analytics-overview",
    targetId: "analytics-overview",
    title: "Analytics overview",
    body: "Use this section to spot trends over time and see how your pipeline breaks down by stage or location.",
    placement: "bottom",
  },
  {
    id: "pipeline-view",
    targetId: "pipeline-view",
    title: "Pipeline view",
    body: "This gives you a stage-by-stage picture of where applications are currently sitting, so bottlenecks are easy to spot.",
    placement: "bottom",
  },
  {
    id: "next-actions",
    targetId: "next-actions",
    title: "Next actions",
    body: "This queue surfaces the most urgent follow-ups so you can decide what to tackle first without hunting through every application.",
    placement: "left",
  },
  {
    id: "workspace-controls",
    targetId: "workspace-controls",
    title: "Workspace controls",
    body: "Switch between board and table views here, and keep an eye on how many applications match your current filters.",
    placement: "bottom",
  },
  {
    id: "workspace-filters",
    targetId: "workspace-filters",
    title: "Filters and sorting",
    body: "Search by company or role, narrow by status or location, and reorder your list without reloading the page.",
    placement: "bottom",
  },
  {
    id: "workspace-results",
    targetId: "workspace-results",
    title: "Your recruiting workspace",
    body: "This is where you review, update, and compare applications. Open details, adjust statuses, and keep your notes organized here.",
    placement: "top",
  },
] as const;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getPopupPosition(targetRect: DOMRect, placement: TourStep["placement"]) {
  const maxLeft = Math.max(
    VIEWPORT_PADDING,
    window.innerWidth - POPUP_WIDTH - VIEWPORT_PADDING,
  );
  const maxTop = Math.max(
    VIEWPORT_PADDING,
    window.innerHeight - POPUP_HEIGHT - VIEWPORT_PADDING,
  );

  if (placement === "top") {
    return {
      left: clamp(
        targetRect.left + targetRect.width / 2 - POPUP_WIDTH / 2,
        VIEWPORT_PADDING,
        maxLeft,
      ),
      top: clamp(targetRect.top - POPUP_HEIGHT - 18, VIEWPORT_PADDING, maxTop),
    };
  }

  if (placement === "left") {
    return {
      left: clamp(targetRect.left - POPUP_WIDTH - 18, VIEWPORT_PADDING, maxLeft),
      top: clamp(
        targetRect.top + targetRect.height / 2 - POPUP_HEIGHT / 2,
        VIEWPORT_PADDING,
        maxTop,
      ),
    };
  }

  if (placement === "right") {
    return {
      left: clamp(targetRect.right + 18, VIEWPORT_PADDING, maxLeft),
      top: clamp(
        targetRect.top + targetRect.height / 2 - POPUP_HEIGHT / 2,
        VIEWPORT_PADDING,
        maxTop,
      ),
    };
  }

  return {
    left: clamp(
      targetRect.left + targetRect.width / 2 - POPUP_WIDTH / 2,
      VIEWPORT_PADDING,
      maxLeft,
    ),
    top: clamp(targetRect.bottom + 18, VIEWPORT_PADDING, maxTop),
  };
}

function getArrowPosition(
  placement: TourStep["placement"],
  popupPosition: { left: number; top: number },
  targetRect: DOMRect,
) {
  if (placement === "top" || placement === "bottom") {
    return {
      left: clamp(
        targetRect.left + targetRect.width / 2 - popupPosition.left - 8,
        24,
        POPUP_WIDTH - 24,
      ),
      top: placement === "top" ? POPUP_HEIGHT - 8 : -8,
    };
  }

  return {
    left: placement === "left" ? POPUP_WIDTH - 8 : -8,
    top: clamp(
      targetRect.top + targetRect.height / 2 - popupPosition.top - 8,
      24,
      POPUP_HEIGHT - 24,
    ),
  };
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

export function DashboardTour({ showTrigger = true }: { showTrigger?: boolean }) {
  const [isPromptOpen, setIsPromptOpen] = useState(
    () =>
      typeof window !== "undefined" &&
      !window.localStorage.getItem(TOUR_PREFERENCE_KEY),
  );
  const [isTourActive, setIsTourActive] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [viewportSize, setViewportSize] = useState<ViewportSize>({
    width: 0,
    height: 0,
  });
  const popupRef = useRef<HTMLDivElement | null>(null);

  const activeStep = steps[activeStepIndex];
  const spotlightRect = useMemo(() => {
    if (!targetRect) {
      return null;
    }

    return {
      left: Math.max(targetRect.left - SPOTLIGHT_PADDING, 8),
      top: Math.max(targetRect.top - SPOTLIGHT_PADDING, 8),
      width: targetRect.width + SPOTLIGHT_PADDING * 2,
      height: targetRect.height + SPOTLIGHT_PADDING * 2,
    };
  }, [targetRect]);
  const popupPosition = useMemo(() => {
    if (!targetRect) {
      return null;
    }

    return getPopupPosition(targetRect, activeStep.placement);
  }, [activeStep.placement, targetRect]);
  const arrowPosition = useMemo(() => {
    if (!popupPosition || !targetRect) {
      return null;
    }

    return getArrowPosition(activeStep.placement, popupPosition, targetRect);
  }, [activeStep.placement, popupPosition, targetRect]);
  const spotlightMaskId = useMemo(
    () => `tour-mask-${Math.random().toString(36).slice(2, 10)}`,
    [],
  );

  useEffect(() => {
    const updateViewportSize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateViewportSize();
    window.addEventListener("resize", updateViewportSize);

    return () => {
      window.removeEventListener("resize", updateViewportSize);
    };
  }, []);

  useEffect(() => {
    if (!isPromptOpen && !isTourActive) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isPromptOpen, isTourActive]);

  useEffect(() => {
    if (!isTourActive) {
      return;
    }

    const target = document.querySelector<HTMLElement>(
      `[data-tour-id="${activeStep.targetId}"]`,
    );

    if (!target) {
      window.requestAnimationFrame(() => setTargetRect(null));
      return;
    }

    const updateTargetRect = () => {
      setTargetRect(target.getBoundingClientRect());
    };

    target.scrollIntoView({
      behavior: "auto",
      block: "center",
      inline: "nearest",
    });

    // The second frame catches layout shifts after charts or sticky elements
    // settle, which keeps the spotlight from jittering between steps.
    const firstFrame = window.requestAnimationFrame(() => {
      updateTargetRect();
      window.requestAnimationFrame(updateTargetRect);
    });

    const handleResize = () => updateTargetRect();
    const handleScroll = () => updateTargetRect();

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, true);

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [activeStep, isTourActive]);

  useEffect(() => {
    if (!isPromptOpen && !isTourActive) {
      return;
    }

    popupRef.current?.focus();
  }, [activeStepIndex, isPromptOpen, isTourActive]);

  useEffect(() => {
    if (!isTourActive) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeTour();
        return;
      }

      if (event.key === "ArrowRight") {
        setActiveStepIndex((currentIndex) =>
          Math.min(currentIndex + 1, steps.length - 1),
        );
      }

      if (event.key === "ArrowLeft") {
        setActiveStepIndex((currentIndex) => Math.max(currentIndex - 1, 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isTourActive]);

  useEffect(() => {
    const handleStartTour = () => {
      startTour();
    };

    window.addEventListener(TOUR_START_EVENT, handleStartTour);

    return () => {
      window.removeEventListener(TOUR_START_EVENT, handleStartTour);
    };
  });

  function startTour() {
    window.localStorage.setItem(TOUR_PREFERENCE_KEY, "enabled");
    setIsPromptOpen(false);
    setActiveStepIndex(0);
    setIsTourActive(true);
  }

  function dismissPrompt() {
    window.localStorage.setItem(TOUR_PREFERENCE_KEY, "dismissed");
    setIsPromptOpen(false);
  }

  function closeTour() {
    setIsTourActive(false);
    setTargetRect(null);
  }

  function goToNextStep() {
    if (activeStepIndex === steps.length - 1) {
      closeTour();
      return;
    }

    setActiveStepIndex((currentIndex) => currentIndex + 1);
  }

  return (
    <>
      {showTrigger ? (
        <button
          type="button"
          onClick={startTour}
          className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400"
        >
          Replay tutorial
        </button>
      ) : null}

      {isPromptOpen ? (
        <div className="fixed inset-0 z-[90] bg-slate-950/42">
          <div
            ref={popupRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="tour-prompt-title"
            tabIndex={-1}
            className="fixed left-1/2 top-1/2 w-[min(92vw,30rem)] -translate-x-1/2 -translate-y-1/2 rounded-[1.75rem] border border-[color:var(--border)] bg-[#fffaf4] p-6 shadow-[0_30px_80px_rgba(15,23,42,0.18)] outline-none"
          >
            <button
              type="button"
              onClick={dismissPrompt}
              aria-label="Skip tutorial"
              className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-700"
            >
              <CloseIcon />
            </button>
            <p className="eyebrow text-xs">First-time walkthrough</p>
            <h2
              id="tour-prompt-title"
              className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950"
            >
              Want a quick tour?
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              We can show you the key parts of the dashboard in under a minute. You can
              skip it now and replay it anytime from the top of the page.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={startTour}
                className="rounded-full bg-[color:var(--foreground)] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800"
              >
                Show me around
              </button>
              <button
                type="button"
                onClick={dismissPrompt}
                className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400"
              >
                Skip for now
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {isTourActive ? (
        <div className="fixed inset-0 z-[95]">
          {spotlightRect && viewportSize.width > 0 && viewportSize.height > 0 ? (
            <>
              <svg
                aria-hidden="true"
                className="pointer-events-none fixed inset-0 h-full w-full"
                viewBox={`0 0 ${viewportSize.width} ${viewportSize.height}`}
                preserveAspectRatio="none"
              >
                <defs>
                  <mask id={spotlightMaskId}>
                    <rect
                      x="0"
                      y="0"
                      width={viewportSize.width}
                      height={viewportSize.height}
                      fill="white"
                    />
                    <rect
                      x={spotlightRect.left}
                      y={spotlightRect.top}
                      width={spotlightRect.width}
                      height={spotlightRect.height}
                      rx="28"
                      ry="28"
                      fill="black"
                    />
                  </mask>
                </defs>
                <rect
                  x="0"
                  y="0"
                  width={viewportSize.width}
                  height={viewportSize.height}
                  fill="rgba(15, 23, 42, 0.42)"
                  mask={`url(#${spotlightMaskId})`}
                />
              </svg>
              <div
                aria-hidden="true"
                className="pointer-events-none fixed rounded-[1.75rem] border-2 border-[color:var(--accent)] shadow-[0_14px_36px_rgba(15,23,42,0.08)]"
                style={{
                  left: spotlightRect.left,
                  top: spotlightRect.top,
                  width: spotlightRect.width,
                  height: spotlightRect.height,
                }}
              />
            </>
          ) : null}

          <div
            ref={popupRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="tour-step-title"
            tabIndex={-1}
            className="fixed w-[min(92vw,22.5rem)] rounded-[1.75rem] border border-[color:var(--border)] bg-[#fffaf4] p-5 shadow-[0_30px_80px_rgba(15,23,42,0.18)] outline-none"
            style={
              popupPosition
                ? {
                    left: popupPosition.left,
                    top: popupPosition.top,
                  }
                : {
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                  }
            }
          >
            {arrowPosition ? (
              <div
                aria-hidden="true"
                className="absolute h-4 w-4 rotate-45 border border-[color:var(--border)] bg-[#fffaf4]"
                style={{
                  left: arrowPosition.left,
                  top: arrowPosition.top,
                }}
              />
            ) : null}

            <div className="relative">
              <button
                type="button"
                onClick={closeTour}
                aria-label="Close tutorial"
                className="absolute right-0 top-0 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-700"
              >
                <CloseIcon />
              </button>
              <p className="eyebrow text-xs">
                Step {activeStepIndex + 1} of {steps.length}
              </p>
              <h2
                id="tour-step-title"
                className="mt-2 pr-10 text-xl font-semibold tracking-[-0.03em] text-slate-950"
              >
                {activeStep.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{activeStep.body}</p>
            </div>

            <div className="mt-6 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() =>
                  setActiveStepIndex((currentIndex) => Math.max(currentIndex - 1, 0))
                }
                disabled={activeStepIndex === 0}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span aria-hidden="true">←</span>
                <span>Previous</span>
              </button>
              <button
                type="button"
                onClick={goToNextStep}
                className="inline-flex min-w-28 items-center justify-center gap-2 rounded-full bg-[color:var(--foreground)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800"
              >
                {activeStepIndex === steps.length - 1 ? (
                  <span>Get started</span>
                ) : (
                  <>
                    <span>Next</span>
                    <span aria-hidden="true">→</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
