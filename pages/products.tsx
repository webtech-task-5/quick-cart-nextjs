import Layout from "../layouts/Main";
import Footer from "../components/footer";
import ProductsContent from "../components/products-content";
import React from "react";
const Products = () => (
  <Layout>
    {/* <Breadcrumb /> */}
    <section className="products-page">
      <div className="container">
        {/* <ProductsFilter /> */}
        <ProductsContent />
      </div>
    </section>
    <Footer />
  </Layout>
);

export default Products;
