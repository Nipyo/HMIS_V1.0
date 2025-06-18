
import { CalendarDays, Clock, User } from "lucide-react";
import MedicalNav from "../Home/components/MedicalNav";

export default function BlogPage() {
  const featuredPost = {
    title: "Understanding Japanese-Style Health Checkups: What to Expect",
    excerpt:
      "Learn how Japanese health screenings differ from standard checkups and why they're considered among the most thorough in the world.",
    category: "Preventive Care",
    date: "May 15, 2025",
    readTime: "5 min read",
    author: "Dr. Taro Yamada",
    image: "/images/blog/health-checkup.jpg",
    slug: "understanding-japanese-health-checkups",
  };

  const categories = [
    "All Articles",
    "Preventive Care",
    "Immigration Health",
    "Vaccinations",
    "Mental Health",
    "Living Abroad",
  ];

  const blogPosts = [
    {
      title: "Essential Vaccines for Expats in Southeast Asia",
      excerpt:
        "A comprehensive guide to recommended vaccinations for foreigners living in tropical climates.",
      category: "Vaccinations",
      date: "April 28, 2025",
      readTime: "4 min read",
      author: "Dr. Maria Santos",
      slug: "vaccines-for-expats-sea",
    },
    {
      title: "Mental Care Differences: Nepal vs World",
      excerpt:
        "Comparing Mental health approaches and what patients should know when transitioning between systems.",
      category: "Mental Health",
      date: "April 15, 2025",
      readTime: "6 min read",
      author: "Dr. Hiroshi Tanaka",
      slug: "mental-health-nepal-world",
    },
    {
      title: "Preparing for Your Immigration Medical Exam",
      excerpt:
        "Step-by-step guide to help applicants prepare for their required immigration health assessment.",
      category: "Immigration Health",
      date: "March 30, 2025",
      readTime: "3 min read",
      author: "Dr. Juan Dela Cruz",
      slug: "preparing-immigration-exam",
    },
    {
      title: "Managing Stress While Living Abroad",
      excerpt:
        "Practical tips for maintaining mental health when adjusting to life in a new country.",
      category: "Living Abroad",
      date: "March 22, 2025",
      readTime: "7 min read",
      author: "Dr. Aiko Nakamura",
      slug: "managing-stress-abroad",
    },
    {
      title: "Annual Health Checks: Why They Matter",
      excerpt:
        "The importance of regular health screenings and early detection of potential issues.",
      category: "Preventive Care",
      date: "February 18, 2025",
      readTime: "5 min read",
      author: "Dr. Taro Yamada",
      slug: "annual-health-checks",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col pt-20 bg-white">
      <MedicalNav />
      <main className="flex-1">
        {/* Blog Header */}
        <section className="bg-blue-50 py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-4xl font-bold text-blue-800 mb-4">
              Nippon Medical Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              Health insights, medical updates, and tips for living well.
              Explore our articles to stay informed about your health and
              wellness.
            </p>
          </div>
        </section>

        {/* Featured Post */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">
            Featured Article
          </h2>
          <div className="bg-white rounded-xl shadow-md overflow-hidden md:flex">
            <div className="md:w-1/2">
              <div className="bg-gray-200 h-full flex items-center justify-center text-gray-500">
                Featured Post Image
              </div>
            </div>
            <div className="p-8 md:w-1/2">
              <div className="uppercase tracking-wide text-sm text-teal-600 font-semibold mb-1">
                {featuredPost.category}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {featuredPost.title}
              </h3>
              <p className="text-gray-700 mb-4">{featuredPost.excerpt}</p>

              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {featuredPost.author}
                </div>
                <div className="flex items-center">
                  <CalendarDays className="h-4 w-4 mr-1" />
                  {featuredPost.date}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {featuredPost.readTime}
                </div>
              </div>

              <button className="inline-flex items-center text-teal-600 font-medium hover:text-teal-700">
                Read full article
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* Blog Content */}
        <section className="max-w-7xl mx-auto px-6 pb-16">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Main Content */}
            <div className="md:w-2/3">
              {/* Categories */}
              <div className="flex flex-wrap gap-2 mb-8">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      index === 0
                        ? "bg-teal-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Blog Posts */}
              <div className="space-y-8">
                {blogPosts.map((post, index) => (
                  <article
                    key={index}
                    className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="inline-block px-3 py-1 text-xs font-semibold text-teal-600 bg-teal-50 rounded-full mb-2">
                            {post.category}
                          </span>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {post.title}
                          </h3>
                          <p className="text-gray-700 mb-4">{post.excerpt}</p>
                        </div>
                        <div className="bg-gray-200 h-16 w-16 flex-shrink-0 rounded-md flex items-center justify-center text-gray-500 ml-4">
                          Thumbnail
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            {post.author}
                          </div>
                          <div className="flex items-center">
                            <CalendarDays className="h-4 w-4 mr-1" />
                            {post.date}
                          </div>
                        </div>
                        <button className="text-sm text-teal-600 font-medium hover:text-teal-700">
                          Read more →
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-12">
                <nav className="flex items-center space-x-2">
                  <button className="px-3 py-1 rounded-md bg-gray-100 text-gray-500 hover:bg-gray-200">
                    Previous
                  </button>
                  <button className="px-3 py-1 rounded-md bg-teal-600 text-white">
                    1
                  </button>
                  <button className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200">
                    2
                  </button>
                  <button className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200">
                    3
                  </button>
                  <span className="px-2 text-gray-500">...</span>
                  <button className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200">
                    8
                  </button>
                  <button className="px-3 py-1 rounded-md bg-gray-100 text-gray-500 hover:bg-gray-200">
                    Next
                  </button>
                </nav>
              </div>
            </div>

            {/* Sidebar */}
            <div className="md:w-1/3 space-y-8">
              {/* Newsletter */}
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Health Newsletter
                </h3>
                <p className="text-gray-700 text-sm mb-4">
                  Get monthly health tips and clinic updates directly to your
                  inbox.
                </p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md"
                  >
                    Subscribe
                  </button>
                </form>
              </div>

              {/* Popular Posts */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Popular Articles
                </h3>
                <ul className="space-y-4">
                  {blogPosts.slice(0, 3).map((post, index) => (
                    <li
                      key={index}
                      className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                    >
                      <a href="#" className="group">
                        <h4 className="text-base font-medium text-gray-900 group-hover:text-teal-600 mb-1">
                          {post.title}
                        </h4>
                        <div className="flex items-center text-xs text-gray-500">
                          <CalendarDays className="h-3 w-3 mr-1" />
                          {post.date}
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Categories */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Categories
                </h3>
                <ul className="space-y-2">
                  {categories.slice(1).map((category, index) => (
                    <li key={index}>
                      <a
                        href="#"
                        className="flex items-center justify-between text-gray-700 hover:text-teal-600 py-2"
                      >
                        <span>{category}</span>
                        <span className="bg-gray-100 text-gray-500 text-xs font-medium px-2 py-1 rounded-full">
                          {
                            blogPosts.filter(
                              (post) => post.category === category
                            ).length
                          }
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
