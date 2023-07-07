import React from 'react';

function Success() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-8 rounded-lg shadow-lg text-white">
                <h1 className="text-4xl font-bold mb-4">Thank you for your purchase!</h1>
                <p className="text-lg">We appreciate your business.</p>
            </div>
        </div>
    );
}

export default Success;
