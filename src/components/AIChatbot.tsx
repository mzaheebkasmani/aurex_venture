import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Send,
  User,
  Trash2,
  Minimize2,
  Maximize2,
  Copy,
  Check,
  Globe,
} from "lucide-react";
import { getAurexReply } from "@/utils/aurexConsultant";

interface Message {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: string;
}

// Tech Robot Vector Icon for modern AI branding
function TechRobotIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Top Antenna & Signal Beacon */}
      <line x1="12" y1="1.5" x2="12" y2="4.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <circle cx="12" cy="1.8" r="1.4" fill="#38bdf8" />

      {/* Robot Head Outer Chassis */}
      <rect
        x="3.5"
        y="4.5"
        width="17"
        height="13.5"
        rx="4"
        stroke="currentColor"
        strokeWidth="1.75"
        fill="currentColor"
        fillOpacity="0.08"
      />

      {/* Cyber Ear Connectors */}
      <rect x="1" y="8" width="2.5" height="6.5" rx="1" fill="currentColor" opacity="0.85" />
      <rect x="20.5" y="8" width="2.5" height="6.5" rx="1" fill="currentColor" opacity="0.85" />

      {/* Glowing Visor Screen */}
      <rect
        x="6"
        y="7.5"
        width="12"
        height="4.5"
        rx="2"
        fill="#38bdf8"
        fillOpacity="0.25"
        stroke="#38bdf8"
        strokeWidth="1"
      />

      {/* Glowing Dual Cyber Eyes */}
      <circle cx="8.8" cy="9.8" r="1.2" fill="#38bdf8" />
      <circle cx="15.2" cy="9.8" r="1.2" fill="#38bdf8" />

      {/* Audio Grill / Mouth Lines */}
      <line x1="8" y1="14.8" x2="16" y2="14.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="10" y1="13" x2="14" y2="13" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.7" />

      {/* Neck Collar */}
      <path d="M8.5 18H15.5V20.5C15.5 21.2 14.8 21.8 14 21.8H10C9.2 21.8 8.5 21.2 8.5 20.5V18Z" fill="currentColor" opacity="0.75" />
    </svg>
  );
}

const INITIAL_SUGGESTIONS = [
  "What services does Aurex Ventures offer?",
  "I need a custom website for my business",
  "How does AI automation help scale my company?",
  "How can I book a free discovery meeting?",
];

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      role: "model",
      text: "Hello! I am **Aurex**, your digital consultant for Aurex Ventures 🤖\n\nHow can I help you today? Feel free to ask about our web development, AI automation, UI/UX design, branding, or schedule a free discovery consultation!",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // When chatbot is opened, ensure top greeting is fully visible if no conversation yet
  useEffect(() => {
    if (isOpen) {
      if (messages.length <= 1) {
        if (messagesContainerRef.current) {
          messagesContainerRef.current.scrollTop = 0;
        }
      } else {
        scrollToBottom();
      }
      // Focus input on desktop without scrolling the page or mobile viewport
      if (typeof window !== "undefined" && window.innerWidth >= 768) {
        setTimeout(() => {
          inputRef.current?.focus({ preventScroll: true });
        }, 150);
      }
    }
  }, [isOpen]);

  // Only auto-scroll down when conversation is actively ongoing
  useEffect(() => {
    if (isOpen && (messages.length > 1 || isLoading)) {
      scrollToBottom();
    }
  }, [messages, isLoading, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    const userMessageId = `user-${Date.now()}`;
    const userMsg: Message = {
      id: userMessageId,
      role: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const botMessageId = `bot-${Date.now()}`;
    const botPlaceholder: Message = {
      id: botMessageId,
      role: "model",
      text: "",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg, botPlaceholder]);
    setInput("");
    setIsLoading(true);

    // Build history with all non-empty conversation turns
    const historyPayload = messages
      .filter((m) => m.text && m.text.trim())
      .map((m) => ({
        role: m.role,
        text: m.text,
      }));

    try {
      let responseHandled = false;

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: text,
            history: historyPayload,
            stream: true,
          }),
        });

        if (res.ok) {
          // Check for streaming SSE response
          if (res.body && res.headers.get("content-type")?.includes("text/event-stream")) {
            const reader = res.body.getReader();
            const decoder = new TextDecoder();
            let accumulated = "";
            let buffer = "";

            while (true) {
              const { done, value } = await reader.read();
              if (done) break;

              buffer += decoder.decode(value, { stream: true });
              const parts = buffer.split("\n\n");
              buffer = parts.pop() || "";

              for (const part of parts) {
                const trimmed = part.trim();
                if (trimmed.startsWith("data: ")) {
                  const dataStr = trimmed.slice(6).trim();
                  if (dataStr === "[DONE]") {
                    break;
                  }
                  try {
                    const parsed = JSON.parse(dataStr);
                    if (parsed.text) {
                      accumulated += parsed.text;
                      setMessages((prev) =>
                        prev.map((m) =>
                          m.id === botMessageId ? { ...m, text: accumulated } : m
                        )
                      );
                    }
                  } catch {
                    // Ignore partial chunk parse error
                  }
                }
              }
            }

            if (accumulated.trim()) {
              responseHandled = true;
            }
          } else {
            // Fallback for standard non-streamed JSON response
            const data = await res.json();
            if (data.text) {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === botMessageId ? { ...m, text: data.text } : m
                )
              );
              responseHandled = true;
            }
          }
        }
      } catch (networkErr) {
        // When deployed to static host (Vercel static, GitHub Pages, Netlify), /api/chat is unavailable
        console.warn("Server endpoint unreachable, streaming from client-side Aurex engine");
      }

      // If backend was unreachable or returned an empty response,
      // seamlessly stream the response using the client-side Aurex engine!
      if (!responseHandled) {
        const localAnswer = getAurexReply(text, historyPayload);
        const words = localAnswer.split(" ");
        let streamText = "";
        for (let i = 0; i < words.length; i += 2) {
          streamText += (i === 0 ? "" : " ") + words.slice(i, i + 2).join(" ");
          setMessages((prev) =>
            prev.map((m) =>
              m.id === botMessageId ? { ...m, text: streamText } : m
            )
          );
          await new Promise((r) => setTimeout(r, 20));
        }
      }
    } catch (err: any) {
      console.error("Chat error:", err);
      const fallbackReply = getAurexReply(text, historyPayload);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === botMessageId
            ? {
                ...m,
                text: fallbackReply,
              }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: "welcome-reset",
        role: "model",
        text: "Chat has been reset! Feel free to ask anything about our services or technology in any language.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <>
      {/* ========================================================= */}
      {/* FLOATING LAUNCHER BUTTON                                 */}
      {/* ========================================================= */}
      <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="relative group flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-brand via-purple-600 to-indigo-600 text-white font-semibold shadow-[0_10px_25px_rgba(147,51,234,0.4)] border border-white/20 focus:outline-none cursor-pointer preserve-white"
          aria-label="Open AI Assistant"
        >
          {/* Animated Glow Aura */}
          <div className="absolute inset-0 rounded-full bg-brand blur-md opacity-50 group-hover:opacity-80 transition-opacity" />

          {/* Launcher Robot Icon */}
          <div className="relative z-10 flex items-center justify-center">
            {isOpen ? (
              <X className="w-5 h-5 transition-transform duration-200 rotate-90" />
            ) : (
              <div className="relative flex items-center justify-center">
                <TechRobotIcon className="w-5 h-5 text-cyan-300 drop-shadow-[0_0_8px_rgba(56,189,248,0.7)]" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-950 animate-pulse" />
              </div>
            )}
          </div>

          <span className="relative z-10 text-xs sm:text-sm tracking-wide font-medium hidden sm:inline-block">
            {isOpen ? "Close" : "Aurex"}
          </span>
        </motion.button>
      </div>

      {/* ========================================================= */}
      {/* CHATBOT WINDOW DIALOG                                    */}
      {/* ========================================================= */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`fixed z-50 right-3 sm:right-6 left-3 sm:left-auto bottom-20 sm:bottom-24 aurex-chat-dialog bg-slate-950/95 backdrop-blur-2xl border border-violet-500/30 rounded-2xl sm:rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden transition-all duration-300 preserve-white ${
              isExpanded
                ? "sm:w-[540px] h-[82vh] max-h-[750px]"
                : "sm:w-[410px] h-[520px] sm:h-[580px] max-h-[78vh]"
            }`}
          >
            {/* Top Bar Header */}
            <div className="relative px-5 py-4 bg-gradient-to-r from-violet-950/80 via-slate-900 to-slate-950 border-b border-white/10 flex items-center justify-between">
              {/* Header Info */}
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand to-cyan-400 p-0.5 shadow-md shadow-brand/30">
                  <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-cyan-300">
                    <TechRobotIcon className="w-6 h-6" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-950" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-white text-sm tracking-tight">Aurex</h3>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30 font-medium">
                      Assistant
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Globe className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-cyan-300 font-medium">All Languages Supported</span>
                    <span className="text-slate-600">•</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Online</span>
                  </div>
                </div>
              </div>

              {/* Header Actions */}
              <div className="flex items-center gap-1 text-slate-400">
                <button
                  onClick={clearChat}
                  title="Clear Chat"
                  className="p-1.5 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  title={isExpanded ? "Minimize" : "Maximize"}
                  className="p-1.5 hover:text-white hover:bg-white/10 rounded-lg transition-colors hidden sm:block cursor-pointer"
                >
                  {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close"
                  className="p-1.5 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Messages Body */}
            <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-sm scroll-smooth">
              {messages.map((msg) => {
                const isUser = msg.role === "user";
                if (!isUser && !msg.text) return null;
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}
                  >
                    {!isUser && (
                      <div className="w-7 h-7 rounded-xl bg-violet-600/40 border border-violet-400/30 flex items-center justify-center text-cyan-300 flex-shrink-0 mt-0.5">
                        <TechRobotIcon className="w-4 h-4" />
                      </div>
                    )}

                    <div
                      className={`relative max-w-[82%] px-4 py-3 rounded-2xl group ${
                        isUser
                          ? "aurex-chat-user-bubble bg-gradient-to-r from-brand to-indigo-600 text-white rounded-tr-sm shadow-md shadow-brand/20 preserve-white"
                          : "aurex-chat-bot-bubble bg-slate-900/90 text-slate-200 border border-white/10 rounded-tl-sm shadow-md"
                      }`}
                    >
                      {/* Message Text with simple line break and markdown bold formatting */}
                      <div className="whitespace-pre-line leading-relaxed text-[13px] sm:text-sm font-sans">
                        {msg.text.split("\n").map((line, i) => (
                          <React.Fragment key={i}>
                            {line.includes("**")
                              ? line.split("**").map((part, idx) =>
                                  idx % 2 === 1 ? (
                                    <strong
                                      key={idx}
                                      className={
                                        isUser
                                          ? "font-bold text-white"
                                          : "font-bold text-cyan-300 drop-shadow-sm"
                                      }
                                    >
                                      {part}
                                    </strong>
                                  ) : (
                                    part
                                  )
                                )
                              : line}
                            {i !== msg.text.split("\n").length - 1 && <br />}
                          </React.Fragment>
                        ))}
                      </div>

                      {/* Footer: timestamp + copy button */}
                      <div
                        className={`flex items-center justify-between gap-3 mt-1.5 text-[10px] ${
                          isUser ? "text-purple-200/80" : "text-slate-500"
                        }`}
                      >
                        <span>{msg.timestamp}</span>
                        {!isUser && (
                          <button
                            onClick={() => copyToClipboard(msg.text, msg.id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 hover:text-slate-300 cursor-pointer"
                            title="Copy text"
                          >
                            {copiedId === msg.id ? (
                              <Check className="w-3 h-3 text-emerald-400" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        )}
                      </div>
                    </div>

                    {isUser && (
                      <div className="w-7 h-7 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 flex-shrink-0 mt-0.5">
                        <User className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </motion.div>
                );
              })}

              {/* Typing indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-slate-400 text-xs pl-10"
                >
                  <div className="flex gap-1.5 bg-slate-900 px-3 py-2 rounded-xl border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" />
                    <span
                      className="w-2 h-2 rounded-full bg-violet-400 animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                    <span
                      className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    />
                  </div>
                  <span className="text-[11px] text-slate-400">Aurex is typing...</span>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            {messages.length <= 3 && (
              <div className="px-4 py-2 border-t border-white/5 bg-slate-950/60 overflow-x-auto no-scrollbar flex gap-2">
                {INITIAL_SUGGESTIONS.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(suggestion)}
                    className="text-[11px] whitespace-nowrap px-3 py-1.5 rounded-full bg-violet-950/40 hover:bg-violet-900/60 text-violet-300 hover:text-white border border-violet-500/30 transition-all cursor-pointer flex-shrink-0"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            {/* Chat Input Field */}
            <div className="p-3 sm:p-4 bg-slate-950 border-t border-white/10">
              <div className="relative flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask anything about our services or technology..."
                  disabled={isLoading}
                  className="aurex-chat-input w-full pl-4 pr-12 py-3 bg-slate-900 border border-white/10 rounded-2xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand/70 focus:ring-1 focus:ring-brand/70 transition-all disabled:opacity-60"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 p-2 rounded-xl bg-brand hover:bg-brand-light text-white disabled:opacity-40 disabled:hover:bg-brand transition-all cursor-pointer shadow-md shadow-brand/30"
                  title="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
