import { useState, useRef, useEffect } from "react";
import { useChat } from "@/hooks/use-chat";
import type { ChatMessage } from "@/hooks/use-chat";

interface ChatDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function ChatDrawer({ open, onClose }: ChatDrawerProps) {
  const { messages, isTyping, sendMessage } = useChat();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-50"
          style={{
            background: "rgba(2,2,10,0.5)",
            backdropFilter: "blur(4px)",
            animation: "modalFadeIn 0.2s ease-out",
          }}
          onClick={onClose}
        />
      )}

      {/* Drawer panel */}
      <div
        className="fixed left-0 right-0 bottom-0 z-50 flex flex-col overflow-hidden rounded-t-2xl"
        style={{
          height: "60vh",
          background: "linear-gradient(180deg, rgba(8,8,28,0.98), rgba(5,5,18,0.99))",
          border: "1px solid rgba(10,255,237,0.12)",
          borderBottom: "none",
          boxShadow: "0 -8px 40px rgba(0,0,0,0.5), 0 0 20px rgba(10,255,237,0.05)",
          transform: open ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)",
        }}
      >
        {/* Top glow line */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: "linear-gradient(90deg, transparent, #0affed, transparent)",
          }}
        />

        {/* Header */}
        <div
          className="shrink-0 flex items-center justify-between px-4 py-3"
          style={{
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="flex items-center gap-2">
            {/* Small bot icon */}
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #0affed33, #0088cc33)",
                border: "1px solid rgba(10,255,237,0.3)",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <rect x="4" y="6" width="16" height="14" rx="3" stroke="#0affed" strokeWidth="2" />
                <circle cx="9" cy="12" r="1.5" fill="#0affed" />
                <circle cx="15" cy="12" r="1.5" fill="#0affed" />
              </svg>
            </div>
            <span
              className="text-sm font-bold"
              style={{
                color: "#0affed",
                textShadow: "0 0 8px rgba(10,255,237,0.3)",
              }}
            >
              海口春决 AI 行程规划师
            </span>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-full"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12">
              <path d="M2 2L10 10M10 2L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Messages area */}
        <div
          ref={scrollRef}
          className="grow overflow-y-auto px-4 py-3 flex flex-col gap-3"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(10,255,237,0.15) transparent",
          }}
        >
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}

          {isTyping && <TypingIndicator />}
        </div>

        {/* Input area */}
        <div
          className="shrink-0 flex items-center gap-2 px-4 py-3"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(5,5,18,0.6)",
          }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入你的行程需求..."
            className="grow px-3 py-2 rounded-lg text-sm outline-none"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(10,255,237,0.12)",
              color: "#fff",
              caretColor: "#0affed",
            }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="shrink-0 px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200"
            style={{
              background: input.trim()
                ? "linear-gradient(135deg, #0affed, #0088cc)"
                : "rgba(255,255,255,0.04)",
              color: input.trim() ? "#fff" : "rgba(255,255,255,0.2)",
              boxShadow: input.trim()
                ? "0 0 12px rgba(10,255,237,0.3)"
                : "none",
              cursor: input.trim() ? "pointer" : "default",
            }}
          >
            SEND
          </button>
        </div>
      </div>
    </>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className="max-w-[85%] px-3 py-2 rounded-xl text-xs leading-relaxed"
        style={
          isUser
            ? {
                background: "linear-gradient(135deg, rgba(10,255,237,0.15), rgba(0,136,204,0.15))",
                border: "1px solid rgba(10,255,237,0.2)",
                color: "rgba(255,255,255,0.9)",
                borderBottomRightRadius: "4px",
              }
            : {
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
                color: "rgba(255,255,255,0.75)",
                borderBottomLeftRadius: "4px",
              }
        }
      >
        {message.content}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div
        className="px-3 py-2 rounded-xl flex items-center gap-1.5"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <span className="text-[10px]" style={{ color: "rgba(10,255,237,0.6)" }}>
          对方正在输入
        </span>
        <div className="flex gap-0.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1 h-1 rounded-full"
              style={{
                background: "#0affed",
                animation: `dotPulse 1s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
