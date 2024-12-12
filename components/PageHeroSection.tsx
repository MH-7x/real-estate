import React from "react";

function PageHeroSection({
  length,
  city,
  desc,
}: {
  length?: number;
  city?: string;
  desc?: string;
}) {
  return (
    <section className="relative bg-gradient-to-t to-black/70 via-black/80 from-black/90 text-white md:pt-32 pt-32 pb-10 md:px-8 px-3">
      {/* Background Image */}
      <div
        className="absolute -z-10 inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/${city?.toLowerCase()}.jpg')`, // Change this to your image path in the public folder
        }}
      ></div>

      {/* Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Track Record Title */}
        <p className="text-sm text-primary font-semibold uppercase mb-4">
          Properties in {city}
        </p>

        {/* Section Title */}
        <h1 className="text-3xl md:text-5xl md:max-w-2xl text-white drop-shadow-lg font-bold mb-6">
          Properties For Sell In {city}
        </h1>

        {/* Section Description */}
        <p className=" max-w-2xl text-lg text-gray-300 mb-12">{desc}</p>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <h2 className="text-3xl text-white md:text-4xl font-extrabold">
              {length ? length : 0}+
            </h2>
            <p className="text-sm text-primary tracking-wide">
              Properties Are Avaiable
            </p>
          </div>
          <div className="text-center">
            <p className="text-3xl text-white md:text-4xl font-extrabold">
              98%
            </p>
            <p className="text-sm text-primary tracking-wide">
              Customer Satisfaction Rate In Property Transactions
            </p>
          </div>
          <div className="text-center">
            <p className="text-3xl text-white md:text-4xl font-extrabold">
              99.9%
            </p>
            <p className="text-sm text-primary tracking-wide">
              Platform Uptime For Seamless Property Searches
            </p>
          </div>
          <div className="text-center">
            <p className="text-3xl text-white md:text-4xl font-extrabold">
              $50M+
            </p>
            <p className="text-sm text-primary tracking-wide">
              Worth Of Real Estate Transactions Managed Successfully
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PageHeroSection;
