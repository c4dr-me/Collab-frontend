import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';


const LogIn = styled.div`
  max-width: 800px;
  width: 100%;
  background-color: #0e58ae;
  margin: 7rem auto 7rem auto;
  max-height: 500px;
  border-radius: 36px;
  h2 {
    font-weight: 500;
  }

  p {
    padding-top: 1rem;
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
          border: 1px solid white;
          border-radius: 18px;
          color: #fff;
          background-color: #ffffff00;
          height: 50px;
          &:focus {
            border-color: #ccc;
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
   @media (max-width: ${({ theme }) => theme.media.mobile}){
    width: 90% !important;
    }
`;

const CustomToastContainer = styled(ToastContainer).attrs({
  toastClassName: 'custom-toast',
})`
  .custom-toast {
    top: 60px !important;
    font-size: 1.25rem;
  }
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    sessionStorage.removeItem('toastDisplayed');
    const data = { email, password };
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, data);
      Cookies.set('token', response.data.token, { expires: 1, secure: true, sameSite: 'Strict' }); 
      toast.success('Login Successful !!');
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error('Login failed. Please try again with right credentials.');
      }
    }
  };

  return (
    <LogIn
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <CustomToastContainer position="top-center" />
      <h2>Log In</h2>
      <form action="" onSubmit={handleSubmit}>
        <div className="forms">
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
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              name="password"
              placeholder="Create a password"
              autoComplete="current-password"
              required
            />
          </div>
        </div>
        <div>
          <button className="btn" type="submit">
            Log In
          </button>
        </div>
      </form>
      <p>
        Don't have an account? <Link to="/signup">SignUp</Link>
      </p>
    </LogIn>
  );
};

export default Login;
