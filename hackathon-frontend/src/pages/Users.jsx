import React, { useState, useEffect, useContext } from "react";
import {
  Table,
  Spin,
  Alert,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Popconfirm,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { ThemeContext } from "../context/ThemeContext";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const { Option } = Select;

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [form] = Form.useForm();
  const { theme } = useContext(ThemeContext);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://task-management-17wt.onrender.com/auth/users",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setError(error.message || "Error fetching users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    const token = Cookies.get("token");
    if (token) {
      const decode = jwtDecode(token);
      if (decode.role === "admin") {
        setIsAdmin(true);
      }
    }
  }, []);

  const handleAddUser = () => {
    setIsAddModalVisible(true);
  };

  const handleEditUser = (user) => {
    setCurrentUser(user);
    form.setFieldsValue(user);
    setIsEditModalVisible(true);
  };

  const handleOkAdd = async () => {
    try {
      const values = await form.validateFields();
      const response = await fetch(
        "https://task-management-17wt.onrender.com/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add user");
      }
      form.resetFields();
      setIsAddModalVisible(false);
      fetchUsers();
    } catch (error) {
      setError(error.message || "Failed to add user.");
    }
  };

  const handleOkEdit = async () => {
    try {
      const values = await form.validateFields();
      const response = await fetch(
        `https://task-management-17wt.onrender.com/auth/users/${currentUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user");
      }
      form.resetFields();
      setIsEditModalVisible(false);
      fetchUsers();
    } catch (error) {
      setError(error.message || "Failed to update user.");
    }
  };

  const handleCancelAdd = () => {
    setIsAddModalVisible(false);
  };

  const handleCancelEdit = () => {
    setIsEditModalVisible(false);
  };

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(
        `https://task-management-17wt.onrender.com/auth/users/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      fetchUsers();
    } catch (error) {
      setError(error.message || "Failed to delete user.");
    }
  };

  const columns = [
    { title: "Username", dataIndex: "username", key: "username" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role" },
    { title: "User ID", dataIndex: "_id", key: "_id" },
    {
      title: "Action",
      key: "action",
      render: (_, record) =>
        isAdmin && ( // Only show action buttons if the current user is an admin
          <div className="flex space-x-2">
            <Button
              type="text"
              icon={<EditOutlined className="text-blue-500" />}
              onClick={() => handleEditUser(record)}
            />
            <Popconfirm
              title="Are you sure you want to delete this user?"
              onConfirm={() => handleDelete(record._id)}
              okText="Yes"
              cancelText="No"
              overlayClassName="custom-popconfirm"
            >
              <Button
                type="text"
                icon={<DeleteOutlined className="text-red-500" />}
                danger
              />
            </Popconfirm>
          </div>
        ),
    },
  ];

  return (
    <div
      className={`flex min-h-screen ${
        theme === "dark"
          ? "bg-gray-800 text-white"
          : "bg-gray-100 text-gray-800"
      }`}
    >
      <Sidebar />
      <main className="flex-1 p-8 mt-20">
        <Navbar />
        {isAdmin && (
          <div className="mb-4 flex justify-between items-center">
            <Button
              type="primary"
              className="add-user-button"
              onClick={handleAddUser}
            >
              Add User
            </Button>
          </div>
        )}
        {loading ? (
          <Spin size="large" />
        ) : error ? (
          <Alert message={error} type="error" />
        ) : (
          <Table
            dataSource={users}
            columns={columns}
            rowKey="_id"
            pagination={false}
            className={`border ${
              theme === "dark"
                ? "bg-gray-800 text-white border-gray-600 rounded-lg overflow-hidden" // Dark mode style with black background, white text, and border
                : "bg-white text-gray-800 border-gray-300 rounded-lg overflow-hidden" // Light mode style with white background, gray text, and border
            }`}
            rowClassName={
              (record, index) =>
                theme === "dark"
                  ? `bg-gray-800 text-white hover:text-black transition-all duration-200 hover:bg-gray-800` // Dark mode hover effect
                  : `bg-white hover:bg-gray-50 hover:text-black transition-all duration-200` // Light mode hover effect
            }
            headerClassName={
              theme === "dark"
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-800"
            }
          />
        )}
        <Modal
          title="Add User"
          visible={isAddModalVisible}
          onOk={handleOkAdd}
          onCancel={handleCancelAdd}
          className="user-modal"
          footer={[
            <Button
              key="cancel"
              onClick={handleCancelAdd}
              className="text-gray-500"
            >
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={handleOkAdd}
              className="add-user-button"
            >
              Add User
            </Button>,
          ]}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="username"
              label="Username"
              rules={[
                { required: true, message: "Please input the username!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please input a valid email!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please input the password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="role"
              label="Role"
              rules={[{ required: true, message: "Please select a role!" }]}
            >
              <Select placeholder="Select a role">
                <Option value="admin">Admin</Option>
                <Option value="member">Member</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title="Edit User"
          visible={isEditModalVisible}
          onOk={handleOkEdit}
          onCancel={handleCancelEdit}
          className="user-modal"
          footer={[
            <Button
              key="cancel"
              onClick={handleCancelEdit}
              className="text-gray-500"
            >
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={handleOkEdit}
              className="add-user-button"
            >
              Save Changes
            </Button>,
          ]}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="username"
              label="Username"
              rules={[
                { required: true, message: "Please input the username!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please input a valid email!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="role"
              label="Role"
              rules={[{ required: true, message: "Please select a role!" }]}
            >
              <Select placeholder="Select a role">
                <Option value="admin">Admin</Option>
                <Option value="member">Member</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </main>
    </div>
  );
};

export default Users;
