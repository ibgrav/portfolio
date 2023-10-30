import { getRequestListener } from "@hono/node-server";
import { createServer as createViteServer } from "vite";
import { createServer as createHttpServer } from "http";
import type * as AppModule from "../../src/server/server";

const entry = "src/render/render.client.tsx";

const vite = await createViteServer({
  server: { middlewareMode: true },
  appType: "custom"
});

vite.middlewares.use(async function (req, res) {
  const { createServer } = (await vite.ssrLoadModule("src/server/server.ts")) as typeof AppModule;

  const server = createServer({
    manifest: { [entry]: { file: entry } }
  });

  const listener = getRequestListener(async (request) => {
    let bindings = {};

    return await server.fetch(request, bindings, {
      waitUntil: async (fn) => fn,
      passThroughOnException: () => {
        throw new Error("`passThroughOnException` is not supported");
      }
    });
  });

  listener(req, res);
});

const port = parseInt(process.env.PORT || "8787");

createHttpServer(vite.middlewares).listen(port, "0.0.0.0", () => {
  console.log(`http://127.0.0.1:${port}/`);
});
