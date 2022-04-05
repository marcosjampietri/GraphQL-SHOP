import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import styled, { keyframes } from "styled-components";
import { Field, Label, Submit, Form, Input, Warn } from "./styles";
import { GET_LOGGED_USER_QUERY } from "../../backend/graphql/queries/logUser";
import { useQuery } from "@apollo/client";
import { MdAccountCircle, MdEmail } from "react-icons/md";
import { HiLockOpen, HiLockClosed } from "react-icons/hi";
import { AppState, useTypedSelector } from "../../store/__rootReducer";
import { useAddAddress } from "../../backend/graphql/queries/logUser";

type Inputs = {
    fullname: string;
    street: string;
    city: string;
    postcode: string;
    country: string;
};

const Shipping = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const { loading, error, data } = useQuery(GET_LOGGED_USER_QUERY);
    const { loggedUser } = data;

    const [newAddress, setnewAddress] = useState(false);

    const { addAddress } = useAddAddress();

    const activeAddress = loggedUser?.addresses.length - 1;

    const { guestLoading, guestAddress } = useTypedSelector(
        (state: AppState) => state.guest
    );

    console.log(activeAddress);

    {
        /*     useEffect(() => {
        if (!loggedUser ) {
            location.replace("/auth");
        }
    }, [loggedUser]); */
    }

    {
        /*         useEffect(() => {
            if (loggedUser.addresses.length > 0) {
                setnewAddress(false);
            }
            if (activeAddress == null)
                dispatch(setActtiveAdAction(loggedUser.addresses.length - 1));
        }, [loggedUser]); */
    }

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>();

    const submitHandler: SubmitHandler<Inputs> = async (userAddress) => {
        try {
            const { fullname, street, city, postcode, country } = userAddress;
            addAddress({
                variables: {
                    id: loggedUser._id,
                    body: { fullname, street, city, postcode, country },
                },
            });
            router.push(`/`);
        } catch (err) {
            alert("something wrong is not right");
        }
    };

    if (!loggedUser) router.push(`/`);

    return guestAddress.street ? (
        <Margin>
            <Addresses>
                {guestAddress && (
                    <Address>
                        <h4>Receiver: {guestAddress.fullname}</h4>
                        <h4>Street: ....{guestAddress.street}</h4>
                        <h4>Code: .....{guestAddress.postcode}</h4>
                        <h4>City: ......{guestAddress.city}</h4>
                        <h4>Country: .{guestAddress.country}</h4>
                    </Address>
                )}

                {loggedUser && loggedUser.addresses?.length > 0 ? (
                    <NewAd>
                        {newAddress ? (
                            <button onClick={() => setnewAddress(false)}>
                                CANCEL
                            </button>
                        ) : (
                            <button onClick={() => setnewAddress(true)}>
                                Enter New Address
                            </button>
                        )}
                    </NewAd>
                ) : null}
            </Addresses>
            <div></div>

            {loggedUser && newAddress ? (
                <Wrap>
                    <FormA
                        onSubmit={handleSubmit(submitHandler)}
                        autoComplete="off"
                    >
                        <div style={{ color: "white" }}>
                            ENTER YOUR SHIPPING DETAILS
                        </div>
                        <Field>
                            <Label>FULL NAME</Label>
                            <MdAccountCircle />

                            <Input
                                {...register("fullname")}
                                type="fullname"
                                placeholder="João Ninguém de Jesus"
                                defaultValue={
                                    loggedUser ? loggedUser.name : null
                                }
                                className={`${errors.fullname ? "-is-invalid" : ""
                                    }`}
                            />
                            <Warn>{errors.fullname?.message}</Warn>
                        </Field>

                        <Field>
                            <Label>STREET</Label>
                            <MdEmail />
                            <Input
                                {...register("street")}
                                type="street"
                                placeholder="Av..."
                                defaultValue=""
                                className={`form-control ${errors.street ? "is-invalid" : ""
                                    }`}
                            />
                            <Warn>{errors.street?.message}</Warn>
                        </Field>

                        <Field>
                            <Label>CITY</Label>
                            <HiLockOpen />
                            <Input
                                {...register("city")}
                                type="city"
                                placeholder="city"
                                defaultValue=""
                                className={`form-control ${errors.city ? "is-invalid" : ""
                                    }`}
                            />
                            <Warn>{errors.city?.message}</Warn>
                        </Field>

                        <Field>
                            <Label>ZIP CODE</Label>
                            <HiLockClosed />
                            <Input
                                {...register("postcode")}
                                type="postcode"
                                placeholder="postcode"
                                defaultValue=""
                                className={`form-control ${errors.postcode ? "is-invalid" : ""
                                    }`}
                            />
                            <Warn>{errors.postcode?.message}</Warn>
                        </Field>

                        <Field>
                            <label htmlFor="country">
                                <Input
                                    {...register("country")}
                                    type="country"
                                    id="country"
                                    className={`form-check-input ${errors.country ? "is-invalid" : ""
                                        }`}
                                />
                                <Label>country</Label>
                                <Warn>{errors.country?.message}</Warn>
                            </label>
                        </Field>
                        <Submit type="submit"> CONFIRM SHIPPING</Submit>
                    </FormA>
                </Wrap>
            ) : null}
        </Margin>
    ) : (
        <div>NOTHING TO DISPLAY</div>
    );
};

export default Shipping;

const Margin = styled.div`
    padding: 10px;
    box-shadow: 1px 1px 15px hsla(240, 50%, 50%, 0.1);
    border-radius: 5px;
    max-width: 600px;
    width: 100%;
    margin: 10px auto;
`;

const stretchdelay = keyframes`
 0% {
     
     height: 0px;
   }
   100% {
     
     height: 743px;
   }
`;
const Wrap = styled.div`
    animation: ${stretchdelay} 1s cubic-bezier(0, 1, 0.3, 1);
`;

const Addresses = styled.div`
    margin: 10px;
    padding: 10px;
    background: hsla(260, 20%, 90%, 0.1);

    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    .active {
        transition: 0.01s;
        transform: scale(1.1);
        z-index: 2;
        background: hsla(48, 100%, 50%, 1);

        outline: 2px solid hsla(48, 100%, 40%, 1);
        outline-offset: 8px;
        box-shadow: 1px 1px 15px hsla(0, 0%, 0%, 0.5);
        h4 {
            color: hsla(280, 50%, 15%, 1);
            font-size: 12px;
            margin: 4px 0px;
        }
    }

    // input {
    //      :checked {
    // }}
`;
const Address = styled.label`
    display: block;
    max-width: 260px;
    width: 100%;
    transform: scale(1);
    z-index: 1;
    margin: 5px;
    padding: 10px;
    box-sizing: border-box;

    transition: 0.2s;
    background: hsla(280, 50%, 15%, 1);
    border-radius: 5px;
    box-shadow: 1px 1px 0px black;
    cursor: pointer;

    h4 {
        color: hsla(280, 50%, 85%, 0.5);
        font-size: 12px;
        margin: 4px 0px;
    }
`;
const Select = styled.div`
    margin: 0px 0px;
    padding: 10px;

    border-radius: 5px;
    background: yellow;

    display: flex;
    justify-content: center;

    // input {
    //      :checked {
    // }}

    div {
        margin: 0px 10px;
        fonte-size: 10px;
    }
`;

const FormA = styled(Form)`
    overflow: hidden;
    height: 100%;
    margin: 20px auto;
    position: relative;
    border-radius: 10px;
`;

const NewAd = styled.div`
    width: 100%;

    display: flex;
    justify-content: center;

    button {
        width: 200px;
        height: 50px;
        margin: 10px auto;

        border: none;
        background: white;
        border-radius: 4px;
        box-shadow: 2px 2px 10px grey;
    }
`;
