import { Link } from "react-router-dom";
import "./ProductCards.scss";

type Product = {
  id: number;
  title: string;
  price: number;
  images: string[];
  category: string;
};

const ProductCards = ({ product }: { product: Product }) => {
  const img = product.images?.[0];

  return (
    <Link to={`/product/${product.id}`} className="pcard">
      <div className="pcard-img-wrap">
        <img src={img} alt={product.title} className="pcard-img" />
      </div>
      <div className="pcard-body">
        <span className="pcard-cat">{product.category}</span>
        <h4 className="pcard-title">{product.title}</h4>
        <p className="pcard-price">₹{product.price}</p>
      </div>
    </Link>
  );
};

export default ProductCards;