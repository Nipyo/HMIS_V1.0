import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const articles = [
  {
    image: "/innovative.svg?height=200&width=300",
    date: "June 10, 2023",
    title: "Advancements in Telemedicine",
    description: "Exploring the cutting-edge telehealth solutions shaping tomorrow's healthcare landscape.",
    category: "Healthcare",
  },
  {
    image: "/nature.svg?height=200&width=300",
    date: "May 25, 2023",
    title: "Nature-Inspired Medical Innovations",
    description: "How biomimicry and natural technologies integrate with modern medical treatments.",
    category: "Research",
  },
  {
    image: "/intersection.svg?height=200&width=300",
    date: "April 18, 2023",
    title: "The Intersection of Art and Medicine",
    description: "Exploring how art therapy and creative approaches are transforming contemporary healing.",
    category: "Health",
  },
]

export default function LatestNews() {
  return (
    <div className="bg-[#f5f7ff] py-16">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-[#00a896] text-3xl font-bold text-center mb-12">Latest News & Articles</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="relative h-48">
                <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-500 text-sm">{article.date}</span>
                  <span className="text-[#00a896] text-sm">{article.category}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{article.title}</h3>
                <p className="text-gray-700 text-sm mb-4">{article.description}</p>
                <div className="flex justify-between items-center">
                  <Link href="../blog" className="text-[#00a896] text-sm font-medium hover:underline">
                    Read More
                  </Link>
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <ArrowRight className="h-4 w-4 text-gray-500" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
