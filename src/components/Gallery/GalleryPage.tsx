"use client"

import Image from "next/image"
import MedicalNav from "../Home/components/MedicalNav"


const galleryImages = [
  { src: "/gallery/img1.jpg", alt: "Medical interior" },
  { src: "/gallery/img2.jpg", alt: "Consultation room" },
  { src: "/gallery/img3.jpg", alt: "Doctor room" },
  { src: "/gallery/img4.jpg", alt: "Reception area" },
  { src: "/gallery/img5.jpg", alt: "Medical staff" },
  { src: "/gallery/img6.jpg", alt: "Biometrics" },
]

export default function GalleryPage() {
  return (
    <div>
      <MedicalNav/>
    <main className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Gallery</h1>
          <p className="text-gray-600 text-lg">
            Explore the modern facilities and compassionate environment of Nippon Medical Center
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {galleryImages.map((image, idx) => (
            <div
              key={idx}
              className="overflow-hidden rounded-xl shadow hover:shadow-lg transition duration-300"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={500}
                height={350}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </main>
    </div>
  )
}
