import { prisma } from "../db/prisma.js";
import { generateAIResponse } from "../lib/ai.js";

export async function billingAgent(userId: string) {
  const invoice = await prisma.invoice.findFirst({
    where: { userId },
    orderBy: { createdAt: "desc" }
  });

  if (!invoice) {
    return { agent: "billing", text: "No payment records found for your account." };
  }

  const prompt = `
You are a billing support assistant.

Invoice details:
Invoice ID: ${invoice.id}
Amount: ₹${invoice.amount}
Status: ${invoice.status}

Explain the payment status clearly and politely.
`;

  const text = await generateAIResponse(prompt);

  return { agent: "billing", text };
}