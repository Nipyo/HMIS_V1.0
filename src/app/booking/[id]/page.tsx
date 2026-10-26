"use client";

import BookingDetails from "@/components/Bookings/BookingDetails";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  return (
    <div>
      {id ? <BookingDetails /> : <p>Loading...</p>}
    </div>
  );
}
