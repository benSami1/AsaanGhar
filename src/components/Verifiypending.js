import { LockClosedIcon } from "@heroicons/react/20/solid";
import React from "react";
import { Badge } from "react-bootstrap";
//

const Verifiypending = () => {
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full">
        ```
      */}

      <div className="flex items-center justify-center py-12 px-4 md:px-6 lg:px-8 GeeksForGeeks bg-cover min-w-full">
        <div className="w-100px  space-y-8 bg-white py-12 shadow-2xl px-12 rounded-3xl ">
          <div>
            <h1>
              AsaanGhar Inspection <Badge bg="white">New</Badge>
            </h1>

            <p>
              Our house inspection service is designed to provide landlords and
              tenants with a comprehensive assessment of the physical condition
              of the property. Our team of experienced inspectors will conduct a
              thorough inspection of the property, including the exterior and
              interior, to identify any damages or maintenance issues that need
              to be addressed. The inspection report will include detailed
              information about the property's structure, electrical and
              plumbing systems, roofing, and other key features. Moreover, we
              will provide recommendations for repairs and maintenance that will
              ensure the property is safe and in good condition. Our house
              inspection service aims to provide peace of mind to landlords and
              tenants by ensuring that the property is well-maintained and meets
              all safety standards. With our service, you can be confident that
              your property is in good hands.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center py-12 px-4 md:px-6 lg:px-8  bg-cover min-w-full">
        <div className="w-100px  space-y-8 backdrop-blur-lg py-12 shadow-2xl px-12 rounded-3xl ">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Ki ndly fill the form
            </h2>

            {/* <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <a href="./Loginui.js" className="font-medium text-indigo-600 hover:text-indigo-500">
                start your 14-day free trial
              </a>
            </p> */}
          </div>

          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="city" className="sr-only">
                  City
                </label>
                <select
                  id="city"
                  name="city"
                  required
                  autoComplete="city"
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="">Select a city</option>
                  <option value="Islamabad">Islamabad</option>
                  <option value="Karachi">Karachi</option>
                  <option value="Lahore">Lahore</option>
                  <option value="Rawalpindi">Rawalpindi</option>
                  <option value="Faisalabad">Faisalabad</option>
                  <option value="Multan">Multan</option>
                  <option value="Peshawar">Peshawar</option>
                  <option value="Quetta">Quetta</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Gujranwala">Gujranwala</option>
                </select>
              </div>

              <div>
                <label htmlFor="Location" className="sr-only">
                  Location
                </label>

                <input
                  id="inlocation"
                  name="inlocation"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Location"
                />
              </div>

              <div>
                <label htmlFor="inspectaddress" className="sr-only">
                  Address
                </label>
                <input
                  id="inaddress"
                  name="inaddress"
                  type
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Address"
                />
              </div>

              <div>
                <label htmlFor="timeslot" className="sr-only">
                  timeslot
                </label>
                <input
                  id="timeslot"
                  name="timeslot"
                  type="time"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Suitable Time Slot"
                />
              </div>

              <div>
                <label htmlFor="contect" className="sr-only">
                  timeslot
                </label>
                <input
                  id="contect"
                  name="contect"
                  type="contect"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="contect"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  remember Location
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Book inspection
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Verifiypending;
