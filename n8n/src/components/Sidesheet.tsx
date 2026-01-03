import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
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

export function SideSheet({ isOpen }: { isOpen: boolean }) {
  return (
    <Sheet open={isOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add Nodes</SheetTitle>
          <SheetDescription>
            Select the nodes and add them as triggers or action to your
            worlflow.
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <Label>Node Type</Label>
          <Select>
            <SelectTrigger className="w-45">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select Node Type</SelectLabel>
                <SelectItem value="apple">Price Trigger</SelectItem>
                <SelectItem value="banana">Timer</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <SheetFooter>
          <Button type="submit">Create Node</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
