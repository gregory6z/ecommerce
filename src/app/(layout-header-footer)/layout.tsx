import Header from "@/components/layout/header";

export default function LayoutWithHeader({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
