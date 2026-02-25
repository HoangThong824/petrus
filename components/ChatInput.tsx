"use client";

import { useState, useRef } from "react";
import { FaMicrophone, FaPaperPlane, FaStop, FaTrash } from "react-icons/fa";
import { FiPaperclip, FiFile } from "react-icons/fi";

interface ChatInputProps {
  onSend: (message: string, file?: File | null) => void;
}

export default function ChatInput({ onSend }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  
  // Refs
  const fileRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Send handle
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() && !file) return;
    onSend(message, file);
    
    // Reset form
    setMessage("");
    setFile(null);
    if (fileRef.current) fileRef.current.value = ""; // Reset input file
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
  // Nếu nhấn Enter và KHÔNG giữ phím Shift
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Ngăn việc thêm dòng mới trong textarea
      
      // Chỉ gửi khi có nội dung hoặc có file
      if (message.trim() || file) {
        handleSubmit(e); 
      }
    }
  };
  // File handle
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Record handle
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        const audioFile = new File([audioBlob], "voice_record.wav", { type: "audio/wav" });
        setFile(audioFile);
        stream.getTracks().forEach(track => track.stop()); // Tắt mic
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      alert("Bạn cần cấp quyền truy cập Microphone để ghi âm.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="bg-gray-100 relative z-10">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <form onSubmit={handleSubmit}>
          {/* --- INPUT FILE (ẨN) - Đặt ở đây để luôn hoạt động --- */}
          <input
            ref={fileRef}
            type="file"
            hidden
            onChange={handleFileSelect}
          />

          <div className="relative ">
            {isRecording ? (
              /* Record interface*/
              <div className="w-full border border-red-300 bg-red-50 rounded-full py-3 px-4 
                              flex items-center justify-between animate-pulse">
                <span className="text-red-500 font-medium flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                  Đang ghi âm...
                </span>
                <button 
                  type="button" 
                  onClick={stopRecording} 
                  className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                >
                  <FaStop size={14} />
                </button>
              </div>
            ) : (
              /* Input interface*/
              <div className="flex flex-col w-full bg-gray-200 rounded-3xl p-3 shadow-sm">
                
                {/*Input*/}
                <div className="w-full">
                  <textarea
                    rows={2}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Hỏi bất kỳ điều gì..."
                    className="w-full bg-transparent border-none focus:ring-0 text-gray-700 placeholder-gray-500 resize-none px-2 py-1"
                  />
                </div>

                {/*Icon*/}
                <div className="flex items-center justify-between">
    
                  <div className="flex items-center gap-1">
                    {/*File icon*/}
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className="p-2.5 text-gray-600 hover:bg-gray-200 rounded-full transition-colors"
                      title="Đính kèm file"
                    >
                      <FiPaperclip size={20} />
                    </button>
                    {/*Record icon*/}
                    <button
                      type="button"
                      onClick={startRecording}
                      className="p-2.5 text-gray-600 hover:bg-gray-200 rounded-full transition-colors"
                      title="Ghi âm giọng nói"
                    >
                      <FaMicrophone size={18} />
                    </button>
                  </div>

                  {/*Submit button*/}
                  <div>
                    <button
                      type="submit"
                      disabled={!message.trim() && !file}
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all
                        ${(message.trim() || file) 
                          ? 'bg-orange-500 text-white shadow-md hover:scale-105' 
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
                      `}
                    >
                      <FaPaperPlane size={16} className="ml-0.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Display file/record*/}
          {file && !isRecording && (
            <div className="mt-3 flex items-center gap-3 bg-gray-50 border border-gray-200 w-fit px-4 py-2 rounded-xl animate-in fade-in slide-in-from-bottom-2">
              <div className="bg-orange-100 p-2 rounded-lg text-orange-600">
                <FiFile size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-gray-700 max-w-[200px] truncate">{file.name}</span>
                <span className="text-[10px] text-gray-400">{(file.size / 1024).toFixed(1)} KB</span>
              </div>
              <button 
                type="button" 
                onClick={() => {
                  setFile(null);
                  if (fileRef.current) fileRef.current.value = ""; //Reset
                }} 
                className="ml-2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <FaTrash size={14}/>
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}