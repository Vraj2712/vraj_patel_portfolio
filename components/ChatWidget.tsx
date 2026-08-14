"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { portfolio } from "@/data/portfolio";
import { Spotlight, SPOTLIGHT_TARGETS, type SpotlightTarget } from "@/components/Spotlight";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const GREETING: ChatMessage = {
  role: "assistant",
  content: `Hi! Ask me anything about ${portfolio.firstName} — my work, skills, or projects.`,
};

function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showNudge, setShowNudge] = useState(false);
  const [nudgeDismissed, setNudgeDismissed] = useState(false);
  const [spotlightTarget, setSpotlightTarget] = useState<SpotlightTarget | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [viewportHeight, setViewportHeight] = useState<number | null>(null);
  const [viewportOffsetTop, setViewportOffsetTop] = useState(0);

  const scrollAnchorRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen) {
      scrollAnchorRef.current?.scrollIntoView({
        behavior: prefersReducedMotion() ? "auto" : "smooth",
        block: "end",
      });
    }
  }, [messages, isOpen, isLoading]);

  useEffect(() => {
    if (isOpen) {
      textareaRef.current?.focus();
    }
  }, [isOpen]);

  // Track the sm breakpoint so the mobile-only behaviors below (full-screen
  // sheet sizing, scroll lock, visualViewport tracking) never touch desktop.
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 639.98px)");
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  // On mobile, keep the panel sized to the actual visible viewport (not the
  // layout viewport) so the input row stays pinned directly above the
  // on-screen keyboard instead of a gap of page showing through beneath it.
  // 100dvh alone doesn't react to the keyboard on iOS Safari, hence the
  // active visualViewport tracking here.
  useEffect(() => {
    if (!isOpen || !isMobile) return;
    const vv = window.visualViewport;
    const textarea = textareaRef.current;
    if (!vv) return;

    let rafId: number | null = null;

    const updateViewport = () => {
      setViewportHeight(vv.height);
      setViewportOffsetTop(vv.offsetTop);
    };

    // The keyboard opens/closes with an animation, so a single measurement
    // taken right on the triggering event is stale. Keep re-measuring for a
    // short window afterwards, then settle-scroll the latest message into
    // view once the animation has had time to finish.
    const trackFor = (durationMs: number) => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      const start = performance.now();
      const tick = (now: number) => {
        updateViewport();
        if (now - start < durationMs) {
          rafId = requestAnimationFrame(tick);
        } else {
          rafId = null;
          scrollAnchorRef.current?.scrollIntoView({
            behavior: prefersReducedMotion() ? "auto" : "smooth",
            block: "end",
          });
        }
      };
      rafId = requestAnimationFrame(tick);
    };

    const handleViewportChange = () => trackFor(350);

    updateViewport();
    vv.addEventListener("resize", handleViewportChange);
    vv.addEventListener("scroll", handleViewportChange);
    textarea?.addEventListener("focus", handleViewportChange);
    textarea?.addEventListener("blur", handleViewportChange);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      vv.removeEventListener("resize", handleViewportChange);
      vv.removeEventListener("scroll", handleViewportChange);
      textarea?.removeEventListener("focus", handleViewportChange);
      textarea?.removeEventListener("blur", handleViewportChange);
      setViewportHeight(null);
      setViewportOffsetTop(0);
    };
  }, [isOpen, isMobile]);

  // Lock background scroll behind the full-screen mobile sheet.
  useEffect(() => {
    if (!isOpen || !isMobile) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, isMobile]);

  // Show the nudge bubble once per session, a couple of seconds after load.
  useEffect(() => {
    if (nudgeDismissed) return;
    const showTimer = setTimeout(() => setShowNudge(true), 2000);
    return () => clearTimeout(showTimer);
  }, [nudgeDismissed]);

  // Auto-dismiss the nudge a few seconds after it appears.
  useEffect(() => {
    if (!showNudge) return;
    const hideTimer = setTimeout(() => {
      setShowNudge(false);
      setNudgeDismissed(true);
    }, 6000);
    return () => clearTimeout(hideTimer);
  }, [showNudge]);

  function dismissNudge() {
    setShowNudge(false);
    setNudgeDismissed(true);
  }

  async function sendMessage() {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Something went wrong.");
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);

      if (typeof data.highlight === "string" && SPOTLIGHT_TARGETS.includes(data.highlight)) {
        setSpotlightTarget(data.highlight as SpotlightTarget);
        // The mobile panel is a full-screen sheet that would otherwise hide
        // the spotlight entirely. Desktop's floating panel stays open.
        if (isMobile) {
          setIsOpen(false);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <>
      <div
        role="dialog"
        aria-modal="false"
        aria-label={`Ask me anything about ${portfolio.firstName}`}
        aria-hidden={!isOpen}
        style={
          isMobile
            ? {
                // top + height fully define the box; bottom is explicitly
                // cleared so it can never fight with them for the
                // (fixed-position) box's computed size on iOS Safari.
                height: viewportHeight ? `${viewportHeight}px` : undefined,
                top: viewportOffsetTop,
                bottom: "auto",
              }
            : undefined
        }
        className={cn(
          "fixed z-50 flex flex-col overflow-hidden bg-background text-foreground shadow-2xl origin-bottom-right transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none",
          isMobile
            ? "inset-x-0 top-0 h-dvh-fallback border-0"
            : "inset-auto right-6 bottom-24 h-[70vh] max-h-[560px] w-[380px] rounded-2xl border border-border",
          isOpen
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        )}
      >
        <header className="flex shrink-0 items-center justify-between border-b border-border bg-muted px-4 py-3">
          <h2 className="text-sm font-medium text-foreground">Ask me anything</h2>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Close chat"
            onClick={() => setIsOpen(false)}
            className="text-foreground/70 hover:text-foreground"
          >
            <X className="size-4" />
          </Button>
        </header>

        <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4">
          {messages.map((message, i) => (
            <div
              key={i}
              className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}
            >
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                )}
              >
                {message.content}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-center gap-1 rounded-2xl bg-muted px-3 py-2.5">
                <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s] motion-reduce:animate-none" />
                <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s] motion-reduce:animate-none" />
                <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground motion-reduce:animate-none" />
              </div>
            </div>
          )}

          {error && (
            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-2xl border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </div>
            </div>
          )}

          <div ref={scrollAnchorRef} />
        </div>

        <div className="flex shrink-0 items-end gap-2 border-t border-border p-3">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a question..."
            rows={1}
            className="max-h-24 flex-1 resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          />
          <Button
            type="button"
            size="icon-sm"
            aria-label="Send message"
            disabled={isLoading || input.trim().length === 0}
            onClick={sendMessage}
          >
            <Send className="size-4" />
          </Button>
        </div>
      </div>

      <div
        role="status"
        aria-hidden={!(showNudge && !isOpen)}
        className={cn(
          "fixed bottom-[5.75rem] right-4 z-40 flex max-w-[230px] items-start gap-2 rounded-2xl border border-border bg-background px-3 py-2 text-sm text-foreground shadow-lg transition-all duration-300 ease-out motion-reduce:transition-none sm:right-6",
          showNudge && !isOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-2 opacity-0"
        )}
      >
        <span className="pt-0.5">👋 Ask me anything about {portfolio.firstName}</span>
        <button
          type="button"
          aria-label="Dismiss"
          onClick={dismissNudge}
          className="shrink-0 rounded-md p-0.5 text-muted-foreground outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <X className="size-3.5" />
        </button>
      </div>

      <Button
        type="button"
        size="icon"
        aria-label={isOpen ? "Close chat" : "Open chat"}
        aria-expanded={isOpen}
        onClick={() => {
          setIsOpen((open) => !open);
          dismissNudge();
        }}
        className={cn(
          "fixed bottom-4 right-4 z-50 size-14 rounded-full shadow-2xl transition-transform duration-200 ease-out hover:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100 sm:right-6 [&_svg]:size-6",
          isOpen && "max-sm:hidden"
        )}
      >
        {isOpen ? <X /> : <MessageCircle />}
      </Button>

      <Spotlight target={spotlightTarget} onDismiss={() => setSpotlightTarget(null)} />
    </>
  );
}
