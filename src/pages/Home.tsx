import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts, getProductsByCategory } from "../api/api";
import ProductList from "../components/ProductList";
import Filter from "../components/Filter";
import Loader from "../components/Loader";
import Banner from "/banner-3.jpg";
import "./Home.scss";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: string;
};

const Home = () => {
  const [params] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const cats = params.getAll("category");
  const sort = params.get("sort") || undefined;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        let result: Product[] = [];

        if (cats.length === 0) {
          result = await getProducts(sort);

        } else if (cats.length === 1) {
          result = await getProductsByCategory(cats[0], sort);

        } else {
          // multiple categories — fetch each one and combine
          const allResults: Product[][] = [];

          for (const cat of cats) {
            const data = await getProductsByCategory(cat, sort);
            allResults.push(data);
          }

          const merged: Product[] = [];
          const addedIds: number[] = [];

          for (const list of allResults) {
            for (const product of list) {
              if (!addedIds.includes(product.id)) {
                merged.push(product);
                addedIds.push(product.id);
              }
            }
          }

          // have to sort manually here since we merged multiple api responses
          if (sort === "price_low") {
            merged.sort((a, b) => a.price - b.price);
          } else if (sort === "price_high") {
            merged.sort((a, b) => b.price - a.price);
          } else if (sort === "name_asc") {
            merged.sort((a, b) => a.title.localeCompare(b.title));
          }

          result = merged;
        }

        setProducts(result);
      } catch (err) {
        console.log("error fetching products", err);
      }

      setLoading(false);
    };

    fetchProducts();
  }, [JSON.stringify(cats), sort]);

  return (
    <>
      <img src={Banner} className="banner" alt="banner" />
      <main className="home-wrap">
        <h2 className="home-title">CHOOSE FROM VARIOUS CATEGORIES</h2>
        <Filter />

        {loading && <Loader fullScreen={false} />}

        {!loading && products.length === 0 && (
          <p className="home-msg">No products found.</p>
        )}

        {!loading && <ProductList products={products} />}
      </main>
    </>
  );
};

export default Home;  