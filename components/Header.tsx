// components/Header.tsx
import {  FiChevronDown, FiSearch, FiSettings, FiLogOut, FiTrash2 } from "react-icons/fi";
import { FaMoon } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

function MenuItem({
  icon,
  text,
  danger,
}: {
  icon: React.ReactNode;
  text: string;
  danger?: boolean;
}) {
  return (
    <button
      className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition
        ${danger ? "text-red-500 hover:bg-red-50" : "hover:bg-gray-100"}
      `}
    >
      {icon}
      {text}
    </button>
  );
}
export default function Header() {
  const [openSetting, setOpenSetting] = useState(false);
  const settingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) =>{
      if(settingRef.current && !settingRef.current.contains(e.target as Node)){
        setOpenSetting(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-gray-100 border-b text-gray-300 px-6 py-2 flex items-center justify-between">
      <div className="flex items-center">
        <span className="text-[#1b2559] font-bold">Kho tài liệu</span>
        <FiChevronDown className="text-black" size={20} />
      </div>

      <div className="flex items-center gap-3">
        {/* SEARCH */}
        <div className="relative w-80">
          <FiSearch
            className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500"
            size={20}
          />
          <input
            type="text"
            placeholder="Tìm kiếm đoạn chat"
            className="w-full bg-gray-200 rounded-full py-2 pl-11 pr-4 text-sm text-gray-600 focus:outline-none"
          />
        </div>
        <div ref={settingRef} className="relative">
        {/* SETTINGS ICON */}
          <button
            onClick={() => setOpenSetting(prev => !prev)}
            className="w-11 h-11 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-300"
          >
          <FiSettings className="text-black" size={16} />
          </button>
          {openSetting && (
            
            <div 
                className="absolute right-0 top-14 w-56 text-gray-500 bg-white border rounded-xl shadow-lg py-2 animate-in fade-in zoom-in-95"
                >
              <MenuItem icon={<FaMoon />} text="Chế độ tối" />
              <MenuItem icon={<FiTrash2 />} text="Xóa lịch sử chat" danger />
              <div className="my-1 border-t" />
              <MenuItem icon={<FiLogOut />} text="Đăng xuất" danger />
            </div>
          )}
        </div>
      </div>

    </header>
  );
}