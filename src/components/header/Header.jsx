import React from "react";
import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext";
import { useTheme } from "../../context/ThemeContext";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const Header = ({ isAuth }) => {
  const navigate = useNavigate();
  const { logoutUser, user } = UserData();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <header>
      <div className="logo">E-Learn</div>

      <div className="link">
        <Link to={"/"}>Home</Link>
        <Link to={"/courses"}>Courses</Link>
        <Link to={"/about"}>About</Link>
        {user?.role === "admin" && <Link to={"/admin/dashboard"}>Admin</Link>}
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === "light" ? <MdDarkMode /> : <MdLightMode />}
        </button>
        {isAuth ? (
          <>
            <Link to={"/account"}>{user?.name || "Account"}</Link>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
