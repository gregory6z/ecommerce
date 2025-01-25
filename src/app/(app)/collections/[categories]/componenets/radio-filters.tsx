import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function RadioFilters() {
  return (
    <RadioGroup defaultValue="option-3" className="my-2 flex flex-col gap-6">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-1" id="option-1" />
        <Label htmlFor="option-1">Prix : Du plus bas au plus haut</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-2" id="option-2" />
        <Label htmlFor="option-2">Prix : Du plus élevé au plus bas</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-3" id="option-3" />
        <Label htmlFor="option-3">Pertinence</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-4" id="option-4" />
        <Label htmlFor="option-4">Le plus récent</Label>
      </div>
    </RadioGroup>
  );
}
