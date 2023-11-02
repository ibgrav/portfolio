import { hydrateRoot } from "react-dom/client";
import { StrictMode } from "react";
import { Document } from "./document";
import { ComponentProvider } from "../component";

const used: string[] = [];

hydrateRoot(
  document,
  <StrictMode>
    <ComponentProvider used={used}>
      <Document manifest={{}} />
    </ComponentProvider>
  </StrictMode>
);
