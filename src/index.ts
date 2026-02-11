import { Hono } from "hono";
import { serve } from "@hono/node-server";
import chatRoutes from "./routes/chat.routes.js";
import conversationRoutes from "./routes/conversation.routes.js";
import agentsRoutes from "./routes/agents.routes.js";
import { generateAIResponse } from "./lib/ai.js";

const app = new Hono();


app.onError((err, c) => {
  console.error("Error caught by middleware:", err);

  return c.json(
    {
      error: "Something went wrong",
      message: err.message || "Unknown error",
    },
    500
  );
});


app.notFound((c) => {
  return c.json(
    {
      error: "Route not found",
    },
    404
  );
});


app.route("/api/chat", chatRoutes);
app.route("/api/conversations", conversationRoutes);
app.route("/api/agents", agentsRoutes);

app.get("/api/health", (c) => c.json({ status: "ok" }));

app.get("/api/ai-test", async (c) => {
  const text = await generateAIResponse("Say hello like a friendly support agent.");
  return c.json({ reply: text });
});
serve({
  fetch: app.fetch,
  port: 3000,
});

console.log("Server running on http://localhost:3000");