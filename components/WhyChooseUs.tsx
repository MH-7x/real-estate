import Image from "next/image";

const features = [
  {
    name: "Extensive Property Listings",
    description:
      "From apartments close to me to land for sale, our inventory is vast and diverse.",
  },
  {
    name: "Expert Local Knowledge",
    description:
      "With insights into areas like Hayatabad, DHA Peshawar, Park View City, and Blue World City, we ensure you get the best value.",
  },
  {
    name: "Personalized Service",
    description:
      "Our agents assist with every step, from finding apartments for rent near me to closing property sales.",
  },
  {
    name: "Trusted by Hundreds",
    description:
      "With over 10,000 satisfied clients and a 98% satisfaction rate, Brighthome stands out in the real estate market.",
  },
];

export default function WhyChooseUs() {
  return (
    <div className="mx-auto  grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Why Choose Brighthome for Your Real Estate Needs?
        </h2>
        <p className="mt-4 text-gray-500">
          We redefine the real estate business with a focus on client
          satisfaction:
        </p>

        <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
          {features.map((feature) => (
            <div key={feature.name} className="border-t border-primary pt-4">
              <dt className="font-semibold text-lg text-gray-900">
                {feature.name}
              </dt>
              <dd className="mt-2 text-base text-muted-foreground">
                {feature.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <div className=" gap-4 flex flex-wrap items-center justify-evenly sm:gap-6 lg:gap-8">
        <div className="rounded-lg overflow-hidden md:w-60 w-36 md:h-60 h-36 relative">
          <Image
            src={"/images/Extensive-Property-Listings.jpg"}
            alt="Extensive-Property-Listings"
            fill
            className="rounded-md object-cover"
          />
        </div>
        <div className="rounded-lg overflow-hidden md:w-60 w-36 md:h-60 h-36 relative">
          <Image
            src={"/images/Expert-Local-Knowledge.jpg"}
            alt="Expert-Local-Knowledge"
            fill
            className="rounded-md object-cover"
          />
        </div>
        <div className="rounded-lg overflow-hidden md:w-60 w-36 md:h-60 h-36 relative">
          <Image
            src={"/images/Personalized-Service.jpg"}
            alt="Personalized-Service"
            fill
            className="rounded-md object-cover"
          />
        </div>
        <div className="rounded-lg overflow-hidden md:w-60 w-36 md:h-60 h-36 relative">
          <Image
            src={"/images/trusted-ny-hundereds.jpg"}
            alt="trusted-ny-hundereds"
            fill
            className="rounded-md object-cover"
          />
        </div>
      </div>
    </div>
  );
}
