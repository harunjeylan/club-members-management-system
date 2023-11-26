import Link from 'next/link';
import { BiLogoFacebookSquare } from 'react-icons/bi';
import { FaLinkedin, FaTelegramPlane } from 'react-icons/fa';
export default function SocialLinks() {
  return (
    <div className="w-fll max-w-4xl mx-auto flex items-center gap-2 md:gap-4 lg:gap-6 justify-center">
      <Link
        target="_blank"
        href={'https://www.facebook.com/csecastu'}
        className=""
      >
        <BiLogoFacebookSquare
          size={36}
          className="text-blue-600 hover:text-blue-400"
        />
      </Link>
      <Link target="_blank" href={'https://t.me/CSEC_ASTU'} className="">
        <FaTelegramPlane
          size={26}
          className="bg-blue-600 hover:bg-blue-400 rounded text-white dark:text-black"
        />
      </Link>
      <Link
        target="_blank "
        href={'https://et.linkedin.com/company/csec-astu'}
        className=""
      >
        <FaLinkedin size={30} className="text-blue-600 hover:text-blue-400" />
      </Link>
    </div>
  );
}
