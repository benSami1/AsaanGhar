import { useState, useContext } from 'react';
import { CartContext } from "../CartContext";
import CartProduct from './CartProduct';




function NavbarComponent() {
  const cart = useContext(CartContext);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const checkout = async () => {
    await fetch('http://localhost:4000/checkout', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({items: cart.items})
    }).then((response) => {
      return response.json();
    }).then((response) => {
      if(response.url) {
        window.location.assign(response.url); // Forwarding user to Stripe
      }
    });
  }

  const productsCount = cart.items.reduce((sum, product) => sum + product.quantity, 0);

  return (
    <>
      <nav className="flex rounded-lg items-center justify-between bg-gray-800 text-white p-4">
        <a href="/" className="text-xl font-bold">Inspection Advance</a>
      
      


        <button onClick={handleShow} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
          Confirm & Pay
        </button>
        
        
      </nav>
      {show && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded p-4 z-50">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Shopping Cart</h2>
              <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M3.646 3.646a.5.5 0 0 1 .708 0L10 9.293l5.646-5.647a.5.5 0 1 1 .708.708L10.707 10l5.647 5.646a.5.5 0 0 1-.708.708L10 10.707l-5.646 5.647a.5.5 0 0 1-.708-.708L9.293 10 3.646 4.354a.5.5 0 0 1 0-.708z" />
                </svg>
              </button>
            </div>
            {productsCount > 0 ? (
              <>
                <p>Items in your cart:</p>
                {cart.items.map((currentProduct, idx) => (
                  <CartProduct key={idx} id={currentProduct.id} quantity={currentProduct.quantity} />
                ))}

                <h1>Total: {cart.getTotalCost().toFixed(2)}</h1>

                <button
                  onClick={checkout}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                >
                  Pay Now!
                </button>
              </>
            ) : (
              <h1>Please Book the Inspection</h1>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default NavbarComponent;
