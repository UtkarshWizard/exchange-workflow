import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Node, NodeMetadata, PriceMetaData, TimerMetaData } from "@/types/types";
import { useState } from "react";

const SUPPORTED_TRIGGERS = [
  {
    id: "price-trigger",
    title: "Price Trigger",
    description: "Add a price trigger",
  },
  {
    id: "timer",
    title: "Timer",
    description: "Add a Timer to trigger workflow",
  },
];

const SUPPORTED_ASSETS = [
  {
    id: "nifty50",
    title: "Nifty 50",
  },
  {
    id: "goldbees",
    title: "GoldBees",
  },
];

export function ActionSheet({
  onSelect,
}: {
  onSelect: (type: Node, metaData: NodeMetadata) => void;
}) {
  const [metaData, setMetaData] = useState<PriceMetaData | TimerMetaData>({
    time: 60,
    asset: "Nifty 50",
    price: 20000
  });
  const [selectedTrigger, setSelectedTrigger] = useState(
    SUPPORTED_TRIGGERS[0].id
  );
  const [selectedAsset, setSelectedAsset] = useState(
    SUPPORTED_ASSETS[0].id
  );

  return (
    <Sheet open={true}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add Nodes</SheetTitle>
          <SheetDescription>
            Select a action to add to the workflow.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 px-4">
          <Label>Select Action Type</Label>
          <Select
            value={selectedTrigger}
            onValueChange={(value) => setSelectedTrigger(value)}
          >
            <SelectTrigger className="w-45">
              <SelectValue placeholder="Select a Trigger" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select Node Type</SelectLabel>
                {SUPPORTED_TRIGGERS.map(({ id, title }) => (
                  <SelectItem key={id} value={id}>
                    {title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {selectedTrigger === "price-trigger" ? (
          <div className="flex flex-col w-full p-4 gap-4">
            <Label>Select Asset</Label>
            <Select
              value={selectedAsset}
              onValueChange={(value) => { 
                setSelectedAsset(value);
                setMetaData((metaData) => ({
                  ...metaData,
                  asset: SUPPORTED_ASSETS.find((a) => a.id === value)?.title ?? value
                }))
              }}
            >
              <SelectTrigger className="w-45">
                <SelectValue placeholder="Select a Trigger" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select Asset</SelectLabel>
                  {SUPPORTED_ASSETS.map(({ id, title }) => (
                    <SelectItem key={id} value={id} >
                      {title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Label>Set the Price</Label>
            <Input placeholder="Set the price" onChange={(e) => setMetaData(metaData => ({
              ...metaData,
              price: Number(e.target.value)
            }))} ></Input>

          </div>
        ) : (
          <div className="flex flex-col gap-4 p-4">
            <Label>Set the time</Label>
            <Input placeholder="Set the time in seconds" type="number" min="0" onChange={(e) => setMetaData( metaData => ({
              ...metaData,
              time: Number(e.target.value)
            }))}></Input>
          </div>
        )}
        <SheetFooter>
          <Button
            onClick={() => {
              onSelect(selectedTrigger, metaData);
            }}
            type="submit"
          >
            Create Action
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
