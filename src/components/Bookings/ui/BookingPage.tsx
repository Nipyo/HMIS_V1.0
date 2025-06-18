"use client";

import type React from "react";
import { useState } from "react";
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  FileText,
  ChevronDown,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Label } from "../../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MedicalNav from "@/components/Home/components/MedicalNav";


interface BookingFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
  appointmentDate: string;
  appointmentTime: string;
  serviceType: string;
  message: string;
  passportNumber?: string;
  passportIssueDate?: string;
  passportExpiryDate?: string;
}

export default function EnhancedBookingPage() {
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
    appointmentDate: "",
    appointmentTime: "",
    serviceType: "",
    message: "",
    passportNumber: "",
    passportIssueDate: "",
    passportExpiryDate: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
    bookingId?: string;
  } | null>(null);

  const handleInputChange = (field: keyof BookingFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);
  //   setSubmitStatus(null);

  //   try {
  //     // Helper function to convert date to ISO 8601 format with Z suffix
  //     const formatDate = (dateStr: string) => {
  //       return dateStr
  //         ? new Date(dateStr).toISOString().split(".")[0] + "Z"
  //         : undefined;
  //     };

  //     const payload = {
  //       fullName: formData.fullName,
  //       email: formData.email,
  //       dob: formatDate(formData.dateOfBirth),
  //       appointmentDate: formatDate(formData.appointmentDate),
  //       message: formData.message,
  //       passportNo: formData.passportNumber || undefined,
  //       issueDate: formatDate(formData.passportIssueDate || ""),
  //       expiryDate: formatDate(formData.passportExpiryDate || ""),
  //       gender: formData.gender,
  //     };

  //     const response = await fetch(
  //       "https://api.nippon-medical.com/api/Booking/create",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           accept: "*/*",
  //         },
  //         body: JSON.stringify(payload),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error(`API error: ${response.status}`);
  //     }

  //     const result = await response.json();
  //     const bookingId = result.id || Math.random().toString(36).substr(2, 9);

  //     const bookingData = {
  //       id: bookingId,
  //       ...formData,
  //       status: "confirmed",
  //       createdAt: new Date().toISOString(),
  //     };

  //     localStorage.setItem(`booking_${bookingId}`, JSON.stringify(bookingData));

  //     setSubmitStatus({
  //       success: true,
  //       message: "Your appointment has been booked successfully!",
  //       bookingId: bookingId,
  //     });

  //   } catch (error) {
  //     console.error("Booking submission failed:", error);
  //     setSubmitStatus({
  //       success: false,
  //       message: "Failed to book appointment. Please try again later.",
  //     });
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSubmitStatus(null);

  try {
    // Helper function to convert date to ISO 8601 format with milliseconds and Z suffix
    const formatDate = (dateStr: string) => {
      if (!dateStr) return undefined;
      return new Date(dateStr).toISOString();
    };

    const payload = {
      fullName: formData.fullName,
      email: formData.email,
      dob: formatDate(formData.dateOfBirth),
      appointmentDate: formatDate(formData.appointmentDate),
      message: formData.message,
      passportNo: formData.passportNumber || undefined,
       issueDate: formatDate(formData.passportIssueDate || ""),
        expiryDate: formatDate(formData.passportExpiryDate || ""),
      gender: formData.gender,
    };

    const response = await fetch(
      "https://api.nippon-medical.com/api/Booking/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const result = await response.json();
    const bookingId = result.id || Math.random().toString(36).substr(2, 9);

    const bookingData = {
      id: bookingId,
      ...formData,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(`booking_${bookingId}`, JSON.stringify(bookingData));

    setSubmitStatus({
      success: true,
      message: "Your appointment has been booked successfully!",
      bookingId: bookingId,
    });

  } catch (error) {
    console.error("Booking submission failed:", error);
    setSubmitStatus({
      success: false,
      message: "Failed to book appointment. Please try again later.",
    });
  } finally {
    setIsSubmitting(false);
  }
};
  return (
    
     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Add MedicalNav here */}
        <MedicalNav />
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Book Your Appointment
          </h1>
          <p className="text-lg text-gray-600">
            Schedule your consultation with our expert team
          </p>
        </div>

        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-3 text-xl">
              <Calendar className="h-6 w-6" />
              Appointment Details
            </CardTitle>
            <CardDescription className="text-blue-100">
              Please fill in all required information to complete your booking
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            {submitStatus ? (
              <div
                className={`rounded-lg p-6 mb-6 ${
                  submitStatus.success ? "bg-green-50" : "bg-red-50"
                }`}
              >
                <div className="flex items-start gap-4">
                  {submitStatus.success ? (
                    <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                  ) : (
                    <XCircle className="h-6 w-6 text-red-500 mt-0.5 flex-shrink-0" />
                  )}
                  <div>
                    <h3
                      className={`text-lg font-medium ${
                        submitStatus.success ? "text-green-800" : "text-red-800"
                      }`}
                    >
                      {submitStatus.success
                        ? "Booking Successful!"
                        : "Booking Failed"}
                    </h3>
                    <p
                      className={`mt-1 ${
                        submitStatus.success ? "text-green-700" : "text-red-700"
                      }`}
                    >
                      {submitStatus.message}
                    </p>
                    {submitStatus.success && submitStatus.bookingId && (
                      <div className="mt-3 bg-white p-3 rounded border border-green-200">
                        <p className="text-sm font-medium text-gray-700">
                          Booking Reference:
                        </p>
                        <p className="font-mono text-sm mt-1 bg-gray-100 p-2 rounded">
                          {submitStatus.bookingId}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          We have also sent a confirmation to your email address.
                        </p>
                      </div>
                    )}
                    <div className="mt-4">
                      <Button
                        onClick={() => setSubmitStatus(null)}
                        className={`${
                          submitStatus.success
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-red-600 hover:bg-red-700"
                        }`}
                      >
                        {submitStatus.success
                          ? "Book Another Appointment"
                          : "Try Again"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label
                        htmlFor="fullName"
                        className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer hover:text-blue-600 transition-colors"
                      >
                        <User className="h-4 w-4 text-blue-500" />
                        Full Name *
                      </Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) =>
                          handleInputChange("fullName", e.target.value)
                        }
                        placeholder="Enter your full name"
                        className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                        required
                      />
                    </div>

                    <div className="space-y-3">
                      <Label
                        htmlFor="email"
                        className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer hover:text-blue-600 transition-colors"
                      >
                        <Mail className="h-4 w-4 text-blue-500" />
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        placeholder="Enter your email"
                        className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                        required
                      />
                    </div>

                    <div className="space-y-3">
                      <Label
                        htmlFor="phoneNumber"
                        className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer hover:text-blue-600 transition-colors"
                      >
                        <Phone className="h-4 w-4 text-blue-500" />
                        Phone Number *
                      </Label>
                      <Input
                        id="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={(e) =>
                          handleInputChange("phoneNumber", e.target.value)
                        }
                        placeholder="+1 (555) 123-4567"
                        className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                        required
                      />
                    </div>

                    <div className="space-y-3">
                      <Label
                        htmlFor="dateOfBirth"
                        className="text-sm font-medium text-gray-700 cursor-pointer hover:text-blue-600 transition-colors"
                      >
                        Date of Birth *
                      </Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) =>
                          handleInputChange("dateOfBirth", e.target.value)
                        }
                        className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                        required
                      />
                    </div>

                    <div className="space-y-3">
                      <Label className="text-sm font-medium text-gray-700">
                        Gender *
                      </Label>
                      <Select
                        value={formData.gender}
                        onValueChange={(value: string) =>
                          handleInputChange("gender", value)
                        }
                      >
                        <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white">
                          <SelectValue
                            placeholder="Select your gender"
                            className="text-gray-500"
                          />
                          <ChevronDown className="h-4 w-4 text-gray-400" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-2 border-gray-200 shadow-xl rounded-lg">
                          <SelectItem
                            value="male"
                            className="hover:bg-blue-50 cursor-pointer py-3 px-4"
                          >
                            Male
                          </SelectItem>
                          <SelectItem
                            value="female"
                            className="hover:bg-blue-50 cursor-pointer py-3 px-4"
                          >
                            Female
                          </SelectItem>
                          <SelectItem
                            value="other"
                            className="hover:bg-blue-50 cursor-pointer py-3 px-4"
                          >
                            Other
                          </SelectItem>
                          <SelectItem
                            value="prefer-not-to-say"
                            className="hover:bg-blue-50 cursor-pointer py-3 px-4"
                          >
                            Prefer not to say
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-sm font-medium text-gray-700">
                        Service Type *
                      </Label>
                      <Select
                        value={formData.serviceType}
                        onValueChange={(value: string) =>
                          handleInputChange("serviceType", value)
                        }
                      >
                        <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white">
                          <SelectValue
                            placeholder="Choose your service"
                            className="text-gray-500"
                          />
                          <ChevronDown className="h-4 w-4 text-gray-400" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-2 border-gray-200 shadow-xl rounded-lg">
                          <SelectItem
                            value="general-consultation"
                            className="hover:bg-blue-50 cursor-pointer py-3 px-4"
                          >
                            <div className="flex flex-col">
                              <span className="font-medium">
                                General Consultation
                              </span>
                              <span className="text-xs text-gray-500">
                                Basic health consultation
                              </span>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="travel-health"
                            className="hover:bg-blue-50 cursor-pointer py-3 px-4"
                          >
                            <div className="flex flex-col">
                              <span className="font-medium">Travel Health</span>
                              <span className="text-xs text-gray-500">
                                Pre-travel health advice
                              </span>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="vaccination"
                            className="hover:bg-blue-50 cursor-pointer py-3 px-4"
                          >
                            <div className="flex flex-col">
                              <span className="font-medium">Vaccination</span>
                              <span className="text-xs text-gray-500">
                                Immunization services
                              </span>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="health-checkup"
                            className="hover:bg-blue-50 cursor-pointer py-3 px-4"
                          >
                            <div className="flex flex-col">
                              <span className="font-medium">
                                Health Checkup
                              </span>
                              <span className="text-xs text-gray-500">
                                Comprehensive health screening
                              </span>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="specialist-referral"
                            className="hover:bg-blue-50 cursor-pointer py-3 px-4"
                          >
                            <div className="flex flex-col">
                              <span className="font-medium">
                                Specialist Referral
                              </span>
                              <span className="text-xs text-gray-500">
                                Referral to specialist care
                              </span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Appointment Scheduling */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                    Appointment Scheduling
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label
                        htmlFor="appointmentDate"
                        className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer hover:text-blue-600 transition-colors"
                      >
                        <Calendar className="h-4 w-4 text-blue-500" />
                        Preferred Date *
                      </Label>
                      <Input
                        id="appointmentDate"
                        type="date"
                        value={formData.appointmentDate}
                        onChange={(e) =>
                          handleInputChange("appointmentDate", e.target.value)
                        }
                        min={new Date().toISOString().split("T")[0]}
                        className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                        required
                      />
                    </div>

                    <div className="space-y-3">
                      <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <Clock className="h-4 w-4 text-blue-500" />
                        Preferred Time *
                      </Label>
                      <Select
                        value={formData.appointmentTime}
                        onValueChange={(value: string) =>
                          handleInputChange("appointmentTime", value)
                        }
                      >
                        <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white">
                          <SelectValue placeholder="Select appointment time" />
                          <ChevronDown className="h-4 w-4 text-gray-400" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-2 border-gray-200 shadow-xl rounded-lg">
                          <SelectItem
                            value="09:00"
                            className="hover:bg-blue-50 cursor-pointer py-3 px-4"
                          >
                            <div className="flex justify-between items-center w-full">
                              <span>9:00 AM</span>
                              <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
                                Available
                              </span>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="10:00"
                            className="hover:bg-blue-50 cursor-pointer py-3 px-4"
                          >
                            <div className="flex justify-between items-center w-full">
                              <span>10:00 AM</span>
                              <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
                                Available
                              </span>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="11:00"
                            className="hover:bg-blue-50 cursor-pointer py-3 px-4"
                          >
                            <div className="flex justify-between items-center w-full">
                              <span>11:00 AM</span>
                              <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded">
                                Limited
                              </span>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="14:00"
                            className="hover:bg-blue-50 cursor-pointer py-3 px-4"
                          >
                            <div className="flex justify-between items-center w-full">
                              <span>2:00 PM</span>
                              <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
                                Available
                              </span>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="15:00"
                            className="hover:bg-blue-50 cursor-pointer py-3 px-4"
                          >
                            <div className="flex justify-between items-center w-full">
                              <span>3:00 PM</span>
                              <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
                                Available
                              </span>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="16:00"
                            className="hover:bg-blue-50 cursor-pointer py-3 px-4"
                          >
                            <div className="flex justify-between items-center w-full">
                              <span>4:00 PM</span>
                              <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded">
                                Limited
                              </span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Optional Passport Information */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-semibold text-gray-800">
                      Passport Information
                    </h3>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      Optional
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <Label
                        htmlFor="passportNumber"
                        className="text-sm font-medium text-gray-700 cursor-pointer hover:text-blue-600 transition-colors"
                      >
                        Passport Number
                      </Label>
                      <Input
                        id="passportNumber"
                        value={formData.passportNumber}
                        onChange={(e) =>
                          handleInputChange("passportNumber", e.target.value)
                        }
                        placeholder="P1234567"
                        className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label
                        htmlFor="passportIssueDate"
                        className="text-sm font-medium text-gray-700 cursor-pointer hover:text-blue-600 transition-colors"
                      >
                        Issue Date
                      </Label>
                      <Input
                        id="passportIssueDate"
                        type="date"
                        value={formData.passportIssueDate}
                        onChange={(e) =>
                          handleInputChange("passportIssueDate", e.target.value)
                        }
                        className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label
                        htmlFor="passportExpiryDate"
                        className="text-sm font-medium text-gray-700 cursor-pointer hover:text-blue-600 transition-colors"
                      >
                        Expiry Date
                      </Label>
                      <Input
                        id="passportExpiryDate"
                        type="date"
                        value={formData.passportExpiryDate}
                        onChange={(e) =>
                          handleInputChange(
                            "passportExpiryDate",
                            e.target.value
                          )
                        }
                        className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Message */}
                <div className="space-y-3">
                  <Label
                    htmlFor="message"
                    className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer hover:text-blue-600 transition-colors"
                  >
                    <FileText className="h-4 w-4 text-blue-500" />
                    Additional Message
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) =>
                      handleInputChange("message", e.target.value)
                    }
                    placeholder="Please describe your symptoms, concerns, or any additional information..."
                    rows={4}
                    className="border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Book Appointment"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
    </div>
    </div>
  );
}
