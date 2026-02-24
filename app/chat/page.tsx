"use client";

import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Message from "@/components/Message";
import ChatInput from "@/components/ChatInput";

export interface MessageType {
  sender: "user" | "bot";
  text: string;
  time: string;
  fileUrl?: string;
  fileType?: "image" | "audio" | "other"; 
  fileName?: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Tự động cuộn xuống dưới cùng
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (text: string, file?: File | null) => {
  // 1️⃣ Hiển thị message user trước
  const userMsg: MessageType = {
    sender: "user",
    text,
    time: new Date().toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    fileUrl: file ? URL.createObjectURL(file) : undefined,
    fileType: file
      ? file.type.startsWith("image/")
        ? "image"
        : file.type.startsWith("audio/")
        ? "audio"
        : "other"
      : undefined,
    fileName: file?.name,
  };

  setMessages((prev) => [...prev, userMsg]);

  // Tạo FormData
  const formData = new FormData();
  formData.append("text", text);
  if (file) formData.append("file", file);

  // Call API
  const res = await fetch("/api/chat", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  // Bot trả lời
  const botMsg: MessageType = {
    sender: "bot",
    text: data.reply,
    time: new Date().toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  setMessages((prev) => [...prev, botMsg]);
};


  return (
    <div className="flex h-screen bg-gray-100">
      
      <main className="flex-1 flex flex-col h-full relative">
        <Header />

        {/* DANH SÁCH TIN NHẮN */}
        <div className="flex-1 overflow-y-auto px-4 py-6 scroll-smooth">
          <div className="max-w-4xl mx-auto">
             {messages.length === 0 && (
                <div className="text-center text-gray-400 mt-20">
                  <p>Bắt đầu trò chuyện với Pek ngay!</p>
                </div>
             )}
             
            {messages.map((msg, i) => (
              <Message key={i} {...msg} />
            ))}
            <div ref={bottomRef} className="h-4" />
          </div>
        </div>

        {/* INPUT */}
        <ChatInput onSend={handleSend} />
      </main>
    </div>
  );
}