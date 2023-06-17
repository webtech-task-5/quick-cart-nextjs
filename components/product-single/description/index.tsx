import { Text } from "@mantine/core";
import React from "react";

const Description = ({ show, seller, spec }: any) => {
  const style = {
    display: show ? "flex" : "none",
  };
  console.log({ seller, spec });
  return (
    <section style={style} className="product-single__description">
      <div className="product-description-block">
        <i className="icon-cart"></i>
        <h4>Details and product description</h4>
        <Text>{spec}</Text>
      </div>
      <div className="product-description-block">
        <i className="icon-avatar"></i>
        <h4>Seller Description</h4>
        <Text>
          <span style={{ fontWeight: "700" }}>Store name: </span>
          {seller.companyName}
        </Text>
        <Text>
          <span style={{ fontWeight: "700" }}>Seller name: </span>
          {seller.firstname} {seller.lastname}
        </Text>
        <Text>
          <span style={{ fontWeight: "700" }}>Seller email: </span>
          {seller.email}
        </Text>
      </div>
    </section>
  );
};

export default Description;
