"use client";
import React, { useState } from "react";

function FAQs({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const [openFAQIndex, setOpenFAQIndex] = useState(0); // First FAQ expanded by default
  const [showAll, setShowAll] = useState(false); // Toggle for showing more FAQs

  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? -1 : index); // Expand/collapse logic
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <div className="py-4 relative">
      <div className="max-w-screen-md mx-auto px-3 sm:px-6 lg:px-8 flex flex-col justify-between">
        <div className="text-center">
          <p className="mt-4 text-sm leading-7 text-gray-500 font-regular">
            F.A.Q
          </p>
          <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
            Frequently Asked <span className="text-primary">Questions</span>
          </h3>
        </div>

        <div className="mt-20">
          <ul>
            {(showAll ? faqs : faqs.slice(0, 4)).map((faq, i) => (
              <li key={faq.question + i} className="text-left  mb-5">
                <div
                  className="flex flex-row items-start mb-5 cursor-pointer"
                  onClick={() => toggleFAQ(i)}
                >
                  <div className="flex items-center justify-center md:p-3 p-1 mr-3 rounded-full bg-primary drop-shadow-lg text-white border-4 border-white text-xl font-semibold">
                    <svg
                      width="30px"
                      fill="white"
                      height="30px"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g data-name="Layer 2">
                        <g data-name="menu-arrow">
                          <rect
                            width="24"
                            height="24"
                            transform="rotate(180 12 12)"
                            opacity="0"
                          ></rect>
                          <path d="M17 9A5 5 0 0 0 7 9a1 1 0 0 0 2 0 3 3 0 1 1 3 3 1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1.1A5 5 0 0 0 17 9z"></path>
                          <circle cx="12" cy="19" r="1"></circle>
                        </g>
                      </g>
                    </svg>
                  </div>
                  <div className="bg-secondary rounded-lg md:p-5 p-3 md:px-10 px-7 w-full flex items-center">
                    <h3 className="text-md leading-6 font-medium text-gray-900">
                      {faq.question}
                    </h3>
                  </div>
                </div>

                <div
                  className={`transition-all duration-500 ease-in-out overflow-hidden flex items-center ${
                    openFAQIndex === i ? "max-h-screen" : "max-h-0"
                  }`}
                >
                  <div className="bg-primary/30 rounded-lg md:p-5 p-3 md:px-10 px-5 w-full flex items-center">
                    <p className="text-black text-sm md:text-base font-medium tracking-wide">
                      {faq.answer}
                    </p>
                  </div>
                  <div className="flex items-center justify-center md:p-3 p-2 ml-3 rounded-full bg-primary drop-shadow-lg text-white border-4 border-white text-xl font-semibold">
                    <svg
                      height="25px"
                      fill="white"
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 295.238 295.238"
                      xmlSpace="preserve"
                    >
                      <g>
                        <g>
                          <g>
                            <path
                              d="M277.462,0.09l-27.681,20.72l-27.838,64.905h-22.386l-8.79-19.048h5.743c10.505,0,19.048-8.452,19.048-18.957V28.571
				h9.524V0H196.51v28.571h9.524V47.71c0,5.248-4.271,9.433-9.524,9.433h-10.138L174.2,30.81l14.581-7.267L141.038,3.095
				l-11.224,39.281c-0.305-23.371-19.386-42.29-42.829-42.29c-23.633,0-42.857,19.224-42.857,42.857
				c0,14.281,7.233,27.676,19.048,35.595v7.176H51.643L50.9,89.619c-2.314,12.005-2.529,24.343-0.638,36.648l-32.486,57.905
				l35.876,8.195v60.014h47.619v42.857h114.286v-66.357c33.333-23.581,52.371-61.495,52.343-101.943l0.01-17.371
				c0-6.548-0.605-13.276-1.824-19.905l-0.705-3.948h-9.348l21.429-51.338V0.09z"
                            ></path>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Show More/Show Less */}
          {faqs.length > 4 && (
            <div className="text-center mt-8">
              <button
                onClick={toggleShowAll}
                className="bg-primary text-white font-semibold py-2 px-6 rounded-full shadow-md"
              >
                {showAll ? "Show Less" : "Show More"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FAQs;
