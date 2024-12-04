import { Building2Icon, Home } from "lucide-react";
import Image from "next/image";
function Cities() {
  return (
    <div className="relative w-full h-max overflow-hidden mt-10">
      <div className="flex flex-col items-center justify-center bg-gradient-to-t to-transparent from-primary/80 text-center py-5">
        <h2>
          Discover Your Dream Property <br /> in Your Cities
        </h2>
        <p className="text-lg md:text-2xl max-w-4xl mx-auto mt-4">
          Explore top properties in Peshawar and Islamabad with Brighthome—your
          gateway to ideal living.
        </p>

        <div className="mt-10 w-full flex items-start justify-center gap-4 flex-wrap px-3">
          <div className="relative flex items-center pl-2 md:flex-row overflow-hidden bg-gradient-to-t from-white to-white/80 shadow-sm border border-slate-200 rounded-lg md:w-96 w-full">
            <div className="relative p-2.5 bg-red-300 w-2/5 shrink-0 h-36 overflow-hidden rounded-lg">
              <Image
                src="/images/Hayat-Abad-Peshawar.jpg" // Path to the image
                alt="Responsive Image"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw" // Full width on small screens, 50% on larger screens
              />
            </div>
            <div className="p-3">
              <div className="mb-4 rounded-full bg-teal-600 py-0.5 px-2.5 border border-transparent text-xs text-white transition-all shadow-sm w-20 text-center">
                Peshawar
              </div>
              <h4 className="text-start text-slate-800 text-xl font-semibold">
                Hayatabad
              </h4>
              <div className="w-full min-h-5 font-semibold text-muted-foreground mt-1">
                <div className="flex items-center gap-2">
                  <Building2Icon className="w-4 h-4 stroke-primary" />
                  <span className="text-sm">54 properties for Sell</span>
                </div>
                <div className="flex items-center gap-2">
                  <Home className="w-4 h-4 stroke-primary" />
                  <span className="text-sm">56 properties for rent</span>
                </div>
              </div>
              <div>
                <a
                  href="#"
                  className="text-slate-800 mt-2 font-semibold text-sm hover:underline flex items-center"
                >
                  View All
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="relative flex items-center pl-2 md:flex-row overflow-hidden bg-gradient-to-t from-white to-white/80 shadow-sm border border-slate-200 rounded-lg md:w-96 w-full">
            <div className="relative p-2.5 bg-red-300 w-2/5 shrink-0 h-36 overflow-hidden rounded-lg">
              <Image
                src="/images/gagi-model-town.jpg" // Path to the image
                alt="Responsive Image"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw" // Full width on small screens, 50% on larger screens
              />
            </div>
            <div className="p-3">
              <div className="mb-4 rounded-full bg-teal-600 py-0.5 px-2.5 border border-transparent text-xs text-white transition-all shadow-sm w-20 text-center">
                Peshawar
              </div>
              <h4 className="text-start text-slate-800 text-xl font-semibold">
                Regi model town
              </h4>
              <div className="w-full min-h-5 font-semibold text-muted-foreground mt-1">
                <div className="flex items-center gap-2">
                  <Building2Icon className="w-4 h-4 stroke-primary" />
                  <span className="text-sm">54 properties for Sell</span>
                </div>
                <div className="flex items-center gap-2">
                  <Home className="w-4 h-4 stroke-primary" />
                  <span className="text-sm">56 properties for rent</span>
                </div>
              </div>
              <div>
                <a
                  href="#"
                  className="text-slate-800 mt-2 font-semibold text-sm hover:underline flex items-center"
                >
                  View All
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="relative flex items-center pl-2 md:flex-row overflow-hidden bg-gradient-to-t from-white to-white/80 shadow-sm border border-slate-200 rounded-lg md:w-96 w-full">
            <div className="relative p-2.5 bg-red-300 w-2/5 shrink-0 h-36 overflow-hidden rounded-lg">
              <Image
                src="/images/dha-peshawar.jpg" // Path to the image
                alt="Responsive Image"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw" // Full width on small screens, 50% on larger screens
              />
            </div>
            <div className="p-3">
              <div className="mb-4 rounded-full bg-teal-600 py-0.5 px-2.5 border border-transparent text-xs text-white transition-all shadow-sm w-20 text-center">
                Peshawar
              </div>
              <h4 className="text-start text-slate-800 text-xl font-semibold">
                DHA Peshawar
              </h4>
              <div className="w-full min-h-5 font-semibold text-muted-foreground mt-1">
                <div className="flex items-center gap-2">
                  <Building2Icon className="w-4 h-4 stroke-primary" />
                  <span className="text-sm">54 properties for Sell</span>
                </div>
                <div className="flex items-center gap-2">
                  <Home className="w-4 h-4 stroke-primary" />
                  <span className="text-sm">56 properties for rent</span>
                </div>
              </div>
              <div>
                <a
                  href="#"
                  className="text-slate-800 mt-2 font-semibold text-sm hover:underline flex items-center"
                >
                  View All
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="relative flex items-center pl-2 md:flex-row overflow-hidden bg-gradient-to-t from-white to-white/80 shadow-sm border border-slate-200 rounded-lg md:w-96 w-full">
            <div className="relative p-2.5 bg-red-300 w-2/5 shrink-0 h-36 overflow-hidden rounded-lg">
              <Image
                src="/images/shiekh-yassen-town.jpeg" // Path to the image
                alt="Responsive Image"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw" // Full width on small screens, 50% on larger screens
              />
            </div>
            <div className="p-3">
              <div className="mb-4 rounded-full bg-teal-600 py-0.5 px-2.5 border border-transparent text-xs text-white transition-all shadow-sm w-20 text-center">
                Peshawar
              </div>
              <h4 className="text-start text-slate-800 text-xl font-semibold">
                Sheikh Yasin Town
              </h4>
              <div className="w-full min-h-5 font-semibold text-muted-foreground mt-1">
                <div className="flex items-center gap-2">
                  <Building2Icon className="w-4 h-4 stroke-primary" />
                  <span className="text-sm">54 properties for Sell</span>
                </div>
                <div className="flex items-center gap-2">
                  <Home className="w-4 h-4 stroke-primary" />
                  <span className="text-sm">56 properties for rent</span>
                </div>
              </div>
              <div>
                <a
                  href="#"
                  className="text-slate-800 mt-2 font-semibold text-sm hover:underline flex items-center"
                >
                  View All
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="relative flex items-center pl-2 md:flex-row overflow-hidden bg-gradient-to-t from-white to-white/80 shadow-sm border border-slate-200 rounded-lg md:w-96 w-full">
            <div className="relative p-2.5 bg-red-300 w-2/5 shrink-0 h-36 overflow-hidden rounded-lg">
              <Image
                src="/images/park-view-city.jpeg" // Path to the image
                alt="Responsive Image"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw" // Full width on small screens, 50% on larger screens
              />
            </div>
            <div className="p-3">
              <div className="mb-4 rounded-full bg-teal-600 py-0.5 px-2.5 border border-transparent text-xs text-white transition-all shadow-sm w-20 text-center">
                Islamabad
              </div>
              <h4 className="text-start text-slate-800 text-xl font-semibold">
                Park View City
              </h4>
              <div className="w-full min-h-5 font-semibold text-muted-foreground mt-1">
                <div className="flex items-center gap-2">
                  <Building2Icon className="w-4 h-4 stroke-primary" />
                  <span className="text-sm">54 properties for Sell</span>
                </div>
                <div className="flex items-center gap-2">
                  <Home className="w-4 h-4 stroke-primary" />
                  <span className="text-sm">56 properties for rent</span>
                </div>
              </div>
              <div>
                <a
                  href="#"
                  className="text-slate-800 mt-2 font-semibold text-sm hover:underline flex items-center"
                >
                  View All
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="relative flex items-center pl-2 md:flex-row overflow-hidden bg-gradient-to-t from-white to-white/80 shadow-sm border border-slate-200 rounded-lg md:w-96 w-full">
            <div className="relative p-2.5 bg-red-300 w-2/5 shrink-0 h-36 overflow-hidden rounded-lg">
              <Image
                src="/images/blue-world-city.webp" // Path to the image
                alt="Responsive Image"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw" // Full width on small screens, 50% on larger screens
              />
            </div>
            <div className="p-3">
              <div className="mb-4 rounded-full bg-teal-600 py-0.5 px-2.5 border border-transparent text-xs text-white transition-all shadow-sm w-20 text-center">
                Islamabad
              </div>
              <h4 className="text-start text-slate-800 text-xl font-semibold">
                Blue World City
              </h4>
              <div className="w-full min-h-5 font-semibold text-muted-foreground mt-1">
                <div className="flex items-center gap-2">
                  <Building2Icon className="w-4 h-4 stroke-primary" />
                  <span className="text-sm">54 properties for Sell</span>
                </div>
                <div className="flex items-center gap-2">
                  <Home className="w-4 h-4 stroke-primary" />
                  <span className="text-sm">56 properties for rent</span>
                </div>
              </div>
              <div>
                <a
                  href="#"
                  className="text-slate-800 mt-2 font-semibold text-sm hover:underline flex items-center"
                >
                  View All
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cities;
