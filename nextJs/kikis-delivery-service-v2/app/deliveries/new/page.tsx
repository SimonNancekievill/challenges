import { Label } from "@/components/ui/label";
import addDelivery from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function NewDeliveryPage() {
  return (
    <form action={addDelivery}>
      <div className="grid gap-1">
        <Label htmlFor="pickup">Pickup</Label>
        <Input id="pickup" name="pickup" placeholder="Backery" />
      </div>
      <div className="grid gap-1">
        <Label htmlFor="destination">Destination</Label>
        <Input id="destination" name="destination" placeholder="Office" />
      </div>
      <Button type="submit" variant="brand">
        Create request
      </Button>
    </form>
  );
}
