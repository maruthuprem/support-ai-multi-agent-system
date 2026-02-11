import { prisma } from "../db/prisma.js";
import type { AgentResponse } from "../types/agent.types.js";

export const supportAgent = async (
  message: string,
  conversationId: string
): Promise<AgentResponse> => {

  const msg = message.toLowerCase();

  const history = await prisma.message.findMany({
    where: { conversationId },
    orderBy: { createdAt: "asc" },
  });

  const userMessages = history.filter((m: { role: string; }) => m.role === "user");
  const previousMessage =
    userMessages.length > 1
      ? userMessages[userMessages.length - 2].content.toLowerCase()
      : "";

  if (previousMessage.includes("payment") && msg.includes("refund")) {
    return {
      agent: "support",
      text: "I see you were asking about a payment earlier. Do you want a refund for that transaction?",
    };
  }

  if (previousMessage.includes("order") && msg.includes("late")) {
    return {
      agent: "support",
      text: "Your previous message was about an order. Let me check the delivery delay for you.",
    };
  }

  if (msg.includes("password")) {
    return {
      agent: "support",
      text: "You can reset your password using 'Forgot Password' on the login page.",
    };
  }

  if (msg.includes("not working") || msg.includes("issue")) {
    return {
      agent: "support",
      text: "Sorry you're facing issues. Try restarting the app. If the issue continues, contact support@company.com.",
    };
  }

  if (msg.includes("hours") || msg.includes("time")) {
    return {
      agent: "support",
      text: "Our support team is available Monday–Friday, 9 AM – 6 PM.",
    };
  }

  return {
    agent: "support",
    text: "I'm here to help! Could you please explain your issue in more detail?",
  };
};