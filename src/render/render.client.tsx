import { hydrateRoot } from "react-dom/client";
import { render } from "./render";

const root = document.getElementById("root")!;

hydrateRoot(root, render());
