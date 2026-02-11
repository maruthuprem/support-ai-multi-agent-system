import type { AgentResponse } from "../types/agent.types.js";

export const faqAgent = async (message: string): Promise<AgentResponse> => {
  const text = message.toLowerCase();

  if (text.includes("working hours")) {
    return {
      agent: "faq",
      text: "Our support team is available 9 AM to 6 PM, Monday to Friday.",
    };
  }

  if (text.includes("contact")) {
    return {
      agent: "faq",
      text: "You can contact support at support@company.com.",
    };
  }

  return {
    agent: "faq",
    text: "I'm here to help! Ask about services, support, or working hours.",
  };
};