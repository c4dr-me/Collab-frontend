import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f8f8f8;
    margin-top: 7.5rem;
`;

const Title = styled.h1`
    font-size: 48px;
    color: #333;
    margin-bottom: 16px;
`;

const Message = styled.p`
    font-size: 24px;
    color: #666;
`;

const Error = () => {
    return (
        <Container>
            <Title>404</Title>
            <Message>Oops! Page not found.</Message>
        </Container>
    );
};

export default Error;
