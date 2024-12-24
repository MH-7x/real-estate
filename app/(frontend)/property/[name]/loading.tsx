import React from "react";

function loading() {
  return (
    <div className="my-20 md:w-11/12 w-full mx-auto min-h-96">
      <div className="w-full  p-4 mx-auto bg-white rounded-md shadow animate-pulse">
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
          <div className="h-72 bg-gray-300 md:col-span-2 rounded"></div>
          <div className="h-72 md:grid hidden bg-gray-300 md:col-span-1 grid-rows-2 gap-3 rounded">
            <div className="h-12 bg-gray-300 rounded"></div>
            <div className="h-12 bg-gray-300 rounded"></div>
          </div>
        </div>

        <div className="h-8 bg-gray-300 rounded my-4"></div>
        <div className="h-8 bg-gray-300 rounded mb-4"></div>
        <div className="h-8 bg-gray-300 rounded my-4"></div>
        <div className="h-8 bg-gray-300 rounded mb-4"></div>
        <div className="h-8 bg-gray-300 rounded my-4"></div>
        <div className="h-8 bg-gray-300 rounded mb-4"></div>
        <div className="h-96 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}

export default loading;
