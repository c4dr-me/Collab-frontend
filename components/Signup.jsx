import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const SignIn = styled.div`
  max-width: 800px;
  width: 100%;
  background-color: #0e58ae;
  margin: 5rem auto 0 auto;
  max-height: 780px;
  border-radius: 36px;

  p {
    padding-top: 1rem;
  }
  h2 {
    font-weight: 500;
  }

  a {
    opacity: 0.8;
    &:hover {
      text-decoration: underline;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    .forms {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      width: calc(100% - 25vw);
      gap: 2rem;
      .column {
        display: flex;
        gap: 1rem;
        flex-direction: column;

        label {
          flex: 1;
          font-size: 16px;
          color: #fff;
          line-height: 26px;
          font-weight: 500;
        }

        input {
          flex: 2;
          padding: 1rem;
          border-radius: 18px;
          border: 1px solid ${({ error }) => (error ? "red" : "#cccccc")};
          color: #fff;
          background-color: #ffffff00;
          height: 50px;
          &:focus {
            border-color: ${({ error }) => (error ? "red" : "#0e58ae")};
          }
        }
      }
    }
    button[type="submit"] {
      margin-top: 2rem;
      background-color: #fff;
      color: #0e58ae;
      &:hover {
        background-color: #0e58ae;
        color: #fff;
        border: 1px solid #fff;
      }
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    width: 90% !important;
    height: 110vh !important;
  }
`;

const CustomToastContainer = styled(ToastContainer).attrs({
  // Custom class to apply styles
  toastClassName: 'custom-toast',
})`
  .custom-toast {
    top: 60px !important;
    font-size: 1.25rem;
  }
`;

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [telephone, setTelephone] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    // Regular expression for validating email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email format
    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    const data = {
      name,
      email,
      password,
      company,
      telephone,
    };

    try {
      const response = await axios.post(`https://collab-backend-ushf.onrender.com/api/auth/signup`, data);
      console.log(response);
      toast.success('Signup Successful');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error('Signup failed. Please try again.');
      }
    }
  };

  return (
    <SignIn
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <CustomToastContainer position="top-center" />
      <h2>Sign Up</h2>
      <form action="" onSubmit={handleSubmit}>
        <div className="forms">
          <div className="column">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              name="name"
              placeholder="Your name"
              autoComplete="email"
              required
            />
          </div>

          <div className="column">
            <label htmlFor="company">Company / Institution</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              id="company"
              name="company"
              placeholder="Your company or institution"
            />
          </div>

          <div className="column">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              name="email"
              placeholder="Your email"
              autoComplete="email"
              required
            />
          </div>

          <div className="column">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              id="telephone"
              name="telephone"
              placeholder="Your phone"
              autoComplete="tel"
              pattern="[0-9]{10}"
              maxLength="10"
            />
          </div>
          <div className="column">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              name="password"
              placeholder="Create a password"
              autoComplete="current-password"
            />
          </div>
        </div>
        <div>
          <button className="btn" type="submit">
            Sign Up
          </button>
        </div>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </SignIn>
  );
};

export default SignUp;
