
import GalleryPage from '@/components/Gallery/GalleryPage'
import Footer from '@/components/Home/ui/footer'
import React from 'react'

const page = () => {
  return (
    <div>
      <GalleryPage/>
    <div className="my-16" /> {/* Adds vertical space */}
    
          <Footer />
        </div>
  )
}

export default page