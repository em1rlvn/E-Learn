import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { server } from "../config";
import toast, { Toaster } from "react-hot-toast";
import { mockLogin, mockRegister, mockVerify, mockFetchUser } from "../api/api";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  async function loginUser(email, password, navigate, fetchMyCourse) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/user/login`, {
        email,
        password,
      });

      toast.success(data.message);
      localStorage.setItem("token", data.token);
      setUser(data.user);
      setIsAuth(true);
      setBtnLoading(false);
      navigate("/");
      fetchMyCourse();
    } catch (error) {
      try {
        const data = await mockLogin(email, password);
        toast.success(data.message);
        localStorage.setItem("token", data.token);
        setUser(data.user);
        setIsAuth(true);
        setBtnLoading(false);
        navigate("/");
        fetchMyCourse();
      } catch (mockError) {
        setBtnLoading(false);
        setIsAuth(false);
        const errorMsg = mockError?.response?.data?.message || error?.message || "Login failed. Try demo@example.com / password";
        toast.error(errorMsg);
      }
    }
  }

  async function registerUser(name, email, password, navigate) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/user/register`, {
        name,
        email,
        password,
      });

      toast.success(data.message);
      localStorage.setItem("activationToken", data.activationToken);
      setBtnLoading(false);
      navigate("/verify");
    } catch (error) {
      try {
        const data = await mockRegister(name, email, password);
        toast.success(data.message);
        localStorage.setItem("activationToken", data.activationToken);
        setBtnLoading(false);
        navigate("/verify");
      } catch (mockError) {
        setBtnLoading(false);
        const errorMsg = mockError?.response?.data?.message || error?.message || "Registration failed. Please try again.";
        toast.error(errorMsg);
      }
    }
  }

  async function verifyOtp(otp, navigate) {
    setBtnLoading(true);
    const activationToken = localStorage.getItem("activationToken");
    try {
      const { data } = await axios.post(`${server}/api/user/verify`, {
        otp,
        activationToken,
      });

      toast.success(data.message);
      navigate("/login");
      localStorage.clear();
      setBtnLoading(false);
    } catch (error) {
      try {
        const data = await mockVerify(otp, activationToken);
        toast.success(data.message);
        navigate("/login");
        localStorage.clear();
        setBtnLoading(false);
      } catch (mockError) {
        const errorMsg = mockError?.response?.data?.message || error?.message || "Verification failed. Please try again.";
        toast.error(errorMsg);
        setBtnLoading(false);
      }
    }
  }

  async function fetchUser() {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.get(`${server}/api/user/me`, {
        headers: {
          token,
        },
      });

      setUser(data.user);
      setIsAuth(true);
      setLoading(false);
    } catch (error) {
      try {
        const data = await mockFetchUser(token);
        setUser(data.user);
        setIsAuth(true);
        setLoading(false);
      } catch (mockError) {
        setLoading(false);
        setIsAuth(false);
        localStorage.removeItem("token");
      }
    }
  }

  async function logoutUser() {
    localStorage.removeItem("token");
    localStorage.removeItem("activationToken");
    setIsAuth(false);
    setUser([]);
    toast.success("Logged out successfully");
  }

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        setIsAuth,
        isAuth,
        loginUser,
        btnLoading,
        loading,
        registerUser,
        verifyOtp,
        fetchUser,
        logoutUser,
      }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
