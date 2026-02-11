import { Hono } from "hono";

const agentsRoutes = new Hono();

agentsRoutes.get("/", (c) => {
  return c.json([
    { type: "support" },
    { type: "order" },
    { type: "billing" },
    { type: "faq" },
  ]);
});

agentsRoutes.get("/:type/capabilities", (c) => {
  const type = c.req.param("type");

  const capabilities: Record<string, string[]> = {
    support: [
      "password reset help",
      "app issues",
      "working hours info",
      "general troubleshooting",
    ],
    order: [
      "track order",
      "delivery status",
      "shipping information",
    ],
    billing: [
      "payment status",
      "refund requests",
      "invoice information",
    ],
    faq: [
      "contact information",
      "working hours",
      "general questions",
    ],
  };

  return c.json({
    type,
    capabilities: capabilities[type] || [],
  });
});

export default agentsRoutes;