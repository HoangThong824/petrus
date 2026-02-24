import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const text = (formData.get("text") as string) || "";
    const file = formData.get("file") as File | null;

    let finalUserContent: any = text;

    if (file) {
      if (file.type.startsWith("audio/")) {
        // --- XỬ LÝ VOICE (Whisper) ---
        // OpenAI yêu cầu gửi File object trực tiếp hoặc fs.ReadStream
        // Với FormData từ web, ta có thể gửi trực tiếp File object này vào API
        const transcription = await client.audio.transcriptions.create({
          file: file,
          model: "whisper-1",
        });

        // Nối văn bản người dùng nhập (nếu có) với văn bản voice
        const transcribedText = transcription.text;
        finalUserContent = text
          ? `${text}\n[Giọng nói chuyển thành văn bản]: ${transcribedText}`
          : transcribedText;
      } else if (file.type.startsWith("image/")) {
        // --- XỬ LÝ ẢNH (Vision) ---
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64Image = buffer.toString("base64");
        const dataUrl = `data:${file.type};base64,${base64Image}`;

        finalUserContent = [
          { type: "text", text: text || "Hãy mô tả hình ảnh này." },
          {
            type: "image_url",
            image_url: {
              url: dataUrl,
            },
          },
        ];
      }
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Bạn là Pek – trợ lý học tập thân thiện." },
        { role: "user", content: finalUserContent },
      ],
    });

    return NextResponse.json({
      reply: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "Đã có lỗi xảy ra khi xử lý yêu cầu." },
      { status: 500 }
    );
  }
}
