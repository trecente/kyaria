import { Transition } from "@/components/transition";

export default function Template({ children }: { children: React.ReactNode }) {
  return <Transition>{children}</Transition>;
}
