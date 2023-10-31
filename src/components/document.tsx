import { ReactNode } from "react";
import { App } from "./app";

type DocumentProps = {
  children?: ReactNode;
};

export function Document({}: DocumentProps) {
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
