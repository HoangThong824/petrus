"use client";

import Link from "next/link";
import {
  FaGraduationCap,
  FaFlag,
  FaMicrophone,
  FaHeadphones,
  FaBook,
} from "react-icons/fa";
import Header from "@/components/Header";

const topics = [
  {
    title: "Gia sư Ielts",
    desc: "Nâng cao kiến thức Ielts.",
    icon: <FaGraduationCap />,
    color: "from-purple-200 via-pink-200 to-yellow-100",
  },
  {
    title: "Gia sư Toeic",
    desc: "Nâng cao toàn diện Toeic.",
    icon: <FaFlag />,
    color: "from-indigo-500 to-purple-400",
  },
  {
    title: "Gia sư luyện nói",
    desc: "Giúp cải thiện phát âm rõ ràng.",
    icon: <FaMicrophone />,
    color: "from-lime-400 to-green-500",
  },
  {
    title: "Gia sư luyện nghe",
    desc: "Phát triển kỹ năng nghe tiếng Anh.",
    icon: <FaHeadphones />,
    color: "from-orange-500 to-yellow-400",
  },
  {
    title: "Gia sư từ điển",
    desc: "Tra cứu nghĩa từ nhanh chóng.",
    icon: <FaBook />,
    color: "from-blue-900 to-blue-500",
  },
];

export default function HomePage() {
  return (
    <main className="flex-1 flex flex-col bg-gray-100">
      {/* HEADER */}
      <Header />

      {/* Topic */}
      <div className="py-10 flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center">
          {/* TITLE */}
          <h1 className="text-3xl font-bold text-[#1c2451] mb-2">
            Chọn chủ đề
          </h1>
          <p className="text-gray-500 mb-10">
            Lựa chọn chủ đề bạn quan tâm
          </p>

          {/* GRID */}
          <div className="grid grid-cols-2 gap-6 max-w-3xl">
            {topics.map((item, index) => (
              <Link
                key={index}
                href="/chat"
                className="group bg-gray-100 rounded-xl shadow-md hover:shadow-lg transition p-5 flex items-center gap-4"
              >
                {/* ICON */}
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-white text-xl shrink-0`}>
                  {item.icon}
                </div>

                {/* TEXT */}
                <div>
                  <div className="font-semibold text-[#1c2451] group-hover:text-orange-500">
                    {item.title}
                  </div>
                  <div className="text-sm text-gray-500">
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
