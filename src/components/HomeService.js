import React, { useState } from 'react';
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./FirebaseConfig";
import Lottie from 'react-lottie';
import animationData1 from '../assets/lotties/78618-verification.json'; // Replace with your Lottie JSON file
import animationData2 from '../assets/lotties/111599-green-swipe-down.json'; // Replace with your Lottie JSON file


const Inspecto = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  

  const [serviceType, setServiceType] = useState('');
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const city = e.target.city.value;
    const name = e.target.name.value;
    const address = e.target.address.value;
    const available = e.target.available.value;
    const contact = e.target.contact.value;
  
    const selectedServiceType = e.target.serviceType.value;


    try {
    

      // Save form data to Firestore
      await addDoc(collection(db, "homeServices"), {
        city,
        name,
        address,
        available,
        contact,
        
        serviceType: selectedServiceType,
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
      <div className="h-full w-fit flex flex-col items-center justify-center insback2">
        <div className="insback justify-center h-full md:h-3/5 sm:h-2/5 rounded-lg shadow-lg p-4 sm:p-8 md:p-12 lg:p-16 w-full md:w-4/5 sm:w-2/5">
          <div className="text-center">
             <h2  className=" text-center text-3xl font-bold tracking-tight text-orange-600" >
              Home Services just a click away
            </h2>
            <p className="hidden md:block py-5">
         "Unlocking Your Home's Potential - Connecting Housemaids, Plumbers, AC Repairers, Mechanics, Electricians, and More!"
            </p>
            <div className="lottie-container">
              <Lottie options={{ animationData: animationData2 }} width={300} height={300} /> {/* Adjust width and height as needed */}
            </div>
          </div>
        </div>
      </div>

    

      <div className="flex justify-center items-center min-h-screen sm:m-44">
        <div className="formback rounded-lg shadow-lg p-6 md:p-12 lg:p-20 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-3/5 2xl:w-1/4 mx-auto sm:h-auto">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=emerald&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              {isSubmitted ? "AsaanAgent is on the way" : "Kindly fill the form"}
            </h2>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center h-full">
                <div>
                  <Lottie options={defaultOptions} />
                </div>
                
              </div>
            ) : (
              <>
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="-space-y-px rounded-md shadow-sm">
                  <div>

                    <div>
                      <label htmlFor="name" className="sr-only">
                        name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type
                        required
                        className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
                        placeholder="Name"
                      />
                    </div>

                    <div>
                      <label htmlFor="city" className="sr-only">
                        city
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
                      <label htmlFor="address" className="sr-only">
                       address
                      </label>
                      <input
                        id="address"
                        name="address"
                        required
                        className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
                        placeholder="Location"
                      />
                    </div>


                    <div>
                      <label htmlFor="available" className="sr-only">
                        available
                      </label>
                      <input
                        id="available"
                        name="available"
                        type="available"
                        required
                        className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
                        placeholder="Availability"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact" className="sr-only">
                        Contact
                      </label>
                      <input
                        id="contact"
                        name="contact"
                        type="contact"
                        required
                        className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
                        placeholder="Your Contact Number"
                      />
                    </div>
                  </div>

                 <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="serviceType">
              Service Type
            </label>
            <select
              className="w-full px-3 py-2 border rounded shadow appearance-none"
              id="serviceType"
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              required
            >
             <option value="">Select required service</option>
<option value="labour">Labour</option>
<option value="housemaid">housemaid</option>
<option value="plumber">Plumber</option>
<option value="architect">Architect</option>
<option value="realEstateAgent">Real Estate Agent</option>
<option value="acRepair">AC Repair</option>
<option value="mechanic">Mechanic</option>
<option value="electrician">Electrician</option>

            </select>
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
                      Book AsaanService
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
