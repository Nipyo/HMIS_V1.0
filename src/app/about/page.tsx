import AboutPage from "@/components/About/AboutPage";
import MedicalNav from "@/components/Home/components/MedicalNav";
import Footer from "@/components/Home/ui/footer";
import React from "react";

const Page = () => {
  return (
    <div>
      <div>
        <MedicalNav />
      </div>

      <div className="my-16" /> {/* Adds vertical space */}

      <AboutPage />

      <div className="my-16" /> {/* Adds vertical space */}

      <Footer />
    </div>
  );
};

export default Page;

