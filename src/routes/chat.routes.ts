import { Hono } from "hono";
import { streamText } from "hono/streaming"; // ✅ IMPORTANT
import { handleChat } from "../controllers/chat.controller.js";

const chatRoutes = new Hono();

chatRoutes.post("/", async (c) => {
  const body = await c.req.json();
  const result = await handleChat(body);

  // 🚀 Use streaming helper
  return streamText(c, async (stream) => {
    stream.write("Analyzing your request...\n");
    await new Promise((r) => setTimeout(r, 600));

    stream.write("Connecting to agents...\n");
    await new Promise((r) => setTimeout(r, 600));

    stream.write("Fetching data...\n");
    await new Promise((r) => setTimeout(r, 600));

    stream.write(result.reply);
  });
});

export default chatRoutes;