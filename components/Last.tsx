import Image from "next/image";
import React from "react";
import SearchInput from "./SearchInput";

function Last() {
  return (
    <section className="md:mr-20 md:px-0 px-3 md:w-11/12 w-full mx-auto grid md:grid-cols-2 items-center grid-cols-1 mt-16 md:py-20 ga-y-10 py-16 ">
      <div className=" flex justify-center">
        <Image
          src={"/search.svg"}
          alt="search in brighthome"
          width={400}
          height={400}
          className=""
        />
      </div>
      <div className="bg-white md:mt-0 -mt-20 md:p-0 p-5 md:shadow-none shadow-2xl rounded-2xl">
        <h2 className="md:text-start text-center">Find Properties with Ease</h2>
        <p className="mt-4">
          Use our advanced search to locate the best flats on rent near me,
          houses to let near me, or small apartments for rent. Whether you’re
          buying, selling, or renting, Brighthome makes property transactions
          seamless.
        </p>
        <div className="mt-8">
          <SearchInput />
          <p className="text-base md:text-start text-center mt-3">
            Start your journey with us today and experience real estate
            excellence.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Last;
