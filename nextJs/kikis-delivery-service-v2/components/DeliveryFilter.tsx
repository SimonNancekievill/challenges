"use client";

import type { DeliveryRequest } from "@/lib/services/deliveriesService";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

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
      <Select value={status} onValueChange={(value) => setStatus(value!)}>
        <SelectTrigger>
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="accepted">Accepted</SelectItem>
          <SelectItem value="fulfilled">Fulfilled</SelectItem>
          <SelectItem value="denied">Denied</SelectItem>
        </SelectContent>
      </Select>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {visible.map((delivery) => (
          <li key={delivery.id}>
            {delivery.pickup} to {delivery.destination} ({delivery.status})
          </li>
        ))}
      </ul>
    </>
  );
}
