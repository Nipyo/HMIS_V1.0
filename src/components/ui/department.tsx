import Image from "next/image"

const departments = [
  {
    title: "Cardiology",
    description:
      "Book trusted cardiology tests in seconds. Accurate results, expert labs, and fast reporting — because your heart health can't wait.",
    image: "Cardiology.svg",
    bgColor: "bg-orange-50",
  },
  {
    title: "Radiology and Imaging",
    description:
      "Schedule advanced radiology and imaging tests easily. Trusted centers, fast reports, and expert diagnostics — clarity and care, right on time.",
    image: "Radiology.svg",
    bgColor: "bg-purple-50",
  },
  {
    title: "ENT-Head",
    description:
      "Book ENT-Head tests quickly and confidently. Trusted diagnostics, expert analysis, and fast results — because every detail of health matters.",
    image: "ENT.svg",
    bgColor: "bg-pink-50",
  },
  {
    title: "Laboratory & Pathology",
    description:
      "Book lab and pathology tests with ease. Accurate reports, certified labs, and timely insights — your health, tested and trusted.",
    image: "Labandpath.svg",
    bgColor: "bg-yellow-50",
  },
]

export default function Departments() {
  return (
    <div className="bg-[#f5f7ff] py-16">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-[#00a896] text-3xl font-bold text-center mb-16">Departments</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {departments.map((department, index) => (
            <div
              key={index}
              className={`rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow ${department.bgColor}`}
            >
              <div className="p-4">
                <Image
                  src={department.image || "/placeholder.svg"}
                  alt={department.title}
                  width={200}
                  height={150}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{department.title}</h3>
                <p className="text-gray-700 text-sm">{department.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
