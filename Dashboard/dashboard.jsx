import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { IconContext } from "react-icons";
import ChangePassword from "./ChangePassword";
import PostList from "./PostList";
import ProfilePhoto from "./ProfilePhoto";
import UserDetails from "./UserDetails";
import PostForm from "./PostForm";
import LoadingAnimation from "../src/LoadingAnimation";
import { MdNotifications } from "react-icons/md";
import { MdNotificationsActive } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from '../utils/useAuth';
import Cookies from 'js-cookie';

const StyledDashboard = styled.div`
  max-width: 1300px;
  margin: 5rem auto;

  .loading {
    min-height: 100vh;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3.5rem;
  }

  input[type="text"] {
    width: 100%;
    padding: 0.5rem;
    margin-top: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .button {
    display: flex;
    justify-content: flex-end;
    align-content: center;
    gap: 1rem;
  }

  .user {
    display: flex;
    flex-direction: row;
    gap: 2rem;
  }
  .user-form {
    border: 5px dashed red;
    width: 100%;
    min-height: 100vh;
    border-radius: 32px;
    margin: 2rem 0;
    background-color: white;
  }

  .user-dashboard {
    max-width: calc(100% - 60vw);
    width: 100%;
    background-color: #0e58ae;
    min-height: 100vh;
    margin: 2rem 0;
    border-radius: 32px;
  }
  .user-photo-container {
    display: flex;
    position: relative;
    width: 200px;
    height: 200px;
  }
  .user-photo {
    padding-top: 2rem;
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 50%;
  }
  .upload-image-btn {
    position: absolute;
    bottom: 0;
    right: 10px;
    border-radius: 50%;
    min-width: 5rem;
    min-height: 5rem;
    background-color: #0e58ae;
    cursor: pointer;
    border: none;
    padding: auto;
  }
  .user-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10rem;
  }
  .user-details {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    text-align: left;
    gap: 3rem;
    width: calc(100% - 10rem);
  }
  .user-detail-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 2rem;
    border-bottom: 1px solid #fff;
    padding: 1rem;
  }
  .user-detail-container p {
    font-weight: bold;
    font-size: 2rem;
  }
  .user-detail-container span {
    font-weight: bold;
    font-size: 1.5rem;
  }
  .btn {
    border: 1px solid #fff;
  }
  .notifications-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    border: none;
    border-radius: 50%;
    min-width: 4rem;
    min-height: 3.5rem;
    box-shadow: 0px 2px 50px rgba(0, 0, 0, 0.8);
    transition: transform 0.2s ease;
    cursor: pointer;
    &:hover{
      transform: sacle(1.1);
      border: 1px solid #fff;
      -moz-box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.1);
    -webkit-box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.1);
    box-shadow: inset 0 0 50px 50px rgba(255, 255, 255, 0.1);
    }
      &:active{
      transform: scale(0.9);
    }
  }
  .user-btn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    margin-bottom: 2rem;
  }
  .wlc-msg {
    font-size: 3rem;
  }
  .wlc-user {
    font-size: 2rem;
    opacity: 0.8;
  }
  .change-pwd,
  .create-post,
  .change-photo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    gap: 2rem;
    h2 {
      font-weight: bold;
      color: #0e58ae;
    }
    label {
      font-weight: bold;
      opacity: 0.8;
      font-size: 1.5rem;
    }
    input {
      width: 50%;
      min-height: 4rem;
      border-radius: 32px;
      border: 1px solid black;
      outline: none;
      padding: 1rem;
    }
  }
  .post-desc {
    color: black;
    width: 50%;
  }

  .notification-icon {
    position: relative;
  }

  .notification-header {
    padding: 1rem;
    font-weight: 600;
    border-bottom: 1px solid black;
    border-radius: 10%;
  }

  .notifications-dropdown {
    position: absolute;
    top: 60px;
    left: 0;
    background: white;
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow-x: hidden;
    overflow-y: auto;
    width: 300px;
    max-height: 300px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);

  }
  .notifications-dropdown div {
    cursor: pointer;
    padding: 1rem;
    border-bottom: 1px solid black;
    opacity: 1;
    transition: opacity 0.3s ease;
    height: 50px;
    margin-top: 2px;
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    align-items: center;
        &:hover{
    background-color: #BFBFBF;
    }
  }
  .notifications-dropdown div:last-child {
    border-bottom: none;
  }
  .notifications-dropdown div:first-child {
    margin: none;
  }
  .notifications-dropdown div.read {
    opacity: 0.5;
  }
  .notifications-dropdown div span {
    color: red;
    font-weight: bold;
    text-align: right;
    background: rgba(245, 135, 135, 0.8);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-radius: 10px;
    border: 3px solid #f58787;
    text-align: center;
    border-radius: 4px;
    padding: 0.25rem 0.5rem;
    width: 100px;
    &:hover {
      box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
    }
  }
`;

const Dashboard = () => {
  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    return null; 
  }
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    photo: "",
    posts: [],
  });
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    experience: "",
    isPaid: false,
    charge: "",
  });
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [error, setError] = useState("");
  // const [posts, setPosts] = useState(null);
  const [showPostForm, setShowPostForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showPhotoForm, setShowPhotoForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) {
          throw new Error("No token found");
        }
        console.log("user token:", user);
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/notifications/${user.token}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const notifications = await response.json();
        setNotifications(notifications);
        const unread = notifications.some((notification) => !notification.read);
        setHasUnreadNotifications(unread);
        console.log("Unread notifications:", unread);
        console.log("Toast displayed previously:", sessionStorage.getItem("toastDisplayed"));
        if (unread && !sessionStorage.getItem("toastDisplayed")) {
          toast.info("You have unread notifications!");
          sessionStorage.setItem("toastDisplayed", "true");
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchNotifications();
  }, [user]);

  const handleNotificationClick = async (notificationId) => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        throw new Error("No token found");
      }

      // Mark the notification as read
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/notifications/${user.token}/${notificationId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Update the local notifications state
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification._id === notificationId
            ? { ...notification, read: true }
            : notification
        )
      );
      const unread = notifications.some((notification) => !notification.read);
      setHasUnreadNotifications(unread);
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const handleNotificationIconClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) {
          throw new Error("No token found");
        }

        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/user/info`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const userInfo = await response.json();
        console.log("User Info:", userInfo);
        setUser(userInfo);
      } catch (error) {
        console.error("Error fetching user info:", error);
        setError("Failed to fetch user information");
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const handleProfileEdit = async () => {
    const newName = prompt("Edit your name:", user.name);
    const newEmail = prompt("Edit your email:", user.email);
    const newPhone = prompt("Edit your contact number:", user.telephone);
    if (!newName || !newEmail || !newPhone) {
      alert("Name and email are required.");
      return;
    }

    const updatedProfileData = {
      name: newName,
      email: newEmail,
      telephone: newPhone,
    };

    try {
      const token = Cookies.get("token");
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/user/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedProfileData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedUserInfo = await response.json();
      setUser(updatedUserInfo);
      alert("Profile updated successfully.");
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile.");
    }
  };

  const handlePostCreation = async () => {
    setShowPostForm(true);
    setShowPasswordForm(false);
    setShowPhotoForm(false);
  };

  useEffect(() => {
    console.log("User state updated:", user);
  }, [user]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const token = Cookies.get("token");
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/posts/user`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUser((prevUser) => ({
          ...prevUser,
          posts: data,
        }));
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchUserPosts();
  }, []);

  const handlePostFormSubmit = async (e, newPost) => {
    e.preventDefault();
    try {
      const token = Cookies.get("token");
      const response = await fetch(
        `https://dainty-gecko-212f08.netlify.app/api/auth/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const createdPost = await response.json();
      console.log(createdPost);

      setUser((prevUser) => ({
        ...prevUser,
        posts: Array.isArray(prevUser.posts)
          ? [...prevUser.posts, createdPost]
          : [createdPost],
      }));
      setShowPostForm(false);
      setNewPost({
        title: "",
        content: "",
        experience: "",
        isPaid: false,
        charge: "",
      });
    } catch (error) {
      console.error("Error creating post:", error);
      setError("Failed to create post.");
    }
  };

  const handlePostEdit = async (postId, updatedPost) => {
    try {
      // Ensure postId is a string
      const postIdString = postId._id || postId;

      // Retrieve the token from localStorage
      const token = Cookies.get("token");
      if (!token) {
        throw new Error("No token found");
      }

      console.log(
        "Saving post with URL:",
        '${import.meta.env.VITE_BACKEND_URL}/api/auth/posts/${postIdString}'
      );
      console.log("postId:", postId); // Log to check the value

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/posts/${postIdString}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedPost),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedPostData = await response.json();
      setUser((prevUser) => ({
        ...prevUser,
        posts: prevUser.posts.map((post) =>
          post._id === postIdString ? updatedPostData : post
        ),
      }));
      console.log("updatedPost:", updatedPostData); // Log to check the value
      console.log("Post updated successfully");
    } catch (error) {
      console.error("Error updating post:", error);
      setError("Failed to update post.");
    }
  };

  const handlePostDeletion = async (postId) => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        throw new Error("User not authenticated");
      }

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/posts/${postId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Update user state to remove the deleted post
      setUser((prevUser) => ({
        ...prevUser,
        posts: prevUser.posts.filter((post) => post._id !== postId), // Ensure using _id to match your backend model
      }));

      console.log("Post deleted successfully");
    } catch (error) {
      console.error("Error deleting post:", error);
      setError("Failed to delete post.");
    }
  };

  const handlePasswordChange = () => {
    setShowPasswordForm(true);
    setShowPostForm(false);
    setShowPhotoForm(false);
  };

  const handlePasswordFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get("token");
      const response = await fetch(
        "${import.meta.env.VITE_BACKEND_URL}/api/auth/user/password",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ currentPassword, newPassword }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      alert("Password updated successfully.");
      setShowPasswordForm(false);
      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      console.error("Error changing password:", error);
      setError("Failed to change password.");
    }
  };

  const handlePhotoUpload = async (event) => {
    event.preventDefault();
    setShowPostForm(false);
    setShowPasswordForm(false);
    const fileInput = event.target.elements.photo;

    if (!fileInput.files || fileInput.files.length === 0) {
      console.error("No file selected for upload.");
      return;
    }
    const formData = new FormData();
    formData.append("photo", fileInput.files[0]);

    try {
      const token = Cookies.get("token");
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/user/photo`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setUser(result);
      console.log("Photo uploaded successfully:", result);
      setShowPhotoForm(false);
    } catch (error) {
      console.error("Error uploading photo:", error);
    }
  };

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/login");
    sessionStorage.removeItem('toastDisplayed');
  };

  if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <StyledDashboard>
      <ToastContainer/>
      <div className="button">
        
        <div className="notification-icon">
          <button className="notifications-btn" onClick={handleNotificationIconClick} title={hasUnreadNotifications ? "New Notifications" : "Notifications"}>
            <IconContext.Provider value={{ color: "#fff", size: "24px" }}>
              {hasUnreadNotifications ? (
                <MdNotificationsActive color="red" />
              ) : (
                <MdNotifications />
              )}
            </IconContext.Provider>
          </button>
          {dropdownVisible && (
            <div className="notifications-dropdown">
              <h3 className="notification-header">Notifications</h3>
              {notifications.length === 0 ? (
                <div>No notifications</div>
              ) : (
                notifications
                  .slice()
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .map((notification) => (
                    <div
                      key={notification._id}
                      className={notification.read ? "read" : ""}
                      onClick={() => handleNotificationClick(notification._id)}
                    >
                      {notification.message}
                      {!notification.read && <span>Mark as read</span>}
                    </div>
                  ))
              )}
            </div>
          )}
        </div>
        <button className="btn" onClick={handlePostCreation}>
          Create Post
        </button>

        <button className="btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="user">
        <div className="user-dashboard">
          <div className="user-info">
            <div className="user-photo-container">
              <IconContext.Provider value={{ color: "#fff", size: "32px" }}>
                <ProfilePhoto user={user} setShowPhotoForm={setShowPhotoForm} />
              </IconContext.Provider>
            </div>

            <UserDetails
              user={user}
              handleProfileEdit={handleProfileEdit}
              handlePasswordChange={handlePasswordChange}
            />
          </div>
        </div>
        <div className="user-form">
          {showPostForm && (
            <PostForm
              handlePostFormSubmit={handlePostFormSubmit}
              setShowPostForm={setShowPostForm}
            />
          )}
          {showPasswordForm && (
            <ChangePassword
              handlePasswordFormSubmit={handlePasswordFormSubmit}
              setShowPasswordForm={setShowPasswordForm}
            />
          )}
          {showPhotoForm && (
            <form onSubmit={handlePhotoUpload} className="change-photo">
              <h3>Change Profile Photo</h3>
              <label>Upload Photo</label>
              <input type="file" name="photo" />
              <button className="btn" type="submit">
                Upload Photo
              </button>
              <button
                className="btn"
                type="button"
                onClick={() => setShowPhotoForm(false)}
              >
                Cancel
              </button>
            </form>
          )}
        </div>
      </div>
      <PostList
        user={user}
        posts={user.posts}
        handlePostEdit={handlePostEdit}
        handlePostDeletion={handlePostDeletion}
      />
    </StyledDashboard>
  );
};

export default Dashboard;
