import { getDeliveryById } from "@/lib/services/deliveriesService";
import { Suspense } from "react";
import Loading from "../loading";
import Link from "next/link";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default async function DeliveryDetailPage({
  params,
}: PageProps<"/deliveries/[id]">) {
  const { id } = await params;
  const delivery = await getDeliveryById(id);

  if (!delivery) {
    return (
      <>
        <h2>Delivery {id} not found.</h2>
      </>
    );
  }

  return (
    <>
      <Button variant="link" className="justify-start">
        <Link href={"/deliveries"}>Go back</Link>
      </Button>
      <Card className="relative mx-auto w-full max-w-sm pt-0 my-4 pt-4">
        <Suspense fallback={<Loading />}>
          <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
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
        </Suspense>
      </Card>
    </>
  );
}
