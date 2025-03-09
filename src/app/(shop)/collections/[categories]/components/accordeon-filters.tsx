import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@radix-ui/react-accordion";
import { RadioFilters } from "./radio-filters";

export function AccordionFilters() {
  return (
    <Accordion
      type="multiple"
      defaultValue={["item-1"]}
      className="flex w-full flex-col "
    >
      <AccordionItem
        value="item-1"
        className="w-full border-zinc-200 border-b py-6 "
      >
        <AccordionTrigger className="font-bold uppercase">
          trier par
        </AccordionTrigger>
        <AccordionContent className="mt-6">
          <RadioFilters />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem
        value="item-2"
        className="w-full border-zinc-200 border-b py-6"
      >
        <AccordionTrigger className="font-bold uppercase">
          Type de produit
        </AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem
        value="item-3"
        className="w-full border-zinc-200 border-b py-6"
      >
        <AccordionTrigger className="font-bold uppercase">
          caractéristiques
        </AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem
        value="item-4"
        className="w-full border-zinc-200 border-b py-6"
      >
        <AccordionTrigger className="font-bold uppercase">
          prix
        </AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
