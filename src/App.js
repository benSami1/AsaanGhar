import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import PropertyDetails from './pages/PropertyDetails';
import Inspection from './pages/Inspection';
import Loginpage from './pages/Loginpage';
import Services from './pages/Services';
import Signuppage from './pages/Signuppage';
import Seller from './pages/Seller';
import ServicePage from './pages/ServicePage';
import EditPage from './pages/EditPage';
import TenantPage from './pages/TenantPage';
import KirayaPage from './pages/KirayaPage';
import InterPage from './pages/InterPage';
import ImageGen from './pages/ImageGen';


import Cancel from './pages/Cancel';
import Store from './pages/Store';
import Success from './pages/Success';
import CartProvider from './CartContext';
import Agents from './components/Agents';
import AsaanCalculation from './components/AsaanCalculation';

const App = () => {
  return (
   
      <div className='w-full mx-auto bg-white'>
        <Header />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/property/:id' element={<PropertyDetails />} />
          <Route path='/inspection/*' element={<InspectionWrapper />} />
          <Route path='/loginpage' element={<Loginpage />} />
          <Route path='/services' element={<Services />} />
          <Route path='/signuppage' element={<Signuppage />} />
          <Route path='/seller' element={<Seller />} />
          <Route path='/servicepage' element={<ServicePage />} />
          <Route path='/editpage' element={<EditPage />} />
          <Route path='/tenantpage' element={<TenantPage />} />
          <Route path='/kirayapage' element={<KirayaPage />} />
          <Route path='/interpage' element={<InterPage />} />
          <Route path='/imagegen' element={<ImageGen />} />
          <Route path='/store' element={<Store />} />
          <Route path='/success' element={<Success />} />
          <Route path='/cancel' element={<Cancel />} />
          <Route path='/agents' element={<Agents />} />
          <Route path='/AsaanCalculation' element={<AsaanCalculation/>} />
        </Routes>

        <Footer />
      </div>
   
  );
};

const InspectionWrapper = () => {
  return (
    <>
     <CartProvider>
    
     
        <Routes>
         
          <Route index element={<Inspection />} />
           <Route index element={<Store />} />

        </Routes>
        
        </CartProvider>
      
   </>
  );
};

export default App;
