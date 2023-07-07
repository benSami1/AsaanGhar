import React, { createContext, useEffect, useState } from 'react';
import { fetchHousesData } from '../data';

export const HouseContext = createContext();

const HouseContextProvider = ({ children }) => {
  const [houses, setHouses] = useState([]);
  const [country, setCountry] = useState('Location (any)');
  const [countries, setCountries] = useState([]);
  const [property, setProperty] = useState('Property type (any)');
  const [properties, setProperties] = useState([]);
  const [price, setPrice] = useState('Price range (any)');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHouses = async () => {
      setLoading(true);
      try {
        const houseData = await fetchHousesData();
        setHouses(houseData);
      } catch (error) {
        console.error("Error fetching houses data: ", error);
      }
      setLoading(false);
    };

    fetchHouses();
  }, []);

  useEffect(() => {
    const allCountries = houses.map((house) => {
      return house.country;
    });

    const uniqueCountries = ['Location (any)', ...new Set(allCountries)];

    setCountries(uniqueCountries);
  }, [houses]);

  useEffect(() => {
    const allProperties = houses.map((house) => {
      return house.type;
    });

    const uniqueProperties = ['Property type (any)', ...new Set(allProperties)];

    setProperties(uniqueProperties);
  }, [houses]);

  const handleClick = () => {
    setLoading(true);
    const isDefault = (str) => {
      return str.split(' ').includes('(any)');
    };

    const minPrice = parseInt(price.split(' ')[0]);
    const maxPrice = parseInt(price.split(' ')[2]);

    const newHouses = houses.filter((house) => {
      const housePrice = parseInt(house.price);
      if (
        house.country === country &&
        house.type === property &&
        housePrice >= minPrice &&
        housePrice <= maxPrice
      ) {
        return true;
      }
      if (isDefault(country) && isDefault(property) && isDefault(price)) {
        return true;
      }
      if (!isDefault(country) && isDefault(property) && isDefault(price)) {
        return house.country === country;
      }
      if (!isDefault(property) && isDefault(country) && isDefault(price)) {
        return house.type === property;
      }
      if (!isDefault(price) && isDefault(country) && isDefault(property)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return true;
        }
      }
      if (!isDefault(country) && !isDefault(property) && isDefault(price)) {
        return house.country === country && house.type === property;
      }
      if (!isDefault(country) && isDefault(property) && !isDefault(price)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.country === country;
        }
      }
      if (isDefault(country) && !isDefault(property) && !isDefault(price)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.type === property;
        }
      }

      // Default return value
      return false;
    });

    setTimeout(() => {
      setHouses(newHouses.length < 1 ? [] : newHouses);
      setLoading(false);
    }, 1000);
  };

  return (
    <HouseContext.Provider
      value={{
        country,
        setCountry,
        countries,
        property,
        setProperty,
        properties,
        price,
        setPrice,
        handleClick,
        houses,
        loading,
      }}
    >
      {children}
    </HouseContext.Provider>
  );
};

export default HouseContextProvider;
