import { createServer } from 'http';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

const app = next({ dev });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  createServer(handler).listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
