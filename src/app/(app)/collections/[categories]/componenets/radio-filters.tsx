"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { SORT_OPTIONS, useSort } from "@/hooks/use-sort-products"

export function RadioFilters() {
  const { setSortOption, currentSort } = useSort()

  return (
    <RadioGroup
      value={currentSort}
      onValueChange={(value) =>
        setSortOption(value as keyof typeof SORT_OPTIONS)
      }
      className="my-2 flex flex-col gap-6"
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value={SORT_OPTIONS.PRICE_ASC} id="option-1" />
        <Label className="cursor-pointer" htmlFor="option-1">
          Prix : Du plus bas au plus haut
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value={SORT_OPTIONS.PRICE_DESC} id="option-2" />
        <Label className="cursor-pointer" htmlFor="option-2">
          Prix : Du plus élevé au plus bas
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value={SORT_OPTIONS.RELEVANCE} id="option-3" />
        <Label className="cursor-pointer" htmlFor="option-3">
          Pertinence
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value={SORT_OPTIONS.NEWEST} id="option-4" />
        <Label className="cursor-pointer" htmlFor="option-4">
          Le plus récent
        </Label>
      </div>
    </RadioGroup>
  )
}
