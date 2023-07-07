import {  ChevronLeftIcon,ChevronRightIcon, CheckIcon } from "@heroicons/react/20/solid";
import React, { useState, useMemo } from "react";
// Add this import at the top of the file
import { auth, db, storage } from "./FirebaseConfig"; // Import the Firebase config and Firestore instance
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";



const Logo = () => (
  <img
    className="mx-auto h-12 w-auto"
    src="https://tailwindui.com/img/logos/mark.svg?color=emerald&shade=600"
    alt="Your Company"
  />
);

const FieldWrapper = ({ id, label, children }) => (
  <div className="mb-4">
    <label htmlFor={id} className="sr-only">
      {label}
    </label>
    {children}
  </div>
);




const CitySelect = React.memo(({ cities }) => (
  <FieldWrapper id="country" label="country">
    <select
      id="country"
      name="country"
      required
      autoComplete="country"
      className="block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
    >
      <option value="">Select a city</option>
      {cities.map(country => (
        <option value={country} key={country}>{country}</option>
      ))}
    </select>
  </FieldWrapper>
));

const TextInput = ({ id, label, placeholder }) => (
  <FieldWrapper id={id} label={label}>
    <input
      id={id}
      name={id}
      required
      className="block w-full appearance-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
      placeholder={placeholder}
    />
  </FieldWrapper>
);

const TextAreaInput = ({ id, label, placeholder, rows }) => (
  <FieldWrapper id={id} label={label}>
    <textarea
      id={id}
      name={id}
      required
      autoComplete={id}
      className="block w-full appearance-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
      placeholder={placeholder}
      rows={rows}
    />
  </FieldWrapper>
);

const Button = ({ onClick, children, bgColor, hoverBgColor, iconColor, hoverIconColor }) => (
  <button
    type="button"
    className={`group relative flex w-full justify-center rounded-md border border-transparent ${bgColor} py-2 px-4 text-sm font-medium text-white ${hoverBgColor} focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2`}
    onClick={onClick}
  >
    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
      <ChevronRightIcon
        className={`h-5 w-5 ${iconColor} group-hover:${hoverIconColor}`}
        aria-hidden="true"
      />
    </span>
    {children}
  </button>
);

const Backbutton = ({ onClick, children, bgColor, hoverBgColor, iconColor, hoverIconColor }) => (
  <button
    type="button"
    className={`group relative flex w-full justify-center rounded-md border border-transparent ${bgColor} py-2 px-4 text-sm font-medium text-white ${hoverBgColor} focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2`}
    onClick={onClick}
  >
    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
      <ChevronLeftIcon
        className={`h-5 w-5 ${iconColor} group-hover:${hoverIconColor}`}
        aria-hidden="true"
      />
    </span>
    {children}
  </button>
);


const Sell = () => {


 const [formData, setFormData] = useState({});
 const [images, setImages] = useState([]);
  const [step, setStep] = useState(1);
  const cities = useMemo(() => [
    "Islamabad", "Karachi", "Lahore", "Rawalpindi", "Faisalabad", "Multan", "Peshawar", "Quetta", "Hyderabad",
    "Gujranwala"
  ], []);

 

const uploadImagesToStorage = async () => {
  const imageLg = [];
  for (const image of images) {
    const imageRef = ref(storage, `property-images/${image.name}`);
    await uploadBytes(imageRef, image);
    const imageUrl = await getDownloadURL(imageRef);
    imageLg.push(imageUrl);
  }
  return imageLg;
};

// ...

const handleFormSubmit = async (event) => {
  event.preventDefault();

  const imageLg = await uploadImagesToStorage();

  console.log({
    ...formData,
    imageLg,
  });

  // Get current user
  const user = auth.currentUser;

  // Add username and photoUrl to propertyData
  const propertyData = {
    ...formData,
    imageLg,
    agentName: user.displayName,
    agentImage: user.photoURL,
    
  };

  // Add a new document with a generated ID.
  await addDoc(collection(db, "pending"), propertyData);

  // Reset form fields and state
  event.target.reset();
  setStep(1);
  setImages([]);
};


const handleNextClick = () => {
  collectFormData();
  setStep(step + 1);
};

const handlePrevClick = () => {
  collectFormData();
  setStep(step - 1);
};

const collectFormData = () => {
  const form = document.getElementById("multiStepForm");
  const data = new FormData(form);

  // Update formData based on the current step
  if (step === 1) {
    setFormData({
      ...formData,

       country: data.get("country"),
      id: data.get("id"),
      type: data.get("type"),
      address: data.get("address"),
      description: data.get("description"),
    });
  } else if (step === 2) {
    setFormData({
      ...formData,
      bedrooms: data.get("bedrooms"),
      bathrooms: data.get("bathrooms"),
      surface: data.get("surface"),
      year: data.get("year"),
      price: data.get("price"),

    });
  } else if (step === 3) {
    setFormData({
      ...formData,
     
     
        agentPhone: data.get("agentPhone"),
      
     
    });
  }
};
// ...

return (

<div className="flex justify-center items-center min-h-screen   bg-cover GeeksForGeeks">
      
<div className="bg-white rounded-lg shadow-lg p-8 md:p-12 lg:p-16">




     <form id="multiStepForm" onSubmit={handleFormSubmit}>
      <input type="hidden" name="remember" defaultValue="true" />
      <div className="-space-y-px rounded-md shadow-sm">
        {step === 1 && (
          <>
          <div>
<Logo />
<h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
Provide the property details
</h2>
</div>
    <CitySelect cities={cities} />
    <TextInput id="id" label="id" placeholder="Enter your CNIC number here"/>
    <TextInput id="type" label="type" placeholder="Property type"/>
    
    <TextInput id="address" label="address" placeholder="Address of property" />
    <TextAreaInput id="description" label="Description" placeholder="Write a little property description" rows="6" />

    </>
        )}
        {step === 2 && (
          <>
           <div>
<Logo />
<h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
Some more details
</h2>
</div>
          <TextInput id="bedrooms" label="bedrooms" placeholder="Number of Bedrooms" />
         <TextInput id="bathrooms" label="bathrooms" placeholder="Number of Bethrooms" />
          <TextInput id="surface" label="surface" placeholder="Marla or Kanal" />
  <TextInput id="year" label="year" placeholder="year built" />
  <TextInput id="price" label="price" placeholder="Demand in PKR"/>
 
      
          
          
          </>
        )}
        {step === 3 && (
         <>
  <div className="flex items-center justify-center flex-col">
    <Logo />
    <h2 className="mt-6 mb-4 text-center text-3xl font-bold tracking-tight text-gray-900">
      Add Property Images
    </h2>

     <h2 className="mt-6 mb-4 text-center text-3xl font-bold tracking-tight text-gray-900">
      Add Property Images
    </h2>


    
<TextInput id="agentPhone" label="agentPhone" placeholder="Provide your contact"/>
   
  </div>
</>



        )}

 {step === 4 && (
  <>
  <div className="flex items-center justify-center flex-col">
    <Logo />
    <h2 className="mt-6 mb-4 text-center text-3xl font-bold tracking-tight text-gray-900">
      Upload image down here
    </h2>



    <FieldWrapper id="images" label="Upload Images">
      <div className="relative border-dashed border-2 border-gray-400 p-6 rounded-md">
        <input
          id="images"
          name="images"
          type="file"
          accept="image/*"
          multiple
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={(event) => {
            const files = event.target.files;
            setImages(Array.from(files));
          }}
        />
        <div className="flex flex-col items-center justify-center space-y-2">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <p className="text-gray-600 text-sm">Drag and drop your images here</p>
          <p className="text-gray-600 text-sm">or</p>
          <Button
            onClick={() => {
              document.getElementById("images").click();
            }}
            bgColor="bg-emerald-600"
            hoverBgColor="hover:bg-emerald-700"
            iconColor="text-emerald-500"
            hoverIconColor="hover:text-emerald-400"
          >
            Select Files
          </Button>
        </div>
        
      </div>
    </FieldWrapper>
    {images.length > 0 && (
      <div className="flex flex-wrap justify-center mt-4">
        {images.map((image, index) => (
          <img
            key={index}
            src={URL.createObjectURL(image)}
            alt={`Preview ${index}`}
            className="w-32 h-32 object-cover m-2"
          />
        ))}
      </div>
    )}

   
  </div>





</>



        )}



      </div>
      <div className="flex space-x-4">
        {step > 1 && (
          <div className="w-1/2">
            <Backbutton onClick={handlePrevClick} bgColor="bg-gray-300" hoverBgColor="hover:bg-gray-400" iconColor="text-gray-500" hoverIconColor="hover:text-gray-600">
              Previous
            </Backbutton>
          </div>
        )}
        {step < 4 && (
          <div className={`w-${step === 1 ? "full" : "1/2"}`}>
            <Button onClick={handleNextClick} bgColor="bg-emerald-600" hoverBgColor="hover:bg-emerald-700" iconColor="text-emerald-500" hoverIconColor="hover:text-emerald-400">
              Next
            </Button>
          </div>
        )}


        {step === 4 && (
          <div className="w-1/2">
            <button
              type="submit"  onSubmit={handleFormSubmit}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-emerald-600 py-2 px-4 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <CheckIcon
                  className="h-5 w-5 text-emerald-500 group-hover:text-emerald-400"
                  aria-hidden="true"
                />
              </span>
              Submit
            </button>
          </div>
        )}
      </div>
      <div>
        <p className="mt-2 text-center text-sm text-gray-600">
          By providing your property details, you agree to our{" "}
          <a
            href="/Home"
            className="font-medium text-emerald-600 hover:text-emerald-500"
          >
            Terms of Service
          </a>
          .
        </p>
      </div>
    </form>
  </div>
</div>
);
};

export default Sell;