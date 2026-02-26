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

export default function Message({ sender, text, time, fileUrl, fileType, fileName }: MessageProps) {
  const isUser = sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-6 animate-in fade-in slide-in-from-bottom-1`}>
      {!isUser && (
        /*BOT INTERFACE*/
        <div className="flex items-start gap-3 max-w-[85%]">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-xs shadow-sm shrink-0">
            Pek
          </div>
          <div className="flex flex-col gap-1">
             <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl shadow-sm text-gray-700 text-sm">
                {text}
                <span className="text-[10px] text-gray-400 ml-1">{time}</span>
             </div>
          </div>
        </div>
      )}

      {isUser && (
        /*USER INTERFACE*/
        <div className="flex flex-col items-end gap-1 max-w-[85%]">
          <div className="bg-[#006633] px-4 py-3 rounded-2xl shadow-md text-white text-sm">
            
            {/* Text */}
            {text && <p className={`leading-relaxed ${fileUrl ? "mb-3" : ""}`}>{text}</p>}

            {/* Image */}
            {fileType === "image" && fileUrl && (
              <img src={fileUrl} alt="uploaded" className="max-w-full rounded-lg border border-white/20 mb-1" style={{ maxHeight: '200px' }} />
            )}

            {/* Audio */}
            {fileType === "audio" && fileUrl && (
              <audio controls className="h-10 w-full min-w-60 rounded-lg">
                <source src={fileUrl} />
              </audio>
            )}

            {/* File */}
            {fileType === "other" && fileUrl && (
               <div className="flex items-center gap-3 bg-white/10 p-2 rounded-lg border border-white/20">
                  <File className="text-white" size={14} />
                  <span className="truncate max-w-38 text-xs underline decoration-dotted">{fileName}</span>
                  <a href={fileUrl} download={fileName} className="bg-white/20 p-1.5 rounded-full hover:bg-white/30">
                    <Download size={10} />
                  </a>
               </div>
            )}
            <span className="text-[10px] text-gray-400 mr-1">{time}</span>
          </div>
        </div>
      )}
    </div>
  );
}