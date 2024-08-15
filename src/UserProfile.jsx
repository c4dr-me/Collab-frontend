import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import LoadingAnimation from "./LoadingAnimation";
import ContactModal from "./ContactModel"; 

const UserProfileContainer = styled.div`
  max-width: 1300px;
  margin: 5rem auto;
  padding: 32px;
  border-radius: 32px;
  background-color: #222;
  color: #fff;
  text-align: center;

  .user-photo {
    width: 20%;
    height: auto;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #0e76a8;
    margin-bottom: 1rem;
  }

  h1 {
    font-size: 32px;
    font-weight: 800;
  }

  p {
    font-size: 18px;
    font-weight: 500;
    margin: 10px 0;
  }

  .contact-button {
    background-color: #0e76a8;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 18px;
    margin-top: 20px;
  }
`;

const UserProfile = () => {
  const { token } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showContactModal, setShowContactModal] = useState(false); // State for showing the contact modal

  useEffect(() => {
    console.log("Fetching user with token:", token);

    const fetchUser = async () => {
      try {
        const response = await fetch(`https://dainty-gecko-212f08.netlify.app/api/auth/user/profile/${token}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUser(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user:", error);
        setLoading(false); // Ensure loading state is turned off even if there's an error
      }
    };

    fetchUser();
  }, [token]);

  const handleContactClick = () => {
    setShowContactModal(true);
  };

  const closeContactModal = () => {
    setShowContactModal(false);
  };

  if (loading) {
    return <LoadingAnimation />;
  }

  if (!user) {
    return (
      <UserProfileContainer>
        <p>User not found.</p>
      </UserProfileContainer>
    );
  }

  console.log(user);

  return (
    <UserProfileContainer>
      <img
       src={user.photo ? `https://dainty-gecko-212f08.netlify.app/${user.photo}` : "/default.png"}
        alt={user.name}
        className="user-photo"
      />
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Telephone: {user.telephone}</p>
      <p>Company: {user.company}</p>
      <button className="contact-button btn" onClick={handleContactClick}>
        Contact
      </button>
      {showContactModal && <ContactModal user={user} onClose={closeContactModal} />}
    </UserProfileContainer>
  );
};

export default UserProfile;
