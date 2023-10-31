import * as ReactDOMServer from "react-dom/server.browser";
import type { renderToReadableStream as RenderToReadableStream } from "react-dom/server";
import { StrictMode } from "react";
import { Document } from "../components/document";
import { Manifest } from "vite";

const { renderToReadableStream } = ReactDOMServer as { renderToReadableStream: typeof RenderToReadableStream };

type RenderServerProps = {
  manifest: Manifest;
};

export async function renderServer({ manifest }: RenderServerProps) {
  const script = manifest["src/render/render.client.tsx"]?.file;

  const stream = await renderToReadableStream(
    <StrictMode>
      <Document />
    </StrictMode>,
    { bootstrapModules: script ? [script] : [] }
  );

  return new Response(stream, {
    status: 200,
    headers: { "content-type": "text/html" }
  });
}
