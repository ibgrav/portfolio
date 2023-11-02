import { LazyExoticComponent, PropsWithChildren, createContext, lazy, useContext } from "react";

const Components = {
  button: () => import("./components/button")
};

const Context = createContext<string[]>([]);

export function ComponentProvider({ used, children }: PropsWithChildren<{ used: string[] }>) {
  return <Context.Provider value={used}>{children}</Context.Provider>;
}

export function useComponent<K extends keyof typeof Components>(
  name: K
): LazyExoticComponent<Awaited<ReturnType<(typeof Components)[K]>>["default"]> {
  const used = useContext(Context);

  const path = Components[name].toString().split('"')[1];
  if (path) used.push(path);

  return lazy(Components[name]);
}
