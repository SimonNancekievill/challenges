import { getDeliveryById } from "@/lib/services/deliveriesService";
import { Suspense } from "react";
import Loading from "../loading";
import Link from "next/link";

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
      <Suspense fallback={<Loading />}>
        <h2>Delivery {id}</h2>
        <p>
          From {delivery.pickup} to {delivery.destination}
        </p>
        <p>Status: {delivery.status}</p>
      </Suspense>
      <Link href={"/deliveries"}>Go back</Link>
    </>
  );
}
