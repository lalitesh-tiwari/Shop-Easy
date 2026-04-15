import ProductCards from "./ProductCards";
import "./ProductList.scss";

type Product = {
  id: number;
  title: string;
  price: number;
  images: string[];
  category: string;
};

const ProductList = ({ products }: { products: Product[] }) => {
  return (
    <div className="plist">
      {products.map(p => (
        <ProductCards key={p.id} product={p} />
      ))}
    </div>
  );
};

export default ProductList;