import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { PATH } from "@/constants/paths";

export default function AboutUs() {
  return (
    <div className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-[#00857c] text-sm font-medium mb-2">
              About Us
            </h2>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Nippon Medical Centre
            </h3>
            <p className="text-gray-700 text-sm md:text-base mb-6">
              Nippon Medical is a medical center situated its own multi-storied
              building-Sherchan plaza balaju, Kathmandu which was established in
              2066 B.S. and legalized medical centre with its Govt.Regd no:
              69847/066/067 which is primarily runned and managed by Bishow
              sherchan who is fully experienced in this arena as he has been
              accumulating health related knowledge nationally and
              internationally for more than thirty years. It conducts the
              humanitarian actives to address the agonies of the agonized
              people. We have launched the different packages of health like :
              preventive, curative, and promotional health services, sanitation
              campaigns, nutrition programs ,safe motherhood etc. and also have
              imparted the knowledge about STD and about its preventive methods
              for the longevity of the life of the people . It provides guidance
              and counseling to the people who want to go for abroad study. It
              also provides Japanese language training to those who are keen on
              going to japan for abroad study by Mrs. Rashmi Gauchan who
              returned back to Nepal after studying in Japan. Besides this, it
              has been conducting workshops for creating awareness in remote
              areas for the disillusionment of superstition for the smooth
              running of the society irrespective of caste, culture, language,
              religion etc. which can be milestone in the context of our country
              to maintain brotherhood here among people. It can also function
              positively to practical zed the slogan “ unity in diversity” aptly
              in our country. This act is also purposeful to create awareness to
              the illiterate villager dwellers to maintain their sound health.
              It aims to motivate people to involve in physical activities and
              meditation realizing its importance for good health.
            </p>
            <p>
              Founded in 2010, we have helped thousands of foreign nationals
              complete their medical examinations for visa applications. Our
              success is built on our commitment to excellence, attention to
              detail, and understanding of the unique needs of people migrating
              abroad.
            </p>
            <Link href={PATH.ABOUT_PATH} passHref>
              <Button className="bg-[#00857c] hover:bg-[#006e66] text-white text-xs h-8 rounded">
                LEARN MORE
              </Button>
            </Link>
          </div>
          <div className="relative">
            <div className="relative z-10">
              <Image
                src="doctorfamily.svg"
                alt="Medical Centre Family"
                width={500}
                height={400}
                className="rounded-lg shadow-md object-cover w-full h-auto"
              />
            </div>
            <div className="absolute top-1/4 -right-4 z-0">
              <div className="grid grid-cols-6 gap-1">
                {[...Array(36)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-[#00857c] opacity-20"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
