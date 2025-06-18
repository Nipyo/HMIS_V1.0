import Image from "next/image";

const steps = [
  {
    icon: "calendar",
    title: "Book Appointment",
    description: "Schedule Your Visa Medical Examination Online Or By Phone.",
  },
  {
    icon: "stethoscope",
    title: "Medical Examination",
    description:
      "Complete Your Comprehensive Medical Check-Up With Our Professionals.",
  },
  {
    icon: "certificate",
    title: "Receive Certificate",
    description: "Get Your Medical Certificate For Your Visa Application.",
  },
];

export default function ExaminationProcess() {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-[#00a896] text-3xl font-bold text-center mb-16">
          Our Examination Process
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              {step.icon === "calendar" && (
                <div className="mb-6 text-[#ffc107]">
                  <Image
                    src="/appointment.gif"
                    alt="Book Appointment"
                    width={80}
                    height={80}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}

              {step.icon === "stethoscope" && (
                <div className="mb-6 text-[#00a896]">
                  <Image
                    src="/medical.gif"
                    alt="Book Appointment"
                    width={80}
                    height={80}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}

              {step.icon === "certificate" && (
                <div className="mb-6 text-[#4361ee]">
                  <Image
                    src="/certificate.gif"
                    alt="Book Appointment"
                    width={80}
                    height={80}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-700 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
