import type { NextPage } from "next";
import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import Shipping from "./nonguest";
import Payment from "./payment";
import Order from "./order";

import styled from "styled-components";
import { animated, useTransition, config } from "react-spring";
import { useQuery } from "@apollo/client";
import { GET_LOGGED_USER_QUERY } from "../../backend/graphql/queries/logUser";
import {
    stepShAction,
    stepRvAction,
    stepPayAction,
} from "../../store/stepper/stepperActions";
import { AppState, useTypedSelector } from "../../store/__rootReducer";

const Checkout: NextPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const { Step } = useTypedSelector((state: AppState) => state.step);
    const { loading, data } = useQuery(GET_LOGGED_USER_QUERY);

    useEffect(() => {
        console.log(data);
    }, [data]);

    const stepComponent = [
        <Shipping key="1" />,
        <Order key="2" />,
        <Payment key="3" />,
    ];

    const dir = "";

    const slidePic = useTransition(Step, {
        key: Step,
        from: { transform: `translate3d(0vw, ${dir}100vh,0)`, opacity: 1 },
        enter: { transform: `translate3d(0vw,0vh,0)`, opacity: 1 },
        leave: { transform: `translate3d(0vw, ${dir}100vh,0)`, opacity: 0 },
    });

    if (loading)
        return (
            <Main>
                <div>Loading</div>
            </Main>
        );

    return data.loggedUser ? (
        <div>
            <Head>
                <title>Checkout Page</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Main>
                <Steps>
                    <div
                        className={`${Step >= 0 ? "past" : ""}`}
                        onClick={() => dispatch(stepShAction())}
                    >
                        1 SHIP
                    </div>
                    <div
                        className={`${Step > 0 ? "past" : ""}`}
                        onClick={() => dispatch(stepRvAction())}
                    >
                        2 REVIEW
                    </div>
                    <div
                        className={`${Step > 1 ? "past" : ""}`}
                        onClick={() => dispatch(stepPayAction())}
                    >
                        3 PAYMENT
                    </div>
                </Steps>
                {slidePic((styles, activeStep) => (
                    <StepCanva style={styles}>
                        {stepComponent[activeStep]}
                    </StepCanva>
                ))}
            </Main>
        </div>
    ) : (
        <Main>
            <div>Not able to find logged user</div>
        </Main>
    );
};

export default Checkout;

const Main = styled.main`
    min-height: 200vh;
`;

const Steps = styled(animated.div)`
    position: relative;
    margin-top: 70px;
    height: 50px;

    // box-shadow: 2px 2px 12px black;

    display: flex;
    justify-content: space-around;

    div {
        width: 100%;
        height: 30px;

        margin: 10px;

        transition: 1s;
        box-shadow: 2px 2px 12px hsla(0, 0%, 0%, 0.3);
        color: hsla(260, 100%, 50%, 0.1);
        border-radius: 5px;
        border: 2px solid hsla(260, 100%, 50%, 0);
        text-transform: uppercase;
        font-size: 12px;

        display: grid;
        place-items: center;
    }
    .past {
        transition: 0.3s;
        border: 2px solid hsla(260, 100%, 50%, 1);
        color: hsla(260, 100%, 50%, 1);
    }
`;

const StepCanva = styled(animated.div)`
    position: absolute;
    top: 120px;
    width: 100%;

    // box-shadow: 2px 2px 20px hsla(0, 0%, 0%, 0.5);
    // background: white;
`;
