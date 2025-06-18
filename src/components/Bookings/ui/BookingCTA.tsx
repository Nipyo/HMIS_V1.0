import Image from "next/image";
import { Button } from "../../ui/button"
import Link from "next/link";


export default function BookingCTA() {
  return (
    <div className="bg-[#fff9f0] py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-white rounded-lg overflow-hidden shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-4">
                Ready to <span className="text-blue-600">Book Your Visa</span>
                <br />
                Medical <span className="text-[#00a896]">Examination</span>?
              </h2>
              <p className="text-gray-700 mb-6">
                Our online booking system makes it easy to schedule your
                examination at a time that works for you.
              </p>
              <div>
                <Link href="/booking">
              <Button className="bg-[#00a896] hover:bg-[#008f7f] text-white px-6 py-2 text-sm">
                BOOK NOW
              </Button>
              </Link>
                {/* <Button className="bg-[#00a896] hover:bg-[#008f7f] text-white px-6 py-2 text-sm">
                  BOOK NOW
                </Button> */}
              </div>
            </div>
            <div className="relative h-64 md:h-auto">
              <Image
                src="Booknow.svg?height=400&width=500"
                alt="Medical professional with stethoscope"
                className="object-cover"
                height={400}
                width={500}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

