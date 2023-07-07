import React, { useState, useEffect } from "react";
import { db } from "./FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const querySnapshot = await getDocs(collection(db, "properties"));
      const propertyData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProperties(propertyData);
    };

    fetchProperties();
  }, []);

  return (
    <div>
      <h1>Properties</h1>
      <ul>
        {properties.map((property) => (
          <li key={property.id}>
            <h2>{property.city}</h2>
            <p>{property.description}</p>
            <img src={property.imageUrls[0]} alt="Property" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PropertyList;
