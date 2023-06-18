import { GetServerSideProps } from "next";

import React, { useEffect, useState } from "react";
import Footer from "../../components/footer";
import Layout from "../../layouts/Main";
import Breadcrumb from "../../components/breadcrumb";
import ProductsFeatured from "../../components/products-featured";
import Gallery from "../../components/product-single/gallery";
import Content from "../../components/product-single/content";
import Description from "../../components/product-single/description";
import { server } from "../../utils/server";
import jwt from "jsonwebtoken";
// types
import { ProductType } from "types";
import axios from "axios";
type ProductPageType = {
  product: ProductType;
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const pid = query.pid;

  const res = await axios.get(`${server}/api/product/${pid}`);
  const product = res.data;

  return {
    props: {
      product,
    },
  };
};

const Product = ({ product }: any) => {
  const [showBlock, setShowBlock] = useState("description");
<<<<<<< HEAD
  console.log({product});
=======
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token") as string;
    if(!token) return;
    const decoded = jwt.decode(token) as any;
    const id = decoded._doc?._id;
    if (id === product.sellerId._id) {
      console.log("edit");
      setEdit(true);
    }
  }, []);

>>>>>>> af1115f424f3996fe3d9aad80de7d19dfaee4ff9
  return (
    <Layout>
      <Breadcrumb />

      <section className="product-single">
        <div className="container">
          <div className="product-single__content">
            <Gallery images={product.images} />
            <Content product={product} edit={edit}/>
          </div>

          <div className="product-single__info">
            <div className="product-single__info-btns">
              <button
                type="button"
                onClick={() => setShowBlock("description")}
                className={`btn btn--rounded ${
                  showBlock === "description" ? "btn--active" : ""
                }`}
              >
                Description
              </button>
              {/* <button
                type="button"
                onClick={() => setShowBlock("reviews")}
                className={`btn btn--rounded ${
                  showBlock === "reviews" ? "btn--active" : ""
                }`}
              >
                Reviews (2)
              </button> */}
            </div>

            <Description
              show={showBlock === "description"}
              seller={product.sellerId}
              spec={product.spec}
            />
            {/* <Reviews product={product} show={showBlock === "reviews"} /> */}
          </div>
        </div>
      </section>

      <div className="product-single-page">
        <ProductsFeatured />
      </div>
      <Footer />
    </Layout>
  );
};

export default Product;
