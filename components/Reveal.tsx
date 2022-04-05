import { useEffect, useState } from "react";

import styled from "styled-components";
import { useSpring, animated, config, useTrail } from "react-spring";
import { Waypoint } from "react-waypoint";

export const Reveal = ({ children }: any) => {
    const [show, setShow] = useState(false);

    const reveal = useSpring({
        opacity: show ? 1 : 0,
        y: show ? 0 : 100,
        config: config.molasses,
    });
    return (
        <Waypoint
            bottomOffset="0%"
            onEnter={() => {
                if (!show) setShow(true);
            }}
        >
            <animated.div style={reveal}>{children}</animated.div>
        </Waypoint>
    );
};

export const RevealR = ({ children }: any) => {
    const [show, setShow] = useState(false);

    const reveal = useSpring({
        opacity: show ? 1 : 0,
        x: show ? 0 : 100,
        config: config.molasses,
    });
    return (
        <Waypoint
            bottomOffset="30%"
            onEnter={() => {
                if (!show) setShow(true);
            }}
        >
            <animated.div style={reveal}>{children}</animated.div>
        </Waypoint>
    );
};
export const RevealL = ({ children }: any) => {
    const [show, setShow] = useState(false);

    const reveal = useSpring({
        opacity: show ? 1 : 0,
        x: show ? 0 : -100,
        config: config.molasses,
    });
    return (
        <Waypoint
            bottomOffset="30%"
            onEnter={() => {
                if (!show) setShow(true);
            }}
        >
            <animated.div style={reveal}>{children}</animated.div>
        </Waypoint>
    );
};

{
    /* const PageParent = styled.div`
    perspective: 800px;

    div {
        width: 100%;
        height: 100%;
    }
`;
const PageParentU = styled.div`
    perspective: 1200px;
    perspective-origin: 50% 0%;

    div {
        width: 100%;
        height: 100%;
    }
`; */
}
