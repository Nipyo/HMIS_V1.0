"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "../ui/button"

type Booking = {
  id: string
  fullName: string
  email: string
  dateOfBirth: Date
  appointmentDate: Date
  message: string
  phoneNumber: string
  passportNumber: string
  passportIssueDate: Date
  passportExpiryDate: Date
  gender: string
  age: string
}

export default function EditBookingPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [booking, setBooking] = useState<Booking | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock fetch booking data
    const mockBooking: Booking = {
      id: params.id,
      fullName: "John Smith",
      email: "john.smith@example.com",
      dateOfBirth: new Date(1985, 5, 15),
      appointmentDate: new Date(2026, 4, 5, 10, 30),
      message: "I need a general health checkup and vaccination for my upcoming travel.",
      phoneNumber: "+81-123-4567",
      passportNumber: "P1234567",
      passportIssueDate: new Date(2020, 1, 10),
      passportExpiryDate: new Date(2030, 1, 10),
      gender: "male",
      age: "38",
    }

    setBooking(mockBooking)
    setLoading(false)
  }, [params.id])

  const handleSubmit = (data: Booking) => {
    console.log("Updating booking:", data)
    router.push(`/bookings/${params.id}`)
  }

  if (loading || !booking) {
    return (
      <div className="p-6 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Edit Booking</h1>
      </div>

      {/* Example usage of handleSubmit */}
      <Button onClick={() => handleSubmit(booking)}>Save Changes</Button>
    </div>
  )
}
