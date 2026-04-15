import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "./Cart.scss";

const Cart = () => {
  const cart = useContext(CartContext);
  const [removingId, setRemovingId] = useState<number | null>(null);

  if (!cart) return null;

  const totalQty = cart.cart.reduce((a, i) => a + i.quantity, 0);
  const subtotal = cart.total;
  const shipping = totalQty > 0 ? 99 : 0;
  const total = subtotal + shipping;

  const handleRemove = (id: number) => {
    setRemovingId(id);
    setTimeout(() => {
      cart.removeItem(id);
      setRemovingId(null);
    }, 300);
  };

  const handleUpdateQty = (id: number, delta: number) => {
    const item = cart.cart.find(i => i.id === id);
    if (item) {
      const newQty = item.quantity + delta;
      if (newQty > 0) {
        cart.updateQuantity(id, newQty);
      } else {
        handleRemove(id);
      }
    }
  };

  return (
    <div className="cart-wrap">
      <Link to="/" className="cart-back">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Continue Shopping
      </Link>
      
      <div className="cart-header">
        <h2 className="cart-heading">Shopping Cart</h2>
        {cart.cart.length > 0 && (
          <button className="cart-clear" onClick={() => cart.clearCart()}>
            Clear All
          </button>
        )}
      </div>

      {cart.cart.length === 0 ? (
        <div className="cart-empty">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 20a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
            <path d="M20 20a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          <p>Your cart is empty</p>
          <Link to="/">Start Shopping →</Link>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.cart.map(item => (
              <div 
                key={item.id} 
                className={`cart-row ${removingId === item.id ? "removing" : ""}`}
              >
                <div className="cart-row-info">
                  <p className="cart-row-name">{item.title}</p>
                  <p className="cart-row-price">₹{item.price.toFixed(2)}</p>
                </div>
                
                <div className="cart-row-actions">
                  <div className="cart-qty">
                    <button onClick={() => handleUpdateQty(item.id, -1)}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleUpdateQty(item.id, 1)}>+</button>
                  </div>
                  
                  <p className="cart-row-total">₹{(item.price * item.quantity).toFixed(2)}</p>
                  
                  <button
                    className="cart-row-rm"
                    onClick={() => handleRemove(item.id)}
                    aria-label="Remove item"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="cart-summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="cart-summary-row">
              <span>Shipping</span>
              <span>₹{shipping.toFixed(2)}</span>
            </div>
            <div className="cart-summary-total">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>

          <button className="cart-checkout" onClick={() => alert("Checkout functionality coming soon!")}>
            Proceed to Checkout
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;