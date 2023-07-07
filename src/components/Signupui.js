import React, { useState } from 'react';
import { auth, storage } from './FirebaseConfig';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

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

const TextInput = ({ id, label, placeholder, value, onChange }) => (
  <FieldWrapper id={id} label={label}>
    <input
      id={id}
      name={id}
      required
      className="block w-full appearance-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </FieldWrapper>
);

const SelectInput = ({ id, label, options, value, onChange }) => (
  <FieldWrapper id={id} label={label}>
    <select
      id={id}
      name={id}
      required
      className="block w-full appearance-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
      value={value}
      onChange={onChange}
    >
      <option value="">Your city</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </FieldWrapper>
);

const Signupui = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [location, setLocation] = useState('');
  const [agentPhone, setagentPhone] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      // Create a new user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Upload the profile picture to Firebase Storage
      if (profilePicture) {
        const storageRef = ref(storage, `profilePictures/${user.uid}`);
        await uploadBytes(storageRef, profilePicture);
        const downloadURL = await getDownloadURL(storageRef);

        // Update the user's profile with the profile picture URL
        await updateProfile(user, {
          displayName: `${firstName} ${lastName}`,
          photoURL: downloadURL,
          agentPhone: agentPhone,
        });
      } else {
        // If no profile picture was selected, update the user's profile without a photoURL
        await updateProfile(user, {
  displayName: `${firstName} ${lastName}`,
  photoURL: null,
});

}
  // Save additional data like location to your own database (e.g., Firestore) using user.uid as the identifier

  console.log("User created");

  navigate("/");
} catch (error) {
  setError(error.message);
}
};

const handleFirstNameChange = (event) => {
setFirstName(event.target.value);
};

const handleLastNameChange = (event) => {
setLastName(event.target.value);
};

const handleEmailChange = (event) => {
setEmail(event.target.value);
};

const handlePasswordChange = (event) => {
setPassword(event.target.value);
};

const handleConfirmPasswordChange = (event) => {
setConfirmPassword(event.target.value);
};

const handleLocationChange = (event) => {
setLocation(event.target.value);
};

const handleagentPhone = (event) => {
setagentPhone(event.target.value);
};

const handleProfilePictureChange = (event) => {
const file = event.target.files[0];
setProfilePicture(file);
};

return (
 <div className="h-full w-fit flex flex-col items-center justify-center insback1" >  
<div className="bg-white rounded-lg shadow-lg p-8 md:p-12 lg:p-16 h-fit ">
<div>
<Logo />
<h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
Create your account
</h2>
</div>
<form className="mt-8 space-y-6" onSubmit={handleFormSubmit}>
<input type="hidden" name="remember" defaultValue="true" />
<div className="-space-y-px rounded-md shadow-sm">
<TextInput
           id="firstName"
           label="First Name"
           placeholder="Enter your first name"
           value={firstName}
           onChange={handleFirstNameChange}
         />
<TextInput
           id="lastName"
           label="Last Name"
           placeholder="Enter your last name"
           value={lastName}
           onChange={handleLastNameChange}
         />
<TextInput
           id="email"
           label="Email"
           placeholder="Enter your email address"
           value={email}
           onChange={handleEmailChange}
         />
         <TextInput
           id="agentPhone"
           label="AgentContact"
           placeholder="Your contact"
           value={agentPhone}
           onChange={handleagentPhone}
         />
<TextInput
           id="password"
           label="Password"
           placeholder="Enter your password"
           type="password"
           value={password}
           onChange={handlePasswordChange}
         />
<TextInput
           id="confirmPassword"
           label="Confirm Password"
           placeholder="Confirm your password"
           type="password"
           value={confirmPassword}
           onChange={handleConfirmPasswordChange}
         />
<SelectInput
id="location"
label="Location"
options={[
'Lahore',
'Karachi',
'Multan',
'Rawalpindi',
'Gujranwala',
'Islamabad',
'Faisalabad',
]}
value={location}
onChange={handleLocationChange}
/>
<FieldWrapper id="profilePicture" label="Profile Picture">
<input
             id="profilePicture"
             name="profilePicture"
             type="file"
             accept="image/*"
             onChange={handleProfilePictureChange}
           />
</FieldWrapper>
</div>
{error && (
<div className="text-red-500 text-center">
<p>{error}</p>
</div>
)}
<div>
<button
type="submit"
className="group relative flex w-full justify-center rounded-md border border-transparent bg-emerald-600 py-2 px-4 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset2"
>
<span className="absolute inset-y-0 left-0 flex items-center pl-3">
<svg
               className="h-5 w-5 text-emerald-500 group-hover:text-emerald-400"
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 20 20"
               fill="currentColor"
               aria-hidden="true"
             >
<path
                 fillRule="evenodd"
                 d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3H6a1 1 0 100 2h3v3a1 1 0 102 0v-3h3a1 1 0 100-2h-3V7z"
                 clipRule="evenodd"
               />
</svg>
</span>
Sign up
</button>
</div>
<div>
<p className="mt-2 text-center text-sm text-gray-600">
Already have an account?{" "}
<Link to="/Loginpage" className="font-medium text-emerald-600 hover:text-emerald-500"
              >
Log in
</Link>
</p>
</div>
</form>
</div>
</div>
);
};

export default Signupui;