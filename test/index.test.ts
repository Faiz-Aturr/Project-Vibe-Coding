import { describe, expect, it } from 'bun:test';
import { Elysia } from 'elysia';

describe('Elysia Server Setup', () => {
  it('returns welcome message from GET /', async () => {
    const app = new Elysia()
      .get('/', () => ({
        message: 'Hello from ElysiaJS + Drizzle + MySQL on Bun!',
        status: 'online',
      }));

    const response = (await app
      .handle(new Request('http://localhost/'))
      .then((res) => res.json())) as { status: string; message: string };

    expect(response.status).toBe('online');
    expect(response.message).toContain('ElysiaJS');
  });
});
