import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { GoogleGenAI, ThinkingLevel } from "@google/genai";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize server-side Gemini client with User-Agent as instructed by gemini-api skill
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

const SYSTEM_INSTRUCTION = `
You are "Aurex", the intelligent, high-tech, and sharp virtual consultant for Aurex Ventures (a premier corporate digital agency).

Broad Understanding (Gemini-Level Intelligence):
- You deeply understand ANY topic related to web development, coding, software architecture, AI automation, agents, LLMs, UI/UX design, Figma, branding, SEO, digital marketing, cloud hosting, e-commerce, startup scaling, timelines, budgets, and Aurex services.
- Always retain multi-turn context. If the user clarifies their project (e.g. "new website", "redesign", "e-commerce", "SaaS", "yes logo is ready"), immediately progress to tailored recommendations without ever repeating questions.

HILARIOUS ROASTING GUARDRAIL (FOR ILLOGICAL OR OFF-TOPIC QUESTIONS):
- If the user asks something completely illogical, absurd, or totally unrelated to digital technology, web development, AI, software, design, marketing, or business (for example: cooking/biryani recipes, cricket/match scores, love/dating/girlfriend advice, medical/illness diagnosis, homework math, celebrity gossip, begging for money, or keyboard gibberish):
  * DO NOT answer the off-topic query seriously!
  * Instead, deliver a witty, funny, lighthearted ROASTING-style reply!
  * Tease them playfully for asking a high-tech corporate digital agency about biryani, cricket, romance, or nonsense.
  * In Roman Urdu/Urdu: Use hilarious, witty roasting tone (e.g. "Bhai main Aurex ka AI consultant hoon, koi Bawarchi Khana ya Match commentary nahi! 😂 Agar website ya AI bot banwana hai to baat karo, warna kitchen ka rasta seedha haath par hai!").
  * In English: Use sharp, funny, sarcastic roasting (e.g. "Sir, this is Aurex Ventures—a premier digital agency, not a cooking hotline or agony aunt corner! 💀 If you want an ultra-fast website or AI automation, let's talk business. Otherwise, Google is free!").
  * End by playfully redirecting them back to Aurex Ventures' actual services (Web Development, AI Automation, Branding).

Language Policy:
- DEFAULT LANGUAGE IS ENGLISH, but if the user communicates in Roman Urdu, Urdu, Hindi, Arabic, or another language, effortlessly adapt and respond fluently in that language.
- Never sound robotic or generic. Be engaging, witty, and sharp!

Knowledge about Aurex Ventures:
- Core Mission: Transforming ideas into powerful digital experiences with AI automation, custom web development, UI/UX design, branding, and digital marketing.
- Founder & CEO: Ahmed Ali
- Key Team Members: Ali Khan (Lead UI/UX Designer), Waleed Khan (AI Automation Engineer), Mubashir (Full Stack Developer)
- Featured Portfolio Projects: Project Alpha (Fintech), Project Beta (AI/ML), Project Gamma (SaaS), Project Delta (Web3), Project Epsilon (Healthtech), Project Zeta (E-commerce).
- How to get started: Users can book a free discovery meeting using the website's booking form, or contact the team at hello@aurex.com.
`;

import { getAurexReply } from "./src/utils/aurexConsultant.js";

// AI Chatbot endpoint with high-speed response & optional SSE streaming
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history, stream: shouldStream } = req.body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ error: "Message is required" });
    }

    const trimmedMessage = message.trim();

    // Prepare instant fallback reply ready in 0ms with full multi-turn conversation history
    const instantReply = getAurexReply(trimmedMessage, history);

    // If no GEMINI_API_KEY is configured, return the instant answer immediately!
    if (!process.env.GEMINI_API_KEY) {
      if (shouldStream) {
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");
        res.flushHeaders?.();

        // Stream words rapidly for natural conversational feel
        const words = instantReply.split(" ");
        for (let i = 0; i < words.length; i += 3) {
          const slice = words.slice(i, i + 3).join(" ") + (i + 3 < words.length ? " " : "");
          res.write(`data: ${JSON.stringify({ text: slice })}\n\n`);
        }
        res.write("data: [DONE]\n\n");
        return res.end();
      }
      return res.json({ text: instantReply });
    }

    // When API key is present, format history
    const formattedContents: Array<{ role: "user" | "model"; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(history)) {
      const recentHistory = history.slice(-6);
      for (const item of recentHistory) {
        if (item && (item.role === "user" || item.role === "model") && item.text) {
          formattedContents.push({
            role: item.role,
            parts: [{ text: String(item.text) }],
          });
        }
      }
    }

    formattedContents.push({
      role: "user",
      parts: [{ text: trimmedMessage }],
    });

    // 1. Streaming response mode (tokens streamed as they generate)
    if (shouldStream) {
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");
      res.flushHeaders?.();

      let streamSucceeded = false;

      try {
        const responseStream = await Promise.race([
          ai.models.generateContentStream({
            model: "gemini-3.8-flash",
            contents: formattedContents,
            config: {
              systemInstruction: SYSTEM_INSTRUCTION,
              thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
            },
          }),
          new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error("Gemini stream timeout")), 3500)
          ),
        ]);

        for await (const chunk of responseStream) {
          if (chunk.text) {
            res.write(`data: ${JSON.stringify({ text: chunk.text })}\n\n`);
            streamSucceeded = true;
          }
        }
      } catch (streamErr: any) {
        console.warn("Primary stream had delay, serving instant reply:", streamErr?.message);
      }

      if (!streamSucceeded) {
        // Stream the instant reply
        const words = instantReply.split(" ");
        for (let i = 0; i < words.length; i += 3) {
          const slice = words.slice(i, i + 3).join(" ") + (i + 3 < words.length ? " " : "");
          res.write(`data: ${JSON.stringify({ text: slice })}\n\n`);
        }
      }

      res.write("data: [DONE]\n\n");
      return res.end();
    }

    // 2. Non-streaming fast response mode
    try {
      const response = await Promise.race([
        ai.models.generateContent({
          model: "gemini-3.8-flash",
          contents: formattedContents,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
          },
        }),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("Gemini generation timeout")), 3000)
        ),
      ]);

      if (response.text) {
        return res.json({ text: response.text });
      }
    } catch (genError: any) {
      console.warn("Gemini call fell back to instant engine:", genError?.message);
    }

    return res.json({ text: instantReply });
  } catch (error: any) {
    console.error("Chat error:", error);
    return res.json({
      text:
        "Hello! I am Aurex. How can I assist you with Aurex Ventures today? Feel free to ask about our web development, AI automation, or schedule a free discovery consultation!",
    });
  }
});

// Start server with Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.resolve(__dirname, "dist")));
    app.get("*", (_req, res) => {
      res.sendFile(path.resolve(__dirname, "dist", "index.html"));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
