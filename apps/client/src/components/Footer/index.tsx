
import {
  MdOutlineLocationOn,
  MdOutlineMail,
  MdOutlinePhone,
} from 'react-icons/md';

import SocialLinks from '../SocialLinks';
function Footer() {
  return (
    <footer className="w-full relative  bg-secondary-100 dark:bg-secondary-900">
      <div className="w-full max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2  gap-4 md:gap-8 justify-center">
        <article className="w-full flex flex-col gap-4">
          <h1 className="text-2xl font-bold">CSEC ASTU</h1>
          <p>
            Computer Science and Engineering Club CSEC-ASTU in short is a club
            of students found in Adama Scienc
          </p>
        </article>

        <div className="w-full flex flex-col gap-4">
          <div className="text-2xl font-bold">Contact info</div>
          <ul className="flex flex-col gap-2">
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
        </div>
        {/* <div className="w-full flex flex-col gap-4">
          <SubscribeForm />
        </div> */}
      </div>
      <div className="bg-secondary-50 dark:bg-secondary-950 w-full py-2 px-2">
        <SocialLinks />
      </div>
    </footer>
  );
}

export default Footer;
