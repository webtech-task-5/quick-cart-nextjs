import { useSelector } from "react-redux";
import React from "react";
const CheckoutItems = () => {
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <ul className="checkout-items">
      {cartItems.map((item, key) => (
        <li className="checkout-item" key={key}>
          <div className="checkout-item__content">
            <div className="checkout-item__img">
              <img src={item.thumb} />
            </div>

            <div className="checkout-item__data">
              <h3>{item.name}</h3>
              <span>#{item.id}</span>
            </div>
          </div>
          <h3>৳{item.price}</h3>
        </li>
      ))}
    </ul>
  );
};

export default CheckoutItems;
