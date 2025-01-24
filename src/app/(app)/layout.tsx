import Header from "@/components/layout/header";
import { Usp } from "@/components/layout/usp";

export default function LayoutWithHeader({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <Usp />
      {children}
    </div>
  );
}
