import axios from "axios";
import { server } from "../config";

export const apiClient = axios.create({
  baseURL: server,
  timeout: 10000,
});

export const isValidId = (id) => {
  return /^[A-Za-z0-9_-]+$/.test(String(id));
};

// Mock courses with video data
const mockCourses = [
  {
    _id: "1",
    title: "Web Development Fundamentals",
    description: "Learn the basics of HTML, CSS, and JavaScript to build modern web applications.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
    createdBy: "John Developer",
    duration: 8,
    price: 299,
    rating: 4.8,
    category: "Web Development",
  },
  {
    _id: "2",
    title: "React.js Advanced Patterns",
    description: "Master advanced React concepts including hooks, context API, and performance optimization.",
    image: "https://images.unsplash.com/photo-1687603921109-46401b201195?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    createdBy: "Sarah React",
    duration: 10,
    price: 399,
    rating: 4.9,
    category: "JavaScript Frameworks",
  },
  {
    _id: "3",
    title: "Python for Data Science",
    description: "Learn Python with NumPy, Pandas, and Matplotlib for data analysis and visualization.",
    image: "https://images.unsplash.com/photo-1649180556628-9ba704115795?q=80&w=1462&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    createdBy: "Mike Python",
    duration: 12,
    price: 449,
    rating: 4.7,
    category: "Data Science",
  },
  {
    _id: "4",
    title: "UI/UX Design Masterclass",
    description: "Create beautiful and functional user interfaces with Figma and design principles.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80",
    createdBy: "Emma Design",
    duration: 9,
    price: 349,
    rating: 4.8,
    category: "Design",
  },
  {
    _id: "5",
    title: "Node.js Backend Development",
    description: "Build scalable backend applications with Node.js, Express, and MongoDB.",
    image: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    createdBy: "Alex Backend",
    duration: 11,
    price: 429,
    rating: 4.9,
    category: "Backend",
  },
  {
    _id: "6",
    title: "Machine Learning Basics",
    description: "Introduction to machine learning algorithms and their real-world applications.",
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    createdBy: "Dr. AI",
    duration: 14,
    price: 549,
    rating: 4.8,
    category: "AI/ML",
  },
];

const mockLectures = {
  "1": [
    {
      _id: "lec1_1",
      title: "Introduction to HTML",
      description: "Learn the structure and basics of HTML markup language.",
      video: "https://www.youtube.com/embed/kUMe1FH4CHE",
    },
    {
      _id: "lec1_2",
      title: "CSS Styling & Layouts",
      description: "Master CSS flexbox and grid for modern layouts.",
      video: "https://www.youtube.com/embed/YEmdHbQBCSQ",
    },
    {
      _id: "lec1_3",
      title: "JavaScript Fundamentals",
      description: "Core JavaScript concepts and DOM manipulation.",
      video: "https://www.youtube.com/embed/TioxU0wdMQg",
    },
  ],
  "2": [
    {
      _id: "lec2_1",
      title: "React Hooks Deep Dive",
      description: "Understanding useState, useEffect, useContext, and custom hooks.",
      video: "https://www.youtube.com/embed/O6P86uwfdR0",
    },
    {
      _id: "lec2_2",
      title: "State Management with Redux",
      description: "Learn Redux for managing complex application state.",
      video: "https://www.youtube.com/embed/iBUJVy8phqw",
    },
  ],
  "3": [
    {
      _id: "lec3_1",
      title: "NumPy & Pandas Essentials",
      description: "Data manipulation and numerical computing with Python libraries.",
      video: "https://www.youtube.com/embed/KHoEbRH46Zk",
    },
    {
      _id: "lec3_2",
      title: "Data Visualization",
      description: "Create stunning visualizations with Matplotlib and Seaborn.",
      video: "https://www.youtube.com/embed/a9UrKTVEeZA",
    },
  ],
  "4": [
    {
      _id: "lec4_1",
      title: "Design Principles Basics",
      description: "Learn fundamental principles of good design.",
      video: "https://www.youtube.com/embed/9EPTM91TBDU",
    },
    {
      _id: "lec4_2",
      title: "Figma Essentials",
      description: "Get started with Figma for UI design.",
      video: "https://www.youtube.com/embed/Cx2dkpBxst8",
    },
  ],
  "5": [
    {
      _id: "lec5_1",
      title: "Node.js Basics",
      description: "Introduction to Node.js and runtime environment.",
      video: "https://www.youtube.com/embed/TlB_eWDSMt4",
    },
    {
      _id: "lec5_2",
      title: "Express.js Framework",
      description: "Build REST APIs with Express.js.",
      video: "https://www.youtube.com/embed/L72fhGm1tfE",
    },
  ],
  "6": [
    {
      _id: "lec6_1",
      title: "Machine Learning Introduction",
      description: "Fundamentals of machine learning and supervised learning.",
      video: "https://www.youtube.com/embed/ukzFI9rgwfU",
    },
    {
      _id: "lec6_2",
      title: "TensorFlow Basics",
      description: "Get started with TensorFlow for deep learning.",
      video: "https://www.youtube.com/embed/tpCFfeUEGs8",
    },
  ],
};

export const getCourses = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockCourses), 500);
  });
};

export const getCourseById = async (id) => {
  if (!isValidId(id)) {
    throw new Error("Invalid course id");
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const course = mockCourses.find((c) => c._id === String(id));
      if (course) {
        resolve(course);
      } else {
        reject(new Error("Course not found"));
      }
    }, 300);
  });
};

export const getMyCourses = async (token) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve([]), 400);
  });
};

export const getLectures = async (courseId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockLectures[courseId] || []);
    }, 300);
  });
};

// Mock authentication
const mockUsers = new Map();

export const mockLogin = async (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if ((email === "admin@example.com" || email === "emirlan.omorbekov@alatoo.edu.kg") && password === "password") {
        resolve({
          message: "Login successful",
          token: `mock-token-admin-${Date.now()}`,
          user: {
            _id: "admin1",
            name: "Admin User",
            email: email,
            role: "admin",
            subscription: ["1", "2", "3", "4", "5", "6"],
          },
        });
        return;
      }
      const user = Array.from(mockUsers.values()).find(
        (u) => u.email === email && u.password === password
      );
      if (user) {
        resolve({
          message: "Login successful",
          token: `mock-token-${Date.now()}`,
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: "user",
            subscription: ["1", "2", "3", "4", "5", "6"], 
          },
        });
      } else {
        reject({
          response: {
            data: {
              message: "Invalid email or password",
            },
          },
        });
      }
    }, 500);
  });
};

export const mockRegister = async (name, email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Array.from(mockUsers.values()).find((u) => u.email === email)) {
        reject({
          response: {
            data: {
              message: "Email already registered",
            },
          },
        });
      } else {
        const userId = `user-${Date.now()}`;
        mockUsers.set(userId, { _id: userId, name, email, password });
        resolve({
          message: "Registration successful. Please verify your email.",
          activationToken: `token-${userId}`,
        });
      }
    }, 500);
  });
};

export const mockVerify = async (otp, activationToken) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (activationToken) {
        resolve({
          message: "Email verified successfully",
        });
      } else {
        reject({
          response: {
            data: {
              message: "Invalid verification token",
            },
          },
        });
      }
    }, 300);
  });
};

export const mockFetchUser = async (token) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (token) {
        resolve({
          user: {
            _id: "mock-user",
            name: "Demo User",
            email: "demo@example.com",
            role: "user",
            subscription: [],
          },
        });
      } else {
        reject(new Error("Unauthorized"));
      }
    }, 300);
  });
};
