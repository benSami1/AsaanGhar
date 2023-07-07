import React, { useState } from 'react';
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./FirebaseConfig";
import Lottie from 'react-lottie';
import animationData1 from '../assets/lotties/78618-verification.json'; // Replace with your Lottie JSON file
import animationData2 from '../assets/lotties/111599-green-swipe-down.json'; // Replace with your Lottie JSON file
import NavbarComponent from './Navbar';
import Store from '../pages/Store';

const Inspecto = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const city = e.target.city.value;
    const inlocation = e.target.inlocation.value;
    const inaddress = e.target.inaddress.value;
    const timeslot = e.target.timeslot.value;
    const contect = e.target.contect.value;
    const rememberLocation = e.target['remember-me'].checked;

    try {
      await addDoc(collection(db, "inspections"), {
        city,
        inlocation,
        inaddress,
        timeslot,
        contect,
        rememberLocation,
        createdAt: serverTimestamp(),
      });

      // Reset form after submission
      e.target.reset();
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error booking inspection: ', error);
      alert('Error booking inspection, please try again');
    }
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData1,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <>
      <div className="h-full w-fit flex flex-col items-center justify-center insback1">
        <div className="insback justify-center h-full md:h-3/5 sm:h-2/5 rounded-lg shadow-lg p-4 sm:p-8 md:p-12 lg:p-16 w-full md:w-4/5 sm:w-2/5">
          <div className="text-center">
             <h2  className=" text-center text-3xl font-bold tracking-tight text-lime-900" >
              AsaanGhar Inspection Ensuring Your Home's Quality
          </h2>
            <p className="hidden md:block py-5">
              At AsaanGhar Inspection, we provide comprehensive house inspection services to safeguard your peace of mind. Our mission is to ensure that every home is a safe, well-constructed, and solid investment for its occupants.
            </p>
            <div className="lottie-container">
              <Lottie options={{ animationData: animationData2 }} width={300} height={300} /> {/* Adjust width and height as needed */}
            </div>
          </div>
        </div>
      </div>

      <NavbarComponent />

      <div className="flex justify-center items-center min-h-screen sm:m-44">
        <div className="formback rounded-lg shadow-lg p-6 md:p-12 lg:p-20 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-3/5 2xl:w-1/4 mx-auto sm:h-auto">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=emerald&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              {isSubmitted ? "Inspection booked" : "Kindly fill the form"}
            </h2>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center h-full">
                <div>
                  <Lottie options={defaultOptions} />
                </div>
                <div style={{ zIndex: 100 }}>
                  <Store />
                </div>
              </div>
            ) : (
              <>
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="-space-y-px rounded-md shadow-sm">
                  <div>
                    <div>
                      <label htmlFor="city" className="sr-only">
                        City
                      </label>
                      <select
                        id="city"
                        name="city"
                        required
                        autoComplete="city"
                        className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
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
                        className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
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
                        className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
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
                        className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
                        placeholder="Suitable Time Slot"
                      />
                    </div>

                    <div>
                      <label htmlFor="contect" className="sr-only">
                     Contact
                      </label>
                      <input
                        id="contect"
                        name="contect"
                        type="contect"
                        required
                        className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
                        placeholder="contact"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
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
                      className="group relative flex w-full justify-center rounded-md border border-transparent bg-emerald-600 py-2 px-4 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                    >
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <LockClosedIcon
                          className="h-5 w-5 text-emerald-500 group-hover:text-emerald-400"
                          aria-hidden="true"
                        />
                      </span>
                      Book inspection
                      
                    </button>
                  </div>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Inspecto;
