export type DeliveryStatus = "active" | "accepted" | "denied" | "fulfilled";

export type DeliveryRequest = {
  id: string;
  pickup: string;
  destination: string;
  status: DeliveryStatus;
};

const deliveries: DeliveryRequest[] = [
  { id: "1", pickup: "Backery", destination: "Clock Tower", status: "active" },
  {
    id: "2",
    pickup: "Harbour",
    destination: "Hillside Cafe",
    status: "accepted",
  },
  {
    id: "3",
    pickup: "Bookshop",
    destination: "Lighthouse",
    status: "denied",
  },
  {
    id: "4",
    pickup: "Market Square",
    destination: "Train Station",
    status: "fulfilled",
  },
];

export function getAllDeliveries(): DeliveryRequest[] {
  return deliveries;
}

export function getDeliveryById(id: string): DeliveryRequest | null {
  return deliveries.find((delivery) => delivery.id === id) || null;
}

export default function createDelivery({
  pickup,
  destination,
}: {
  pickup: string;
  destination: string;
}): DeliveryRequest {
  const newDelivery: DeliveryRequest = {
    id: String(deliveries.length + 1),
    pickup,
    destination,
    status: "active",
  };
  deliveries.push(newDelivery);

  return newDelivery;
}
