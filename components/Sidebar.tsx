"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  FaFolder,
  FaHeadphones,
  FaMicrophone,
} from "react-icons/fa";
import { FiLogOut, FiMessageSquare, FiPlus } from "react-icons/fi";

/* ===== HISTORY DATA ===== */
const historyGroups = [
  {
    label: "HÔM NAY",
    items: [
      "Luyện Ielts đạt 7.5",
      "Nghe B1",
      "Tài liệu Toán lớp 9",
      "Quản lý cơ sở vật chất",
    ],
  },
  {
    label: "HÔM NAY",
    items: [
      "Luyện Ielts đạt 7.5",
      "Nghe B1",
      "Quản lý cơ sở vật chất",
    ],
  },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <aside className="w-80 bg-white border-r flex flex-col">
      {/* LOGO */}
      <div className="p-4 font-bold text-lg text-black border-b border-gray-300">
        PÉTRUS KÝ
      </div>

      {/* NEW CHAT */}
      <div className="px-4 py-4">
        <button
          onClick={() => router.push("/chat/1")}//need update
          className="w-full bg-orange-500 text-black py-2 rounded-full flex items-center justify-center"
        >
          <div className="flex">
            <div className="relative">
              <FiMessageSquare size={20} />
              <FiPlus
                size={10}
                className="absolute -top-1 -right-1 bg-orange-500 rounded-full text-white"
              />
            </div>
            Đoạn chat mới
          </div>
        </button>
      </div>

      {/* MENU */}
      <nav className="px-4 space-y-3 text-sm text-gray-500">
        <Link href="/" className="flex items-center gap-2">
          <FaFolder /> Kho tài liệu
        </Link>
        <Link href="/" className="flex items-center gap-2">
          <FaHeadphones /> Luyện nghe
        </Link>
        <Link href="/" className="flex items-center gap-2">
          <FaMicrophone /> Luyện nói
        </Link>
      </nav>

      <div className="my-4 border-b border-gray-300" />

      {/* ===== HISTORY CHAT ===== */}
      <div className="flex-1 overflow-y-auto px-4">
        {historyGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="mb-6">
            {/* TITLE */}
            <div className="text-xs text-gray-400 font-semibold mb-2">
              {group.label}
            </div>

            {/* ITEMS */}
            <div className="space-y-1">
              {group.items.map((item, itemIndex) => {
                const chatPath = `/chat/${groupIndex}-${itemIndex}`;
                const active = pathname === chatPath;
                return (
                  <button
                    key={itemIndex}
                    onClick={() => router.push(chatPath)}
                    className={`
                      w-full text-left
                      text-sm
                      px-2 py-1.5
                      rounded-md
                      ${
                        active
                          ? "bg-gray-100 text-black"
                          : "text-gray-800 hover:bg-gray-100"
                      }
                    `}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* USER */}
      <div className="p-4 border-t flex items-center gap-2">
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-green-200 text-xl font-semibold text-green-700">
          MA
        </div>

        <span className="text-sm text-black font-semibold">Adela Parkson</span>

        <button className="ml-auto w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center">
          <FiLogOut size={18} className="text-gray-500" />
        </button>
      </div>
    </aside>
  );
}
