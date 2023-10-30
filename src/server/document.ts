import { Manifest } from "vite";

const entry = "src/render/render.client.tsx";

export function document(manifest: Manifest) {
  const script = manifest[entry]?.file;

  return `<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Isaac Graves</title>
    </head>
    <body>
        <div id="root"></div>
        <script src="${script}" type="module"></script>
    </body>
</html>`;
}
