import { useState, useCallback, useRef } from "react";

export interface ChatMessage {
  id: number;
  role: "system" | "user" | "assistant";
  content: string;
}

const SYSTEM_GREETING: ChatMessage = {
  id: 0,
  role: "system",
  content:
    "召唤师你好！想吃椰子鸡还是看比赛？输入你的时间和喜好，我来帮你排个一波流 City Walk 路线！",
};

const FAKE_REPLY =
  "路线已规划！建议您先去拿红 Buff（吃糟粕醋），再去五源河打大龙（看决赛）！全程约 3 小时，中途可在骑楼老街补给蓝 Buff（喝老爸茶），保证续航拉满！";

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([SYSTEM_GREETING]);
  const [isTyping, setIsTyping] = useState(false);
  const nextId = useRef(1);
  const typingTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const sendMessage = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    // Add user message
    const userMsg: ChatMessage = {
      id: nextId.current++,
      role: "user",
      content: trimmed,
    };
    setMessages((prev) => [...prev, userMsg]);

    // Simulate "typing..." then reply
    setIsTyping(true);
    typingTimer.current = setTimeout(() => {
      const botMsg: ChatMessage = {
        id: nextId.current++,
        role: "assistant",
        content: FAKE_REPLY,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  }, []);

  return { messages, isTyping, sendMessage };
}
