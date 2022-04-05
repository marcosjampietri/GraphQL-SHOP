import React from "react";
import NextLink from "next/link";
import styled from "styled-components";
import { animated } from "react-spring";

import { below } from "../../styles/breakpoints";
import Burguer from "./Hamburguer";
import CartIcon from "./CartIcon";
{
    /* import UserIcon from "./UserIcon"; */
}

import { useQuery, gql } from "@apollo/client";
import { GET_LOGGED_USER_QUERY } from "../../backend/graphql/queries/logUser";

const NavBar = () => {
    const { loading, error, data } = useQuery(GET_LOGGED_USER_QUERY);

    return (
        <>
            <Nav>
                <Margin>
                    <NextLink href="/">
                        <Logo src="/vercel.svg" />
                    </NextLink>

                    {/*                     <Burguer /> */}
                    {/*                     <UserIcon /> */}
                    {data.loggedUser && (
                        <div>HELLO, {data.loggedUser.name}</div>
                    )}
                    <CartIcon />

                    {/*                     <NextLink href="/signIU">
                        <a>LOGIN/REGISTER</a>
                    </NextLink>
                    <NextLink href="/protected">
                        <a>PROTECTED</a>
                    </NextLink>

                    */}
                </Margin>
            </Nav>
        </>
    );
};

export default NavBar;

const Nav = styled.nav`
    position: fixed;
    width: 100vw;
    height: 70px;
    padding: 0px 20px;
    z-index: 11;

    background: hsla(42, 0%, 50%, 0);
    backdrop-filter: blur(3px);
    box-shadow: 5px 2px 15px hsla(0, 0%, 0%, 0.05);
    transition: 0.5s;

    :hover {
        transition: 0.2s;
        background: hsla(34, 25%, 55%, 1);
        box-shadow: 5px 2px 15px hsla(0, 0%, 0%, 0.35);
    }

    display: flex;
    align-items: center;
`;

const Margin = styled.div`
    max-width: 1000px;
    width: 100%;

    margin: 10px auto;

    display: flex;
    justify-content: space-between;
    align-items: center;

    ${below.med`
        
    `};
`;

const Logo = styled.img`
    position: relative;
    top: 5px;
    width: 100px;
    height: 100%;

    background: transparent;
    cursor: pointer;
    filter: drop-shadow(0px 0px 50px hsla(340, 100%, 70%, 0.3));
`;
