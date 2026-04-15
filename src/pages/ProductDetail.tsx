import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { getProduct } from "../api/api";
import { CartContext } from "../context/CartContext";
import "./ProductDetail.scss";

type Product = {
  id: number;
  title: string;
  price: number;
  images: string[];
  category: string;
  description: string; 
};

const ProductDetail = () => {
  const { id } = useParams();
  const cart = useContext(CartContext);
  const [product, setProduct] = useState<Product | null>(null);
  const [added, setAdded] = useState(false);
  const [mainImage, setMainImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getProduct(id).then(p => {
      setProduct(p);
      setLoading(false);
    });
  }, [id]);

  const handleAdd = () => {
    if (!product) return;
    for (let i = 0; i < quantity; i++) {
      cart?.addItem(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="pd-wrap">
        <div className="pd-skeleton">
          <div className="pd-skeleton-img"></div>
          <div className="pd-skeleton-info">
            <div className="pd-skeleton-line"></div>
            <div className="pd-skeleton-line"></div>
            <div className="pd-skeleton-line-short"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) return <p className="pd-loading">Product not found</p>;

  const inCart = cart?.cart.find(i => i.id === product.id)?.quantity || 0;

  return (
    <div className="pd-wrap"> 
      <button onClick={() => window.history.back()} className="pd-back">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to products
      </button>

      <div className="pd-layout">
        <div className="pd-img-side">
          <div className="pd-main-img">
            <img src={product.images[mainImage]} alt={product.title} />
          </div>
          
          {product.images.length > 1 && (
            <div className="pd-thumbnails">
              {product.images.map((img: string, i: number) => (
                <button 
                  key={i} 
                  className={`pd-thumb ${mainImage === i ? "active" : ""}`}
                  onClick={() => setMainImage(i)}
                >
                  <img src={img} alt={`View ${i + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="pd-info">
          <span className="pd-cat">{product.category}</span>
          
          <h1 className="pd-title">{product.title}</h1>
          
          <p className="pd-price">₹{product.price}</p>
          
          <p className="pd-desc">{product.description}</p>
          
          <div className="pd-actions">
            <div className="pd-qty">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>
            
            <button className={`pd-btn ${added ? "pd-btn--added" : ""}`} onClick={handleAdd}>
              {added ? (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Added to Cart
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 20a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                    <path d="M20 20a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                  Add to Cart {inCart > 0 && `(${inCart})`}
                </>
              )}
            </button>
          </div>
          
          {inCart > 0 && (
            <Link to="/cart" className="pd-view-cart">
              View in Cart →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;