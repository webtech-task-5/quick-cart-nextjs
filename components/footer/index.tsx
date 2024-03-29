import Logo from "../../assets/icons/logo";
import React from "react";
const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__description">
            <h6>
              <Logo /> <span>Cart</span>-O
            </h6>
            <p>
              Cart-O offers fashionable rugs, curtains, and doormats for all
              ages and styles. Discover high-quality home decor that suits your
              taste.
            </p>
            {/* <ul className="site-footer__social-networks">
              <li>
                <a href="#">
                  <i className="icon-facebook"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="icon-twitter"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="icon-linkedin"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="icon-instagram"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="icon-youtube-play"></i>
                </a>
              </li>
            </ul> */}
          </div>
        </div>
      </div>

      <div className="site-footer__bottom">
        <div className="container">
          <p>
            DESIGN BY NOWSHIN ALAM OWISHI & MOKSEDUR RAHMAN SOHAN - © 2023. ALL
            RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
