import React from "react";
import "./courseCard.css";
import { server } from "../../config";
import { UserData } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { CourseData } from "../../context/CourseContext";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const { user, isAuth } = UserData();

  const { fetchCourses } = CourseData();

  const courseId = course._id || course.id || "";
  const imageUrl =
    course.image || course.thumbnail || (course.images && course.images[0]) ||
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80";

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this course")) {
      try {
        const { data } = await axios.delete(`${server}/api/course/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });

        toast.success(data.message);
        fetchCourses();
      } catch (error) {
        toast.error(error?.response?.data?.message || "Delete failed");
      }
    }
  };
  return (
    <div className="course-card">
      <img src={imageUrl} alt={course.title} className="course-image" />
      <h3>{course.title}</h3>
      <p>Instructor&nbsp;-&nbsp;{course.createdBy || course.brand || "E-Link"}</p>
      <p>Duration&nbsp;-&nbsp;{course.duration || "4 weeks"}</p>
      <p>Price&nbsp;-&nbsp;₹{course.price ?? "Free"}</p>
      {isAuth ? (
        <>
          {user && user.role !== "admin" ? (
            user.subscription?.includes(courseId) ? (
              <button
                onClick={() => navigate(`/course/study/${courseId}`)}
                className="common-btn"
              >
                Study
              </button>
            ) : (
              <button
                onClick={() => navigate(`/course/${courseId}`)}
                className="common-btn"
              >
                Get Started
              </button>
            )
          ) : (
            <button
              onClick={() => navigate(`/course/study/${courseId}`)}
              className="common-btn"
            >
              Study
            </button>
          )}
        </>
      ) : (
        <button onClick={() => navigate("/login")} className="common-btn">
          Get Started
        </button>
      )}

      {user && user.role === "admin" && (
        <>
          <button
            onClick={() => navigate(`/admin/course/${courseId}`)}
            className="common-btn edit-btn"
          >
            Edit
          </button>
          <button
            onClick={() => deleteHandler(courseId)}
            className="common-btn delete-btn"
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default CourseCard;
