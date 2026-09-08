import { getAllDeliveries } from "@/lib/services/deliveriesService";
import { Suspense } from "react";
import Loading from "./loading";
import DeliveryFilter from "@/components/DeliveryFilter";

export default async function DeliveriesPage() {
  const deliveries = await getAllDeliveries();

  return (
    <>
      <h2>All Deliveries</h2>
      <Suspense fallback={<Loading />}>
        <DeliveryFilter deliveries={deliveries} />
      </Suspense>
    </>
  );
}
