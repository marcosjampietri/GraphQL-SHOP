import { useState, useEffect } from "react";
import styled from "styled-components";
import {
    animated,
    useTransition,
    config,
    useTrail,
    easings,
} from "react-spring";
import useScrollTo from "react-spring-scroll-to-hook";
import { Reveal } from "../Reveal";
import { below } from "../../styles/breakpoints";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Hero = () => {
    const [picIndex, setpicIndex] = useState(0);
    const [auto, setauto] = useState(false);
    const [disable, setDisable] = useState(false);
    const [show, setshow] = useState(false);

    const backPic = [
        {
            url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1999&q=80",
            pos: "center top",
        },
        {
            url: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
            pos: "center center",
        },
        {
            url: "https://images.unsplash.com/photo-1467043237213-65f2da53396f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2134&q=80",
            pos: "center center",
        },
        {
            url: "https://s3.us-east-1.wasabisys.com/grid50/2017/12/white-background-prudct-photography-example-002.jpg",
            pos: "center center",
        },
        {
            url: "https://images.unsplash.com/photo-1474508297924-60ae8de135eb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
            pos: "center center",
        },
    ];

    useEffect(() => {
        setshow(true);
    }, []);

    useEffect(() => {
        if (auto) {
            const t = setInterval(
                () => setpicIndex((state) => (state + 1) % backPic.length),
                6000
            );
            return () => clearTimeout(t);
        } else {
            const t = setTimeout(() => setauto(true), 12000);
            return () => clearTimeout(t);
        }
    }, [auto]);

    if (disable) {
        setTimeout(setDisable, 1200);
    }

    const slidePic = useTransition(picIndex, {
        key: picIndex,
        from: {
            transform: "translate3d(100vw, 0vh,0)",
            opacity: 1,
        },
        enter: {
            transform: "translate3d(0vw,0vh,0)",
            opacity: 1,
        },
        leave: {
            transform: "translate3d(-100vw,0vh,0)",
            opacity: 1,
        },

        config: config.slow,
    });

    const { scrollTo }: any = useScrollTo(config.slow);

    const prev = () => {
        if (picIndex == 0) {
            null;
        } else {
            setpicIndex((state) => (state - 1) % backPic.length);
        }
    };
    const next = () => {
        setpicIndex((state) => (state + 1) % backPic.length);
    };

    const titleTrail = `MEET_THE_ULTIMATE_-ONLINE_SHOPPING_EXPERIENCE`;
    const titleTrail1 = `MEET_THE_ULTIMATE`;
    const titleTrail2 = `ONLINE_SHOPPING_EXPERIENCE`;
    const line1 = "Find_Out_How_You_Can_Save_Money_On_Your_Online_Business_By";
    const line2 =
        "Getting_Rid_Of_Shopify_Fees_And_Your_Current_Plataform_Costs";
    {
        /* const text = Array.from("the_best_online_shop_you_ve_ever_seen"); */
    }

    interface trailProps {
        position?: number;
    }

    const conf = { tension: 650, friction: 15, frequency: 0.3 };

    const configs1 = {
        config: conf,
        opacity: show ? 1 : 0,
        x: show ? 0 : 30,
        delay: 0,
    };

    const configs2 = {
        config: conf,
        opacity: show ? 1 : 0,
        y: show ? 0 : -10,
        delay: 0,
    };

    const line1Trail = useTrail<trailProps>(line1.length, configs1);
    const line2Trail = useTrail<trailProps>(line2.length, configs1);
    const tTrail1 = useTrail<trailProps>(titleTrail1.length, configs2);
    const tTrail2 = useTrail<trailProps>(titleTrail2.length, configs2);

    return (
        <Section>
            {slidePic((styles, index) => (
                <Carroussel
                    style={{
                        ...styles,
                        backgroundImage: `url(${backPic[index].url})`,
                        backgroundPosition: `${backPic[index].pos}`,
                    }}
                />
            ))}

            <TextWrap onClick={() => setshow(!show)}>
                <div>
                    {tTrail1.map(({ y, ...otherProps }, i) => (
                        <Title
                            key={i}
                            style={{
                                ...otherProps,
                                transform: y.to(
                                    (y: any) => `translate3d(0, ${y}vh, 0)`
                                ),
                            }}
                        >
                            {titleTrail1[i] !== "_" ? (
                                titleTrail1[i].replace(/-/g, ``)
                            ) : (
                                <div style={{ color: "transparent" }}>
                                    &nbsp;
                                </div>
                            )}
                        </Title>
                    ))}
                </div>
                <div>
                    {tTrail2.map(({ y, ...otherProps }, i) => (
                        <Title
                            key={i}
                            style={{
                                ...otherProps,
                                transform: y.to(
                                    (y: any) => `translate3d(0, ${y}vh, 0)`
                                ),
                                marginBottom: "1em",
                            }}
                        >
                            {titleTrail2[i] !== "_" ? (
                                titleTrail2[i].replace(/-/g, ``)
                            ) : (
                                <div style={{ color: "transparent" }}>
                                    &nbsp;
                                </div>
                            )}
                        </Title>
                    ))}
                </div>
                <div>
                    {line1Trail.map(({ x, ...otherProps }, i) => (
                        <Call
                            key={i}
                            style={{
                                ...otherProps,
                                transform: x.to(
                                    (x: any) => `translate3d( ${x}vw, 0, 0)`
                                ),
                            }}
                        >
                            {line1[i] !== "_" ? (
                                line1[i]
                            ) : (
                                <div style={{ color: "transparent" }}>
                                    &nbsp;
                                </div>
                            )}
                        </Call>
                    ))}
                </div>
                <div>
                    {line2Trail.map(({ x, ...otherProps }, i) => (
                        <Call
                            key={i}
                            style={{
                                ...otherProps,
                                transform: x.to(
                                    (x: any) => `translate3d( ${x}vw, 0, 0)`
                                ),
                            }}
                        >
                            {line2[i] !== "_" ? (
                                line2[i]
                            ) : (
                                <div style={{ color: "transparent" }}>
                                    &nbsp;
                                </div>
                            )}
                        </Call>
                    ))}
                </div>
            </TextWrap>
            <CTAWrap>
                <Reveal>
                    <CTA
                        onClick={() =>
                            scrollTo(document.querySelector("#New-Items"))
                        }
                    >
                        <div>START SHOPPING</div>
                    </CTA>
                </Reveal>
            </CTAWrap>
            <Dots>
                <ButtonP
                    onClick={() => {
                        prev();
                        setDisable(true);
                        setauto(false);
                    }}
                    disabled={disable}
                >
                    <IoIosArrowBack />
                </ButtonP>

                {[...Array(backPic.length)].map((_, dotIndex) => (
                    <div
                        className={`${dotIndex == picIndex ? "active" : ""}`}
                        key={dotIndex}
                        onClick={() => {
                            setpicIndex(dotIndex);
                            setauto(false);
                        }}
                    />
                ))}

                <ButtonN
                    onClick={() => {
                        next();
                        setDisable(true);
                        setauto(false);
                    }}
                    disabled={disable}
                >
                    <IoIosArrowForward />
                </ButtonN>
            </Dots>
            <Overlay>
                <animated.div
                    style={{
                        backgroundImage: `url(${backPic[picIndex].url})`,
                        backgroundPosition: `${backPic[picIndex].pos}`,
                    }}
                />
            </Overlay>
        </Section>
    );
};

export default Hero;

const Section = styled.section`
    position: relative;

    width: 100vw;
    height: 100vh;
    margin: 0px auto;

    padding: 0px 0px 0px;
    overflow: hidden;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const Overlay = styled(animated.div)`
    position: absolute;
    width: 80vw;
    height: 80vh;
    top: 80px;

    opacity: 0.8;
    filter: drop-shadow(-1px 6px 10px hsla(0, 0%, 0%, 0.2));

    div {
        clip-path: polygon(
            0% 0%,
            0% 100%,
            3% 100%,
            3% 3%,
            97% 3%,
            97% 97%,
            3% 97%,
            3% 100%,
            100% 100%,
            100% 0%
        );
        width: 100%;
        height: 100%;
    }
`;

const Carroussel = styled(animated.div)`
    position: absolute;
    width: 100%;
    height: 100vh;

    background-size: cover;
    background-position: left top;
    background-blend-mode: screen;
`;

const CTAWrap = styled.div`
    position: absolute;
    bottom: 25vh;
    width: 100vw;
    min-width: 150px;
    height: 10vh;
    z-index: 10;
`;

const CTA = styled.div`
    width: 50vw;
    min-width: 150px;
    height: 50px;
    max-height: 150px;
    margin: 0vh 25vw;
    z-index: 10;

    font-size: clamp(16px, 2vw, 34px);
    text-align: center;
    font-weight: 200;
    color: white;
    background: hsla(280, 0%, 10%, 1);
    cursor: pointer;
    border-radius: 25vw;
    border: 1px solid hsla(0, 0%, 25%, 1);
    box-shadow: 2px 4px 12px hsla(0, 0%, 0%, 0.8);

    display: flex;
    justify-content: center;
    align-items: center;
`;

const Dots = styled.div`
    position: absolute;
    bottom: 80px;
    z-index: 10;

    display: flex;
    justify-content: center;
    align-items: center;

    div {
        flex: 0 0 10px;
        width: 10px;
        height: 10px;
        margin: 10px;
        transform: scale(1);

        border-radius: 50%;
        border: 1px solid hsla(0, 0%, 10%, 1);
        box-shadow: 1px 1px 5px hsla(0, 0%, 0%, 0);
        transition: 0.9s;
    }
    .active {
        transition: 0.07s;
        transform: scale(1.5);

        background: hsla(0, 0%, 0%, 1);
        border: 1px solid hsla(0, 0%, 70%, 1);
        box-shadow: 1px 1px 5px hsla(0, 0%, 0%, 0.5);
    }
`;

const Button = styled.button`
    width: 34px;
    height: 34px;
    margin: 0px 10vw;
    cursor: pointer;

    background: hsla(0, 0%, 0%, 0.82);
    border: 1px solid hsla(0, 0%, 100%, 0.9);
    border-radius: 2px;
    font-size: 1.2em;

    svg {
        fill: white;
    }
`;
const ButtonN = styled(Button)`
    right: 0px;
    svg {
        position: relative;
        top: 2px;
        left: 1px;
    }
`;
const ButtonP = styled(Button)`
    left: 0px;
    svg {
        position: relative;
        top: 2px;
        left: -1px;
    }
`;

const TextWrap = styled.div`
    width: 100vw;
    padding: 0px 10px 20px;

    background: hsla(0, 0%, 100%, 0.58);
    backdrop-filter: blur(10px);
    z-index: 2;
    overflow: hidden;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    div {
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

const Call = styled(animated.h2)`
    color: hsla(0, 0%, 30%, 1);
    font-size: clamp(8px, 2.2vw, 18px);
    letter-spacing: 0.04em;
    line-height: 1.3em;
    font-weight: 200;
`;

const Title = styled(animated.h1)`
    height: 1em;

    color: hsla(0, 0%, 10%, 1);

    font-size: clamp(18px, 5vw, 45px);
    letter-spacing: 0.15em;
    font-weight: bold;
    line-height: 2em;

    ${below.small`
    font-size: clamp(12px, 5vw, 50px);
        
    `};
`;
