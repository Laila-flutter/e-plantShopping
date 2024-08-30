import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeItem } from './CartSlice'; // Actions imported from CartSlice
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items); // Selector for cart items

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.quantity * parseFloat(item.cost.replace('$', '')), 0);
  };

  const calculateSubtotal = (item) => {
    return item.quantity * parseFloat(item.cost.replace('$', ''));
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ ...item, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ ...item, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item));
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.name} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>Price: {item.cost}</p>
                <div className="cart-item-quantity">
                  <button onClick={() => handleDecrement(item)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrement(item)}>+</button>
                </div>
                <p>Subtotal: ${calculateSubtotal(item).toFixed(2)}</p>
                <button onClick={() => handleRemove(item)}>Remove</button>
              </div>
            </div>
          ))}
          <h3>Total: ${calculateTotalAmount().toFixed(2)}</h3>
          <button onClick={onContinueShopping}>Continue Shopping</button>
          <button onClick={handleCheckoutShopping}>Checkout</button>
        </div>
      )}
    </div>
  );
};

export default CartItem;
