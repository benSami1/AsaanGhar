import React, { useContext, useEffect, useState } from 'react';
import { getAuth } from "firebase/auth";
import { collection, getDocs, deleteDoc } from 'firebase/firestore';

import { HouseContext } from './HouseContext';
import House from './House';
import { Link } from 'react-router-dom';
import { ImSpinner2 } from 'react-icons/im';
import { db } from './FirebaseConfig';

const EditList = () => {
  const { houses, loading, updateHouses } = useContext(HouseContext);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    if (auth.currentUser) {
      setCurrentUser(auth.currentUser.displayName);
    }
  }, []);

  const deleteHouse = async (id) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'approved'));
      
      querySnapshot.forEach((doc) => {
        if (doc.data().id === id) {
          deleteDoc(doc.ref);
        }
      });

      const updatedHouses = houses.filter(house => house.id !== id);
      updateHouses(updatedHouses);
    } catch (error) {
      console.error('Error deleting house:', error);
    }
  };

  if (loading) {
    return (
      <ImSpinner2 className='mx-auto animate-spin text-violet-700 text-4xl mt-[200px]' />
    );
  }

  if (!houses || houses.length < 1) {
    return (
      <div className='text-center text-3xl text-gray-400 mt-48'>
        Sorry, nothing was found.
      </div>
    );
  }

  const userHouses = houses.filter(house => house.agentName === currentUser);

  return (
    <section className='mb-20'>
      <div className='container mx-auto'>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-14'>
          {userHouses.map((house) => {
            return (
              <div key={house.id}>
                <Link to={`/property/${house.agentName}`}>
                  <House house={house} />
                </Link>
                <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'

                onClick={() => deleteHouse(house.id)}
                >Delete</button>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EditList;

