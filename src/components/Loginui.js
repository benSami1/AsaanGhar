import React, { useState, memo, Suspense } from "react";
import { auth } from "./FirebaseConfig";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

const Logo = memo(() => (
  <img
    className="mx-auto h-12 w-auto"
    src="https://tailwindui.com/img/logos/mark.svg?color=emerald&shade=600"
    alt="Your Company"
  />
));

const FieldWrapper = memo(({ id, label, children }) => (
  <div className="mb-4">
    <label htmlFor={id} className="sr-only">
      {label}
    </label>
    {children}
  </div>
));

const TextInput = memo(({ id, label, type, placeholder, onChange }) => (
  <FieldWrapper id={id} label={label}>
    <input
      id={id}
      name={id}
      type={type}
      required
      className="block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
      placeholder={placeholder}
      onChange={onChange}
    />
  </FieldWrapper>
));

const Loginui = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setErrorMessage("Invalid email address. Please check your input.");
      return;
    }

    try {
      // Sign in with email and password
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect to homepage after successful login
      navigate("/");
    } catch (error) {
      console.error("Error during sign in:", error);

      if (error.code === "auth/user-not-found") {
        setErrorMessage("User not found. Please register first.");
      } else if (error.code === "auth/wrong-password") {
        setErrorMessage("Incorrect password. Please try again.");
      } else {
        setErrorMessage(`Error during sign in: ${error.message}`);
      }
    }
  };

  // Email validation function
  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center GeeksForGeeks" >

      <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 lg:p-16">
        <div>
          <Logo />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          {errorMessage && (
            <p className="mt-2 text-center text-red-600">{errorMessage}</p>
          )}
        </div>

        <form
          className="mt-8 space-y-6"
         
          action="#"
          method="POST"
          onSubmit={handleFormSubmit}
        >
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <TextInput
              id="email"
              label="Email address"
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextInput
              id="password"
              label="Password"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a
                href="/forgot-password"
                className="font-medium text-emerald-600 hover:text-emerald-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              Sign in
            </button>
          </div>
          <div>
            <p className="mt-2 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/Signuppage"
                className="font-medium text-emerald-600 hover:text-emerald-500"
              >
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

const LoginuiWithSuspense = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Loginui />
  </Suspense>
);

export default LoginuiWithSuspense;
