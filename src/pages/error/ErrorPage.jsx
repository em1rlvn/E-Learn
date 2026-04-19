import React from "react";
import { Link } from "react-router-dom";
import { MdErrorOutline } from "react-icons/md";
import "./error.css";

const ErrorPage = () => {
  return (
    <div className="error-page">
      <div className="error-card">
        <div className="error-icon">
          <MdErrorOutline />
        </div>
        <h1>Страница не найдена</h1>
        <p>
          Похоже, вы ввели некорректный адрес или символы в URL. Проверьте путь и
          попробуйте снова.
        </p>
        <Link to="/" className="common-btn error-btn">
          На главную
        </Link>
      </div>
      <div className="error-glow"></div>
    </div>
  );
};

export default ErrorPage;
