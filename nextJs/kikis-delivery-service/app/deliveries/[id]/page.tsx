import { getDeliveryById } from "@/lib/services/deliveriesService";

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
      <h2>Delivery {id}</h2>
      <p>
        From {delivery.pickup} to {delivery.destination}
      </p>
      <p>Status: {delivery.status}</p>
    </>
  );
}
