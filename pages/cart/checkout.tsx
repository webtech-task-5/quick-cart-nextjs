import Layout from "../../layouts/Main";
import { useSelector } from "react-redux";
import CheckoutStatus from "../../components/checkout-status";
import CheckoutItems from "../../components/checkout/items";
import { RootState } from "store";
import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { Button, Divider, Modal, Table, Text } from "@mantine/core";

import DefaultButton from "components/button";
import axios from "axios";

type usertype = {
  email: string;
  firstname: string;
  lastname: string;
  phoneNo: string;
};

type delAddress = {
  address: string;
  city: string;
  zip: string;
  country: string;
};
const CheckoutPage = () => {
  const [user, setUser] = useState<usertype | null>(null);
  const [deliveryAddress, setDeliveryAddress] = useState<delAddress>({
    address: "",
    city: "",
    zip: "",
    country: "Bangladesh",
  });
  const [open, setOpen] = useState<boolean>(false);
  const { cartItems } = useSelector((state: RootState) => state.cart);
  useEffect(() => {
    const token = localStorage.getItem("token") as string;
    const data = jwt.decode(token) as any;
    const user = data._doc;
    setUser(user);
  }, []);

  const onClick = () => {
    if (
      deliveryAddress.address !== "" &&
      deliveryAddress.city !== "" &&
      deliveryAddress.country !== "" &&
      deliveryAddress.zip !== ""
    )
      setOpen(true);
    else {
      alert("Please fill all the fields");
    }
  };

  const onClickModal = async () => {
    try {
      const userId = user?._id;
      const order = {
        userId,
        deliveryAddress,
        cartItems,
        total: priceTotal,
      };

      const res = await axios.post("/api/order", order);
      if (res.status === 200) alert("Order placed successfully");
      console.log(res);
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };
  const priceTotal = useSelector((state: RootState) => {
    const cartItems = state.cart.cartItems;
    let totalPrice = 0;
    if (cartItems.length > 0) {
      cartItems.map((item) => (totalPrice += item.price * item.count));
    }

    return totalPrice;
  });

  return (
    user && (
      <Layout>
        <section className="cart">
          <div className="container">
            <div className="cart__intro">
              <h3 className="cart__title">Shipping and Payment</h3>
              <CheckoutStatus step="checkout" />
            </div>

            <div className="checkout-content">
              <div className="checkout__col-6">
                <div className="block">
                  <h3 className="block__title">Shipping information</h3>
                  <form className="form">
                    <div className="form__input-row form__input-row--two">
                      <div className="form__col">
                        <input
                          className="form__input form__input--sm"
                          type="text"
                          disabled
                          style={{ fontWeight: "lighter" }}
                          placeholder="Email"
                          value={user.email}
                        />
                      </div>

                      <div className="form__col">
                        <input
                          className="form__input form__input--sm"
                          required
                          type="text"
                          placeholder="Address"
                          onChange={(e) =>
                            setDeliveryAddress({
                              ...deliveryAddress,
                              address: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="form__input-row form__input-row--two">
                      <div className="form__col">
                        <input
                          className="form__input form__input--sm"
                          type="text"
                          disabled
                          style={{ fontWeight: "lighter" }}
                          placeholder="First name"
                          value={user.firstname}
                        />
                      </div>

                      <div className="form__col">
                        <input
                          className="form__input form__input--sm"
                          type="text"
                          placeholder="City"
                          onChange={(e) =>
                            setDeliveryAddress({
                              ...deliveryAddress,
                              city: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="form__input-row form__input-row--two">
                      <div className="form__col">
                        <input
                          className="form__input form__input--sm"
                          type="text"
                          placeholder="Last name"
                          disabled
                          style={{ fontWeight: "lighter" }}
                          value={user.lastname}
                        />
                      </div>

                      <div className="form__col">
                        <input
                          className="form__input form__input--sm"
                          type="text"
                          placeholder="Postal code / ZIP"
                          onChange={(e) =>
                            setDeliveryAddress({
                              ...deliveryAddress,
                              zip: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="form__input-row form__input-row--two">
                      <div className="form__col">
                        <input
                          className="form__input form__input--sm"
                          type="text"
                          placeholder="Phone number"
                          disabled
                          style={{ fontWeight: "lighter" }}
                          value={user.phoneNo}
                        />
                      </div>

                      <div className="form__col">
                        <input
                          className="form__input form__input--sm"
                          type="text"
                          placeholder="Country"
                          disabled
                          style={{ fontWeight: "lighter" }}
                          value="Bangladesh"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <div className="checkout__col-2">
                <div className="block">
                  <h3 className="block__title">Your cart</h3>
                  <CheckoutItems />

                  <div className="checkout-total">
                    <p>Total cost</p>
                    <h3>৳ {priceTotal}</h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="cart-actions cart-actions--checkout">
              <a href="/cart" className="cart__btn-back">
                <i className="icon-left"></i>
              </a>
              <div className="cart-actions__items-wrapper">
                <button type="button" className="btn btn--rounded btn--border">
                  Continue shopping
                </button>
                <button
                  type="button"
                  className="btn btn--rounded btn--yellow"
                  onClick={onClick}
                >
                  Proceed to payment
                </button>
              </div>
            </div>
          </div>
        </section>
        <Modal
          opened={open}
          onClose={() => setOpen(false)}
          title="Confirm Order"
          centered
          size={"lg"}
        >
          <Divider my="sm" variant="dashed" />

          <Text>
            <span style={{ fontWeight: "bold" }}>Recepient: </span>
            {user.firstname} {user.lastname}
          </Text>
          <Text>
            <span style={{ fontWeight: "bold" }}>Email: </span>
            {user.email}
          </Text>
          <Text>
            <span style={{ fontWeight: "bold" }}>Phone number: </span>
            {user.phoneNo}
          </Text>
          <Text>
            <span style={{ fontWeight: "bold" }}>Address: </span>
            {deliveryAddress.address}, ZIP code: {deliveryAddress.zip},{" "}
            {deliveryAddress.city}, {deliveryAddress.country}
          </Text>
          <DefaultButton text="Place order" onClick={onClickModal} />
        </Modal>
      </Layout>
    )
  );
};

export default CheckoutPage;
