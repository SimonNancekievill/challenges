"use client";

import type { DeliveryRequest } from "@/lib/services/deliveriesService";
import { useState } from "react";

export default function DeliveryFilter({
  deliveries,
}: {
  deliveries: DeliveryRequest[];
}) {
  const [status, setStatus] = useState("all");
  const visible =
    status === "all"
      ? deliveries
      : deliveries.filter((delivery) => delivery.status === status);
  return (
    <>
      <select
        value={status}
        onChange={(event) => setStatus(event.target.value)}
      >
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="accepted">Accepted</option>
        <option value="fulfilled">Fulfilled</option>
        <option value="denied">Denied</option>
      </select>
      <ul>
        {visible.map((delivery) => (
          <li key={delivery.id}>
            {delivery.pickup} to {delivery.destination} ({delivery.status})
          </li>
        ))}
      </ul>
    </>
  );
}
