import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BiBed, BiBath, BiArea } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { fetchHousesData } from '../data';
import { FaFilePdf } from 'react-icons/fa';
import { AiFillCheckCircle } from 'react-icons/ai';
import Lottie from 'react-lottie';
import animationData from '../assets/lotties/78068-real-estate.json';

const defaultOptions = {
  loop: true,
  autoplay: true, 
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const housesData = await fetchHousesData();
        const propertyData = housesData.find((house) => house.id === id);
        if (propertyData) {
          setProperty(propertyData);
          
        }
      } catch (error) {
        console.error("Error fetching property data: ", error);
      }
    };
    fetchProperty();
  }, [id]);

  if (!property) {
    return (
      <div>
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>
    );
  }

  return (
    <div className='container mx-auto min-h-fit mb-20'>
      
      <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between'>
        <div>
          <h2 className='text-2xl font-semibold'>{property.name}</h2>
          <h3 className='text-lg mb-4'>{property.address}</h3>
        </div>
        <div className='mb-4 lg:mb-0 flex gap-x-2 text-sm'>
          <div className='bg-green-500 rounded-full text-white px-3 inline-block'>
            {property.type}
          </div>
          <div className='bg-violet-500 rounded-full text-white px-3 inline-block'>
            {property.country}
          </div>
        </div>
        <div className='text-3xl font-semibold text-violet-600'>
          $ {property.price}
        </div>
      </div>
      <div className='flex flex-col items-start gap-8 lg:flex-row'>
        <div className='max-w-[768px]'>
          <div className='mb-8'>
            <img src={property.imageLg} alt='' />
          </div>
          <div className='flex gap-x-6 text-violet-700 mb-6'>
            <div className='flex gap-x-2 items-center'>
              <BiBed className='text-2xl' />
              <div className='text-lg font-medium'>{property.bedrooms}</div>
            </div>
            <div className='flex gap-x-2 items-center'>
              <BiBath className='text-2xl' />
              <div className='text-lg font-medium'>{property.bathrooms}</div>
            </div>
            <div className='flex gap-x-2 items-center'>
              <BiArea className='text-2xl' />
              <div className='text-lg font-medium'>{property.surface}</div>
            </div>
            <div className='flex gap-x-2 items-center'>
                          <a href='https://lda.gop.pk/ldaonline/' target='_blank' rel='noopener noreferrer'>
              <AiFillCheckCircle className='text-2xl' />
            </a>
            <div className='text-lg font-medium'>{property.surface}</div>
          </div>
          <div className='flex gap-x-2 items-center'>
            <FaFilePdf className='text-2xl' />
            <a 
              className='text-lg font-medium' 
              href={property.pdfUrl} 
              target='_blank' 
              rel='noopener noreferrer'
            >
              Open PDF
            </a>
          </div>
        </div>
        <p>{property.description}</p>
        <div className='mt-6'>
          <h2 className='text-2xl font-semibold'> Directions</h2>
         <div style={{ 
  borderRadius: '7%', 
  overflow: 'hidden', 
  width: '795px', 
  height: '450px',
  transition: 'box-shadow .3s ease-in-out'
}} 
className="hover:shadow-xl">
  <iframe
    src={property.gmap}
    width="100%"
    height="100%"
    style={{ border: "0" }}
    allowFullScreen=""
    loading="lazy"
  ></iframe>
</div>

        </div>
      </div>
      <div className='flex-1 w-full mb-8 bg-white border border-gray-300 rounded-lg px-6 py-8'>
        <div className='flex items-center gap-x-4 mb-8'>
          <div className='w-20 h-20 p-1 border border-gray-300 rounded-full'>
            <img src={property.agentImage} alt='' />
          </div>
          <div>
            <div className='font-bold text-lg'>{property.agentName}</div>
            <Link to='' className='text-violet-700 text-sm'>
              View listings
            </Link>
          </div>
        </div>
        <form className='flex flex-col gap-y-4'>
          <input
            className='border border-gray-300 focus:border-violet-700 rounded w-full px-4 h-14 text-sm outline-none'
            type='text'
            placeholder='Name*'
          />
          <input
            className='border border-gray-300 focus:border-violet-700 rounded w-full px-4 h-14 text-sm outline-none'
            type='text'
            placeholder='Email*'
          />
          <input
            className='border border-gray-300 focus:border-violet-700 rounded w-full px-4 h-14 text-sm outline-none'
            type='text'
            placeholder='Phone*'
          />
          <textarea
            className='border border-gray-300 focus:border-violet-700 rounded w-full p-4 h-36 text-sm text-gray-400 outline-none resize-none'
            type='text'
            placeholder='Message*'
            defaultValue='Hello, I am interested in [Modern apartment]'
          />
          <div className='flex gap-x-2'>
            <button
  className='bg-violet-700 hover:bg-violet-800 text-white rounded p-4 text-sm w-full transition'
  type='button'
  onClick={() => {
    const message = `Hello, I'm interested in property with listed on AsaanGhar under this name: ${property.name}`;
    // Replace with the phone number you want to send a message to
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${id}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  }}
>
  Send message
</button>

       <button 
  className='border border-violet-700 text-violet-700 hover:border-purple-600 hover:text-purple-600 rounded p-4 text-sm w-full transition'
  onClick={() => window.open("https://easypaisa.com.pk/", "_blank")}
>
  Pay Advance
</button>

          </div>
        </form>
      </div>
    </div>
  </div>
);
};

export default PropertyDetails;

