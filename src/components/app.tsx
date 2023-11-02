import "./app.scss";

import { Suspense } from "react";
import { useComponent } from "../component";

export function App() {
  const Button = useComponent("button");

  return (
    <main>
      <h1>Hello, World!</h1>
      <Suspense>
        <Button initialCount={6} />
      </Suspense>
    </main>
  );
}
