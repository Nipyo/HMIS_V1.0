"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Briefcase, ChevronDown, MapPin, TrendingDown, TrendingUp, Users } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import DashboardLayout from "./DashboardLayout"
import type { LucideIcon } from "lucide-react";

interface Booking {
  id: string
  fullName: string
  email: string
  appointmentDate: string
  appointmentTime: string
  serviceType: string
  status: string
  createdAt: string
}

function MetricCard({
  title,
  value,
  change,
  changeText,
  icon: Icon,
  iconBg,
  iconColor,
  isPositive,
}: {
  title: string
  value: string
  change: string
  changeText: string
  icon: LucideIcon;
  iconBg: string
  iconColor: string
  isPositive: boolean
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">{title}</p>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            <div className="flex items-center mt-2">
              {isPositive ? (
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
              )}
              <p className={`text-sm ${isPositive ? "text-green-500" : "text-red-500"}`}>
                {change} {changeText}
              </p>
            </div>
          </div>
          <div className={`w-12 h-12 rounded-full ${iconBg} flex items-center justify-center`}>
            <Icon className={`h-6 w-6 ${iconColor}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function SalesChart() {
  return (
    <svg className="w-full h-full" viewBox="0 0 800 300" preserveAspectRatio="none">
      <path
        d="M0,300 L0,180 C20,160 40,200 60,190 C80,180 100,120 120,140 C140,160 160,220 180,200 C200,180 220,100 240,120 C260,140 280,220 300,200 C320,180 340,120 360,140 C380,160 400,240 420,220 C440,200 460,100 480,80 C500,60 520,100 540,120 C560,140 580,180 600,160 C620,140 640,80 660,100 C680,120 700,180 720,160 C740,140 760,80 780,100 L800,100 L800,300 Z"
        fill="rgba(168, 85, 247, 0.4)"
      />
      <path
        d="M0,300 L0,220 C20,240 40,200 60,180 C80,160 100,200 120,220 C140,240 160,180 180,160 C200,140 220,220 240,240 C260,260 280,180 300,140 C320,100 340,160 360,180 C380,200 400,160 420,140 C440,120 460,180 480,200 C500,220 520,180 540,160 C560,140 580,200 600,220 C620,240 640,200 660,180 C680,160 700,220 720,240 C740,260 760,220 780,200 L800,200 L800,300 Z"
        fill="rgba(249, 115, 22, 0.4)"
      />
    </svg>
  )
}

function ApplicantsChart() {
  return (
    <svg className="w-full h-full" viewBox="0 0 800 300" preserveAspectRatio="none">
      <path
        d="M50,250 C100,230 150,200 200,180 C250,160 300,150 350,170 C400,190 450,150 500,130 C550,110 600,90 650,70 C700,50 750,30 780,20"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="3"
      />
      <path
        d="M50,270 C100,250 150,220 200,200 C250,180 300,170 350,190 C400,210 450,170 500,150 C550,130 600,110 650,90 C700,70 750,50 780,40"
        fill="none"
        stroke="#10b981"
        strokeWidth="3"
      />
    </svg>
  )
}

function RevenueChart() {
  return (
    <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
      <line x1="0" y1="100" x2="800" y2="100" stroke="#e5e7eb" strokeDasharray="5,5" />
      <path d="M350,100 L350,40 L370,40 L370,100 Z" fill="#3b82f6" />
      <circle cx="100" cy="100" r="3" fill="#3b82f6" />
      <circle cx="200" cy="100" r="3" fill="#3b82f6" />
      <circle cx="500" cy="100" r="3" fill="#3b82f6" />
      <circle cx="600" cy="100" r="3" fill="#3b82f6" />
      <circle cx="700" cy="100" r="3" fill="#3b82f6" />
    </svg>
  )
}

export default function DashboardPage() {
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null)

  useEffect(() => {
    // Check for current booking
    const bookingId = localStorage.getItem("currentBookingId")
    if (bookingId) {
      const bookingData = localStorage.getItem(`booking_${bookingId}`)
      if (bookingData) {
        setCurrentBooking(JSON.parse(bookingData))
      }
    }
  }, [])

  return (
    <DashboardLayout>

      <div className="p-6 bg-gray-50">
        {/* Show booking notification if exists */}
        {currentBooking && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="text-green-800 font-medium">Recent Booking Confirmed!</h3>
            <p className="text-green-600 text-sm">
              Booking ID: {currentBooking.id} - Your appointment has been successfully scheduled.
            </p>
          </div>
        )}

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <MetricCard
            title="Registered Applicants"
            value="30"
            change="+8.5%"
            changeText="Up from yesterday"
            icon={Users}
            iconBg="bg-purple-100"
            iconColor="text-purple-600"
            isPositive
          />
          <MetricCard
            title="Top Location"
            value="Japan"
            change="+1.3%"
            changeText="Up from past week"
            icon={MapPin}
            iconBg="bg-yellow-100"
            iconColor="text-yellow-600"
            isPositive
          />
          <MetricCard
            title="Total Sales"
            value="89,000"
            change="-4.3%"
            changeText="Down from yesterday"
            icon={TrendingUp}
            iconBg="bg-green-100"
            iconColor="text-green-600"
            isPositive={false}
          />
          <MetricCard
            title="Total Expense"
            value="50,000"
            change="+1.8%"
            changeText="Up from yesterday"
            icon={Briefcase}
            iconBg="bg-red-100"
            iconColor="text-red-600"
            isPositive
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Sales</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      October
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>January</DropdownMenuItem>
                    <DropdownMenuItem>February</DropdownMenuItem>
                    <DropdownMenuItem>March</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <SalesChart />
              </div>
              <div className="flex justify-center space-x-8 mt-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-purple-400 mr-2" />
                  <span className="text-sm">Sales</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-orange-400 mr-2" />
                  <span className="text-sm">Profit</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Total Registered Applicants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ApplicantsChart />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full">
              <RevenueChart />
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>

  )
}
