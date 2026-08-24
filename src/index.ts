import { Elysia } from 'elysia';
import { db } from './db';
import { users } from './db/schema';

const app = new Elysia()
  .get('/', () => ({
    message: 'Hello from ElysiaJS + Drizzle + MySQL on Bun!',
    status: 'online',
    timestamp: new Date().toISOString(),
  }))
  .get('/health', () => ({
    status: 'healthy',
  }))
  .get('/users', async ({ set }) => {
    try {
      const allUsers = await db.select().from(users);
      return {
        success: true,
        data: allUsers,
      };
    } catch (error: any) {
      set.status = 500;
      return {
        success: false,
        message: 'Database query failed or database is not running.',
        error: error.message,
      };
    }
  })
  .listen(process.env.PORT || 3000);

console.log(`🦊 Elysia server is running at ${app.server?.hostname}:${app.server?.port}`);

export type App = typeof app;
