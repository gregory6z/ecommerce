import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Metafield {
  namespace: string;
  key: MetafieldKey;
  value: string;
}

const ORDER = [
  "details",
  "ingredients",
  "how_to",
  "earth_conscious_details",
] as const;

type MetafieldKey = (typeof ORDER)[number];

interface RichTextAccordionProps {
  metafields: Metafield[];
}

const TRANSLATIONS = {
  details: "DÉTAILS",
  ingredients: "INGRÉDIENTS",
  how_to: "MODE D'EMPLOI",
  earth_conscious_details: "DÉTAILS ÉCO-RESPONSABLES",
};

export function RichTextAccordion({ metafields }: RichTextAccordionProps) {
  return (
    <Accordion
      type="multiple"
      defaultValue={["details"]}
      className="w-full border-t lg:mt-10"
    >
      {ORDER.map((key) => {
        const metafield = metafields.find((m) => m.key === key);

        if (!metafield) {
          return null;
        }

        return (
          <AccordionItem
            key={metafield.key}
            value={metafield.key}
            className="py-2"
          >
            <AccordionTrigger className="font-semibold text-lg ">
              {TRANSLATIONS[metafield.key]}
            </AccordionTrigger>
            <AccordionContent>
              <div className="my-6 space-y-4">
                {JSON.parse(metafield.value).children.map(
                  (
                    paragraph: {
                      children: {
                        type: string;
                        value: string;
                        bold?: boolean;
                      }[];
                    },
                    pIndex: number,
                  ) => (
                    <p
                      key={`paragraph-${pIndex}-${paragraph.children.map((child) => child.value).join("")}`}
                    >
                      {paragraph.children.map(
                        (
                          text: { type: string; value: string; bold?: boolean },
                          tIndex: number,
                        ) =>
                          text.type === "text" && text.bold ? (
                            <strong key={`text-${tIndex}-${text.value}`}>
                              {text.value}
                            </strong>
                          ) : (
                            <span key={`text-${tIndex}-${text.value}`}>
                              {text.value}
                            </span>
                          ),
                      )}
                    </p>
                  ),
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
