"use client";

import { useState, useRef } from "react";
import { 
  Mic, 
  SendHorizontal, 
  Square, 
  X,
  FileText
} from "lucide-react";
import { BsPaperclip } from "react-icons/bs";

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
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      
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
        stream.getTracks().forEach(track => track.stop());
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
      <div className="max-w-4xl mx-auto p-4">
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
                  <Square size={14} />
                </button>
              </div>
            ) : (
              /* Input interface*/
              <div className="flex flex-col w-full bg-gray-200 rounded-3xl px-6 py-4 shadow-sm">
                
                {/*Input*/}
                <div className="w-full">
                  <textarea
                    rows={2}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Hỏi bất kỳ điều gì..."
                    className="w-full bg-transparent border-none focus:outline-none text-[#1b2559] placeholder-[#718096] resize-none"
                  />
                  {/* Display file/record*/}
                    {file && !isRecording && (
                      <div className="mt-3 flex items-center gap-3 bg-gray-50 border border-gray-200 w-fit px-4 py-2 rounded-xl animate-in fade-in slide-in-from-bottom-2">
                        <div className="bg-orange-100 p-2 rounded-lg text-orange-600">
                          <FileText size={18} />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold text-gray-700 max-w-50 truncate">{file.name}</span>
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
                          <X size={14}/>
                        </button>
                      </div>
                    )}
                </div>

                {/*Icon*/}
                <div className="flex items-center justify-between">
    
                  <div className="flex items-center gap-1">
                    {/*File icon*/}
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className="w-11 h-11 rounded-full border border-gray-300 flex items-center justify-center transition-all
                                bg-gray-200 text-[#1b2559] shadow-md hover:scale-105"
                      title="Đính kèm file"
                    >
                      <BsPaperclip size={20}/>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    {/*Record icon*/}
                    <button
                      type="button"
                      onClick={startRecording}
                      className="w-11 h-11 rounded-full border border-gray-300 flex items-center justify-center transition-all
                                bg-gray-200 text-[#1b2559] hover:scale-105"
                      title="Ghi âm giọng nói"
                    >
                      <Mic size={20} strokeWidth={2.5}/>
                    </button>
                    {/*Submit button*/}
                    <button
                      type="submit"
                      disabled={!message.trim() && !file}
                      className={`w-11 h-11 rounded-full flex items-center justify-center transition-all
                           bg-orange-500 text-white shadow-md hover:scale-105`}
                    >
                      <SendHorizontal size={14} strokeWidth={2.5} fill="#ffffff" className="ml-0.5" />
                    </button>
                  </div>
                </div>
                
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}