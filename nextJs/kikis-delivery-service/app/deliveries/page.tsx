import { getAllDeliveries } from "@/lib/services/deliveriesService";

export default async function DeliveriesPage() {
  const deliveries = await getAllDeliveries();

  return (
    <>
      <h2>All Deliveries</h2>
      <ul>
        {deliveries.map((delivery) => (
          <li key={delivery.id}>
            {delivery.pickup} to {delivery.destination} ({delivery.status})
          </li>
        ))}
      </ul>
    </>
  );
}
