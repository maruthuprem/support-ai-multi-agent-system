import type { Context } from "hono";
import { handleChat } from "../services/chat.service.js";
import { getAllConversations } from "../services/chat.service.js";
import { getConversationById } from "../services/chat.service.js";
import { deleteConversationById } from "../services/chat.service.js";

export const sendMessage = async (c: Context) => {
  try {
    const body = await c.req.json();
    const { message, conversationId, userId } = body;

    if (!message) {
      return c.json({ error: "Message is required" }, 400);
    }

    const response = await handleChat({ message, conversationId, userId });

    return c.json(response);
  } catch (err) {
    console.error("SEND MESSAGE ERROR:", err);
    return c.json({ error: "Internal Server Error" }, 500);
  }
};

export const listConversations = async (c: Context) => {
  try {
    const conversations = await getAllConversations();
    return c.json(conversations);
  } catch (err) {
    console.error(err);
    return c.json({ error: "Failed to fetch conversations" }, 500);
  }
};

export const getConversation = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const conversation = await getConversationById(id);

    if (!conversation) {
      return c.json({ error: "Conversation not found" }, 404);
    }

    return c.json(conversation);
  } catch (err) {
    console.error(err);
    return c.json({ error: "Failed to fetch conversation" }, 500);
  }
};

export const deleteConversation = async (c: Context) => {
  try {
    const id = c.req.param("id");
    await deleteConversationById(id);
    return c.json({ message: "Conversation deleted" });
  } catch (err) {
    console.error(err);
    return c.json({ error: "Failed to delete conversation" }, 500);
  }
};

export { handleChat };
