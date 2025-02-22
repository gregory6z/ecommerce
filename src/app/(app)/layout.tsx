import Header from "@/components/layout/header"
import { HeaderWrapper } from "@/components/layout/header/header-wrapper"
import { Usp } from "@/components/layout/usp"

export default function LayoutWithHeader({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <div className="sticky top-0 z-50 block xl:hidden">
        <HeaderWrapper>
          <Header />
        </HeaderWrapper>
      </div>
      <div className="sticky top-0 z-50 hidden xl:block">
        <Header />
      </div>

      <Usp />
      {children}
    </div>
  )
}
