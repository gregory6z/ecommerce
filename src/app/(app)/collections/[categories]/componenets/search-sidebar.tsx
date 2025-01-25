import { AccordionFilters } from "./accordeon-filters";

export default function SearchSidebar() {
  return (
    <div className="hidden h-screen min-w-[280px] lg:block">
      <h2 className="font-bold text-xl uppercase lg:text-xl ">
        Filtrer et trier
      </h2>
      <div className="mt-4">
        <AccordionFilters />
      </div>
    </div>
  );
}
