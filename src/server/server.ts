import { Hono } from "hono/quick";
import { logger } from "hono/logger";
import type { Manifest } from "vite";
import type { ApiGatewayRequestContext } from "hono/aws-lambda";
import { renderServer } from "../render/render.server";

type Bindings = {
  manifest: Manifest;
  requestContext?: ApiGatewayRequestContext;
};

interface ServerProps {
  manifest: Manifest;
}

export function createServer({ manifest }: ServerProps) {
  const server = new Hono<{ Bindings: Bindings }>({ strict: false });

  server.use("*", logger());

  server.get("/debug", (ctx) => ctx.json(ctx));

  server.get("*", () => renderServer({ manifest }));

  return server;
}
