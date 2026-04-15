import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import "./Navbar.scss";

const Navbar = () => {
  const cartCtx = useContext(CartContext);
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const count = cartCtx?.cart.reduce((a, i) => a + i.quantity, 0) || 0;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentCategory = params.get("category");

  return (
    <nav className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
      <div className="nav-logo">
        <Link to="/">ShopEasy</Link>
      </div>

      <div className="nav-links">
        <span
          className={!currentCategory ? "active" : ""}
          onClick={() => navigate("/")}
        >
          All
        </span>
        <span
          className={currentCategory === "mens-shirts" ? "active" : ""}
          onClick={() =>
            navigate("/?category=mens-shirts&category=mens-shoes&category=mens-watches")
          }
        >
          Men
        </span>
        <span
          className={currentCategory === "womens-dresses" ? "active" : ""}
          onClick={() =>
            navigate(
              "/?category=tops&category=womens-dresses&category=womens-bags&category=womens-shoes&category=womens-watches&category=womens-jewellery"
            )
          }
        >
          Women
        </span>
        <span
          className={currentCategory === "smartphones" ? "active" : ""}
          onClick={() =>
            navigate(
              "/?category=smartphones&category=laptops&category=tablets&category=mobile-accessories"
            )
          }
        >
          Electronics
        </span>
      </div>
      <div className="nav-right">
        <Link to="/cart" className="nav-cart">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"  
  >
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>

  {count > 0 && <span className="nav-badge">{count}</span>}
</Link>

       <button className="nav-hamburger" onClick={() => setMobileMenu(true)}>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
</button>
      </div>

      {mobileMenu && (
        <div
          className="nav-mobile-overlay"
          onClick={() => setMobileMenu(false)}
        >
          <div
            className="nav-mobile-menu"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="nav-mobile-top">
              <span>Menu</span>
              <button onClick={() => setMobileMenu(false)}>✕</button>
            </div>

            <div className="nav-mobile-links">
              <span
                onClick={() => {
                  navigate(
                    "/?category=mens-shirts&category=mens-shoes&category=mens-watches"
                  );
                  setMobileMenu(false);
                }}
              >
                Men
              </span>

              <span
                onClick={() => {
                  navigate(
                    "/?category=tops&category=womens-dresses&category=womens-bags&category=womens-shoes&category=womens-watches&category=womens-jewellery"
                  );
                  setMobileMenu(false);
                }}
              >
                Women
              </span>

              <span
                onClick={() => {
                  navigate(
                    "/?category=smartphones&category=laptops&category=tablets&category=mobile-accessories"
                  );
                  setMobileMenu(false);
                }}
              >
                Electronics
              </span>

              <span
                onClick={() => {
                  navigate("/");
                  setMobileMenu(false);
                }}
              >
                All
              </span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;