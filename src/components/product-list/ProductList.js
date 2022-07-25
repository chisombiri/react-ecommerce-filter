import { useState, useEffect } from "react";
import "./product-list.css";
import Categories from "../categories/Categories";
import Search from "../search/Search";
import Product from "../product/Product";
import { products as productData } from "../../data";

const allCategories = [
  "all",
  ...new Set(productData.map((product) => product.category)),
];

const ProductList = () => {
  const [products, setProducts] = useState(productData);
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState(allCategories);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filterProducts = (category) => {
    if (category === "all") {
      setProducts(productData);
      return;
    }
    const newProducts = productData.filter(
      (product) => product.category === category
    );
    setProducts(newProducts);
  };

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, products]);

  return (
    <>
      <div className="header">
        <header className="container">
          <h1 className="--color-white --text-center">
            <span className="--color-danger">Filter</span>ooo
          </h1>
          <div className="--flex-between --flex-dir-column --py">
            <Search inputValue={search} onInputChange={handleSearch} />
            <Categories categories={categories} filterItems={filterProducts} />
          </div>
        </header>
      </div>
      <div className="product-container">
        <div className="products container --grid-25 --py2">
          {filteredProducts.length === 0 ? (
            <h2 className="--color-danger">Sorry, no product matches that!</h2>
          ) : (
            filteredProducts.map((product) => {
              const { id, title, img, price } = product;
              return (
                <div key={id}>
                  <Product title={title} img={img} price={price} />
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default ProductList;
