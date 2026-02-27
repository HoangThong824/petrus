"use client";

import { ChevronDown, Search, Settings, LogOut, Trash, MoonIcon, X } from "lucide-react";
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
  const [isSearchActive, setIsSearchActive] = useState(false);
  const settingRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchActive]);

  return (
    <header className="w-full bg-gray-100 border-b text-gray-200 py-4.5 flex items-center justify-between
                        px-4 pl-16 md:pl-6 md:px-6 relative z-10">
      
      {/* Title  */}
      {!isSearchActive && (
        <div className="flex flex-row gap-2 items-center">
          <span className="text-[#1b2559] font-bold text-base md:text-lg whitespace-nowrap">Kho tài liệu</span>
          <ChevronDown className="text-black" size={18} />
        </div>
      )}

      {/*SET&SEARCH AREA*/}
      <div className={`flex items-center gap-2 md:gap-4 transition-all duration-300 ${isSearchActive ? "w-full" : ""}`}>
        
        {/*SEARCH BOX*/}
        <div className={`relative flex items-center transition-all duration-300 ${isSearchActive ? "flex-1" : ""}`}>
          <div className={`
            flex items-center bg-gray-200 rounded-full h-11 transition-all duration-300
            ${isSearchActive ? "w-full px-4 ring-2 ring-orange-500/20" : "w-11 md:w-80 md:px-4"}
          `}>
            {/*SEARCH ICON */}
            <button 
              onClick={() => setIsSearchActive(true)}
              className={`${isSearchActive ? "mr-2" : "absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:mr-2"} text-green-500 shrink-0`}
            >
              <Search size={20} />
            </button>

            {/*INPUT AREA*/}
            <input
              ref={inputRef}
              type="text"
              placeholder="Tìm kiếm..."
              className={`
                bg-transparent border-none py-2 text-sm text-gray-600 focus:outline-none w-full
                ${isSearchActive ? "block" : "hidden md:block"}
              `}
            />

            {/*CLOSE ICON*/}
            {isSearchActive && (
              <button 
                onClick={() => setIsSearchActive(false)}
                className="ml-2 text-gray-500 hover:text-black transition-colors"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {/*SETTINGS*/}
        <div ref={settingRef} className={`relative ${isSearchActive ? "hidden md:block" : "block"}`}>
          <button
            onClick={() => setOpenSetting((prev) => !prev)}
            className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center bg-white hover:bg-gray-50 shrink-0"
          >
            <Settings className="text-black" size={18} />
          </button>

          {/*Dropdown Menu*/}
          {/*TODO*/}
        </div>
      </div>
    </header>
  );
}