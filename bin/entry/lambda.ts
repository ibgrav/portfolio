import { handle } from "hono/aws-lambda";
import { createServer } from "../../src/server/server";
import manifest from "../../dist/client/manifest.json";

const server = createServer({
  manifest
});

export const handler = handle(server);
