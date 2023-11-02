import "./app.scss";

import { Suspense, lazy } from "react";

const Button = lazy(() => import("./button"));

export function App() {
  return (
    <main>
      <h1>Hello, World!</h1>
      <Suspense>
        <Button />
      </Suspense>
    </main>
  );
}
