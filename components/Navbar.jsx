import React, { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link as NavbarLink } from "react-router-dom";
import styled from "styled-components";
import { CgMenu, CgCloseR } from "react-icons/cg";



const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <Nav>
      <div className={openMenu ? "menuIcon active" : "menuIcon"}>
        <ul className="navbar-list">
          <li>
            <ScrollLink
              className="navbar-link"
              onClick={() => setOpenMenu(false)}
              to="home"
              smooth={true}
              duration={500}
              offset={-70}
            >
              Home
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              className="navbar-link"
              onClick={() => setOpenMenu(false)}
              to="services"
              smooth={true}
              duration={500}
              offset={-70}
            >
              Services
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              className="navbar-link"
              onClick={() => setOpenMenu(false)}
              to="review"
              smooth={true}
              duration={500}
              offset={-70}
            >
              Review
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              className="navbar-link"
              onClick={() => setOpenMenu(false)}
              to="benifit"
              smooth={true}
              duration={500}
              offset={-70}
            >
              Benifit
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              className="navbar-link"
              onClick={() => setOpenMenu(false)}
              to="contact"
              smooth={true}
              duration={500}
              offset={-70}
            >
              Contact
            </ScrollLink>
          </li>
        </ul>
        {/* //nav icon */}
        <div className="mobile-navbar-btn">
          <CgMenu
            name="menu-outline"
            className="mobile-nav-icon"
            onClick={() => setOpenMenu(true)}
          />
          <CgCloseR
            name="close-outline"
            className="close-outline mobile-nav-icon"
            onClick={() => setOpenMenu(false)}
          />
        </div>
      </div>
    </Nav>
  );
};


const Nav = styled.nav`
.navbar-list {
  display: flex;
  gap: 4.8rem;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.white};
  transition: color 0.3s linear;
  cursor: pointer;

  li {
    list-style: none;
    .navbar-link {
      &:link,
      &:visited {
        display: inline-block;
        text-decoration: none;
      }

      &:hover,
      &:active {
        color: ${({ theme }) => theme.colors.helper};
      }
    }
  }
}

.mobile-navbar-btn {
  display: none;

  .close-outline {
    display: none;
  }
}

.mobile-navbar-btn[name="close-outline"] {
  display: none;
}

@media (max-width: ${({ theme }) => theme.media.mobile}) {
  .mobile-navbar-btn {
    display: inline-block;
    z-index: 999;
    border: ${({ theme }) => theme.colors.white};

    .mobile-nav-icon {
      font-size: 4.2rem;
      color: ${({ theme }) => theme.colors.white};
    }
  }

  /* hide the original nav menu  */
  .navbar-list {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #0e58aeff;
    font-size: 2rem;

    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    text-align: center;

    transform: translateX(100%);

    visibility: hidden;
    opacity: 0;

    li {
      .navbar-link {
        &:link,
        &:visited {
          font-size: 4.2rem;
        }

        &:hover,
        &:active {
          color: ${({ theme }) => theme.colors.helper};
        }
      }
    }
  }

  .active .mobile-nav-icon {
    display: none;
    font-size: 4.2rem;
    position: absolute;
    top: 3%;
    right: 10%;
    color: ${({ theme }) => theme.colors.white};
    z-index: 9999;
  }

  .active .close-outline {
    display: inline-block;
  }

  .active .navbar-list {
    visibility: visible;
    opacity: 1;
    transform: translateX(0);
    z-index: 999;
  }
}
`;

export default Navbar;
