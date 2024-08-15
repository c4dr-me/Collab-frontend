import React from "react";
import styled from "styled-components";
import 'ldrs/quantum';

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
<div style={{ width: '65px', height: '65px', backgroundColor: 'white' }}></div>
    </LoadingContainer>
  );
};

export default LoadingAnimation;
