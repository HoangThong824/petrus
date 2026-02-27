"use client";

import Link from "next/link";
import { 
  GraduationCap,
  Flag,
  Mic,
  Headphones,
  BookOpen,
  Search,
} from "lucide-react";
import Header from "@/components/Header";

const topics = [
  {
    title: "Gia sư Ielts",
    desc: "Nâng cao kiến thức Ielts.",
    icon: <GraduationCap size={20} />,
    color: "from-purple-300 to-yellow-300",
  },
  {
    title: "Gia sư Toeic",
    desc: "Nâng cao toàn diện Toeic.",
    icon: <Flag size={20} />,
    color: "from-indigo-500 to-purple-400",
  },
  {
    title: "Gia sư luyện nói",
    desc: "Giúp cải thiện phát âm rõ ràng.",
    icon: <Mic size={20}  />,
    color: "from-lime-400 to-green-500",
  },
  {
    title: "Gia sư luyện nghe",
    desc: "Phát triển kỹ năng nghe tiếng Anh.",
    icon: <Headphones size={20} />,
    color: "from-orange-500 to-yellow-400",
  },
  {
    title: "Gia sư từ điển",
    desc: "Tra cứu nghĩa từ nhanh chóng.",
    icon: <BookOpen size={20} />,
    color: "from-blue-900 to-blue-500",
  },
];

export default function HomePage() {
  return (
    <main className="flex-1 flex flex-col bg-gray-100">
      {/* HEADER */}
      <Header />

      {/* Topic */}
      <div className="py-30 flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center">
          {/* TITLE */}
          <h1 className="text-[34px] font-bold text-[#1b2559]">
            Chọn chủ đề
          </h1>
          <p className="text-[#718096] font-medium md:mb-20">
            Lựa chọn chủ đề bạn quan tâm
          </p>

          {/* GRID */}
          <div className="grid grid-cols-2 gap-4 max-w-3xl">
            {topics.map((item, index) => (
              <Link
                key={index}
                href="/chat"//need change when update
                className="group bg-gray-100 rounded-xl hover:shadow-lg transition p-3 flex items-start gap-4"
              >
                {/* ICON */}
                <div className={`w-10 h-10 rounded-full bg-linear-to-br ${item.color} flex items-center justify-center text-white text-xl shrink-0`}>
                  {item.icon}
                </div>

                {/* TEXT */}
                <div className="flex flex-col gap-3">
                  <div className="font-bold text-[#1b2559] text-[16px] group-hover:text-orange-500">
                    {item.title}
                  </div>
                  <div className="font-medium text-sm text-[#718096]">
                    {item.desc}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
