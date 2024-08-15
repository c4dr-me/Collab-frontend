import { ThemeProvider } from "styled-components";
import { useState, useEffect, Suspense } from "react";
import { GlobalStyle } from "./GlobalStyle";
import Benefit from "./Benefit";
import Contact from "./Contact";
import Review from "./Review";
import Services from "./Services";
import Header from "../components/Header";
import Home from "./Home";
import Footer from "../components/Footer";
import user from "./userdata";
import SignUp from '../components/Signup';
import LogIn from '../components/Login';
import Dashboard from '../Dashboard/dashboard';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PrevArrow, NextArrow } from "./CustomArrow";
import { Routes, Route } from 'react-router-dom'; 
import { Element } from 'react-scroll';
import HireMe from './Posts';
import UserProfile from './UserProfile';
import LoadingAnimation from './LoadingAnimation';
import Error from './404.jsx';
import ProtectedRoute from '../utils/ProtectedRoute'

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); 

    return () => clearTimeout(timer);
  }, []);
  const theme = {
    colors: {
      heading: "#ffffff",
      active: "#0e58aeff",
      text: "#ffffffff",
      white: "#fff",
      black: " #212529",
      helper: "#8490ff",
      bg: "#0e58ae19",
      navbarlist: "#ffffffe5",
      footer_bg: "#0a1435",
      btn: "rgb(98 84 243)",
      border: "rgba(98, 84, 243, 0.5)",
      hr: "#ffffff",
      gradient:
        "linear-gradient(0deg, rgb(132 144 255) 0%, rgb(98 189 252) 100%)",
      shadow:
        "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
      shadowSupport: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
    },
    media: { mobile: "768px", tab: "998px" },
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }
    ]
  };
   if (isLoading) {
    return <LoadingAnimation bgColor="rgb(18, 21, 25)" />;
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Suspense fallback={<LoadingAnimation />}>
      <Header />
      <Routes>
      <Route path="*" element={
          <Suspense fallback={<LoadingAnimation />}>
            <Error />
          </Suspense>
        } />
        <Route path="/" element={
          <Suspense fallback={<LoadingAnimation/>}>
            <>
              <Element name="home"><Home /></Element>
              <Element name="services"><Services /></Element>
              <Element name="benefit"><Benefit /></Element>
              <Element name="reviews">
                <Slider {...sliderSettings}>
                  {user.map((user, index) => (
                    <Review key={index} user={user} />
                  ))}
                </Slider>
              </Element>
              <Element name="contact"><Contact /></Element>
            </>
          </Suspense>
        } />
        <Route path="/hire-me" element={
          <Suspense fallback={<LoadingAnimation />}>
            <HireMe />
          </Suspense>
        } />
        <Route path="/user/profile/:token" element={
          <Suspense fallback={<LoadingAnimation />}>
            <UserProfile />
          </Suspense>
        } />
        <Route path="/signup" element={
          <Suspense fallback={<LoadingAnimation />}>
            <SignUp />
          </Suspense>
        } />
        <Route path="/login" element={
          <Suspense fallback={<LoadingAnimation />}>
            <LogIn />
          </Suspense>
        } />
        <Route path="/dashboard" element={
          <Suspense fallback={<LoadingAnimation />}>
            <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
          </Suspense>
        } />
      </Routes>
      <Footer />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
