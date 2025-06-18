"use client";

import { useDayPicker } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CustomNav() {
  const { previousMonth, nextMonth, goToMonth } = useDayPicker();

  if (!previousMonth && !nextMonth) return null; // safely return nothing if both are unavailable

  return (
    <div className="space-x-1 flex items-center absolute right-1 top-2">
      <button
        type="button"
        onClick={() => previousMonth && goToMonth(previousMonth)}
        disabled={!previousMonth}
        className="h-7 w-7 p-0 opacity-50 hover:opacity-100 disabled:opacity-20"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => nextMonth && goToMonth(nextMonth)}
        disabled={!nextMonth}
        className="h-7 w-7 p-0 opacity-50 hover:opacity-100 disabled:opacity-20"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
