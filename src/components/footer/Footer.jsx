import React from "react";
import "./footer.css";
import {
  AiFillFacebook,
  AiFillTwitterSquare,
  AiFillInstagram,
} from "react-icons/ai";

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <p>
          &copy; Your E-Learning Platform. All rights reserved. <br /> Made
          by <a href="">Omorbekov Emirlan</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
