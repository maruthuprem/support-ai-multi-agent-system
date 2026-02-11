import { prisma } from "../db/prisma.js";
import { routerAgent } from "../agents/router.agent.js";

interface ChatInput {
  message: string;
  conversationId?: string;
  userId?: string;
}

export const handleChat = async ({ message, conversationId, userId }: ChatInput) => {
  let convoId: string;  


  if (!conversationId) {
    const convo = await prisma.conversation.create({
      data: {
        userId: userId || "demo-user",
      },
    });

    convoId = convo.id;   
  }
else {
    convoId = conversationId;
  }
  await prisma.message.create({
    data: {
      conversationId: convoId,
      role: "user",
      content: message,
    },
  });

  const agentReply = await routerAgent(message, convoId, userId || "demo-user");

  await prisma.message.create({
    data: {
      conversationId: convoId,
      role: "agent",
      agentType: agentReply.agent,
      content: agentReply.text,
    },
  });

  return {
    conversationId: convoId,
    reply: agentReply.text,
  };
};


export const getAllConversations = async () => {
  return prisma.conversation.findMany({
    orderBy: { createdAt: "desc" },
  });
};

export const getConversationById = async (id: string) => {
  return prisma.conversation.findUnique({
    where: { id },
    include: { messages: true },
  });
};

export const deleteConversationById = async (id: string) => {
  await prisma.message.deleteMany({
    where: { conversationId: id },
  });

  
  return prisma.conversation.delete({
    where: { id },
  });
};