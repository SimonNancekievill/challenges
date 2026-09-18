import { DeliveryRequest } from "@/lib/services/deliveriesService";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DeliveryList(delivery: DeliveryRequest) {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0 my-4 pt-4">
      <CardHeader>
        <CardAction>
          <Badge variant="secondary" className="text-[10px]">
            {delivery.status}
          </Badge>
        </CardAction>
        <CardTitle className="font-areal">
          {delivery.pickup} to {delivery.destination}
        </CardTitle>
        <CardDescription className="font-areal">
          Delivery request to deliver from {delivery.pickup} to{" "}
          {delivery.destination}.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <p className="text-[10px]">Unique delivery ID: {delivery.id}</p>
      </CardFooter>
    </Card>
  );
}
