import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import Slider from "../ui/Slider";
// import Image from "next/image";
import Link from "next/link";

const images = [
  "/images/hero/img.jpg",
  "/images/hero/img1.jpg",
  "/images/hero/img2.jpg",
  "/images/hero/img3.jpg",
  "/images/hero/img4.jpg",
  "/images/hero/img5.jpg",
  "/images/hero/img6.jpg",
  "/images/hero/img7.jpg",
  "/images/hero/img8.jpg",
];
function HeroSection() {
  return (
    <section className="w-full ">
      <div className="w-full max-w-7xl mx-auto relative aspect-video max-h-[40vh]">
        <Slider navigator={true}>
          {images.map((image, ind) => (
            <div key={ind} className="w-full h-full">
              <div className="w-full relative flex items-center h-full">
                <div className="z-10 absolute inset-0 bg-gradient-to-r from-[#000] to-[#0000003d]"></div>
                <div className="z-20 w-full p-4 hidden md:flex flex-col gap-2 max-w-lg mx-auto  text-white md:mx-12 bg-transparent">
                  <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold  drop-shadow md:my-2 py-2">
                    E-SUK
                  </h1>
                  <h4 className="text-lg lg:text-xl lg:my-2 py-2  drop-shadow">
                    To Become among the top ten manufacturers and distributors
                    of brand Vehicles in East Africa by 2030
                  </h4>
                  <div className="flex flex-col md:flex-row gap-2">
                    <Link
                      href="/shop"
                      className="flex flex-nowrap w-auto h-auto py-1 px-4 md:py-4 md:px-8 justify-center items-start bg-secondary-100/5 hover:bg-secondary-100 text-slate-100 hover:text-slate-900 border border-slate-100  font-bold duration-300 ease-in-out"
                    >
                      SHOP NEW
                    </Link>
                    <Link
                      href="/about"
                      className="hover:scale-110 text-white py-1 px-4 md:py-4 md:px-8 flex flex-nowrap gap-2 items-center duration-300 ease-in-out"
                    >
                      READ ABOUT US
                      <AiOutlineArrowRight />
                    </Link>
                  </div>
                </div>
                <div className="z-0 w-full right-0 relative h-full">
                  {/* <Image
                    src={image}
                    alt={"image " + ind}
                    width={1024}
                    height={1024}
                    className="block w-full h-full object-cover "
                  /> */}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default HeroSection;
