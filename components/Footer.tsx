import Image from "next/image";
import React from "react";

function Footer() {
  return (
    <footer className="w-full bg-white p-8 mt-20">
      <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-white text-center md:justify-between">
        <Image
          src={"/images/logo.png"}
          alt="bright home"
          width={200}
          height={150}
        />

        <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
          <li>
            <a
              href="#"
              className="text-slate-700 hover:text-slate-500 focus:text-slate-500 text-sm"
            >
              About Us
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-slate-700 hover:text-slate-500 focus:text-slate-500 text-sm"
            >
              Contact Us
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-slate-700 hover:text-slate-500 focus:text-slate-500 text-sm"
            >
              Properties For Sell
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-slate-700 hover:text-slate-500 focus:text-slate-500 text-sm"
            >
              Properties For Rent
            </a>
          </li>
        </ul>
      </div>
      <p className="block mb-4 text-sm text-center text-slate-500 md:mb-0 border-t border-slate-200 mt-4 pt-4">
        Copyright © 2024&nbsp; all right resverd by{" "}
        <a
          href="https://material-tailwind.com/"
          target="_blank"
          rel="noreferrer"
        >
          Brighthome
        </a>
        .
        <br />
        develop by <span className="text-primary">Mashal Huraira</span>
      </p>
    </footer>
  );
}

export default Footer;
