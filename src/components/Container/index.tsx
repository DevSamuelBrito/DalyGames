import { ReactNode } from "react";
export function Container({ children }: { children: ReactNode }) {
  return <div className="max-w-screen-xl mx-auto px-2">{children}</div>;
}
