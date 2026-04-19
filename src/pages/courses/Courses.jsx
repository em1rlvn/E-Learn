import React, { useState } from "react";
import "./courses.css";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/coursecard/CourseCard";

const Courses = () => {
  const { courses } = CourseData();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("title");

  const categories = [
    "All",
    ...new Set(courses?.map((c) => c.category) || []),
  ];

  let filteredCourses = courses?.filter((course) => {
    const matchesSearch = course.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (sortBy === "price") {
    filteredCourses = [...(filteredCourses || [])].sort(
      (a, b) => a.price - b.price
    );
  } else if (sortBy === "rating") {
    filteredCourses = [...(filteredCourses || [])].sort(
      (a, b) => b.rating - a.rating
    );
  } else {
    filteredCourses = [...(filteredCourses || [])].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  }

  return (
    <div className="courses">
      <div className="course-title">
        <h2>Available Courses</h2>
        <p>
          {filteredCourses && filteredCourses.length > 0
            ? `Найдено ${filteredCourses.length} курсов`
            : "Нет доступных курсов"}
        </p>
      </div>

      <div className="filters-section">
        <input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="filter-select"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="filter-select"
        >
          <option value="title">Sort by Title</option>
          <option value="price">Sort by Price</option>
          <option value="rating">Sort by Rating</option>
        </select>
      </div>

      <div className="course-container">
        {filteredCourses && filteredCourses.length > 0 ? (
          filteredCourses.map((e) => <CourseCard key={e._id} course={e} />)
        ) : (
          <p className="no-courses">No courses match your search.</p>
        )}
      </div>
    </div>
  );
};

export default Courses;
