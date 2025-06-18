// Simple date formatting functions to replace date-fns
export function format(date: Date, formatStr: string): string {
  if (!date || !(date instanceof Date)) {
    return ""
  }

  switch (formatStr) {
    case "PPP":
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    case "p":
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    case "PP":
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    default:
      return date.toLocaleDateString()
  }
}
