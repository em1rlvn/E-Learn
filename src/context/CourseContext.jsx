import { createContext, useContext, useEffect, useState } from "react";
import { getCourses, getCourseById, getMyCourses, isValidId } from "../api/api";

const CourseContext = createContext();

export const CourseContextProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState(null);
  const [mycourse, setMyCourse] = useState([]);

  async function fetchCourses() {
    try {
      const apiCourses = await getCourses();
      setCourses(apiCourses);
    } catch (error) {
      console.error("Course load failed:", error);
      setCourses([]);
    }
  }

  async function fetchCourse(id) {
    if (!isValidId(id)) {
      setCourse(null);
      return;
    }
    try {
      const apiCourse = await getCourseById(id);
      setCourse(apiCourse);
    } catch (error) {
      console.error("Course detail failed:", error);
      setCourse(null);
    }
  }

  async function fetchMyCourse() {
    try {
      const apiCourses = await getMyCourses(localStorage.getItem("token"));
      setMyCourse(apiCourses);
    } catch (error) {
      console.log(error);
      setMyCourse([]);
    }
  }

  useEffect(() => {
    fetchCourses();
    fetchMyCourse();
  }, []);
  return (
    <CourseContext.Provider
      value={{
        courses,
        fetchCourses,
        fetchCourse,
        course,
        mycourse,
        fetchMyCourse,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const CourseData = () => useContext(CourseContext);
