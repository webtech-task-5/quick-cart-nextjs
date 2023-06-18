import React, { useState } from "react";
import productsColors from "./../../../utils/data/products-colors";
import productsSizes from "./../../../utils/data/products-sizes";
import CheckboxColor from "./../../products-filter/form-builder/checkbox-color";
import { useDispatch, useSelector } from "react-redux";
import { some } from "lodash";
import { addProduct } from "store/reducers/cart";
import { toggleFavProduct } from "store/reducers/user";
import { ProductType, ProductStoreType } from "types";
import { RootState } from "store";
import { Badge } from "@mantine/core";

import { useRouter } from "next/router";
type ProductContent = {
  product: ProductType;
};

const Content = ({ product, edit }: any) => {
  const dispatch = useDispatch();
  const [count, setCount] = useState<number>(1);
  const [color, setColor] = useState<string>("");
  const [itemSize, setItemSize] = useState<string>("");

  const onColorSet = (e: string) => setColor(e);
  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setItemSize(e.target.value);

  const { favProducts } = useSelector((state: RootState) => state.user);
  const isFavourite = some(
    favProducts,
    (productId) => productId === product.id
  );

  const toggleFav = () => {
    dispatch(
      toggleFavProduct({
        id: product.id,
      })
    );
  };

  const addToCart = () => {
    const productToSave: ProductStoreType = {
      id: product._id,
      name: product.name,
      thumb: product.images ? product.images[0] : "",
      price: product.price,
      count: count,
      color: color,
      size: itemSize,
      sellerId: product.sellerId.bankAccount,
    };

    const productStore = {
      count,
      product: productToSave,
    };

    dispatch(addProduct(productStore));
  };
  const router = useRouter();
  return (
    <section className="product-content">
      <div className="product-content__intro">
        <h5 className="product__id">
          Product ID:<br></br>
          {product._id}
        </h5>
        <Badge  size="md" variant="gradient" gradient={{ from: '#99E9F2', to: '#000000', deg: 35 }} my={"sm"}>{product.category} </Badge>
        {/* <span className="product-on-sale">Sale</span> */}
        <h2 className="product__name">{product.name}</h2>

        <div className="product__prices">
          <h4>৳ {product.price}</h4>
          {product.discount && <span>৳ {product.price}</span>}
        </div>
      </div>

      <div className="product-content__filters">
        {/* <div className="product-filter-item">
          <div className="checkbox-color-wrapper">
            {productsColors.map((type) => (
              <CheckboxColor
                key={type.id}
                type={"radio"}
                name="product-color"
                color={type.color}
                valueName={type.label}
                onChange={onColorSet}
              />
            ))}
          </div>
        </div> */}
        {/* <div className="product-filter-item">
          <h5>
            Size: <strong>See size table</strong>
          </h5>
          <div className="checkbox-color-wrapper">
            <div className="select-wrapper">
              <select onChange={onSelectChange}>
                <option>Choose size</option>
                {productsSizes.map((type, index) => (
                  <option value={type.label} key={index}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div> */}
        <div className="product-filter-item">
          <h5>Quantity:</h5>
          <div className="quantity-buttons">
            <div className="quantity-button">
              <button
                type="button"
                onClick={() => setCount(count - 1)}
                className="quantity-button__btn"
              >
                -
              </button>
              <span>{count}</span>
              <button
                type="button"
                onClick={() => setCount(count + 1)}
                className="quantity-button__btn"
              >
                +
              </button>
            </div>

            <button
              type="submit"
              onClick={() => addToCart()}
              className="btn btn--rounded btn--yellow"
            >
              Add to cart
            </button>
            {edit && (
              <button
                className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 flex items-center justify-center"
                onClick={() => {
                  router.push(`/product/edit?id=${product._id}`);
                }}
              >
                <img
                  className="w-5 h-5 object-cover"
                  src="/images/icons/edit.png"
                  alt="Edit Icon"
                />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content;
