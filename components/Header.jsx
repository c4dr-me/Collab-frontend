import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from 'react-router-dom';
import Navbar from "./Navbar";
import styled from "styled-components";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate('/signup'); 
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <MainHeader isScrolled={isScrolled}>
      <Link to="/" className="collab" >Collab</Link>
      {location.pathname !== '/dashboard' && (
        <Navbar/>
      )}
       {location.pathname !== '/dashboard' && (
        <button className="btn" onClick={handleGetStartedClick}>Get Started For Free</button>
      )}
    </MainHeader>
  );
};

const MainHeader = styled.header`
  border-bottom: 1px solid #e0e0e0;
  position: fixed;
  width:100%;
  top: 0;
  z-index: 1000;
  height: auto;
  padding: 20px;
  background-color: ${({ theme, isScrolled }) =>
    isScrolled ? 'rgba(0, 0, 0, 0.96)' : theme.colors.bg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  .collab {
    font-size: 30px;
    font-weight: 900;
  }
  .btn {
    background-color: #0e58aeff;
    border: 0.1rem solid rgb(98 84 243);
    color: #ffffffff;
    font-size: 1.5rem;
    font-weight: 600;
    min-width: 8rem;
    min-height: 3.5rem;
    border-radius: 1rem;
    padding: 8px 24px;

    &:hover {
      background-color: rgb(98 84 243);
      color: #fff;
    }
    @media (max-width: ${({ theme }) => theme.media.mobile}) {
      &.btn {
        display: none;
      }
    }
  }
`;

export default Header;
