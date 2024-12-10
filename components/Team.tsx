const people = [
  {
    name: "Nasir Khan",
    role: "Co-Founder / CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Saqib Ahmad",
    role: "Soical Media Manager",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Mashal Huraira",
    role: "Developer & Designer",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Razaq Ahmad",
    role: "Local Routes Expert",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  // More people...
];

export default function OurTeam() {
  return (
    <>
      <section className="relative bg-gradient-to-t to-black/70 via-black/80 from-black/90 text-white md:py-32 py-20 mt-32 md:px-8 px-3">
        {/* Background Image */}
        <div
          className="absolute -z-10 inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/images/back.jpg')`, // Change this to your image path in the public folder
          }}
        ></div>

        {/* Content Container */}
        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Track Record Title */}
          <h3 className="text-sm text-primary font-semibold uppercase mb-4">
            Our track record
          </h3>

          {/* Section Title */}
          <h2 className="text-3xl md:text-5xl md:max-w-2xl text-white drop-shadow-lg font-bold mb-6">
            Trusted by Thousands of Clients Across Pakistan
          </h2>

          {/* Section Description */}
          <p className=" max-w-2xl text-lg text-gray-300 mb-12">
            We take pride in serving our clients with transparency, reliability,
            and efficiency. From seamless property transactions to personalized
            customer support, we have established a reputation for excellence in
            the real estate industry.
          </p>

          {/* Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <h4 className="text-3xl md:text-4xl font-extrabold">10,000+</h4>
              <p className="text-sm text-primary tracking-wide">
                Satisfied clients across Peshawar and Islamabad
              </p>
            </div>
            <div className="text-center">
              <h4 className="text-3xl md:text-4xl font-extrabold">98%</h4>
              <p className="text-sm text-primary tracking-wide">
                Customer satisfaction rate
              </p>
            </div>
            <div className="text-center">
              <h4 className="text-3xl md:text-4xl font-extrabold">99.9%</h4>
              <p className="text-sm text-primary tracking-wide">
                Platform uptime ensuring seamless service
              </p>
            </div>
            <div className="text-center">
              <h4 className="text-3xl md:text-4xl font-extrabold">$50M+</h4>
              <p className="text-sm text-primary tracking-wide">
                In property transactions handled successfully
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="bg-white py-24 sm:py-32 ">
        <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
          <div className="max-w-xl">
            <h2 className="text-pretty text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
              Meet Our Team
            </h2>
            <p className="mt-6 text-lg/8 text-gray-600">
              Dedicated professionals ensuring seamless real estate experiences
              and expert guidance.
            </p>
          </div>
          <ul
            role="list"
            className="grid  gap-x-3 gap-y-5 sm:grid-cols-2 xl:col-span-2"
          >
            {people.map((person) => (
              <li key={person.name}>
                <div className="flex items-center gap-x-6 px-4 py-6 bg-muted rounded-lg relative">
                  <img
                    alt=""
                    src={person.imageUrl}
                    className="size-16 rounded-full"
                  />
                  <div>
                    <h3 className="text-base/7 font-semibold tracking-tight text-gray-900">
                      {person.name}
                    </h3>
                    <p className="text-sm/6 font-semibold text-primary">
                      {person.role}
                    </p>
                  </div>
                  <div className="absolute bottom-2 right-2 flex items-center gap-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 hover:fill-primary w-5"
                      fill="black"
                      viewBox="0 0 24 24"
                    >
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 hover:fill-primary w-5"
                      fill="black"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      className="h-5 hover:fill-primary w-5"
                      fill="black"
                    >
                      <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
                    </svg>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
