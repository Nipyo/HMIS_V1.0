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
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
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
  age: number | string | null;
  status: string;
  createdAt: string;
  doctor: string;
  department: string;
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://backendofmedical-2.onrender.com";

const STATUS_STYLES: Record<string, string> = {
  confirmed: "bg-green-500",
  pending: "bg-yellow-500",
  cancelled: "bg-red-500",
  completed: "bg-blue-500",
};

function StatusBadge({ status }: { status: string }) {
  const color = STATUS_STYLES[status] ?? "bg-gray-500";
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-medium text-white capitalize ${color}`}
    >
      {status}
    </span>
  );
}

export default function BookingDetails() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        // token is saved after logging in via POST /api/auth/token
        const token = localStorage.getItem("adminToken");
        const res = await fetch(`${API_URL}/api/Booking/${id}`, {
          headers: token ? { Authorization: `Token ${token}` } : {},
        });
        if (res.status === 401 || res.status === 403) {
          throw new Error("Please log in to view this booking.");
        }
        if (res.status === 404) throw new Error("Booking not found.");
        if (!res.ok) throw new Error("Failed to fetch booking.");
        setBooking(await res.json());
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id]);

  if (loading) return <p>Loading booking details...</p>;
  if (error || !booking) return <p>{error ?? "Booking not found."}</p>;

  const appt = new Date(booking.appointmentDate);
  const apptDate = appt.toLocaleDateString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const apptTime = appt.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

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
            onClick={() => router.push(`/bookings/${id}/edit`)}
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
                <div>
                  <StatusBadge status={booking.status} />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Appointment ID</p>
                <p className="font-medium">{booking.id}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Appointment Date</p>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  <p className="font-medium">{apptDate}</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Appointment Time</p>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                  <p className="font-medium">{apptTime}</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Doctor</p>
                <p className="font-medium">{booking.doctor || "-"}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Department</p>
                <p className="font-medium">{booking.department || "-"}</p>
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
                <p className="font-medium">{booking.dateOfBirth}</p>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Gender</p>
              <p className="font-medium capitalize">{booking.gender}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Age</p>
              <p className="font-medium">{booking.age ?? "-"}</p>
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