import React from "react";
import "./common.css";
import { Link, useNavigate } from "react-router-dom";
import { AiFillHome, AiOutlineLogout } from "react-icons/ai";
import { FaBook, FaUserAlt } from "react-icons/fa";
import { UserData } from "../../context/UserContext";
import toast from "react-hot-toast";

const Sidebar = () => {
  const { user, setIsAuth, setUser } = UserData();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      setIsAuth(false);
      setUser({});
      toast.success("Logged out successfully");
      navigate("/");
    }
  };

  return (
    <div className="sidebar">
      <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--card-shadow)" }}>
        <h3 style={{ margin: "0 0 4px 0", color: "var(--text-color)", fontSize: "16px", fontWeight: "600" }}>Admin Panel</h3>
        <p style={{ margin: "0", color: "var(--text-color)", opacity: 0.7, fontSize: "12px" }}>Welcome back!</p>
      </div>
      <ul>
        <li>
          <Link to={"/admin/dashboard"}>
            <div className="icon">
              <AiFillHome />
            </div>
            <span>Dashboard</span>
          </Link>
        </li>

        <li>
          <Link to={"/admin/course"}>
            <div className="icon">
              <FaBook />
            </div>
            <span>Courses</span>
          </Link>
        </li>

        {user && user.role === "admin" && (
          <li>
            <Link to={"/admin/users"}>
              <div className="icon">
                <FaUserAlt />
              </div>
              <span>Users</span>
            </Link>
          </li>
        )}

        <li style={{ borderTop: "1px solid var(--card-shadow)", marginTop: "auto" }}>
          <button
            onClick={handleLogout}
            style={{
              background: "none",
              border: "none",
              color: "var(--text-color)",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "16px 20px",
              width: "100%",
              cursor: "pointer",
              transition: "all 0.3s ease",
              fontSize: "14px",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(138, 75, 175, 0.1)";
              e.currentTarget.style.borderLeftColor = "#8a4baf";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.borderLeftColor = "transparent";
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <AiOutlineLogout />
            </div>
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
