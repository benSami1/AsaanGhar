import { Card, Button } from 'react-bootstrap';
import { CartContext } from '../CartContext';
import { useContext } from 'react';

function ProductCard(props) {
  const product = props.product;
  const cart = useContext(CartContext);
  const productQuantity = cart.getProductQuantity(product.id);
  console.log(cart.items);
  
  return (
    <Card>
      <Card.Body>
        <Card.Title className="text-xl font-bold">{product.title}</Card.Title>
        <Card.Text className="text-lg font-medium">Rs: {product.price}</Card.Text>
        {productQuantity > 0 ? (
          <>
            <Button
              variant="danger"
              onClick={() => cart.deleteFromCart(product.id)}
              className="my-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg py-2 px-4"
            >
              Disagree
            </Button>
          </>
        ) : (
          <Button
            variant="primary"
            onClick={() => cart.addOneToCart(product.id)}
            className="my-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg py-2 px-4"
          >
            Agree
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
