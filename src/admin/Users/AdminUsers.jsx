import React, { useEffect, useState } from "react";
import "./users.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../config";
import Layout from "../Utils/Layout";
import toast from "react-hot-toast";
import { FiTrash2, FiEdit2, FiEye } from "react-icons/fi";


const mockUsers = [
  { _id: "1", name: "John Doe", email: "john@example.com", role: "user", joinedAt: "2026-19-04" },
  { _id: "2", name: "Jane Smith", email: "jane@example.com", role: "user", joinedAt: "2026-19-04" },
  { _id: "3", name: "Emirlan Omorbekov", email: "emirlan.omorbekov@alatoo.edu.kg", role: "admin", joinedAt: "2026-18-04" },
  { _id: "4", name: "Mike Johnson", email: "mike@example.com", role: "user", joinedAt: "2026-18-04" },
  { _id: "5", name: "Sarah Williams", email: "sarah@example.com", role: "user", joinedAt: "2026-18-04" },
];

const AdminUsers = ({ user }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState(mockUsers);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
      return;
    }
  }, [user, navigate]);

  if (user && user.role !== "admin") return null;

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      try {
        setLoading(true);
        // Имитация API запроса
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setUsers(users.filter(u => u._id !== id));
        toast.success("User deleted successfully");
      } catch (error) {
        toast.error("Failed to delete user");
      } finally {
        setLoading(false);
      }
    }
  };

  const updateRole = async (id) => {
    if (window.confirm("Are you sure you want to update this user role?")) {
      try {
        setLoading(true);
        // Имитация API запроса
        await new Promise(resolve => setTimeout(resolve, 300));
        
        setUsers(users.map(u => 
          u._id === id 
            ? { ...u, role: u.role === "admin" ? "user" : "admin" }
            : u
        ));
        toast.success("User role updated successfully");
      } catch (error) {
        toast.error("Failed to update user role");
      } finally {
        setLoading(false);
      }
    }
  };

  const viewUser = (id) => {
    const user = users.find(u => u._id === id);
    toast.success(`Viewing user: ${user?.name}`);
  };

  return (
    <Layout>
      <div className="users">
        <h1>User Management</h1>
        
        {users && users.length > 0 ? (
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={u._id}>
                  <td>{i + 1}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <span style={{
                      background: u.role === "admin" ? "#4CAF50" : "#2196F3",
                      color: "white",
                      padding: "4px 12px",
                      borderRadius: "4px",
                      fontSize: "12px",
                      fontWeight: "600",
                      textTransform: "uppercase"
                    }}>
                      {u.role}
                    </span>
                  </td>
                  <td>{u.joinedAt}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="view-btn"
                        onClick={() => viewUser(u._id)}
                        title="View user details"
                      >
                        <FiEye size={16} />
                      </button>
                      <button 
                        className="edit-btn"
                        onClick={() => updateRole(u._id)}
                        disabled={loading}
                        title="Update user role"
                      >
                        <FiEdit2 size={16} />
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={() => deleteUser(u._id)}
                        disabled={loading}
                        title="Delete user"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={{ textAlign: "center", padding: "40px", color: "var(--text-color)" }}>
            <p>No users found</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AdminUsers;
