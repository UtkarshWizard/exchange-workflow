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
import type { emailMetadata, Node, NodeMetadata, numberMetadata } from "@/types/types";
import { useState } from "react";

const SUPPORTED_ACTIONS = [
  {
    id: "email",
    title: "Email Notification",
    description: "Send a notification on Email",
  },
  {
    id: "whatsapp",
    title: "Whatsapp",
    description: "Send a notification on Whatsapp",
  },
  {
    id: "report",
    title: "Ai Report",
    description: "Generate a Report",
  },
];

export function ActionSheet({
  onSelect,
}: {
  onSelect: (type: Node, metaData: NodeMetadata) => void;
}) {
  const [metaData, setMetaData] = useState<emailMetadata | numberMetadata>({
    email: "example@gmail.com",
    number: "9012345678"
  });
  const [selectedAction, setSelectedAction] = useState(
    SUPPORTED_ACTIONS[0].id
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
            value={selectedAction}
            onValueChange={(value) => setSelectedAction(value)}
          >
            <SelectTrigger className="w-45">
              <SelectValue placeholder="Select a Trigger" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select Node Type</SelectLabel>
                {SUPPORTED_ACTIONS.map(({ id, title }) => (
                  <SelectItem key={id} value={id}>
                    {title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {selectedAction === "email" && (
          <div className="flex flex-col w-full p-4 gap-4">
            <Label>Enter the email</Label>
            <Input placeholder="johndoe@gmail.com" onChange={(e) => { metaData => ({
              ...metaData,
              email: e.target.value
            })}}></Input>
          </div>
        )}
        { selectedAction === "whatsapp" && (
          <div className="flex flex-col gap-4 p-4">
            <Label>Enter your Whatsapp number</Label>
            <Input placeholder="9012345678" onChange={(e) => setMetaData( metaData => ({
              ...metaData,
              number: e.target.value
            }))}></Input>
          </div>
        )}
        {selectedAction === "report" && (
          <div className="flex flex-col gap-4 p-4">
          </div>
        )}
        <SheetFooter>
          <Button
            onClick={() => {
              onSelect(selectedAction, metaData);
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
