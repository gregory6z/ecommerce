"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCart } from "@/hooks/use-cart";

interface QuantityComboBoxProps {
  quantity: number;
  lineId: string;
}

export function QuantityComboBox({ quantity, lineId }: QuantityComboBoxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<number>(quantity);

  const { updateQuantity } = useCart();

  React.useEffect(() => {
    setValue(quantity);
  }, [quantity]);

  const handleQuantityChange = (newQuantity: number) => {
    setValue(newQuantity);
    setOpen(false);

    updateQuantity.mutate({
      lineId,
      quantity: newQuantity,
    });
  };

  const quantities = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          // biome-ignore lint/a11y/useSemanticElements: <explanation>
          role="combobox"
          aria-expanded={open}
          className="justify-between"
        >
          {`Qte: ${value}`}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Command>
          <CommandList className="max-h-none">
            <CommandGroup>
              {quantities.map((item) => (
                <CommandItem
                  key={item}
                  value={item.toString()}
                  onSelect={() => handleQuantityChange(item)}
                  className="px-4 py-2" // Adjust the padding as needed
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {item}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
