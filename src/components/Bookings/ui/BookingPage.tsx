
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
  Stethoscope,
  Building2,
  Hash,
} from "lucide-react";

import { Label } from "../../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  passportNumber: string;
  passportIssueDate: string;
  passportExpiryDate: string;
  age: number | string | null;
  doctor: string;
  department: string;
}

interface SubmitStatus {
  success: boolean;
  message: string;
  bookingId?: string;
}

interface BookingApiResponse {
  id?: string | number;
  detail?: string;
  message?: string;
}

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ??
  "https://backendofmedical-2.onrender.com"
).replace(/\/+$/, "");

const INITIAL_FORM_DATA: BookingFormData = {
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
  age: "",
  doctor: "",
  department: "",
};

const INPUT_CLASS =
  "h-12 border-2 border-gray-200 bg-white transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200";

function getTodayLocalDate(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function EnhancedBookingPage() {
  const [formData, setFormData] =
    useState<BookingFormData>(INITIAL_FORM_DATA);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] =
    useState<SubmitStatus | null>(null);

  const handleInputChange = (
    field: keyof BookingFormData,
    value: string
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      if (
        !formData.appointmentDate ||
        !formData.appointmentTime
      ) {
        throw new Error(
          "Please select an appointment date and time."
        );
      }

      if (
        formData.appointmentDate < getTodayLocalDate()
      ) {
        throw new Error(
          "Please select today or a future appointment date."
        );
      }

      if (
        formData.dateOfBirth &&
        formData.dateOfBirth > getTodayLocalDate()
      ) {
        throw new Error(
          "Date of birth cannot be in the future."
        );
      }

      if (
        formData.passportIssueDate &&
        formData.passportExpiryDate &&
        formData.passportExpiryDate <
          formData.passportIssueDate
      ) {
        throw new Error(
          "Passport expiry date cannot be before its issue date."
        );
      }

      const appointmentDateTime = new Date(
        `${formData.appointmentDate}T${formData.appointmentTime}:00`
      );

      if (
        Number.isNaN(appointmentDateTime.getTime())
      ) {
        throw new Error(
          "Please select a valid appointment date and time."
        );
      }

      const parsedAge =
        formData.age === "" || formData.age === null
          ? null
          : Number(formData.age);

      if (
        parsedAge !== null &&
        (!Number.isInteger(parsedAge) ||
          parsedAge < 0 ||
          parsedAge > 150)
      ) {
        throw new Error(
          "Please enter a valid age between 0 and 150."
        );
      }

      const payload = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phoneNumber: formData.phoneNumber.trim(),
        dateOfBirth: formData.dateOfBirth,
        appointmentDate: appointmentDateTime.toISOString(),
        message: formData.message.trim(),
        passportNumber: formData.passportNumber.trim(),
        passportIssueDate:
          formData.passportIssueDate || null,
        passportExpiryDate:
          formData.passportExpiryDate || null,
        gender: formData.gender,
        age: parsedAge,
        doctor: formData.doctor.trim(),
        department: formData.department.trim(),
        serviceType: formData.serviceType,
      };

      const response = await fetch(
        `${API_URL}/api/Booking`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const responseText = await response.text();

      let result: BookingApiResponse = {};

      if (responseText) {
        try {
          result = JSON.parse(
            responseText
          ) as BookingApiResponse;
        } catch {
          if (response.ok) {
            throw new Error(
              "The server returned an invalid response. Please contact support if your booking was submitted."
            );
          }

          throw new Error(
            `Booking request failed (HTTP ${response.status}). Please try again.`
          );
        }
      }

      if (!response.ok) {
        const serverMessage =
          result.detail || result.message;

        throw new Error(
          typeof serverMessage === "string"
            ? serverMessage
            : `Booking failed (HTTP ${response.status}). Please check your information and try again.`
        );
      }

      const bookingId =
        result.id !== undefined && result.id !== null
          ? String(result.id)
          : undefined;

      setSubmitStatus({
        success: true,
        message:
          "Your appointment has been booked successfully!",
        bookingId,
      });

      // Reset the form after successful submission.
      setFormData({ ...INITIAL_FORM_DATA });
    } catch (error) {
      console.error(
        "Booking submission failed:",
        error
      );

      setSubmitStatus({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to book your appointment. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStatusReset = () => {
    setSubmitStatus(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 py-8 md:py-12">
      <div className="mx-auto max-w-4xl">
        <MedicalNav />

        <div className="mb-8 mt-6 text-center">
          <h1 className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
            Book Your Appointment
          </h1>

          <p className="text-base text-gray-600 sm:text-lg">
            Schedule your consultation with our expert team
          </p>
        </div>

        <Card className="overflow-hidden border-0 bg-white/90 shadow-2xl backdrop-blur-sm">
          <CardHeader className="rounded-t-lg bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white sm:p-8">
            <CardTitle className="flex items-center gap-3 text-xl">
              <Calendar className="h-6 w-6" />
              Appointment Details
            </CardTitle>

            <CardDescription className="text-blue-100">
              Please complete the form below to request
              your appointment.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-5 sm:p-8">
            {submitStatus ? (
              <div
                role="status"
                aria-live="polite"
                className={`rounded-xl border p-5 sm:p-6 ${
                  submitStatus.success
                    ? "border-green-200 bg-green-50"
                    : "border-red-200 bg-red-50"
                }`}
              >
                <div className="flex items-start gap-4">
                  {submitStatus.success ? (
                    <CheckCircle className="mt-1 h-6 w-6 shrink-0 text-green-600" />
                  ) : (
                    <XCircle className="mt-1 h-6 w-6 shrink-0 text-red-600" />
                  )}

                  <div className="min-w-0 flex-1">
                    <h3
                      className={`text-lg font-semibold ${
                        submitStatus.success
                          ? "text-green-800"
                          : "text-red-800"
                      }`}
                    >
                      {submitStatus.success
                        ? "Booking Successful!"
                        : "Booking Failed"}
                    </h3>

                    <p
                      className={`mt-2 break-words ${
                        submitStatus.success
                          ? "text-green-700"
                          : "text-red-700"
                      }`}
                    >
                      {submitStatus.message}
                    </p>

                    {submitStatus.success &&
                      submitStatus.bookingId && (
                        <div className="mt-4 rounded-lg border border-green-200 bg-white p-4">
                          <p className="text-sm font-medium text-gray-700">
                            Booking Reference
                          </p>

                          <p className="mt-2 break-all rounded bg-gray-100 p-3 font-mono text-sm">
                            {submitStatus.bookingId}
                          </p>

                          <p className="mt-2 text-xs text-gray-500">
                            Please save this reference for
                            your records.
                          </p>
                        </div>
                      )}

                    <Button
                      type="button"
                      onClick={handleStatusReset}
                      className={`mt-5 ${
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
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-10"
              >
                {/* Personal Information */}
                <section className="space-y-6">
                  <h2 className="border-b border-gray-200 pb-3 text-xl font-semibold text-gray-800">
                    Personal Information
                  </h2>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label
                        htmlFor="fullName"
                        className="flex items-center gap-2"
                      >
                        <User className="h-4 w-4 text-blue-500" />
                        Full Name *
                      </Label>

                      <Input
                        id="fullName"
                        autoComplete="name"
                        value={formData.fullName}
                        onChange={(event) =>
                          handleInputChange(
                            "fullName",
                            event.target.value
                          )
                        }
                        placeholder="Enter your full name"
                        className={INPUT_CLASS}
                        required
                        maxLength={150}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="flex items-center gap-2"
                      >
                        <Mail className="h-4 w-4 text-blue-500" />
                        Email Address *
                      </Label>

                      <Input
                        id="email"
                        type="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={(event) =>
                          handleInputChange(
                            "email",
                            event.target.value
                          )
                        }
                        placeholder="Enter your email"
                        className={INPUT_CLASS}
                        required
                        maxLength={254}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="phoneNumber"
                        className="flex items-center gap-2"
                      >
                        <Phone className="h-4 w-4 text-blue-500" />
                        Phone Number *
                      </Label>

                      <Input
                        id="phoneNumber"
                        type="tel"
                        autoComplete="tel"
                        value={formData.phoneNumber}
                        onChange={(event) =>
                          handleInputChange(
                            "phoneNumber",
                            event.target.value
                          )
                        }
                        placeholder="Enter your phone number"
                        className={INPUT_CLASS}
                        required
                        maxLength={30}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">
                        Date of Birth *
                      </Label>

                      <Input
                        id="dateOfBirth"
                        type="date"
                        autoComplete="bday"
                        max={getTodayLocalDate()}
                        value={formData.dateOfBirth}
                        onChange={(event) =>
                          handleInputChange(
                            "dateOfBirth",
                            event.target.value
                          )
                        }
                        className={INPUT_CLASS}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="age">
                        Age
                      </Label>

                      <Input
                        id="age"
                        type="number"
                        min={0}
                        max={150}
                        step={1}
                        value={formData.age ?? ""}
                        onChange={(event) =>
                          handleInputChange(
                            "age",
                            event.target.value
                          )
                        }
                        placeholder="Enter age (optional)"
                        className={INPUT_CLASS}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gender">
                        Gender *
                      </Label>

                      <Select
                        value={formData.gender}
                        onValueChange={(value) =>
                          handleInputChange(
                            "gender",
                            value
                          )
                        }
                        required
                      >
                        <SelectTrigger
                          id="gender"
                          className={INPUT_CLASS}
                        >
                          <SelectValue placeholder="Select your gender" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="male">
                            Male
                          </SelectItem>
                          <SelectItem value="female">
                            Female
                          </SelectItem>
                          <SelectItem value="other">
                            Other
                          </SelectItem>
                          <SelectItem value="prefer-not-to-say">
                            Prefer not to say
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </section>

                {/* Appointment Scheduling */}
                <section className="space-y-6">
                  <h2 className="border-b border-gray-200 pb-3 text-xl font-semibold text-gray-800">
                    Appointment Scheduling
                  </h2>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label
                        htmlFor="appointmentDate"
                        className="flex items-center gap-2"
                      >
                        <Calendar className="h-4 w-4 text-blue-500" />
                        Preferred Date *
                      </Label>

                      <Input
                        id="appointmentDate"
                        type="date"
                        min={getTodayLocalDate()}
                        value={formData.appointmentDate}
                        onChange={(event) =>
                          handleInputChange(
                            "appointmentDate",
                            event.target.value
                          )
                        }
                        className={INPUT_CLASS}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="appointmentTime"
                        className="flex items-center gap-2"
                      >
                        <Clock className="h-4 w-4 text-blue-500" />
                        Preferred Time *
                      </Label>

                      <Select
                        value={formData.appointmentTime}
                        onValueChange={(value) =>
                          handleInputChange(
                            "appointmentTime",
                            value
                          )
                        }
                        required
                      >
                        <SelectTrigger
                          id="appointmentTime"
                          className={INPUT_CLASS}
                        >
                          <SelectValue placeholder="Select appointment time" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="09:00">
                            9:00 AM
                          </SelectItem>
                          <SelectItem value="10:00">
                            10:00 AM
                          </SelectItem>
                          <SelectItem value="11:00">
                            11:00 AM
                          </SelectItem>
                          <SelectItem value="14:00">
                            2:00 PM
                          </SelectItem>
                          <SelectItem value="15:00">
                            3:00 PM
                          </SelectItem>
                          <SelectItem value="16:00">
                            4:00 PM
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      <p className="text-xs text-gray-500">
                        The selected time is a preference.
                        Availability must be confirmed by
                        your booking system.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="serviceType">
                        Service Type *
                      </Label>

                      <Select
                        value={formData.serviceType}
                        onValueChange={(value) =>
                          handleInputChange(
                            "serviceType",
                            value
                          )
                        }
                        required
                      >
                        <SelectTrigger
                          id="serviceType"
                          className={INPUT_CLASS}
                        >
                          <SelectValue placeholder="Choose your service" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="general-consultation">
                            General Consultation
                          </SelectItem>
                          <SelectItem value="travel-health">
                            Travel Health
                          </SelectItem>
                          <SelectItem value="vaccination">
                            Vaccination
                          </SelectItem>
                          <SelectItem value="health-checkup">
                            Health Checkup
                          </SelectItem>
                          <SelectItem value="specialist-referral">
                            Specialist Referral
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="doctor"
                        className="flex items-center gap-2"
                      >
                        <Stethoscope className="h-4 w-4 text-blue-500" />
                        Doctor
                      </Label>

                      <Input
                        id="doctor"
                        value={formData.doctor}
                        onChange={(event) =>
                          handleInputChange(
                            "doctor",
                            event.target.value
                          )
                        }
                        placeholder="Preferred doctor (optional)"
                        className={INPUT_CLASS}
                        maxLength={150}
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label
                        htmlFor="department"
                        className="flex items-center gap-2"
                      >
                        <Building2 className="h-4 w-4 text-blue-500" />
                        Department
                      </Label>

                      <Input
                        id="department"
                        value={formData.department}
                        onChange={(event) =>
                          handleInputChange(
                            "department",
                            event.target.value
                          )
                        }
                        placeholder="Preferred department (optional)"
                        className={INPUT_CLASS}
                        maxLength={150}
                      />
                    </div>
                  </div>
                </section>

                {/* Passport Information */}
                <section className="space-y-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-xl font-semibold text-gray-800">
                      Passport Information
                    </h2>

                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                      Optional
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label
                        htmlFor="passportNumber"
                        className="flex items-center gap-2"
                      >
                        <Hash className="h-4 w-4 text-blue-500" />
                        Passport Number
                      </Label>

                      <Input
                        id="passportNumber"
                        autoComplete="off"
                        value={formData.passportNumber}
                        onChange={(event) =>
                          handleInputChange(
                            "passportNumber",
                            event.target.value
                          )
                        }
                        placeholder="Passport number"
                        className={INPUT_CLASS}
                        maxLength={50}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="passportIssueDate">
                        Issue Date
                      </Label>

                      <Input
                        id="passportIssueDate"
                        type="date"
                        value={formData.passportIssueDate}
                        onChange={(event) =>
                          handleInputChange(
                            "passportIssueDate",
                            event.target.value
                          )
                        }
                        max={getTodayLocalDate()}
                        className={INPUT_CLASS}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="passportExpiryDate">
                        Expiry Date
                      </Label>

                      <Input
                        id="passportExpiryDate"
                        type="date"
                        value={formData.passportExpiryDate}
                        onChange={(event) =>
                          handleInputChange(
                            "passportExpiryDate",
                            event.target.value
                          )
                        }
                        min={
                          formData.passportIssueDate ||
                          undefined
                        }
                        className={INPUT_CLASS}
                      />
                    </div>
                  </div>
                </section>

                {/* Additional Message */}
                <section className="space-y-3">
                  <Label
                    htmlFor="message"
                    className="flex items-center gap-2"
                  >
                    <FileText className="h-4 w-4 text-blue-500" />
                    Additional Message
                  </Label>

                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(event) =>
                      handleInputChange(
                        "message",
                        event.target.value
                      )
                    }
                    placeholder="Describe your concerns or provide any additional information..."
                    rows={4}
                    maxLength={2000}
                    className="resize-y border-2 border-gray-200 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />

                  <p className="text-right text-xs text-gray-500">
                    {formData.message.length}/2000
                  </p>
                </section>

                {/* Submit */}
                <div className="border-t border-gray-200 pt-6">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-14 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-base font-semibold shadow-lg transition-all hover:from-blue-700 hover:to-purple-700 disabled:cursor-not-allowed disabled:opacity-60 sm:text-lg"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-3">
                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Submitting Your Booking...
                      </span>
                    ) : (
                      "Book Appointment"
                    )}
                  </Button>

                  <p className="mt-3 text-center text-xs text-gray-500">
                    Please review your details before
                    submitting your appointment request.
                  </p>
                </div>
              </form>
            )}
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-sm text-gray-500">
          Need help? Please contact our medical team for
          assistance with your appointment.
        </p>
      </div>
    </div>
  );
}
