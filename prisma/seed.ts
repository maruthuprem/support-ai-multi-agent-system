import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const userId = "demo-user";

  await prisma.order.create({
    data: {
      userId,
      status: "Shipped",
      trackingNumber: "TRK123456",
      deliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    },
  });

  await prisma.invoice.create({
    data: {
      userId,
      amount: 1999,
      status: "Paid", 
    },
  });

  await prisma.payment.create({
    data: {
      userId,
      amount: 1999,
      status: "Completed",
    },
  });

  console.log("🌱 Seed data inserted");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());