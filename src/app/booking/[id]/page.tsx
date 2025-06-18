"use client";
import BookingDetails from "@/components/Bookings/BookingDetails";
import { useParams } from "next/navigation";
import React from "react";

const Page = () => {
  const params = useParams();

  const id = params?.id as string;

  return (
    <div>{id ? <BookingDetails params={{ id }} /> : <p>Loading...</p>}</div>
  );
};

export default Page;
