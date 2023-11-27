'use client';

import Footer from '@client/components/Footer';
import Image from 'next/image';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.log({ error });

  return (
    <>
      <div className="relative h-[calc(100vh_-_70px)] w-full flex justify-center items-center">
        <div className="flex flex-col gap-2 w-full h-full justify-center items-center py-10">
          <Image
            src="/error/error3.png"
            width={300}
            height={200}
            alt="not found"
            className="w-42 h-42"
            priority={false}
          />
          <h2 className="inline-block text-xl font-bold tracking-wider  text-white mb-2">
            Something went wrong!
          </h2>
          <button
            onClick={() => reset()}
            className="btn-primary py-4 px-6"
          >
            Try again
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
