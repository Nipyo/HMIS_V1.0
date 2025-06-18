"use client"

import MedicalNav from "../Home/components/MedicalNav";


export default function ServicesPage() {

  const services = [
    {
      id: "immigration-medical",
      title: "Immigration Medical Examinations",
      description: "Comprehensive medical exams required for visa applications, immigration, and overseas employment.",
      features: [
        "Approved by multiple embassies and governments",
        "Includes physical exam, blood tests, chest X-ray",
        "Same-day results available",
      ],
      icon: "🛂",
      prices: [
        { name: "Basic Immigration Exam", price: "रु4,500" },
        { name: "Premium Package (with additional tests)", price: "रु7,200" },
        { name: "Express Service (same-day results)", price: "रु6,000" },
      ],
    },
    {
      id: "health-checkup",
      title: "Country-specific Health Checkups",
      description: "Thorough annual health examinations following Global medical standards.",
      features: [
        "Complete blood work and urinalysis",
        "ECG and abdominal ultrasound",
        "Drug Detection Test",
        "Detailed Country-wise report",
      ],
      icon: "🩺",
      prices: [
        { name: "Basic Health Check", price: "रु5,500" },
        { name: "Executive Package", price: "रु9,500" },
        { name: "Comprehensive Screening", price: "रु12,500" },
      ],
    },
    {
      id: "vaccination",
      title: "Vaccination Services",
      description: "International travel vaccines and routine immunizations.",
      features: [
        "Yellow Fever certified center",
        "Sexually Transmitted Diseases series",
        "Hepatitis series",
        "COVID-19 vaccines",
      ],
      icon: "💉",
      prices: [
        { name: "Yellow Fever Vaccine", price: "रु7,500" },
        { name: "Mantoux TST Test", price: "रु1,500" },
        { name: "Hepatitis A/B Series", price: "रु2,500 per dose" },
        { name: "MMR Vaccine", price: "रु1,200" },
        { name: "TPHA Vaccine", price: "रु1,200" },
      ],
    },
  ]

  const handleBookService = () => {
  window.location.href = "/booking";
};


  const handleBookOnline = () => {
  window.location.href = "/booking";
};

  return (
      <div className="min-h-screen flex flex-col pt-20 bg-white" >
      <MedicalNav />
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        {/* Hero Section */}
        <section className="py-12 text-center">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">Our Medical Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive healthcare services combining Global medical standards with local expertise
          </p>
        </section>

        {/* Services Grid */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h2 className="text-2xl font-semibold text-blue-700 mb-3">{service.title}</h2>
                  <p className="text-gray-700 mb-4">{service.description}</p>

                  <div className="mb-4">
                    <h3 className="font-medium text-gray-900 mb-2">Service Includes:</h3>
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <svg
                            className="h-5 w-5 text-teal-500 mr-2 mt-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Pricing:</h3>
                    <ul className="space-y-2">
                      {service.prices.map((item, i) => (
                        <li key={i} className="flex justify-between">
                          <span className="text-gray-700">{item.name}</span>
                          <span className="font-medium text-blue-600">{item.price}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                  <button
                    onClick={() => handleBookService()}
                    className="text-teal-600 font-medium hover:text-teal-700 flex items-center transition-colors"
                  >
                    Book this service
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Price Disclaimer */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>Note:</strong> Prices are subject to change without prior notice. Some services may require
                additional tests or procedures with separate fees. Contact us for exact pricing based on your specific
                requirements.
              </p>
            </div>
          </div>
        </div>

        {/* Appointment CTA */}
        <section className="bg-blue-50 rounded-xl p-8 mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-semibold text-blue-800 mb-4">Need help choosing a service?</h2>
            <p className="text-gray-700 mb-6 text-lg">
              Our medical coordinators can help you select the right package for your needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={handleBookOnline}
                className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Book Online
              </button>
              <a
                href="tel:+9779851065231"
                className="bg-white hover:bg-gray-50 text-blue-700 font-medium py-3 px-6 rounded-lg border border-blue-200 transition-colors inline-block"
              >
                Call Us: +977 9851065231
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
