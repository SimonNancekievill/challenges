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
import DeliveryList from "./DeliveryList";
import Link from "next/link";

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
      <div className="flex justify-between mx-6">
        <h2 className="text-2xl font-areal text-center">All Deliveries</h2>
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
      </div>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {visible.map((delivery) => (
          <li key={delivery.id}>
            <Link href={`/deliveries/${delivery.id}`}>
              <DeliveryList {...delivery} />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
