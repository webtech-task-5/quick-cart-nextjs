import { useState } from "react";
import List from "./list";
import React from "react";
const ProductsContent = () => {
  const [orderProductsOpen, setOrderProductsOpen] = useState(false);
  const [data, setData] = useState([]) as any;
  const [selectval, setSelectVal] = useState("");
  return (
    <section className="products-content" style={{ marginTop: "20px" }}>
      <div className="products-content__intro">
        <h2>
          {/* TODO: shows 0 from seller, but shows the data */}
          Our Offerings <span>({data.length})</span>
        </h2>
        <button
          type="button"
          onClick={() => setOrderProductsOpen(!orderProductsOpen)}
          className="products-filter-btn"
        >
          <i className="icon-filters"></i>
        </button>
        <form
          className={`products-content__filter ${
            orderProductsOpen ? "products-order-open" : ""
          }`}
        >
          <div className="products__filter__select">
            <h4>Show products: </h4>
            <div className="select-wrapper">
              <select
                value={selectval}
                onChange={(e) => {
                  setSelectVal(e.currentTarget.value);
                  console.log({ selectval });
                }}
              >
                <option value="">All</option>
                <option value="rug">Rug</option>
                <option value="doormat">Doormat</option>
                <option value="curtain">Curtain</option>
              </select>
            </div>
          </div>
          {/* <div className="products__filter__select">
            <h4>Sort by: </h4>
            <div className="select-wrapper">
              <select>
                <option>Popular</option>
              </select>
            </div>
          </div> */}
        </form>
      </div>
      <List selectVal={selectval} />
    </section>
  );
};

export default ProductsContent;
