"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Edit2,
  Calendar,
  Mail,
  Phone,
  User,
  FileText,
  Clock,
  Badge,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type Booking = {
  id: number;
  fullName: string;
  email: string;
  dateOfBirth: string;
  appointmentDate: string;
  message: string;
  phoneNumber: string;
  passportNumber: string;
  passportIssueDate: string;
  passportExpiryDate: string;
  gender: string;
  age: string;
  status: string;
  createdAt: string;
  doctor: string;
  department: string;
};

export default function BookingDetails({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await fetch(
          `https://api.nippon-medical.com/api/Booking/${params.id}`
        );
        console.log({ res });
        if (!res.ok) throw new Error("Failed to fetch booking");
        const data = await res.json();
        setBooking(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [params.id]);

  if (loading) return <p>Loading booking details...</p>;
  if (!booking) return <p>Booking not found.</p>;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500 text-white">Confirmed</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500 text-white">Pending</Badge>;
      case "cancelled":
        return <Badge className="bg-red-500 text-white">Cancelled</Badge>;
      case "completed":
        return <Badge className="bg-blue-500 text-white">Completed</Badge>;
      default:
        return <Badge className="bg-gray-500 text-white">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Booking Details</h1>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => router.push(`/bookings/${params.id}/edit`)}
          >
            <Edit2 className="h-4 w-4 mr-2" />
            Edit Booking
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Appointment Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Status</p>
                <div>{getStatusBadge(booking.status)}</div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Appointment ID</p>
                <p className="font-medium">{booking.id}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Appointment Date</p>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  <p className="font-medium">{booking.appointmentDate}</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Appointment Time</p>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                  <p className="font-medium">{booking.appointmentDate}</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Doctor</p>
                <p className="font-medium">{booking.doctor}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Department</p>
                <p className="font-medium">{booking.department}</p>
              </div>
              <div className="space-y-1 md:col-span-2">
                <p className="text-sm text-gray-500">Message</p>
                <p className="font-medium">
                  {booking.message || "No message provided"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Patient Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Full Name</p>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2 text-gray-500" />
                <p className="font-medium">{booking.fullName}</p>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Email</p>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-gray-500" />
                <p className="font-medium">{booking.email}</p>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Phone</p>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-gray-500" />
                <p className="font-medium">{booking.phoneNumber}</p>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Date of Birth</p>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                <p className="font-medium">
                  {/* {format(booking.dateOfBirth, "PPP")} */}
                  {booking.dateOfBirth}
                </p>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Gender</p>
              <p className="font-medium capitalize">{booking.gender}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Age</p>
              <p className="font-medium">{booking.age}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Passport Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Passport Number</p>
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-gray-500" />
                  <p className="font-medium">{booking.passportNumber}</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Issue Date</p>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  <p className="font-medium">{booking.passportIssueDate}</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Expiry Date</p>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  <p className="font-medium">{booking.passportExpiryDate}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
