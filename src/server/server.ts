import { Hono } from "hono";
import type { ApiGatewayRequestContext } from "hono/aws-lambda";

type Bindings = {
  requestContext?: ApiGatewayRequestContext;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("*", (c) => c.json(c));

export { app };
