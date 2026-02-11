import type { AgentResponse } from "../types/agent.types.js";
import { billingAgent } from "./billing.agent.js";
import { faqAgent } from "./faq.agent.js";
import { orderAgent } from "./order.agent.js";
import { supportAgent } from "./support.agent.js";

export const routerAgent = async (
  message: string,
  conversationId: string,
  userId?: string
): Promise<AgentResponse> => {
  const msg = message.toLowerCase();

  if (msg.includes("order") || msg.includes("track")) {
    return orderAgent(message, userId || "demo-user");
  }

  if (msg.includes("payment") || msg.includes("refund") || msg.includes("invoice")) {
    return billingAgent(message, userId || "demo-user");
  }

  if (msg.includes("app") || msg.includes("issue") || msg.includes("not working")) {
    return supportAgent(message, conversationId);
  }

  return faqAgent(message);
};