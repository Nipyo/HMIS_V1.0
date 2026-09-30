import EnhancePage from "./EnhancedPage";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      {/* About Section */}
      <section className="mx-auto mb-16 max-w-4xl">
        <h2 className="mb-8 text-center text-4xl font-bold">
          Welcome to Nippon Medical Center
        </h2>

        <div className="prose prose-lg max-w-none">
          <p>
            A specialized medical center dedicated to providing comprehensive
            medical examinations for Japanese Visa applications. Our facility
            is staffed by experienced medical professionals who understand the
            specific requirements of the Japanese Immigration Bureau. Nippon
            Medical is a medical center situated in its own multi-storied
            building, Sherchan Plaza, Balaju, Kathmandu, which was established
            in 2066 B.S. and legalized medical centre with its Govt. Regd. No:
            69847/066/067. It is primarily run and managed by Bishow Sherchan,
            who is fully experienced in this arena as he has been accumulating
            health-related knowledge nationally and internationally for more
            than thirty years.
          </p>

          <p>
            It conducts humanitarian activities to address the agonies of
            people. We have launched different packages of health services like
            preventive, curative, and promotional health services, sanitation
            campaigns, nutrition programs, safe motherhood, etc. We have also
            imparted knowledge about STD and preventive methods for the
            longevity of people's lives.
          </p>

          <p>
            It provides guidance and counseling to people who want to go abroad
            for study. It also provides Japanese language training to those who
            are keen on going to Japan for abroad study by Mrs. Rashmi Gauchan,
            who returned to Nepal after studying in Japan.
          </p>

          <p>
            Besides this, it has been conducting workshops for creating
            awareness in remote areas and addressing superstition for the
            smooth running of society irrespective of caste, culture, language,
            religion, etc. This can be a milestone in the context of our
            country to maintain brotherhood among people. It can also function
            positively to practice the slogan "Unity in Diversity" aptly in
            our country.
          </p>

          <p>
            These activities are also purposeful in creating awareness among
            illiterate villagers about maintaining good health. It aims to
            motivate people to participate in physical activities and
            meditation while realizing their importance for good health.
          </p>

          <p>
            Founded in 2010, we have helped thousands of foreign nationals
            complete their medical examinations for visa applications. Our
            success is built on our commitment to excellence, attention to
            detail, and understanding of the unique needs of people migrating
            abroad.
          </p>
        </div>
      </section>

      {/* Enhanced Page */}
      <div className="px-4 py-8">
        <EnhancePage />
      </div>

      {/* Medical Team */}
      <section className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-bold">
          Our Medical Team
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <TeamMember
            name="Dr. Anuj Shrestha"
            position="Orthopaedics, MBBS, Nepal"
            image="/DrAnujshrestha.png"
            bio="Dr. Shrestha has over 20 years of experience in orthopaedics medicine and has specialized in visa medical examinations for the past few decades."
          />

          <TeamMember
            name="Dr. Sudhar Prasad Adhikari"
            position="Senior Radiologist and Ultrasonologist"
            image="/DrSudharPrasadAdhikari.png"
            bio="Dr. Adhikari is bilingual in English and Nepali and specializes in Radiography and Imaging with extensive experience in immigration medical requirements."
          />

          <TeamMember
            name="Dr. Leesa Gauchan"
            position="Head Pathologist"
            image="/drleesa.jpg"
            bio="Mrs Gauchan coordinates our laboratory examination process and ensures all patients receive accurate and precise health results."
          />
        </div>
      </section>

      {/* Facilities */}
      <section className="mb-16 rounded-lg bg-muted py-12 text-center">
        <h2 className="mb-6 text-3xl font-bold">
          Our Facilities
        </h2>

        <p className="mx-auto mb-8 max-w-2xl text-xl">
          Our modern medical center is equipped with state-of-the-art
          diagnostic equipment to provide comprehensive examinations for your
          visa application.
        </p>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3">
          {/* Examination Rooms */}
          <div className="overflow-hidden rounded-lg bg-white shadow-sm">
            <div className="aspect-video">
              <Image
                src="/Carousel.png"
                alt="Examination Room"
                width={300}
                height={200}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="p-4">
              <h3 className="mb-2 font-semibold">
                Examination Rooms
              </h3>

              <p className="text-muted-foreground">
                Private and comfortable examination rooms for your medical
                check-up.
              </p>
            </div>
          </div>

          {/* Diagnostic Equipment */}
          <div className="overflow-hidden rounded-lg bg-white shadow-sm">
            <div className="aspect-video">
              <Image
                src="/Carousel3.png"
                alt="X-Ray Equipment"
                width={300}
                height={200}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="p-4">
              <h3 className="mb-2 font-semibold">
                Diagnostic Equipment
              </h3>

              <p className="text-muted-foreground">
                Modern X-ray and laboratory equipment for accurate diagnostics.
              </p>
            </div>
          </div>

          {/* Waiting Area */}
          <div className="overflow-hidden rounded-lg bg-white shadow-sm">
            <div className="relative aspect-video">
              <Image
                src="/reception.png"
                alt="Waiting Area"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 300px"
                className="object-cover"
              />
            </div>

            <div className="p-4">
              <h3 className="mb-2 font-semibold">
                Comfortable Waiting Area
              </h3>

              <p className="text-muted-foreground">
                Relaxing environment with multilingual staff to assist you.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* --------------------------------
   Team Member Component
--------------------------------- */

interface TeamMemberProps {
  name: string;
  position: string;
  image: string;
  bio: string;
}

function TeamMember({
  name,
  position,
  image,
  bio,
}: TeamMemberProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Doctor Image */}
      <div className="relative aspect-square w-full">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
      </div>

      {/* Doctor Information */}
      <div className="p-6">
        <h3 className="mb-1 text-xl font-semibold">
          {name}
        </h3>

        <p className="mb-3 font-medium text-primary">
          {position}
        </p>

        <p className="text-gray-600">
          {bio}
        </p>
      </div>
    </div>
  );
}
