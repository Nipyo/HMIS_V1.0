"use client"

import type React from "react"
import { useState } from "react"

import { Mail, MapPin, Phone } from "lucide-react"
import { Button } from "../ui/button"
import { Label } from "@radix-ui/react-label"
import { Textarea } from "../ui/textarea"
import { Input } from "../ui/input"
import MedicalNav from "../Home/components/MedicalNav"


export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
       <MedicalNav/>
        {/* Title */}
        <div className="text-center mb-12 mt-12">
          <h1 className="text-4xl font-extrabold text-gray-800">Get in Touch</h1>
          <p className="text-lg text-gray-600 mt-2 max-w-2xl mx-auto">
            Have a question or want to work together? We would love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Contact Information</h2>
            <p className="text-gray-600">Reach out to us through any of these channels:</p>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Mail className="h-6 w-6 text-teal-600" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-gray-600">support@nippon-medical.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Phone className="h-6 w-6 text-teal-600" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-sm text-gray-600">+9779851065231</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-teal-600" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-sm text-gray-600">
                    Balaju, Machhapokhari<br />
                    Kathmandu, Nepal 44600
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
  <form
    onSubmit={handleSubmit}
    className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 space-y-6"
  >
    <h2 className="text-2xl font-bold text-gray-900">Send us a Message</h2>
    <p className="text-gray-600">Fill out the form and we’ll get back to you within 24 hours.</p>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-medium text-gray-700">
          Full Name
        </Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="John Doe"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-400 transition"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email Address
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="john@example.com"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-400 transition"
        />
      </div>
    </div>

    <div className="space-y-2">
      <Label htmlFor="subject" className="text-sm font-medium text-gray-700">
        Subject
      </Label>
      <Input
        id="subject"
        name="subject"
        type="text"
        placeholder="How can we help you?"
        value={formData.subject}
        onChange={handleChange}
        required
        className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-400 transition"
      />
    </div>

    <div className="space-y-2">
      <Label htmlFor="message" className="text-sm font-medium text-gray-700">
        Message
      </Label>
      <Textarea
        id="message"
        name="message"
        placeholder="Tell us more about your inquiry..."
        value={formData.message}
        onChange={handleChange}
        required
        className="w-full min-h-[120px] rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-400 transition"
      />
    </div>

    <Button
      type="submit"
      className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition shadow-md"
    >
      Send Message
    </Button>
  </form>
</div>

        </div>
      </div>
    </section>
  )
}
