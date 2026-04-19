import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Utils/Layout";
import axios from "axios";
import { server } from "../../config";
import "./dashboard.css";
import { FaBook, FaUsers, FaChartLine, FaDollarSign } from "react-icons/fa";
import { CourseData } from "../../context/CourseContext";

const AdminDashbord = ({ user }) => {
  const navigate = useNavigate();
  const { courses } = CourseData();
  
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalUsers: 0,
    totalRevenue: 0,
    totalLectures: 0,
  });

  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
      return;
    }

    // Вычисляем статистику
    const totalRevenue = courses.reduce((sum, course) => sum + (course.price || 0), 0);
    setStats({
      totalCourses: courses.length,
      totalUsers: 5, // Mock данные
      totalRevenue: totalRevenue,
      totalLectures: courses.length * 3, // Примерно
    });
  }, [user, navigate, courses]);

  if (user && user.role !== "admin") return null;

  const statsData = [
    {
      title: "Total Courses",
      value: stats.totalCourses,
      icon: FaBook,
      color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      change: "+12%",
    },
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: FaUsers,
      color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      change: "+8%",
    },
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.toFixed(2)}`,
      icon: FaDollarSign,
      color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      change: "+15%",
    },
    {
      title: "Total Lectures",
      value: stats.totalLectures,
      icon: FaChartLine,
      color: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      change: "+20%",
    },
  ];

  return (
    <div>
      <Layout>
        <div className="main-content">
          {statsData.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="box" style={{ background: stat.color }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                  <p>{stat.title}</p>
                  <IconComponent size={24} style={{ opacity: 0.8 }} />
                </div>
                <p style={{ fontSize: "28px" }}>{stat.value}</p>
                <p style={{ fontSize: "12px", opacity: 0.9, marginTop: "8px" }}>
                  {stat.change} from last month
                </p>
              </div>
            );
          })}
        </div>

        {/* Дополнительная информация */}
        <div style={{
          padding: "30px",
          marginTop: "20px",
          background: "var(--card-bg)",
          borderRadius: "12px",
          boxShadow: "0 2px 10px var(--card-shadow)",
          color: "var(--text-color)",
        }}>
          <h2 style={{ marginTop: "0", marginBottom: "16px", color: "var(--text-color)" }}>Quick Stats</h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "16px",
          }}>
            <div style={{ padding: "16px", background: "rgba(138, 75, 175, 0.1)", borderRadius: "8px" }}>
              <p style={{ margin: "0 0 8px 0", opacity: 0.8, fontSize: "12px" }}>Average Rating</p>
              <p style={{ margin: "0", fontSize: "24px", fontWeight: "bold" }}>
                {courses.length > 0 ? (courses.reduce((sum, c) => sum + (c.rating || 0), 0) / courses.length).toFixed(1) : "0"}★
              </p>
            </div>
            <div style={{ padding: "16px", background: "rgba(138, 75, 175, 0.1)", borderRadius: "8px" }}>
              <p style={{ margin: "0 0 8px 0", opacity: 0.8, fontSize: "12px" }}>Course Categories</p>
              <p style={{ margin: "0", fontSize: "24px", fontWeight: "bold" }}>
                {new Set(courses.map(c => c.category)).size}
              </p>
            </div>
            <div style={{ padding: "16px", background: "rgba(138, 75, 175, 0.1)", borderRadius: "8px" }}>
              <p style={{ margin: "0 0 8px 0", opacity: 0.8, fontSize: "12px" }}>Avg Course Price</p>
              <p style={{ margin: "0", fontSize: "24px", fontWeight: "bold" }}>
                ${courses.length > 0 ? (stats.totalRevenue / courses.length).toFixed(2) : "0"}
              </p>
            </div>
          </div>
        </div>

        {/* Последние курсы */}
        {courses.length > 0 && (
          <div style={{
            padding: "30px",
            marginTop: "20px",
            background: "var(--card-bg)",
            borderRadius: "12px",
            boxShadow: "0 2px 10px var(--card-shadow)",
            color: "var(--text-color)",
          }}>
            <h2 style={{ marginTop: "0", marginBottom: "16px", color: "var(--text-color)" }}>Latest Courses</h2>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "16px",
            }}>
              {courses.slice(-4).map(course => (
                <div key={course._id} style={{
                  padding: "16px",
                  background: "rgba(138, 75, 175, 0.05)",
                  borderRadius: "8px",
                  border: "1px solid var(--card-shadow)",
                }}>
                  <p style={{ margin: "0 0 8px 0", fontWeight: "600", color: "var(--text-color)" }}>{course.title}</p>
                  <p style={{ margin: "0 0 8px 0", fontSize: "12px", opacity: 0.8 }}>{course.category}</p>
                  <p style={{ margin: "0", fontSize: "14px", fontWeight: "bold", color: "#8a4baf" }}>${course.price}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </Layout>
    </div>
  );
};

export default AdminDashbord;
