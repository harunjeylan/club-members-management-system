/* eslint-disable react/no-unescaped-entities */

import Footer from '@client/components/Footer';
import ContactForm from '@client/components/Forms/ContactForm';
import SocialLinks from '@client/components/SocialLinks';
import {
  MdOutlineLocationOn,
  MdOutlineMail,
  MdOutlinePhone,
} from 'react-icons/md';
function Index() {
  return (
    <>
      <main className=" items-center justify-between">
        <section className="w-full">
          <div className="w-full max-w-6xl mx-auto py-4">
            <div className="w-full h-full flex flex-col md:flex-row gap-2 md:gap-4 lg:gap-6 xl:gap-12 items-center justify-between ">
              <div className="w-full md:max-w-3xl h-full px-4 py-10  flex flex-col gap-4 bg-secondary-100 dark:bg-secondary-900">
                <div className="inline-block  py-px mb-4 text-6xl font-extrabold tracking-tight text-primary">
                  Get In <span className="text-primary-500">Touch</span>
                </div>
                <div className="text-2xl font-sans font-extrabold mb-2 ">
                  Do You Have Anything To Ask?
                </div>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Explicabo veritatis nihil maiores facilis, numquam quidem
                  blanditiis asperiores eveniet? Accusantium, exercitationem?
                </p>
                <ContactForm />
              </div>
              <div className="w-full h-full md:max-w-3xl ">
                <div className="w-full h-full flex flex-col gap-4 px-2 my-4">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                    elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus
                    leo.
                  </p>
                  <ul className="flex flex-col md:flex-row gap-2 justify-between">
                    <li className="flex gap-3 items-center">
                      <MdOutlineLocationOn size={25} />
                      <div className="flex flex-col">
                        <span className="font-bold">Adama, Ethiopia </span>
                        <span className="font-extralight text-sm">Address</span>
                      </div>
                    </li>
                    <li className="flex gap-3 items-center">
                      <MdOutlinePhone size={25} />
                      <div className="flex flex-col">
                        <span className="font-bold">094 745 4308</span>
                        <span className="font-extralight text-sm">Mobile</span>
                      </div>
                    </li>
                    <li className="flex gap-3 items-center">
                      <MdOutlineMail size={25} />
                      <div className="flex flex-col">
                        <span className="font-bold">astu.csec@gmail.com</span>
                        <span className="font-extralight text-sm">Email</span>
                      </div>
                    </li>
                  </ul>

                  <div className="flex  justify-center">
                    <SocialLinks />
                  </div>
                </div>
                <div className="w-full">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.3304298274397!2d39.28698561145534!3d8.56419109144425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b1f2b67980661%3A0xe860867f6eb77d90!2sCSEC-ASTU!5e0!3m2!1sen!2set!4v1700983569462!5m2!1sen!2set"
                    width="100%"
                    height="256px"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Index;
