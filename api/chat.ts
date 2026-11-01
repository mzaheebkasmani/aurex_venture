import type { IncomingMessage, ServerResponse } from "http";
import { getAurexReply } from "../src/utils/aurexConsultant.js";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    const message = body.message || "";
    const history = body.history;
    const stream = body.stream || false;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required" });
    }

    const reply = getAurexReply(message, history);

    if (stream) {
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      const words = reply.split(" ");
      for (let i = 0; i < words.length; i += 3) {
        const slice = words.slice(i, i + 3).join(" ") + (i + 3 < words.length ? " " : "");
        res.write(`data: ${JSON.stringify({ text: slice })}\n\n`);
      }
      res.write("data: [DONE]\n\n");
      return res.end();
    }

    return res.status(200).json({ text: reply });
  } catch (error: any) {
    return res.status(200).json({
      text: "Hello! I am Aurex. How can I assist you with Aurex Ventures today?",
    });
  }
}
