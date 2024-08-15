import React from "react";
import styled from "styled-components";
import { quantum } from 'ldrs';
quantum.register();

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; 
  background-color: ${({ bgColor }) => bgColor || 'transparent'}; 
`;



const LoadingAnimation = ({bgColor}) => {
  console.log("LoadingAnimation rendered with bgColor:", bgColor);
  return (
    <LoadingContainer bgColor={bgColor} >
     <l-quantum
            size="45"
            speed="1.75"
            color="white"
          ></l-quantum>
    </LoadingContainer>
  );
};

export default LoadingAnimation;
