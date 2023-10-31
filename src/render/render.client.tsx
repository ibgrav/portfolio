import { hydrateRoot } from "react-dom/client";
import { StrictMode } from "react";
import { Document } from "../components/document";

hydrateRoot(
  document,
  <StrictMode>
    <Document />
  </StrictMode>
);
