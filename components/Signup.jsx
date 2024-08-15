import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Cookies from "js-cookie";

const SignIn = styled.div`
  max-width: 800px;
  width: 100%;
  background-color: #0e58ae;
  margin: 5rem auto 0 auto;
  padding: 2rem;
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
      width: 100%;
      gap: 1.5rem;

      .column {
        display: flex;
        flex-direction: column;

        label {
          font-size: 16px;
          color: #fff;
          line-height: 26px;
          font-weight: 500;
        }

        input {
          padding: 0.75rem;
          border-radius: 18px;
          border: 1px solid #cccccc;
          color: #fff;
          background-color: transparent;
          height: 45px;
          &:focus {
            border-color: #0e58ae;
            outline: none;
          }
        }
      }
    }

    button[type="submit"] {
      margin-top: 2rem;
      background-color: #fff;
      color: #0e58ae;
      padding: 0.75rem 2rem;
      border: none;
      border-radius: 18px;
      cursor: pointer;
      &:hover {
        background-color: #0e58ae;
        color: #fff;
        border: 1px solid #fff;
      }
    }
  }

  @media (max-width: 768px) {
    width: 90%;
    padding: 1.5rem;
  }
`;

const CustomToastContainer = styled(ToastContainer).attrs({
  toastClassName: 'custom-toast',
})`
  .custom-toast {
    font-size: 1.25rem;
    top: 60px !important; 
  }
`;

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [telephone, setTelephone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      name,
      email,
      password,
      company,
      telephone,
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`, data);
      toast.success('Signup Successful');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Signup failed. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SignIn>
      <CustomToastContainer position="top-center" />
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} aria-label="Signup Form">
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
              autoComplete="name"
              aria-label="Name"
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
              aria-label="Company"
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
              aria-label="Email"
              required
            />
          </div>

          <div className="column">
            <label htmlFor="telephone">Phone</label>
            <input
              type="tel"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              id="telephone"
              name="telephone"
              placeholder="Your phone"
              autoComplete="tel"
              aria-label="Phone Number"
              pattern="[0-9]{10}"
              maxLength="10"
              required
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
              autoComplete="new-password"
              aria-label="Password"
              required
            />
          </div>
        </div>
        <div>
          <button className="btn" type="submit" aria-label="Sign Up Button" disabled={isLoading}>
            {isLoading ? 'Signing Up...' : 'Sign Up'}
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
