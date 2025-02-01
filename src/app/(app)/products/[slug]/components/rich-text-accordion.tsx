import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface TextNode {
  type: "text";
  value: string;
  bold?: boolean;
}

interface ParagraphNode {
  type: "paragraph";
  children: TextNode[];
}

interface RootNode {
  type: "root";
  children: ParagraphNode[];
}

interface Metafield {
  namespace: string;
  key: string;
  value: string;
}

interface RichTextAccordionProps {
  metafields: Metafield[];
}
const TRANSLATIONS = {
  details: "DÉTAILS",
  ingredients: "INGRÉDIENTS",
  how_to: "MODE D'EMPLOI",
  earth_conscious_details: "DÉTAILS ÉCO-RESPONSABLES",
};

const ORDER = ["details", "ingredients", "how_to", "earth_conscious_details"];

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
              {TRANSLATIONS[metafield.key as keyof typeof TRANSLATIONS]}
            </AccordionTrigger>
            <AccordionContent>
              <div className="my-6 space-y-4">
                {JSON.parse(metafield.value).children.map(
                  (paragraph: ParagraphNode, pIndex: number) => (
                    <p
                      key={`paragraph-${pIndex}-${paragraph.children.map((child) => child.value).join("")}`}
                    >
                      {paragraph.children.map(
                        (text: TextNode, tIndex: number) =>
                          text.bold ? (
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
