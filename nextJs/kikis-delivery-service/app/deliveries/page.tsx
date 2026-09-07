import { getAllDeliveries } from "@/lib/services/deliveriesService";
import { Suspense } from "react";
import Loading from "./loading";

export default async function DeliveriesPage() {
  const deliveries = await getAllDeliveries();

  return (
    <>
      <h2>All Deliveries</h2>
      <ul>
        <Suspense fallback={<Loading />}>
          {deliveries.map((delivery) => (
            <li key={delivery.id}>
              {delivery.pickup} to {delivery.destination} ({delivery.status})
            </li>
          ))}
        </Suspense>
      </ul>
    </>
  );
}
