# AI Multi-Agent Support System

## Tech Stack
- Backend: Hono + TypeScript
- Database: PostgreSQL (Supabase)
- ORM: Prisma
- Architecture: Multi-agent routing system
- Features:
  - Conversation memory
  - Tool-based DB queries
  - Streaming responses
  - Error middleware
  - Health check API
  - Basic frontend UI

## Agents
- Router Agent
- Order Agent
- Billing Agent
- Support Agent
- FAQ Agent

## API Endpoints
POST /api/chat  
GET /api/agents  
GET /api/agents/:type/capabilities  
GET /api/conversations  
GET /api/health  

## How to Run

```bash
cd backend
npm install
npm run dev