import ProductItem from "../../product-item";
import ProductsLoading from "./loading";
import axios from "axios";
import { useEffect } from "react";
import React from "react";

const ProductsContent = ({ data, setData, selectVal ,sellerId}: any) => {
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("/api/product");
      console.log(result.data);
      console.log(sellerId);
      let pData = result.data;
      if (sellerId !== "all") {
        pData = result.data.filter((item: any) => item.sellerId._id === sellerId);
      }
      setData(pData);
    };
    fetchData();
  }, []);
  return (
    <>
      {!data && <ProductsLoading />}

      {data && (
        <section className="products-list">
          {selectVal === "" &&
            data.map((item: any) => (
              <ProductItem
                id={item._id}
                name={item.name}
                price={item.price}
                color={item.color}
                currentPrice={item.price}
                key={item._id}
                images={item.images}
              />
            ))}
          {selectVal !== "all" &&
            data.map(
              (item: any) =>
                item.category === selectVal && (
                  <ProductItem
                    id={item._id}
                    name={item.name}
                    price={item.price}
                    color={item.color}
                    currentPrice={item.price}
                    key={item._id}
                    images={item.images}
                  />
                )
            )}
        </section>
      )}
    </>
  );
};

export default ProductsContent;
