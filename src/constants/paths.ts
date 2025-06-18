export const PATH = {
  HOME_PATH: "/",
  LOGIN_PATH: "/login",
  ABOUT_PATH: "/about",
  GALLERY_PATH: "/gallery",
  BLOG_PATH: "/blog",
  OUR_SERVICES_PATH: "/our-services",
  DASHBOARD_PATH: "/Dashboard",
  DASHBOARD_REGISTER_PATH: "/Dashboard/register",
  DASHBOARD_ACCOUNT_PATH: "/Dashboard/account",
  DASHBOARD_REPORTS_PATH: "/Dashboard/reports",
  DASHBOARD_E_HEALTH_PATH: "/Dashboard/alerts",
  DASHBOARD_ALERTS_PATH: "/Dashboard/alerts",
  DASHBOARD_BOOKINGS_PATH: "/Dashboard/bookings",
  DASHBOARD_SETTINGS_PATH:  "/Dashboard/settings",
  DASHBOARD_PROFILE_PATH: "/Dashboard/profile",
  CONTACT_PATH: "/contact-us",
  BOOKINGS_PATH: "/Dashboard/bookings",

  // Dynamic route generator for booking detail
  BOOKING_DETAIL: (id: string | number) => `/Dashboard/bookings/${id}`,
};
