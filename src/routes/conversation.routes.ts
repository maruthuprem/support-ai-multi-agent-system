import { Hono } from "hono";
import { getAllConversations, getConversationById, deleteConversationById } from "../services/chat.service.js";

const conversationRoutes = new Hono();

conversationRoutes.get("/", async (c) => {
  const data = await getAllConversations();
  return c.json(data);
});

conversationRoutes.get("/:id", async (c) => {
  const id = c.req.param("id");
  const convo = await getConversationById(id);

  if (!convo) {
    return c.json({ error: "Conversation not found" }, 404);
  }

  return c.json(convo);
});

conversationRoutes.delete("/:id", async (c) => {
  const id = c.req.param("id");
  await deleteConversationById(id);
  return c.json({ message: "Conversation deleted" });
});

export default conversationRoutes;