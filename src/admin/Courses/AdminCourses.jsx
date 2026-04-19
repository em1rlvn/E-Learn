import React, { useState } from "react";
import Layout from "../Utils/Layout";
import { useNavigate } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/coursecard/CourseCard";
import "./admincourses.css";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../../config";
import { FiTrash2, FiEdit2 } from "react-icons/fi";

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

const AdminCourses = ({ user }) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState("");
  const [imagePrev, setImagePrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const [localCourses, setLocalCourses] = useState([]);

  React.useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

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

  const { courses, fetchCourses } = CourseData();
  const displayCourses = localCourses.length > 0 ? localCourses : courses;

  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (!title || !description || !category || !price || !createdBy || !duration) {
      toast.error("All fields are required");
      return;
    }

    setBtnLoading(true);

    const myForm = new FormData();
    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("category", category);
    myForm.append("price", price);
    myForm.append("createdBy", createdBy);
    myForm.append("duration", duration);
    myForm.append("file", image);

    try {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newCourse = {
        _id: Date.now().toString(),
        title,
        description,
        category,
        price: parseFloat(price),
        createdBy,
        duration: parseInt(duration),
        image: imagePrev || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
        rating: 4.5,
      };

      setLocalCourses([...displayCourses, newCourse]);
      toast.success("Course created successfully!");
      
      // Очистка формы
      setImage("");
      setTitle("");
      setDescription("");
      setDuration("");
      setImagePrev("");
      setCreatedBy("");
      setPrice("");
      setCategory("");
      setBtnLoading(false);
    } catch (error) {
      toast.error("Failed to create course");
      setBtnLoading(false);
    }
  };

  const deleteCourse = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        // Имитация API запроса
        await new Promise(resolve => setTimeout(resolve, 300));
        
        setLocalCourses(displayCourses.filter(course => course._id !== id));
        toast.success("Course deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete course");
      }
    }
  };

  const editCourse = (id) => {
    toast.success("Redirecting to edit page...");
    navigate(`/admin/course/${id}`);
  };

  return (
    <Layout>
      <div className="admin-courses">
        <div className="left">
          <h1>All Courses ({displayCourses.length})</h1>
          <div className="dashboard-content">
            {displayCourses && displayCourses.length > 0 ? (
              displayCourses.map((course) => (
                <div key={course._id} style={{ position: "relative" }}>
                  <CourseCard course={course} />
                  <div style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    display: "flex",
                    gap: "8px",
                  }}>
                    <button
                      onClick={() => editCourse(course._id)}
                      style={{
                        padding: "8px 12px",
                        background: "#4CAF50",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        fontWeight: "600",
                        transition: "all 0.3s ease",
                      }}
                      onMouseOver={(e) => e.target.style.transform = "scale(1.05)"}
                      onMouseOut={(e) => e.target.style.transform = "scale(1)"}
                      title="Edit course"
                    >
                      <FiEdit2 size={14} />
                    </button>
                    <button
                      onClick={() => deleteCourse(course._id)}
                      style={{
                        padding: "8px 12px",
                        background: "#f44336",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        fontWeight: "600",
                        transition: "all 0.3s ease",
                      }}
                      onMouseOver={(e) => e.target.style.transform = "scale(1.05)"}
                      onMouseOut={(e) => e.target.style.transform = "scale(1)"}
                      title="Delete course"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ gridColumn: "1 / -1", textAlign: "center", color: "var(--text-color)", opacity: 0.7 }}>
                No courses yet. Create your first course!
              </p>
            )}
          </div>
        </div>

        <div className="right">
          <div className="add-course">
            <div className="course-form">
              <h2>Add New Course</h2>
              <form onSubmit={submitHandler}>
                <div>
                  <label htmlFor="title">Course Title</label>
                  <input
                    type="text"
                    id="title"
                    placeholder="Enter course title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    placeholder="Enter course description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="category">Category</label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option value={cat} key={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="price">Price ($)</label>
                  <input
                    type="number"
                    id="price"
                    placeholder="Enter course price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="instructor">Instructor Name</label>
                  <input
                    type="text"
                    id="instructor"
                    placeholder="Enter instructor name"
                    value={createdBy}
                    onChange={(e) => setCreatedBy(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="duration">Duration (hours)</label>
                  <input
                    type="number"
                    id="duration"
                    placeholder="Enter course duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    min="1"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="image">Course Image</label>
                  <input 
                    type="file" 
                    id="image"
                    accept="image/*"
                    onChange={changeImageHandler}
                  />
                </div>

                {imagePrev && (
                  <div style={{ marginTop: "10px" }}>
                    <img src={imagePrev} alt="Preview" width={250} />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={btnLoading}
                >
                  {btnLoading ? "Creating..." : "Create Course"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminCourses;
