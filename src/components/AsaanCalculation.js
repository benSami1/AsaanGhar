import React, { useState } from 'react';

const AsaanCalculation = () => {
  const [landCost, setLandCost] = useState('');
  const [constructionCost, setConstructionCost] = useState('');
  const [totalCost, setTotalCost] = useState('');

  const calculateTotalCost = () => {
    const land = parseFloat(landCost);
    const construction = parseFloat(constructionCost);
    const total = land + construction;

    setTotalCost(total.toFixed(2));
  };

  return (
    <div className="insback1 min-h-screen flex justify-center items-center">
      <div className="max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">AsaanCalculation</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="landCost">
            Land Cost
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="landCost"
            type="text"
            placeholder="Enter land cost"
            value={landCost}
            onChange={(e) => setLandCost(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="constructionCost">
            Construction Cost
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="constructionCost"
            type="text"
            placeholder="Enter construction cost"
            value={constructionCost}
            onChange={(e) => setConstructionCost(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={calculateTotalCost}
        >
          Calculate
        </button>
        <div className="mt-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="totalCost">
            Total Cost
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="totalCost"
            type="text"
            placeholder="Total cost"
            value={totalCost}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default AsaanCalculation;
