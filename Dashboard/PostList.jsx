import React, { useState } from "react";
import styled from "styled-components";
import PostItem from "./PostItem";
import Cookies from "js-cookie";

const StyledPostList = styled.div`
  max-width: 1300px;
  min-height: 50vh;
  margin: 5rem auto;
  background-color: #0e58ae19;
  padding: 32px;
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  color: #fff;

  .post-section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin: 5rem 0;
  }

  .none{
  margin: auto;
  font-size: 2rem;
  color: #e8e8e4;
  }

  h2 {
    margin-bottom: 10px;
    text-align: center;
    font-weight: bold;
    color: #fff;
  }
`;

const PostList = ({ user, posts = [], handlePostEdit, handlePostDeletion }) => {
  const [editPostId, setEditPostId] = useState(null);
  const [editedPost, setEditedPost] = useState({ title: '', content: '', experience: '', isPaid: false, charge: '' });

  const handleEditClick = (post) => {
    setEditPostId(post._id);
    setEditedPost({
      title: post.title,
      content: post.content,
      experience: post.experience,
      isPaid: post.isPaid,
      charge: post.charge
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedPost((prevPost) => ({
      ...prevPost,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = async (postId) => {
    try {
      const token = Cookies.get("token");

      const url = `${import.meta.env.VITE_BACKEND_URL}/api/auth/posts/${postId}`;
      console.log('Saving post with URL:', url); // Debugging line

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editedPost),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error updating post: ${errorText}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedPost = await response.json();
      handlePostEdit(updatedPost); // Ensure this function updates the post list
      setEditPostId(null); // Exit edit mode
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleCancel = () => {
    setEditPostId(null); // Exit edit mode
  };

  return (
    <StyledPostList>
      <h2 className="post-header">Posts</h2>
      <div className="post-section">
        {!posts || posts.length === 0 ? (
          <p className="none">You haven't made any post yet</p>
        ) : (
          posts.map((post) => (
            <PostItem
              key={post._id}
              post={post}
              isEditing={editPostId === post._id}
              onEditClick={handleEditClick}
              onDeleteClick={handlePostDeletion}
              onSaveClick={handleSave}
              onCancel={handleCancel}
              editedPost={editedPost}
              onChange={handleChange}
            />
          ))
        )}
      </div>
    </StyledPostList>
  );
};

export default PostList;
