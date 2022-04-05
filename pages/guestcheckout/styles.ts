import styled, { keyframes } from "styled-components";

export const Form = styled.form`
    position: absolute;
    width: 100%;
    max-width: 500px;
    min-width: 200px;
    margin: 0px auto;
    padding: 30px 10px;

    background: rgb(63, 0, 106);
    background: linear-gradient(
        90deg,
        hsla(276, 80%, 25%, 1) 0%,
        hsla(290, 80%, 28%, 1) 20%,
        hsla(276, 70%, 25%, 1) 100%
    );

    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    box-shadow: 0px 10px 30px hsla(0, 0%, 0%, 0.93);
`;

export const Field = styled.div`
    position: relative;
    width: 100%;
    height: 60px;
    margin: 40px auto;
    padding: 0px;

    border-radius: 10px;
    box-shadow: 0px 0px 10px hsla(0, 0%, 0%, 0.8);

    svg {
        position: absolute;
        bottom: 10px;
        left: 8px;
        font-size: 20px;
        fill: hsla(44, 100%, 50%, 1);
    }

    // .is-invalid {
    //     background: black;
    // }
`;

export const Input = styled.input`
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 0px 35px;
    padding-top: 22px;
    font-size: 16px;

    border: 1px solid hsla(0, 100%, 25%, 0);

    border-radius: 10px;
    background-color: hsla(0, 0%, 100%, 0.2);
    color: hsla(0, 0%, 100%, 1);

    transition: 0.5s;

    ::placeholder {
        transition: 0.3s;
        color: hsla(240, 0%, 100%, 0.31);
        font-size: 16px;
        font-weight: 100;
    }

    :focus {
        transition: 0.3s;
        // padding: 0px 60px;
        padding-top: 4px;
        padding-left: calc(35px + 5vw);

        outline: none;
        background: hsla(55, 100%, 60%, 1);
        mix-blend-mode: hard-light;
        color: hsla(280, 100%, 20%, 1);
        ::placeholder {
            color: hsla(240, 0%, 30%, 0.81);
        }
    }

    // :-webkit-autofill {
    //     transition: 0.3s;
    //     background: hsla(0, 100%, 60%, 1);
    // }
`;

export const Label = styled.div`
    position: absolute;
    top: 10px;
    left: 10px;

    color: hsla(0, 0%, 100%, 0.91);
    font-weight: 600;
    font-size: 8px;
`;

export const Submit = styled.button`
    width: 100%;
    height: 50px;
    margin: 30px 0px;

    border-radius: 10px;
    background-color: hsla(50, 100%, 50%, 1);
    border: none;
    color: black;
`;

export const Warn = styled.span`
    position: absolute;
    bottom: 0px;
    left: 50%;
    transform: translate(-50%, 110%);
    width: 100%;
    padding: 0px;
    z-index: 2;
    font-size: 14px;
    text-align: center;

    // border: 1px solid hsla(360, 100%, 100%, 1);
    background: hsla(0, 80%, 50%, 1);
    border-radius: 5px;
    color: hsla(360, 100%, 100%, 1);
`;

const shake = keyframes` 
    0% { transform: translate(25px, 0px) ; }
  10% { transform: translate(-12px, -0px) ; }
  20% { transform: translate(8px, 0px) ; }
  30% { transform: translate(-5px, 0px) ; }
  40% { transform: translate(3px, -0px) ; }
  50% { transform: translate(-2px, 0px) ; }
  60% { transform: translate(1px, 0px) ; }
  70% { transform: translate(0px, 0px) ; }
  80% { transform: translate(0px, -0px) ; }
  90% { transform: translate(0px, 0px) ; }
  100% { transform: translate(0px, -0px) ; } 
`;

export const Err = styled.div`
    position: absolute;
    bottom: -40px;

    h6 {
        border-radius: 3px;
        padding: 4px 50px;
        width: 100%;
        text-align: center;
        text-transform: uppercase;
        letter-spacing: initial;
        font-size: 10px;
        background: red;
        color: white;
    }

    animation: ${shake} 0.82s cubic-bezier(0, 1, 0.7, 1);
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    perspective: 1000px;
`;

const styles = () => {
    return "these are just styles";
};

export default styles;
