import Footer from '@client/components/Footer';
import Header from '@client/components/ui/Header';
import Image from 'next/image';
import { BiMobile } from 'react-icons/bi';
import { BsRobot } from 'react-icons/bs';
import {
  MdComputer,
  MdOutlineLocationOn,
  MdOutlineMail,
  MdOutlinePhone,
  MdWebStories,
} from 'react-icons/md';

function Page() {
  return (
    <>
      <main>
        <section className="flex flex-col gap-8 my-16">
          <div className="w-full max-w-5xl mx-auto ">
            <Header
              title="About Us"
              summery="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium, soluta."
            />
            <h1 className="text-xl font-bold">Lorem, ipsum dolor.</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet
              neque, odio molestiae sequi, minima sunt porro eligendi ut et
              natus voluptatum officiis quisquam cum ullam sit velit nisi dolore
              expedita illum consectetur quia! Repudiandae eos impedit voluptate
              nisi. Natus quae ipsum error itaque inventore voluptates provident
              minima commodi rem ex.
            </p>
          </div>
          <div className="w-full max-w-5xl mx-auto flex flex-col-reverse md:flex-row gap-4 md:gap-8 justify-center">
            <div className="w-full flex flex-col gap-4">
              <div className="text-2xl font-bold">Club Focus</div>
              <ul className="flex flex-col gap-4">
                <li className="flex gap-3 items-center">
                  <MdComputer size={25} />
                  <div className="flex flex-col">
                    <span className="font-bold">Computational Programming</span>
                    <span className="font-extralight text-sm">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Dolore, unde.
                    </span>
                  </div>
                </li>
                <li className="flex gap-3 items-center">
                  <MdWebStories size={25} />
                  <div className="flex flex-col">
                    <span className="font-bold">Web Development</span>
                    <span className="font-extralight text-sm">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Ipsa, eius.
                    </span>
                  </div>
                </li>
                <li className="flex gap-3 items-center">
                  <BiMobile size={25} />
                  <div className="flex flex-col">
                    <span className="font-bold">Application Development</span>
                    <span className="font-extralight text-sm">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Voluptas animi magni atque?
                    </span>
                  </div>
                </li>
                <li className="flex gap-3 items-center">
                  <BsRobot size={25} />
                  <div className="flex flex-col">
                    <span className="font-bold">Bot Development</span>
                    <span className="font-extralight text-sm">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Voluptas animi magni atque?
                    </span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="w-full ">
              <Image
                src="/hero/img0.jpg"
                alt="all"
                width={1800}
                height={1200}
                className="object- rounded-lg"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Page;
