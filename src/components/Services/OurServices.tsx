import Image from "next/image"

const services = [
  {
    title: "Specialist Consultation",
    description: "Most experienced medical professionals in the city.",
    buttonText: "Read More",
    bgColor: "#fef9e7",
    imageSrc: "specialist.svg",
  },
  {
    title: "Scheduled Booking",
    description: "Schedule your test in seconds, stay healthy for years.",
    buttonText: "Read More",
    bgColor: "#e8f7f0",
    imageSrc: "schedule.svg",
  },
  {
    title: "Diagnostic Services",
    description: "Get in touch with our medical center for inquiries or support.",
    buttonText: "Read More",
    bgColor: "#ffeee6",
    imageSrc: "diagnostic.svg",
  },
  {
    title: "Medical Examinations",
    description: "Goverment-approved immigration medical center.",
    buttonText: "Read More",
    bgColor: "#e6f0ff",
    imageSrc: "Medicalexaminations.svg",
  },
]

export default function OurServices() {
  return (
    <div className="bg-[#f5f7ff] py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-[#00857c] text-base font-medium mb-2">Our Services</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900">Smart booking. Quick testing. Fast results.</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="rounded-lg p-6 flex flex-col h-full"
              style={{ backgroundColor: service.bgColor }}
            >
              <h4 className="text-xl font-semibold text-gray-900 mb-2 text-center">{service.title}</h4>
              <p className="text-gray-700 text-sm mb-6 text-center flex-grow">{service.description}</p>

              <div className="flex justify-center mb-6">
                <button className="bg-white text-gray-900 px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors">
                  {service.buttonText}
                </button>
              </div>

              <div className="mt-auto flex justify-center">
                <Image
                  src={service.imageSrc || "/placeholder.svg"}
                  alt={service.title}
                  width={200}
                  height={150}
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
