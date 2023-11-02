import "./button.scss";

import { useState } from "react";

export type ButtonProps = {
  initialCount: number;
};

export default function Button({ initialCount }: ButtonProps) {
  const [count, setCount] = useState(initialCount);

  return <button onClick={() => setCount((c) => ++c)}>{count}</button>;
}
