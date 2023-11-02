import { ReactNode } from "react";
import { App } from "../components/app";
import { Manifest } from "vite";

type DocumentProps = {
  manifest: Manifest;
  children?: ReactNode;
};

export function Document({ manifest }: DocumentProps) {
  let styles: string[] = [];

  // Object.values(manifest).forEach(file => {
  //   file.isDynamicEntry
  // })

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Isaac Graves</title>
      </head>
      <body>
        <App />
      </body>
    </html>
  );
}
