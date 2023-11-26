import React from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import Slider from '../ui/Slider';
import Image from "next/image";
import Link from 'next/link';

const slides = [
  {
    title: 'CSEC ASTU',
    summery:
      'Computer Science and Engineering Club CSEC-ASTU in short is a club of students found in Adama Scienc',
    image: '/hero/img0.jpg',
  },
  {
    title: 'CSEC ASTU',
    summery:
      'Computer Science and Engineering Club CSEC-ASTU in short is a club of students found in Adama Scienc',
    image: '/hero/img1.jpg',
  },
  {
    title: 'CSEC ASTU',
    summery:
      'Computer Science and Engineering Club CSEC-ASTU in short is a club of students found in Adama Scienc',
    image: '/hero/img2.jpg',
  },
  {
    title: 'CSEC ASTU',
    summery:
      'Computer Science and Engineering Club CSEC-ASTU in short is a club of students found in Adama Scienc',
    image: '/hero/img3.jpg',
  },
  {
    title: 'CSEC ASTU',
    summery:
      'Computer Science and Engineering Club CSEC-ASTU in short is a club of students found in Adama Scienc',
    image: '/hero/img4.jpg',
  },
  {
    title: 'CSEC ASTU',
    summery:
      'Computer Science and Engineering Club CSEC-ASTU in short is a club of students found in Adama Scienc',
    image: '/hero/img5.jpg',
  },
  {
    title: 'CSEC ASTU',
    summery:
      'Computer Science and Engineering Club CSEC-ASTU in short is a club of students found in Adama Scienc',
    image: '/hero/img6.jpg',
  },

];
function HeroSection() {
  return (
    <section className="w-full ">
      <div className="w-full  relative aspect-video max-h-[60vh]">
        <Slider navigator={true}>
          {slides.map((slide, ind) => (
            <div key={ind} className="w-full h-full">
              <div className="w-full relative flex items-center h-full">
                <div className="z-10 absolute inset-0 bg-gradient-to-r from-secondary-600/50 to-secondary-400/0 dark:from-secondary-800/50 dark:to-secondary-600/0"></div>

                <div className="z-20 w-full p-4 hidden md:flex flex-col gap-2 max-w-lg mx-auto  text-white md:mx-12 bg-transparent">
                  <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold  drop-shadow md:my-2 py-2">
                    {slide.title}
                  </h1>
                  <p className="text-lg lg:text-xl lg:my-2 py-2  drop-shadow">
                    {slide.summery}
                  </p>
                  <div className="flex flex-col md:flex-row gap-2">
                    <Link
                      href="/auth/register"
                      className="flex flex-nowrap w-auto h-auto py-1 px-4 md:py-4 md:px-8 justify-center items-start bg-secondary-100/5 hover:bg-secondary-100 text-slate-100 hover:text-slate-900 border border-slate-100  font-bold duration-300 ease-in-out"
                    >
                      JOIN NEW
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
                <div className="absolute z-0 w-full right-0 h-full">
                  {slide.image && (
                    <Image
                      src={slide.image}
                      alt={'image ' + ind}
                      width={2240}
                      height={1824}
                      className="block w-full h-full object-cover "
                    />
                  )}
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
