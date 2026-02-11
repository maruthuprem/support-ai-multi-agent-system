import { prisma } from "../db/prisma.js";
import { generateAIResponse } from "../lib/ai.js";

export async function orderAgent(userId: string) {
  const order = await prisma.order.findFirst({ where: { userId } });

  if (!order) {
    return { agent: "order", text: "No orders found for your account." };
  }

  const prompt = `
You are a customer support assistant.

Order details:
Order ID: ${order.id}
Status: ${order.status}
Tracking Number: ${order.trackingNumber}
Delivery Date: ${order.deliveryDate}

Write a helpful response for the customer.
`;

  const text = await generateAIResponse(prompt);

  return { agent: "order", text };
}