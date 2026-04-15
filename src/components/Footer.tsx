import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./Footer.scss";

const Footer = () => {
  const cart = useContext(CartContext);

  const totalQty = cart?.cart.reduce((a, i) => a + i.quantity, 0) || 0;
  const total = cart?.total || 0;

  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-brand">
          <span className="footer-logo">ShopEasy</span>
          <span className="footer-copy">© {new Date().getFullYear()}</span>
        </p>

        <Link to="/cart" className="footer-cart">
          <div className="footer-cart-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 20a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
              <path d="M20 20a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {totalQty > 0 && <span className="footer-cart-badge">{totalQty}</span>}
          </div>
          <div className="footer-cart-info">
            <span className="footer-cart-label">Cart Total</span>
            <strong>₹{total.toFixed(2)}</strong>
          </div>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;