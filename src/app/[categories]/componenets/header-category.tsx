interface HeaderCategoryProps {
  title: string;
  description: string;
  numberOfProducts: number;
}

export default function HeaderCategory({
  title,
  description,
  numberOfProducts,
}: HeaderCategoryProps) {
  return (
    <header className="mt-6 flex flex-col gap-4 px-4">
      <div className="flex flex-col">
        <h1 className="font-bold text-xl">{title}</h1>
        <p>{numberOfProducts} produits</p>
      </div>
      <p className="text-pretty text-zinc-500">{description}</p>
    </header>
  );
}
