import Layout from "../layouts/Main";
import Footer from "../components/footer";
import ProductsContent from "../components/products-content";
import React from "react";
const Products = ({sellerId = "all"} : any) => (
  <Layout>
    {/* <Breadcrumb /> */}
    <section className="products-page">
      <div className="container">
        {/* <ProductsFilter /> */}
        <ProductsContent sellerId = {sellerId}/>
      </div>
    </section>
    <Footer />
  </Layout>
);

export default Products;
