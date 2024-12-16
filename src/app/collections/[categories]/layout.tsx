import BannerCategory from "./componenets/banner-category";
import HeaderCategory from "./componenets/header-category";

export default function LayoutCategories({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <BannerCategory />
      <HeaderCategory
        title={"SKIN CARE"}
        description={
          "Discover our premium skincare collection for a radiant, healthy complexion"
        }
        numberOfProducts={15}
      />
      {children}
    </div>
  );
}
