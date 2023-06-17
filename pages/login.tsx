import Layout from "../layouts/Main";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import { useRouter } from "next/router";
const LoginPage = () => {
  const { register, errors } = useForm();
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/login", data);
      const token = res.data.token;
      localStorage.setItem("token", token);
      const type = res.data.user.type;
      const isVerified = res.data.user.isVerified;
      if (!isVerified) {
        return router.push("/complete-registration");
      }

      if (type == "seller") router.push("/seller");
      else {
        router.push("/products");
      }
      return;
    } catch (err: any) {
      console.log(err);
      alert(err.data?.error ?? "Something went wrong.");
      return;
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      router.push("/");
    }
  }, []);

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
            {/* <h2 className="form-block__title">Log in</h2>
            <p className="form-block__description">Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p> */}

            <form className="form">
              <div className="form__input-row">
                <input
                  className="form__input"
                  placeholder="email"
                  type="text"
                  name="email"
                  ref={register({
                    required: true,
                    pattern:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                  onChange={(e) => {
                    setData({ ...data, email: e.target.value });
                  }}
                />

                {errors.email && errors.email.type === "required" && (
                  <p className="message message--error">
                    This field is required
                  </p>
                )}

                {errors.email && errors.email.type === "pattern" && (
                  <p className="message message--error">
                    Please write a valid email
                  </p>
                )}
              </div>

              <div className="form__input-row">
                <input
                  className="form__input"
                  type="password"
                  placeholder="Password"
                  name="password"
                  ref={register({ required: true })}
                  onChange={(e) => {
                    setData({ ...data, password: e.target.value });
                  }}
                />
                {errors.password && errors.password.type === "required" && (
                  <p className="message message--error">
                    This field is required
                  </p>
                )}
              </div>

              <div className="form__info">
                <div className="checkbox-wrapper">
                  <label
                    htmlFor="check-signed-in"
                    className={`checkbox checkbox--sm`}
                  >
                    <input
                      type="checkbox"
                      name="keepSigned"
                      id="check-signed-in"
                      ref={register({ required: false })}
                    />
                    <span className="checkbox__check"></span>
                    <p>Keep me signed in</p>
                  </label>
                </div>
                <a
                  href="/forgot-password"
                  className="form__info__forgot-password"
                >
                  Forgot password?
                </a>
              </div>

              {/* <div className="form__btns">
                <button type="button" className="btn-social fb-btn"><i className="icon-facebook"></i>Facebook</button>
                <button type="button" className="btn-social google-btn"><img src="/images/icons/gmail.svg" alt="gmail" /> Gmail</button>
              </div> */}

              <button
                type="submit"
                className="btn btn--rounded btn--yellow btn-submit"
                onClick={onSubmit}
              >
                Sign in
              </button>

              <p className="form__signup-link">
                Not a member yet? <a href="/register">Sign up</a>
              </p>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LoginPage;
