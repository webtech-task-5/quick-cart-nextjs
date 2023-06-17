import ProductsCarousel from "./carousel";
import React, { useState, useEffect } from "react";
import axios from "axios";
const ProductsFeatured = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/product");
      let messData = res.data;
      messData.map((item: any) => {
        item.id = item._id;
        item.currentPrice = item.price;
        item.images = item.images;
        item.discount = "10";
        item.color = "red";
        item.price = item.price;
      });

      setData(messData);
    };
    fetchData();
  }, []);

  return (
    <section className="section section-products-featured">
      <div className="container">
        <header className="section-products-featured__header">
          <h3>Selected just for you</h3>
          <a href="/products" className="btn btn--rounded btn--border">
            Show All
          </a>
        </header>

        <ProductsCarousel products={data} />
      </div>
    </section>
  );
};

export default ProductsFeatured;
