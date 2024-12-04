import Image from "next/image";

const features = [
  {
    name: "Extensive Property Listings",
    description:
      "Discover a wide range of properties across Peshawar and Islamabad, including luxury villas, apartments, commercial spaces, and more.",
  },
  {
    name: "Expert Local Knowledge",
    description:
      "Our team understands the local market dynamics in Hayatabad, DHA Peshawar, Regi Model Town, Park View City, and other prime areas, ensuring you get the best deals.",
  },
  {
    name: "Personalized Service",
    description:
      "We offer a personalized experience, guiding you through every step of the property transaction process.",
  },
  {
    name: "Trusted by Hundreds",
    description:
      "Our clients trust us for our transparent dealings, expert advice, and commitment to excellence.",
  },
];

export default function WhyChooseUs() {
  return (
    <div className=" relative">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-primary/10 to-primary/30 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
        />
      </div>
      <div className="mx-auto  grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Why Choose Brighthome for Your Real Estate Needs?
          </h2>
          <p className="mt-4 text-gray-500">
            We don’t just find you a property; we help you build your future.
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
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-primary/10 to-primary/30 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
        />
      </div>
    </div>
  );
}
