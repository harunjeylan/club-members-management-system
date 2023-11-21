import Link from "next/link";
import React from "react";
import SubscribeForm from "../Forms/SubscribeForm";

function Footer() {
  return (
    <footer className="w-full relative py-10 bg-secondary-100 dark:bg-secondary-900">
      <div className="w-full max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        <article className="w-full flex flex-col gap-4">
          <h1 className="text-2xl font-bold">LOGO: Company Name</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
            perspiciatis fuga nemo illo deleniti? Quod illum minus odio? Aliquid
            enim nemo ullam quibusdam dolorem corporis.
          </p>
        </article>
        <div className="w-full flex flex-col gap-4">
          <div className="text-2xl font-bold">Use full Links</div>
          <ul className="flex flex-col gap-2">
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
          </ul>
        </div>
        <div className="w-full flex flex-col gap-4">
          <div className="text-2xl font-bold">Contacts</div>
          <ul className="flex flex-col gap-2">
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
          </ul>
        </div>
        <div className="w-full flex flex-col gap-4">
          <SubscribeForm />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
