"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { 
  MessageSquareText, 
  Plus, 
  BookOpen, 
  Headphones, 
  Mic, 
  LogOut, 
  Menu, 
  X,
} from "lucide-react";

/*HISTORY DATA*/
const historyGroups = [
  {
    label: "HÔM NAY",
    items: ["Luyện Ielts đạt 7.5", "Nghe B1", "Tài liệu Toán lớp 9", "Quản lý cơ sở vật chất"],
  },
  {
    label: "HÔM NAY",
    items: ["Luyện Ielts đạt 7.5", "Nghe B1", "Quản lý cơ sở vật chất"],
  },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/*Button for mobile sidebar toggle*/}
      <button 
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-60 p-2 rounded-md md:hidden"
      >
        {!isOpen && <Menu size={24} />}
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}
      {/*Sidebar*/}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-80 bg-white border-r border-gray-200 flex flex-col
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:relative 
      `}>
        
        {/*LOGO*/}
        <div className="py-3 pl-6 flex justify-between items-center border-b border-gray-200">
          <img src="/img/logo-fotter.png" className="h-10 md:h-14" />
          <button onClick={toggleSidebar} className="md:hidden">
            <X size={20} />
          </button>
        </div>

        {/*NEW CHAT*/}
        <div className="px-4 pt-5 pb-2">
          <button
            onClick={() => { router.push("/chat/1"); setIsOpen(false); }}
            className="w-full bg-[#ff7300] text-white py-2 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
          >
            <div className="flex flex-row items-center gap-2">
              <div className="relative">
                <MessageSquareText size={18} />
                <Plus strokeWidth={4} size={10} className="absolute -top-1 -right-1 bg-orange-500 rounded-full text-white" />
              </div>
              Đoạn chat mới
            </div>
          </button>
        </div>

        {/* MENU */}
        <nav className="flex flex-col gap-8 p-4 font-semibold text-[#475569] text-[16px]">
          <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2 hover:text-black transition-colors">
            <BookOpen size={18} /> Kho tài liệu
          </Link>
          <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2 hover:text-black transition-colors">
            <Headphones size={18} /> Luyện nghe
          </Link>
          <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2 hover:text-black transition-colors">
            <Mic size={18} /> Luyện nói
          </Link>
        </nav>

        <div className="my-4 border-b border-gray-200" />

        {/*HISTORY CHAT*/}
        <div className="flex-1 overflow-y-auto px-4">
          {historyGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="mb-6">
              <div className="text-sm text-[#718096] font-medium mb-2 uppercase">{group.label}</div>
              <div className="space-y-1">
                {group.items.map((item, itemIndex) => {
                  const chatPath = `/chat/${groupIndex}-${itemIndex}`;
                  const active = pathname === chatPath;
                  return (
                    <button
                      key={itemIndex}
                      onClick={() => { router.push(chatPath); setIsOpen(false); }}
                      className={`w-full text-left text-[16px] py-2 px-3 rounded-md transition-all font-medium text-[#475569] ${
                        active ? "bg-gray-100" : " hover:bg-gray-100"
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/*USER*/}
        <div className="px-6 py-5 border-t border-gray-200 flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#d6ffe6] text-[16px] font-extrabold text-[#009d3e]">
            MA
          </div>
          <span className="text-sm text-[#1b2559] font-bold">Adela Parkson</span>
          <button className="ml-auto w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50">
            <LogOut size={18} className="text-[#1b2559]" />
          </button>
        </div>
      </aside>
    </>
  );
}