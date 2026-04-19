import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import Testimonials from "../../components/testimonials/Testimonials";
import { CourseData } from "../../context/CourseContext";

const Home = () => {
  const navigate = useNavigate();
  const { courses } = CourseData();
  const courseCount = courses ? courses.length : 0;

  return (
    <div>
      <div className="home">
        <div className="home-content">
          <span className="eyebrow">Modern education for every skill level</span>
          <h1>Welcome to our E-Link Platform</h1>
          <p>Learn, grow, and launch your next career with courses powered by live API data.</p>
          <button onClick={() => navigate("/courses")} className="common-btn">
            Get Started
          </button>
        </div>
        <div className="home-stats">
          <div className="stat-card">
            <h3>{courseCount}</h3>
            <p>Curated Courses</p>
          </div>
          <div className="stat-card">
            <h3>24/7</h3>
            <p>Support Ready</p>
          </div>
          <div className="stat-card">
            <h3>Fast</h3>
            <p>Responsive UI</p>
          </div>
        </div>
      </div>
      <Testimonials />
    </div>
  );
};

export default Home;
