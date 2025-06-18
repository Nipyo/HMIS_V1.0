"use client"

import { useEffect, useState } from "react"
import {
  Eye,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
  MoreHorizontal,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { Input } from "../ui/input"
import { Badge } from "../ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Button } from "../ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/AlertDialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

type Booking = {
  id: number
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
  status: string
  createdAt: Date
  doctor: string
  department: string
}

// Define raw booking data from API before transformation
interface RawBooking {
  id: number
  fullName: string
  email: string
  dateOfBirth: string
  appointmentDate?: string
  appointment_date?: string
  date?: string
  message: string
  phoneNumber: string
  passportNumber: string
  passportIssueDate: string
  passportExpiryDate: string
  gender: string
  age: string
  status: string
  createdAt: string
  doctor: string
  department: string
}

export default function BookingsTable() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortField, setSortField] = useState<"appointmentDate" | "fullName">("appointmentDate")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const itemsPerPage = 10

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("https://api.nippon-medical.com/api/Booking/getall")

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        const bookingsData: RawBooking[] = Array.isArray(data)
          ? data
          : data.bookings || data.data || []

        const transformedBookings: Booking[] = bookingsData.map((booking) => ({
          ...booking,
          appointmentDate: new Date(
            booking.appointmentDate || booking.appointment_date || booking.date || ""
          ),
          dateOfBirth: new Date(booking.dateOfBirth),
          passportIssueDate: new Date(booking.passportIssueDate),
          passportExpiryDate: new Date(booking.passportExpiryDate),
          createdAt: new Date(booking.createdAt),
        }))

        setBookings(transformedBookings)
        setError(null) // clear error on success
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch bookings")
        console.error("Error fetching bookings:", err)
      }
    }

    fetchBookings()
  }, [])

  const filteredBookings = bookings
    .filter((booking) =>
      [booking.fullName, booking.email, booking.passportNumber].some((field) =>
        field.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .filter((booking) => (statusFilter !== "all" ? booking.status === statusFilter : true))
    .sort((a, b) => {
      if (sortField === "appointmentDate") {
        return sortDirection === "asc"
          ? a.appointmentDate.getTime() - b.appointmentDate.getTime()
          : b.appointmentDate.getTime() - a.appointmentDate.getTime()
      }
      if (sortField === "fullName") {
        return sortDirection === "asc"
          ? a.fullName.localeCompare(b.fullName)
          : b.fullName.localeCompare(a.fullName)
      }
      return 0
    })

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage)
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleSort = (field: "appointmentDate" | "fullName") => {
    setSortDirection(sortField === field && sortDirection === "asc" ? "desc" : "asc")
    setSortField(field)
  }

  const handleView = (id: number) => router.push(`/booking/${id}`)
  const handleEdit = (id: number) => router.push(`/bookings/${id}/edit`)
  const handleDelete = (id: number) => {
    setBookings((prev) => prev.filter((booking) => booking.id !== id))
  }

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, string> = {
      confirmed: "bg-green-500",
      pending: "bg-yellow-500",
      cancelled: "bg-red-500",
      completed: "bg-blue-500",
    }
    const badgeClass = statusMap[status] || "bg-gray-500"
    return (
      <Badge className={`${badgeClass} text-white`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  return (
    <div className="space-y-4">
      {/* Show error message if any */}
      {error && (
        <div className="text-red-600 bg-red-100 p-3 rounded-md">
          Error: {error}
        </div>
      )}

      {/* Filter */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search bookings..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              {["all", "confirmed", "pending", "cancelled", "completed"].map((status) => (
                <SelectItem key={status} value={status}>
                  {status === "all" ? "All Statuses" : status.charAt(0).toUpperCase() + status.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm("")
              setStatusFilter("all")
            }}
          >
            Reset
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">#</TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("fullName")}>
                Patient Name {sortField === "fullName" && (sortDirection === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("appointmentDate")}>
                Appointment Date {sortField === "appointmentDate" && (sortDirection === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedBookings.length > 0 ? (
              paginatedBookings.map((booking, index) => (
                <TableRow key={booking.id}>
                  <TableCell>{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
                  <TableCell>{booking.fullName}</TableCell>
                  <TableCell>{booking.email}</TableCell>
                  <TableCell>{format(booking.appointmentDate, "PPP")}</TableCell>
                  <TableCell>{getStatusBadge(booking.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleView(booking.id)} title="View Details">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(booking.id)} title="Edit Booking">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" title="Delete Booking">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. It will permanently delete the booking for{" "}
                              <strong>{booking.fullName}</strong>.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(booking.id)}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Cancel Booking</DropdownMenuItem>
                          <DropdownMenuItem>Reschedule</DropdownMenuItem>
                          <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  No bookings found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing {paginatedBookings.length ? (currentPage - 1) * itemsPerPage + 1 : 0} to{" "}
          {Math.min(currentPage * itemsPerPage, filteredBookings.length)} of {filteredBookings.length} bookings
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">
            Page {currentPage} of {totalPages || 1}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
