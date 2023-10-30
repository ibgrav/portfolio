import { handle } from "hono/aws-lambda";
import { app } from "../../src/server/server.js";

export const handler = handle(app);
