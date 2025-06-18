import AboutUs from "@/components/About/AboutUs";
import LatestNews from "@/components/Blog/LatestNews";
import BookingCTA from "@/components/Bookings/ui/BookingCTA";
import HeroSection from "@/components/Home/components/HeroSection";
import MedicalNav from "@/components/Home/components/MedicalNav";
import ExaminationProcess from "@/components/Home/ui/ExaminationProcess";
import Footer from "@/components/Home/ui/footer";

import OurServices from "@/components/Services/OurServices";
import Departments from "@/components/ui/department";

export default function Home() {
  return (
    <>
      <MedicalNav />
      <HeroSection />
      <AboutUs />
      <OurServices />
      <ExaminationProcess />
      <Departments />
      <BookingCTA />
      <LatestNews />
      <Footer />
    </>
  );
}
