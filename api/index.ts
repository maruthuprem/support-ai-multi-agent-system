import { Hono } from "hono";
import chatRoutes from "../src/routes/chat.routes.js";
import conversationRoutes from "../src/routes/conversation.routes.js";
import agentsRoutes from "../src/routes/agents.routes.js";

const app = new Hono();

app.onError((err, c) => {
  console.error("Error:", err);
  return c.json({ error: "Something went wrong", message: err.message }, 500);
});

app.notFound((c) => c.json({ error: "Route not found" }, 404));

app.route("/api/chat", chatRoutes);
app.route("/api/conversations", conversationRoutes);
app.route("/api/agents", agentsRoutes);

app.get("/api/health", (c) => c.json({ status: "ok" }));

export default app;