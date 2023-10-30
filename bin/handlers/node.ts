import { serve } from "@hono/node-server";
import { app } from "../../src/server/server.js";

const port = parseInt(process.env.PORT || "8787");

serve({ fetch: app.fetch, port }, () => console.log(`http://127.0.0.1:${port}/`));
