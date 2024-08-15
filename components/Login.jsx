import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

const LogIn = styled.div`
  /* Styles remain the same */
`;

const CustomToastContainer = styled(ToastContainer).attrs({
  toastClassName: 'custom-toast',
})`
  /* Styles remain the same */
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (Cookies.get('token')) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sessionStorage.getItem('toastDisplayed')) return;
    setIsLoading(true);
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
        toast.error('Login failed. Please try again with the correct credentials.');
      }
    } finally {
      setIsLoading(false);
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
      <form action="" onSubmit={handleSubmit} aria-label="Login Form">
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
              aria-label="Email"
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
              placeholder="Enter your password"
              autoComplete="current-password"
              aria-label="Password"
              required
            />
          </div>
        </div>
        <div>
          <button className="btn" type="submit" disabled={isLoading} aria-label="Log In Button">
            {isLoading ? 'Logging in...' : 'Log In'}
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
