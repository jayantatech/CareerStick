import Image from "next/image";
// import { Error404 } from "../../../public/img";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Error404 } from "../../public/img";
import Header from "@/components/headers/Header";
import Footer from "@/components/Footer";
// import { Error404 } from "../../../public/img";

export default function NotFound() {
  return (
    <>
      <Header />
      <div className="flex items-center justify-center h-auto min-h-[80vh]">
        <div className="text-center">
          <Image src={Error404} alt="404 Error" className="w-full h-full" />
          <p className="text-xl">
            Sorry, the page you are looking for does not exist.
          </p>
          <Link href="/">
            <Button className="mt-8 mx-2 rounded text-white font-heading font-semibold text-base">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
