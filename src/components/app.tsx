import { useState } from "react";

export function App() {
  const [count, setCount] = useState(0);

  return (
    <main>
      <h1>Hello, World!</h1>
      <button onClick={() => setCount((c) => ++c)}>{count}</button>
    </main>
  );
}
