
import BlogPage from "@/components/Blog/BlogPage";
import Footer from "@/components/Home/ui/footer";
import React from "react";

const page = () => {
  return (
    <div>
      <BlogPage></BlogPage>
      <div className="my-16" /> {/* Adds vertical space */}
      
            <Footer />
          </div>
  );
};

export default page;
