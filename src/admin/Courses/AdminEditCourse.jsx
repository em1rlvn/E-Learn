import React, { useState, useEffect } from "react";
import Layout from "../Utils/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import "./admincourses.css";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../../config";
import { FiArrowLeft } from "react-icons/fi";

const categories = [
  "Web Development",
  "App Development",
  "Game Development",
  "Data Science",
  "Artificial Intelligence",
  "JavaScript Frameworks",
  "Backend",
  "Design",
  "AI/ML",
];

const AdminEditCourse = ({ user }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { courses } = CourseData();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState("");
  const [imagePrev, setImagePrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    const course = courses?.find((c) => c._id === id);
    if (course) {
      setTitle(course.title);
      setDescription(course.description);
      setCategory(course.category);
      setPrice(course.price);
      setCreatedBy(course.createdBy);
      setDuration(course.duration);
      setImagePrev(course.image);
    }
  }, [courses, id]);

  if (user && user.role !== "admin") return null;

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (!title || !description || !category || !price || !createdBy || !duration) {
      toast.error("All fields are required");
      return;
    }

    setBtnLoading(true);

    try {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast.success("Course updated successfully!");
      navigate("/admin/course");
    } catch (error) {
      toast.error("Failed to update course");
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <Layout>
      <div style={{ padding: "30px", background: "var(--bg-color)", minHeight: "calc(100vh - 150px)" }}>
        <button
          onClick={() => navigate("/admin/course")}
          style={{
            background: "none",
            border: "none",
            color: "var(--text-color)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "14px",
            marginBottom: "20px",
            fontWeight: "600",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.color = "#8a4baf";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.color = "var(--text-color)";
          }}
        >
          <FiArrowLeft size={18} /> Back to Courses
        </button>

        <div style={{
          background: "var(--card-bg)",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 4px 15px var(--card-shadow)",
          maxWidth: "700px",
          color: "var(--text-color)",
        }}>
          <h1 style={{
            marginTop: "0",
            marginBottom: "30px",
            background: "linear-gradient(135deg, #8a4baf 0%, #b575d3 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            Edit Course
          </h1>

          <form onSubmit={submitHandler} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label style={{
                display: "block",
                marginBottom: "8px",
                color: "var(--text-color)",
                fontWeight: "600",
                textTransform: "uppercase",
                fontSize: "12px",
              }}>Course Title</label>
              <input
                type="text"
                placeholder="Enter course title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  border: "1px solid var(--card-shadow)",
                  borderRadius: "8px",
                  background: "var(--bg-color)",
                  color: "var(--text-color)",
                  fontSize: "14px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div>
              <label style={{
                display: "block",
                marginBottom: "8px",
                color: "var(--text-color)",
                fontWeight: "600",
                textTransform: "uppercase",
                fontSize: "12px",
              }}>Description</label>
              <textarea
                rows={6}
                placeholder="Enter course description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  border: "1px solid var(--card-shadow)",
                  borderRadius: "8px",
                  background: "var(--bg-color)",
                  color: "var(--text-color)",
                  fontSize: "14px",
                  boxSizing: "border-box",
                  fontFamily: "inherit",
                }}
              />
            </div>

            <div>
              <label style={{
                display: "block",
                marginBottom: "8px",
                color: "var(--text-color)",
                fontWeight: "600",
                textTransform: "uppercase",
                fontSize: "12px",
              }}>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  border: "1px solid var(--card-shadow)",
                  borderRadius: "8px",
                  background: "var(--bg-color)",
                  color: "var(--text-color)",
                  fontSize: "14px",
                  boxSizing: "border-box",
                }}
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{
                display: "block",
                marginBottom: "8px",
                color: "var(--text-color)",
                fontWeight: "600",
                textTransform: "uppercase",
                fontSize: "12px",
              }}>Price ($)</label>
              <input
                type="number"
                placeholder="Enter course price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                min="0"
                step="0.01"
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  border: "1px solid var(--card-shadow)",
                  borderRadius: "8px",
                  background: "var(--bg-color)",
                  color: "var(--text-color)",
                  fontSize: "14px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div>
              <label style={{
                display: "block",
                marginBottom: "8px",
                color: "var(--text-color)",
                fontWeight: "600",
                textTransform: "uppercase",
                fontSize: "12px",
              }}>Instructor Name</label>
              <input
                type="text"
                placeholder="Enter instructor name"
                value={createdBy}
                onChange={(e) => setCreatedBy(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  border: "1px solid var(--card-shadow)",
                  borderRadius: "8px",
                  background: "var(--bg-color)",
                  color: "var(--text-color)",
                  fontSize: "14px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div>
              <label style={{
                display: "block",
                marginBottom: "8px",
                color: "var(--text-color)",
                fontWeight: "600",
                textTransform: "uppercase",
                fontSize: "12px",
              }}>Duration (hours)</label>
              <input
                type="number"
                placeholder="Enter course duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
                min="1"
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  border: "1px solid var(--card-shadow)",
                  borderRadius: "8px",
                  background: "var(--bg-color)",
                  color: "var(--text-color)",
                  fontSize: "14px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div>
              <label style={{
                display: "block",
                marginBottom: "8px",
                color: "var(--text-color)",
                fontWeight: "600",
                textTransform: "uppercase",
                fontSize: "12px",
              }}>Course Image</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={changeImageHandler}
                style={{
                  padding: "8px",
                  border: "1px solid var(--card-shadow)",
                  borderRadius: "8px",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {imagePrev && (
              <div style={{ marginTop: "10px" }}>
                <img src={imagePrev} alt="Preview" style={{ borderRadius: "8px", maxWidth: "100%", maxHeight: "300px" }} />
              </div>
            )}

            <button
              type="submit"
              disabled={btnLoading}
              style={{
                padding: "12px 24px",
                background: "linear-gradient(135deg, #8a4baf 0%, #b575d3 100%)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: btnLoading ? "not-allowed" : "pointer",
                opacity: btnLoading ? 0.6 : 1,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginTop: "10px",
                transition: "all 0.3s ease",
              }}
            >
              {btnLoading ? "Updating..." : "Update Course"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AdminEditCourse;