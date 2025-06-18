
import ContactForm from "@/components/Contact/ContactForm";
import Footer from "@/components/Home/ui/footer";
import React from "react";

const page = () => {
  return (
    <div>
      <ContactForm />
    <div className="my-16" /> {/* Adds vertical space */}
    
          <Footer />
        </div>
  );
};

export default page;
