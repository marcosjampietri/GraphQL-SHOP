import "../styles/globals.css";
import React from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { PersistGate } from "redux-persist/integration/react";
import { Provider, useDispatch } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Transition, animated, config } from "react-spring";
import styled from "styled-components";
import { useStore } from "../store";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../backend/graphql/apollo/client";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import OrderPanel from "../components/OrderPanel";

import { GlobalStyle } from "../styles/globalSC";
import { AppState, useTypedSelector } from "../store/__rootReducer";

const stripePromise = loadStripe(
    "pk_test_51JP5tCEV3aJ0axV3AgECWzYOvcF1T8X4j8FRt6nYeLwwoxgfc9bvRfgATmBu6U0k1XYStmZ43soklcbdGy0LBgD300G4pdBwfD"
);

const App = ({ Component, pageProps, router }: AppProps) => {
    const apolloClient = useApollo(pageProps);
    const store = useStore(pageProps.initialReduxState);

    return (
        <>
            <Elements stripe={stripePromise}>
                <ApolloProvider client={apolloClient}>
                    <Provider store={store}>
                        <PersistGate
                            persistor={store.__PERSISTOR}
                            loading={null}
                        >
                            <AppChild
                                Component={Component}
                                pageProps={pageProps}
                                router={router}
                            />
                        </PersistGate>
                    </Provider>
                </ApolloProvider>
            </Elements>
        </>
    );
};

const AppChild = ({ Component, pageProps }: AppProps) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const { CartOn } = useTypedSelector((state: AppState) => state.tog);

    const items = [
        {
            id: router.route,
            Component,
            pageProps,
        },
    ];

    return (
        <>
            <GlobalStyle />
            <NextChild>
                {/*                 
                <Top />
                    */}
                <NavBar />
                <OrderPanel />
                <StyledDiv>
                    <Transition
                        items={items}
                        keys={(item: any) => item.id}
                        config={config.slow}
                        from={{
                            position: "absolute",
                            opacity: 0,
                        }}
                        initial={{ opacity: 0 }}
                        enter={{
                            position: "absolute",
                            opacity: 1,
                        }}
                        leave={{
                            position: "absolute",
                            opacity: 0,
                        }}
                    >
                        {(
                            styles,
                            {
                                pageProps: animatedPageProps,
                                Component: AnimatedComponent,
                            },
                            key: string
                        ) => (
                            <animated.div
                                key={key}
                                style={{
                                    ...styles,
                                    width: "100%",
                                    height: "100%",
                                }}
                            >
                                <>
                                    <AnimatedComponent {...animatedPageProps} />
                                    <Footer />{" "}
                                </>
                            </animated.div>
                        )}
                    </Transition>
                </StyledDiv>
            </NextChild>
        </>
    );
};

export default App;

const NextChild = styled.div`
    width: 100vw;
    height: 100%;
`;

const StyledDiv = styled.div`
    width: 100vw;
    height: 100%;
    overflow: hidden;
`;
