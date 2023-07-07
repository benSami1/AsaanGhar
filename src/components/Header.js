import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth, onAuthStateChanged } from "./FirebaseConfig";
import Logo from "../assets/img/logo.svg";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [profilePictureURL, setProfilePictureURL] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (currentUser) {
      const storage = getStorage();
      const profilePictureRef = ref(storage, `profilePictures/${currentUser.uid}`);

      getDownloadURL(profilePictureRef)
        .then((url) => {
          setProfilePictureURL(url);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [currentUser]);

  const MenuItem = ({ to, children }) => (
    <Link
      to={to}
      className="block mt-4 lg:inline-block lg:mt-0 text-gray-700 hover:text-gray-900 mr-8"
    >
      {children}
    </Link>
  );

  const Dropdown = () => (
    <div className="origin-top-right absolute right-0 mt-2 w-70 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
      <div
        className="py-1"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        <div className="px-4 py-2 text-gray-700" role="menuitem">
          {currentUser.email}
        </div>
        <div className="px-4 py-2 text-gray-700" role="menuitem">
          {currentUser.displayName}
        </div>
        <button
          onClick={() => {
            auth.signOut();
          }}
          className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
          role="menuitem"
        >
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <header className="py-3  border-b">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <img src={Logo} alt="Logo" className="h-10 sm:h-16" />
        </Link>
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="block lg:hidden text-gray-700 hover:text-gray-900 focus:text-gray-900 focus:outline-none"
        >
          <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
            <path
              d={
                showMenu
                  ? "M19 13H5V11H19V13ZM19 7H5V7ZM5 17V15H19V17H5Z"
                  : "M4 6H20V8H4V6ZM4 11H20V13H4V11ZM4 16H20V18H4V16Z"
              }
            />
          </svg>
        </button>
                <nav className={`lg:flex ${showMenu ? "block" : "hidden"}`}>
          <div className="flex flex-col lg:flex-row lg:items-center">
            <MenuItem to="/">Buy</MenuItem>
            {currentUser && <MenuItem to="/Seller">Sell</MenuItem>}
            {currentUser && <MenuItem to="/EditPage">My Uploads</MenuItem>}

            <MenuItem to="/Inspection">Inspection</MenuItem>
            <MenuItem to="/Services">AsaanServices</MenuItem>
            <MenuItem to="/agents">AsaanAgents</MenuItem>
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="block text-gray-700 hover:text-gray-900 focus:text-gray-900 focus:outline-none"
                >
                  <div className="flex items-center">
                    {profilePictureURL ? (
                      <div className="w-10 h-10 rounded-full overflow-hidden mr-2">
  <img src={profilePictureURL} alt="Profile" className="w-full h-full" />
</div>

                      
                    ) : (
                      <svg
                        className="w-6 h-6 rounded-full mr-2 bg-gray-200"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 22a9 9 0 100-18 9 9 0 000 18z" />
                        <path d="M17.94 8.54a4 4 0 00-1.15-2.77M18 13v3h-3M6 21v-3M7.06 8.53A4 4 0 0112 7c1.66 0 2.99.97 3.94 2.34M6 7a4 4 0 016.92-2.53" />
                      </svg>
                    )}
                    <span className="mr-1">{currentUser.displayName}</span>
                    <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </button>
                {showDropdown && <Dropdown />}
              </div>
            ) : (
              <>
                <MenuItem to="/Loginpage">Login</MenuItem>
                <MenuItem to="/Signuppage">Sign Up!</MenuItem>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;

