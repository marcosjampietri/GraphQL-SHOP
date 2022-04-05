import React from "react";
import styled, { keyframes } from "styled-components";

const WaveLoading = () => {
    return (
        <Wrap>
            <LoadContainer>
                <BoxLoadingFirst />
                <BoxLoadingTwo />
                <BoxLoadingThree />
                <BoxLoadingFour />
                <BoxLoadingFive />
                <BoxLoadingSix />
            </LoadContainer>
        </Wrap>
    );
};

export default WaveLoading;

const stretchdelay = keyframes`
  0%,
  40%,
  100% {
    -webkit-transform: scaleY(0.4);
  }
  20% {
    -webkit-transform: scaleY(1);
  }
`;

const Wrap = styled.div`
    width: 100%;
    height: 100%;
    text-align: center;

    background-image: linear-gradient(
        hsla(280, 100%, 30%, 0),
        hsla(260, 80%, 55%, 0)
    );

    display: flex;
    justify-content: center;
    align-items: center;
`;

const LoadContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const box = styled.div`
    background-image: linear-gradient(
        hsla(320, 100%, 100%, 1),
        hsla(260, 30%, 100%, 1)
    );

    height: 20px;
    margin: 8px;
    animation: ${stretchdelay} 1.3s infinite ease-in-out;
`;

const BoxLoadingFirst = styled(box)`
    animation-delay: -1.2s;
`;

const BoxLoadingTwo = styled(box)`
    animation-delay: -1.1s;
`;

const BoxLoadingThree = styled(box)`
    animation-delay: -1s;
`;

const BoxLoadingFour = styled(box)`
    animation-delay: -0.9s;
`;

const BoxLoadingFive = styled(box)`
    animation-delay: -0.8s;
`;

const BoxLoadingSix = styled(box)`
    animation-delay: -0.7s;
`;
