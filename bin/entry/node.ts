import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { createServer } from "../../src/server/server";
import manifest from "../../dist/client/manifest.json";

const server = createServer({ manifest });

server.use("/assets/*", serveStatic({ root: "./" }));

const port = parseInt(process.env.PORT || "8787");

serve({ fetch: server.fetch, port }, () => {
  console.log(`http://127.0.0.1:${port}/`);
});
