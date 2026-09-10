import { getDeliveryById } from "@/lib/services/deliveriesService";
import { Suspense } from "react";
import Loading from "../loading";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
    <Card>
      <Suspense fallback={<Loading />}>
        <CardHeader>
          <CardTitle>Delivery {id}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            From {delivery.pickup} to {delivery.destination}
          </p>
          <p>Status: {delivery.status}</p>
        </CardContent>
      </Suspense>
      <Button variant="link" className="justify-start">
        <Link href={"/deliveries"}>Go back</Link>
      </Button>
    </Card>
  );
}
