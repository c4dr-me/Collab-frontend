import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import LoadingAnimation from "./LoadingAnimation";
import { FaSearch } from "react-icons/fa";
const fadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const HireMePostContainer = styled.div`
  max-width: 1300px;
  margin: 5rem auto;
  padding: 32px;
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  color: #fff;
  animation: ${fadeInUp} 1s ease-in-out;
  

  .post-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 800;
			text-shadow: 2px 1px 7px rgba(255,255,255,0.8);
  }


  .search-bar {
    display: flex;
    justify-content: flex-end;
    margin-top: 2rem;
    position: relative;
    align-items: center;
  }

  .search-input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 16px;
    width: 35rem;
    outline: none;
    transition: box-shadow 0.3s;
        &:hover, &:active {
          box-shadow: 0 0 10px rgba(137,196,244, 0.9);
        }
  }
      .search-icon {
        position: absolute;
        background-color: rgb(107, 185, 240);
        right: 10px;
        padding: 10px;
        width: 40px;
        height: 40px;
        border-radius: 32px;
      }

  .post-section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin: 5rem 0;
  }

  .post {
    background: rgba(182, 185, 230, 0.11);
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.1 );
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 32px;
    padding: 32px;
    text-align: center;
    transition: transform 0.3s, box-shadow 0.3s;
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 18px rgba(0, 0, 0, 0.5);
    }
    

    .user-info {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      margin-bottom: 1rem;
    }

    .user-photo {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid #0e76a8;
    }

    .user-name {
      font-size: 18px;
      font-weight: 600;
      color: #ddd;
    }

    h3 {
      font-size: 24px;
      font-weight: 800;
    }

    p {
      font-size: 16px;
      font-weight: 500;
      margin: 10px 0;
    }

    .cost {
      font-size: 18px;
      font-weight: 600;
      color: #0e76a8;
      margin-top: 8px;
    }
  }

  input::placeholder {
    color: black;
  }
`;

const HireMePosts = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch:500("https://collab-backend-ushf.onrender.com/api/auth/posts"); // Updated endpoint
        const data = await response.json();
        setPosts(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handlePostClick = (userToken) => {
    if (userToken) {
      navigate(`/user/profile/${userToken}`);
    } else {
      console.error("User token is undefined");
    }
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.experience.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.charge && post.charge.toString().includes(searchQuery)) ||
      (post.isPaid
        ? "Paid".toLowerCase().includes(searchQuery.toLowerCase())
        : "No Charges".toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (posts.length === 0) {
    return <LoadingAnimation />;
  }

  return (
    <HireMePostContainer>
      <h2 className="post-header">Hire Me Posts</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Type to seach"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <FaSearch size={32} color="white" className="search-icon" />
      </div>
      <div className="post-section">
        {filteredPosts.length === 0 ? (
          <p>No posts to display.</p>
        ) : (
          filteredPosts.map((post) => (
            <div
              className="post"
              key={post._id}
              onClick={() => handlePostClick(post.user.token)}
            >
              <div className="user-info">
                <img
                  src={
                    post.user.photo
                      ? `http://localhost:5000/${post.user.photo}`
                      : "./default.png"
                  }
                  alt={post.user.name}
                  className="user-photo"
                  onError={(e) => {
                    e.target.src = "./default.png";
                  }}
                />
                <span className="user-name">{post.user.name}</span>
              </div>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <p>{post.experience}</p>
              <p className="cost">
                {post.isPaid ? `Paid @ ${post.charge}` : "No Charges"}
              </p>
            </div>
          ))
        )}
      </div>
      {selectedPost && (
        <ContactModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          recipientEmail={selectedPost.user.email}
        />
      )}
    </HireMePostContainer>
  );
};

export default HireMePosts;
