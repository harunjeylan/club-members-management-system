import Footer from '@client/components/Footer';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
   <>
      <div className="relative h-[calc(100vh_-_70px)] w-full flex justify-center items-center">
        <div className="flex flex-col gap-2 w-full h-full justify-center items-center py-10">
          <Image
            src="/error/error.png"
            width={300}
            height={200}
            alt="not found"
            className="w-42 h-42"
            priority={false}
          />
          <h2 className="inline-block text-xl font-bold tracking-wider  text-white mb-2">
            Not Found
          </h2>
          <p>Could not find requested resource</p>
          <Link
            href="/"
            className="btn-primary py-4 px-6"
          >
            Return Home
          </Link>
        </div>
      </div>
      <Footer />
    </> 
  );
}
