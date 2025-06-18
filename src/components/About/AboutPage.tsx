import type React from "react";
import EnhancePage from "./EnhancedPage";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <section className="max-w-4xl mx-auto mb-16">
        <h2 className="text-4xl font-bold mb-8 text-center">
          Welcome to Nippon Medical Center
        </h2>
        <div className="prose prose-lg max-w-none">
          <p>
            A specialized medical center dedicated to providing comprehensive
            medical examinations for Japanese Visa applications. Our facility is
            staffed by experienced medical professionals who understand the
            specific requirements of the Japanese Immigration Bureau. Nippon
            Medical is a medical center situated its own multi-storied
            building-Sherchan plaza balaju, Kathmandu which was established in
            2066 B.S. and legalized medical centre with its Govt.Regd no:
            69847/066/067 which is primarily runned and managed by Bishow
            sherchan who is fully experienced in this arena as he has been
            accumulating health related knowledge nationally and internationally
            for more than thirty years. It conducts the humanitarian actives to
            address the agonies of the agonized people. We have launched the
            different packages of health like : preventive, curative, and
            promotional health services, sanitation campaigns, nutrition
            programs ,safe motherhood etc. and also have imparted the knowledge
            about STD and about its preventive methods for the longevity of the
            life of the people . It provides guidance and counseling to the
            people who want to go for abroad study. It also provides Japanese
            language training to those who are keen on going to japan for abroad
            study by Mrs. Rashmi Gauchan who returned back to Nepal after
            studying in Japan. Besides this, it has been conducting workshops
            for creating awareness in remote areas for the disillusionment of
            superstition for the smooth running of the society irrespective of
            caste, culture, language, religion etc. which can be milestone in
            the context of our country to maintain brotherhood here among
            people. It can also function positively to practical zed the slogan
            “ unity in diversity” aptly in our country. This act is also
            purposeful to create awareness to the illiterate villager dwellers
            to maintain their sound health. It aims to motivate people to
            involve in physical activities and meditation realizing its
            importance for good health.
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

      <div className="px-4 py-8">
        <EnhancePage />
      </div>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Our Medical Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TeamMember
            name="Dr. Anuj Shrestha"
            position="Orthopaedics, MBBS, Nepal"
            image="/DrAnujshrestha.png?height=300&width=300"
            bio="Dr. Shrestha has over 20 years of experience in orthopaedics medicine and has specialized in visa medical examinations for the past few decades."
          />
          <TeamMember
            name="Dr. Sudhar Prasad Adhikari"
            position="Senior Radiologist and Ultrasonologist"
            image="/DrSudharPrasadAdhikari.png?height=300&width=300"
            bio="Dr. Adhikari is bilingual in English and Nepali and specializes in Radiography and Imaging with extensive experience in immigration medical requirements."
          />
          <TeamMember
            name="Dr. Leesa Gauchan"
            position="Head Pathologist"
            image="/drleesa.jpg?height=300&width=300"
            bio="Mrs Gauchan coordinates our laboratory examination process and ensures all patients receive accurate and precise health results."
          />
        </div>
      </section>

      <section className="bg-muted py-12 rounded-lg text-center mb-16">
        <h2 className="text-3xl font-bold mb-6">Our Facilities</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Our modern medical center is equipped with state-of-the-art diagnostic
          equipment to provide comprehensive examinations for your visa
          application.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            <div className="aspect-video">
              <Image
                src="/Carousel.png"
                alt="Examination Room"
                width={300}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-2">Examination Rooms</h3>
              <p className="text-muted-foreground">
                Private and comfortable examination rooms for your medical
                check-up.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            <div className="aspect-video">
              <Image
                src="/Carousel3.png"
                alt="X-Ray Equipment"
                width={300}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-2">Diagnostic Equipment</h3>
              <p className="text-muted-foreground">
                Modern X-ray and laboratory equipment for accurate diagnostics.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            <div className="aspect-video">
              <div className="relative w-full h-[200px]">
                <Image
                  src="/reception.png"
                  alt="Waiting Area"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-2">Comfortable Waiting Area</h3>
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

interface TeamMemberProps {
  name: string;
  position: string;
  image: string;
  bio: string;
}


 function TeamMember({ name, position, image, bio }: TeamMemberProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
      <div className="aspect-square">
        <div className="relative w-full h-full">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
          />

          <div className="aspect-square relative w-full h-full">
</div>

        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-1">{name}</h3>
        <p className="text-primary font-medium mb-3">{position}</p>
        <p className="text-gray-600">{bio}</p>
      </div>
    </div>
  );
 }
