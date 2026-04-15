const BASE = "https://dummyjson.com";

export const getProducts = async (sort?: string) => {
  let url = `${BASE}/products?limit=100`;

  if (sort === "price_low") {
    url = url + "&sortBy=price&order=asc";
  } else if (sort === "price_high") {
    url = url + "&sortBy=price&order=desc";
  } else if (sort === "name_asc") {
    url = url + "&sortBy=title&order=asc";
  }

  const res = await fetch(url);
  const data = await res.json();
  return data.products;
};

export const getProduct = async (id: string) => {
  const res = await fetch(`${BASE}/products/${id}`);
  const data = await res.json();
  return data;
};

export const getCategories = async () => {
  const res = await fetch(`${BASE}/products/categories`);
  const data = await res.json();
  return data;
};

export const getProductsByCategory = async (category: string, sort?: string) => {
  let url = `${BASE}/products/category/${category}?limit=100`;

  if (sort === "price_low") {
    url = url + "&sortBy=price&order=asc";
  } else if (sort === "price_high") {
    url = url + "&sortBy=price&order=desc";
  } else if (sort === "name_asc") {
    url = url + "&sortBy=title&order=asc";
  }

  const res = await fetch(url);
  const data = await res.json();
  return data.products;
};