import Image from "next/image";
import Link from "next/link";
function LogosScroll() {
  return (
    <div className="relative overflow-hidden py-6 md:my-20 mb-14">
      {/* Scrolling Wrapper */}
      <div className="flex w-[200%] animate-loop-scroll">
        {/* Duplicate logos for seamless animation */}
        {[...Array(5)].map((_, idx) => (
          <div key={idx} className="flex space-x-16 pr-16">
            <Link href={"#"}>
              <Image
                loading="lazy"
                width={100}
                height={100}
                src="/cities/Hayatabad.png"
                className="max-w-none object-contain aspect-square "
                alt="properties in hayatabad"
              />
            </Link>
            <Link href={"#"}>
              <Image
                loading="lazy"
                width={100}
                height={100}
                src="/cities/DHA-Peshawar.png"
                className="max-w-none object-contain aspect-square "
                alt="properties in DHA Peshawar"
              />
            </Link>
            <Link href={"#"}>
              <Image
                loading="lazy"
                width={100}
                height={100}
                src="/cities/Park-View-City.png"
                className="max-w-none object-contain aspect-square "
                alt="properties in Park View City"
              />
            </Link>
            <Link href={"#"}>
              <Image
                loading="lazy"
                width={100}
                height={100}
                src="/cities/Blue-World-City.png"
                className="max-w-none object-contain aspect-square "
                alt="properties in Blue World City"
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LogosScroll;
