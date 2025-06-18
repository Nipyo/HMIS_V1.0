import { Stethoscope, Globe, Clock, FileCheck } from "lucide-react";
import ValueCard from "./ValueCard";


const EnhancePage = () => {
  return (
    <div>
      {/* Our Mission Section */}
     <section className="mb-16 bg-gray-100 dark:bg-muted py-16 px-4 rounded-3xl shadow-md">
  <div className="max-w-5xl mx-auto space-y-8">
    <h2 className="text-4xl font-extrabold text-center text-primary">Our Mission</h2>

    <div className="prose prose-lg max-w-none prose-neutral dark:prose-invert">
      <p>
        Our mission is to provide efficient, professional, and comprehensive medical examinations that meet all
        requirements for Japanese working visa applications. Our institution strives to extend quality healthcare
        services to every corner of the country—ensuring that both urban elites and rural villagers have access to
        affordable and reliable medical support.
      </p>

      <p>
        We warmly invite our well-wishers and the general public to visit us and experience our available medical
        services and facilities. For any inquiries, feel free to:
      </p>

      <ul className="list-disc pl-6">
        <li>
          <strong>Visit:</strong> 
<a href="https://www.google.com/maps/dir//New-Buspark,+Macchapokhari,+Kathmandu+44600/@27.7360711,85.2241772,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x39eb1987abd1efa7:0x30e68aff730e2037!2m2!1d85.3065786!2d27.7360955?entry=ttu&g_ep=EgoyMDI1MDYxNS4wIKXMDSoASAFQAw%3D%3D" className="text-blue-600 underline">
            Our clinic location
          </a>
          
        </li>
        <li>
          <strong>Email:</strong>{" "}
          <a href="mailto:medicalnippon9@gmail.com" className="text-blue-600 underline">
            medicalnippon9@gmail.com
          </a>
        </li>
        <li>
          <strong>Call:</strong>{" "}
          <a href="tel:+977014958923" className="text-blue-600 underline">
            +977-01-4958923
          </a>
        </li>
      </ul>

      <h3 className="mt-10 text-2xl font-semibold">We are committed to:</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li>Delivering accurate and thorough medical examinations</li>
        <li>Providing a comfortable and respectful environment for all patients</li>
        <li>Offering clear communication in multiple languages</li>
        <li>Ensuring timely processing of all medical certificates</li>
      </ul>
    </div>
  </div>
</section>


      {/* Our Values Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ValueCard
            icon={<Stethoscope className="h-10 w-10 text-primary" />}
            title="Medical Excellence"
            description="We maintain the highest standards of medical practice and stay updated with the latest requirements for visa examinations."
          />
          <ValueCard
            icon={<Globe className="h-10 w-10 text-primary" />}
            title="Cultural Sensitivity"
            description="We understand the diverse needs of our international patients and provide culturally sensitive care."
          />
          <ValueCard
            icon={<Clock className="h-10 w-10 text-primary" />}
            title="Efficiency"
            description="We value your time and ensure a streamlined process for all examinations and certificate issuance."
          />
          <ValueCard
            icon={<FileCheck className="h-10 w-10 text-primary" />}
            title="Accuracy"
            description="We are meticulous in our examinations and documentation to ensure your visa application proceeds smoothly."
          />
        </div>
      </section>
    </div>
  );
};

export default EnhancePage;
