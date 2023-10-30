import { createRoot, hydrateRoot } from "react-dom/client";
import { render } from "./render";

const root = document.getElementById("root")!;

createRoot(root).render(render());
