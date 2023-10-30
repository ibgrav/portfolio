import { Hono } from "hono";
import type { Manifest } from "vite";
import type { ApiGatewayRequestContext } from "hono/aws-lambda";
import { document } from "./document";

type Bindings = {
  requestContext?: ApiGatewayRequestContext;
};

interface ServerProps {
  manifest: Manifest;
}

export function createServer({ manifest }: ServerProps) {
  const server = new Hono<{ Bindings: Bindings }>();

  server.get("/debug", (c) => c.json(c));

  server.get("/", (c) => c.html(document(manifest)));

  return server;
}
