import { FaFileAlt, FaDownload } from "react-icons/fa";
import { File, Download } from "lucide-react";

interface MessageProps {
  sender: "user" | "bot";
  text: string;
  time: string;
  fileUrl?: string;
  fileType?: "image" | "audio" | "other";
  fileName?: string;
}
export default function Message({
  sender,
  text,
  time,
  fileUrl,
  fileType,
  fileName,
}: MessageProps) {
  const isUser = sender === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      } mb-6 animate-in fade-in slide-in-from-bottom-1`}
    >
      {/* BOT */}
      {!isUser && (
        <div className="flex items-start gap-3 max-w-[75%]">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-[#d6ffe6] flex items-center justify-center text-[#009d3e] font-extrabold text-[16px] shadow-sm shrink-0">
            Pek
          </div>

          {/* Bubble */}
          <div className="bg-white border border-gray-200 p-3 rounded-2xl text-[#1b2559] text-sm font-medium flex flex-col">
            <p className="leading-6 text-sm font-medium flex items-center">{text}</p>
            <span className="text-xs font-normal leading-6 text-[#718096] self-end mt-1">
              {time}
            </span>
          </div>
        </div>
      )}

      {/* USER */}
      {isUser && (
        <div className="max-w-[80%]">
          <div className="bg-[#007b48] p-3 rounded-2xl shadow-md text-white text-sm font-medium">
            <div className="flex flex-row justify-center items-center gap-2.5">
              {/* Text */}
            {text && (
              <p className={`leading-6 text-sm font-medium flex items-center ${fileUrl ? "mb-2" : ""}`}>
                {text}
              </p>
            )}

            {/* Image */}
            {fileType === "image" && fileUrl && (
              <img
                src={fileUrl}
                alt="uploaded"
                className="rounded-lg border border-gray-600 mb-2 max-h-50"
              />
            )}

            {/* Audio */}
            {fileType === "audio" && fileUrl && (
              <audio controls className="h-10 w-full rounded-lg mb-2">
                <source src={fileUrl} />
              </audio>
            )}

            {/* File */}
            {fileType === "other" && fileUrl && (
              <div className="flex items-center gap-3 bg-gray-500 p-2 rounded-lg border border-gray-600 mb-2">
                <File size={14} />
                <span className="truncate max-w-35 text-xs underline decoration-dotted">
                  {fileName}
                </span>
                <a
                  href={fileUrl}
                  download={fileName}
                  className="bg-gray-600 p-1.5 rounded-full hover:bg-gray-500 transition-all"
                >
                  <Download size={10} />
                </a>
              </div>
            )}

            {/* Time */}
            <span className="text-xs font-normal leading-6 text-[#d6ffe6]">
              {time}
            </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}