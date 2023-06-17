const Description = ({ show, seller, spec }: any) => {
  const style = {
    display: show ? "flex" : "none",
  };

  return (
    <section style={style} className="product-single__description">
      <div className="product-description-block">
        <i className="icon-cart"></i>
        <h4>Details and product description</h4>
        <p>{spec}</p>
      </div>
      <div className="product-description-block">
        <i className="icon-avatar"></i>
        <h4>Seller Description</h4>
        <p>{JSON.stringify(seller)}</p>
      </div>
    </section>
  );
};

export default Description;
