import Layout from "../layouts/Main";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const RegisterPage = () => {
  const [checkCus, setCheckCus] = useState(false);
  const [checkSel, setCheckSel] = useState(true);
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const onClick = async (e: any) => {
    e.preventDefault();
    let type = checkCus ? "customer" : "seller";
    try {
      const data = await axios.post("/api/register", { ...user, type });
      console.log(data);
      router.push("/login");
    } catch (err: any) {
      alert(err.message);
    }
  };

  const checkTick = () => {
    setCheckCus((prev: boolean) => !prev);
    setCheckSel((prev: boolean) => !prev);
  };

  return (
    <Layout>
      <section className="form-page">
        <div className="container">
          {/* <div className="back-button-section">
          <Link href="/products">
            <a><i className="icon-left"></i> Back to store</a>
          </Link>
        </div> */}

          <div className="form-block">
            {/* <h2 className="form-block__title">Create an account and discover the benefits</h2>
          <p className="form-block__description">Lorem Ipsum is simply dummy text of the printing
          and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p> */}

            <form className="form">
              <div className="form__input-row">
                <input
                  className="form__input"
                  placeholder="First Name"
                  type="text"
                  required
                  onChange={(e) => {
                    setUser({ ...user, firstname: e.target.value });
                  }}
                />
              </div>

              <div className="form__input-row">
                <input
                  className="form__input"
                  placeholder="Last Name"
                  type="text"
                  required
                  onChange={(e) => {
                    setUser({ ...user, lastname: e.target.value });
                  }}
                />
              </div>

              <div className="form__input-row">
                <input
                  className="form__input"
                  placeholder="Email"
                  type="text"
                  required
                  onChange={(e) => {
                    setUser({ ...user, email: e.target.value });
                  }}
                />
              </div>

              <div className="form__input-row">
                <input
                  className="form__input"
                  type="Password"
                  placeholder="Password"
                  required
                  onChange={(e) => {
                    setUser({ ...user, password: e.target.value });
                  }}
                />
              </div>
              <div
                className="form__input-row"
                style={{ display: "flex", gap: "10px" }}
              >
                <label htmlFor="check-cus" className={`checkbox checkbox--sm`}>
                  <input
                    name="signed-in"
                    type="checkbox"
                    id="check-cus"
                    onChange={checkTick}
                    checked={checkCus}
                  />
                  <span className="checkbox__check"></span>
                  <p>Register as a customer</p>
                </label>
                <br />
                <label htmlFor="check-sel" className={`checkbox checkbox--sm`}>
                  <input
                    name="signed-in"
                    type="checkbox"
                    id="check-sel"
                    checked={checkSel}
                    onChange={checkTick}
                  />
                  <span className="checkbox__check"></span>
                  <p>Register as a seller</p>
                </label>
              </div>

              <button
                type="submit"
                className="btn btn--rounded btn--yellow btn-submit"
                onClick={onClick}
              >
                Sign up
              </button>

              <p className="form__signup-link">
                <Link href="/login">
                  <a href="#">Are you already a member?</a>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default RegisterPage;
