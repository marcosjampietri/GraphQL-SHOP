import React, { useState } from "react";
import NextLink from "next/link";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import styled from "styled-components";

import { BiUser } from "react-icons/bi";

import { useTypedSelector, AppState } from "../../store/__rootReducer";
{
    /* import { logoutAction } from "../../store/actions/authActions"; */
}
{
    /* import { modOnAction, modOffAction } from "../../store/modal/navActions"; */
}

import Modal from "../Modal";

const UserIcon = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const userInfo = { _id: "", name: "" };

    return (
        <>
            <Log>
                <div>
                    {userInfo ? (
                        <div>
                            <Icon>
                                <BiUser />
                            </Icon>
                            <User>{userInfo.name}</User>
                        </div>
                    ) : (
                        <NextLink href={"/auth"} passHref>
                            <Icon>
                                <BiUser />
                            </Icon>
                        </NextLink>
                    )}
                </div>

                <>
                    <UImenu>
                        <Profile
                            onClick={() =>
                                router.push(`/profile/${userInfo._id}`)
                            }
                        >
                            PROFILE
                        </Profile>
                        <LogOut>LOGOUT</LogOut>
                    </UImenu>
                </>
            </Log>
        </>
    );
};

export default UserIcon;

const Log = styled.div`
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;
`;
const User = styled.div`
    position: absolute;
    transform: translatex(-25%);

    letter-spacing: 0.04em;
`;
const Icon = styled.div`
    width: 28px;
    height: 28px;
    font-size: 40px;

    border-radius: 50%;
    border: 2px solid hsla(0, 0%, 0%, 1);
    background: hsla(0, 0%, 80%, 1);

    display: flex;
    justify-content: center;
    align-items: center;

    overflow: hidden;

    svg {
        background: hsla(0, 0%, 90%, 1);
    }
`;
const UImenu = styled.div`
    position: absolute;
    top: 0px;
    width: 100px;

    border-radius: 2px;

    background: hsla(0, 0%, 100%, 1);

    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`;
const MenuItem = styled.div`
    width: 90%;
    margin: 4px;
    padding: 4px;
    font-size: 10px;

    border-bottom: 1px solid hsla(0, 0%, 0%, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
`;
const LogOut = styled(MenuItem)``;
const Profile = styled(MenuItem)``;
