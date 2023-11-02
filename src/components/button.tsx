import "./button.scss";

import { useState } from "react";

export default function Button() {
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount((c) => ++c)}>{count}</button>;
}
