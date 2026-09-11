import { getAllDeliveries } from "@/lib/services/deliveriesService";
import { Suspense } from "react";
import Loading from "./loading";
import DeliveryFilter from "@/components/DeliveryFilter";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ModeToggle } from "@/components/ModeToggle";

export default async function DeliveriesPage() {
  const deliveries = await getAllDeliveries();

  return (
    <>
      <h2>All Deliveries</h2>
      <ModeToggle />
      <Suspense fallback={<Loading />}>
        <DeliveryFilter deliveries={deliveries} />
      </Suspense>
      <Button variant="secondary" className="justify-start">
        <Link href={"/deliveries/new"}>New Delivery</Link>
      </Button>
    </>
  );
}
