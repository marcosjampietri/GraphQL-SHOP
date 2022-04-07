import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import styled, { keyframes } from "styled-components";
import { useTransition, animated } from "react-spring";
import { Field, Form, Label, Submit, Input, Warn } from "./stylesNonGuest";
import { useQuery } from "@apollo/client";
import { MdAccountCircle, MdEmail } from "react-icons/md";
import { HiLockOpen, HiLockClosed } from "react-icons/hi";
import AddressSearch from "react-loqate";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { useAddAddress } from "../../backend/graphql/queries/logUser";
import { GET_LOGGED_USER_QUERY } from "../../backend/graphql/queries/logUser";
import { stepRvAction } from "../../store/stepper/stepperActions";
import { setActiveAdress } from "../../store/cart/cartActions";
import { AppState, useTypedSelector } from "../../store/__rootReducer";

type Inputs = {
    fullname: string;
    street: string;
    city: string;
    postcode: string;
    country: string;
};

interface inputAddressType {
    fullname?: string;
    Line1?: string;
    Line2?: string;
    Line3?: string;
    City?: string;
    PostalCode?: string;
    CountryName?: string;
}

const Shipping = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const loqate = process.env.LOQATE!;

    const { loading, error, data } = useQuery(GET_LOGGED_USER_QUERY);

    useEffect(() => {
        console.log(data);
    }, [data]);

    const { addAddress, loading: loadingAddress } = useAddAddress();
    const [editSubmission, seteditSubmission] = useState(true);

    useEffect(() => {
        if (data.loggedUser?.addresses.length > 0) seteditSubmission(false);
    }, [data]);

    const [inputAddress, setInputAddress] =
        useState<inputAddressType | null>(null);
    const { activeAddress } = useTypedSelector((state: AppState) => state.cart);

    const validationSchema = Yup.object().shape({
        fullname: Yup.string().required("Name is required, Mr. X 🤪"),
        street: Yup.string().required("Street is required 😅"),
        city: Yup.string().required("City is required 😅"),
        postcode: Yup.string().required("Postcode is required 😅"),
        country: Yup.string().required("Country is required 😅"),
    });

    const formOptions = { resolver: yupResolver(validationSchema) };

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm<Inputs>(formOptions);

    const submitHandler: SubmitHandler<Inputs> = async (userAddress) => {
        try {
            const { fullname, street, city, postcode, country } = userAddress;
            addAddress({
                variables: {
                    id: data.loggedUser?._id,
                    body: { fullname, street, city, postcode, country },
                },
            });
            seteditSubmission(false);
            dispatch(stepRvAction());
            dispatch(setActiveAdress(data.loggedUser?.addresses?.length));
        } catch (err) {
            alert("something wrong is not right");
        }
    };

    const animStyles = {
        from: { opacity: 0, transform: "translate3d(0, 50px, 0)" },
        enter: { opacity: 1, transform: "translate3d(0, 20px, 0)" },
        leave: { opacity: 0, transform: "translate3d(0, -50px, 0)" },
        delay: 0,
    };

    const errTransNm = useTransition(errors.fullname, animStyles);
    const errTransSt = useTransition(errors.street, animStyles);
    const errTransCt = useTransition(errors.city, animStyles);
    const errTransPc = useTransition(errors.postcode, animStyles);
    const errTransCr = useTransition(errors.country, animStyles);

    const AddressSearchInput = (props: any): JSX.Element => {
        return (
            <InputAdd
                placeholder={"start typing your address or postcode"}
                autoComplete="chrome-off"
                {...props}
            />
        );
    };

    return (
        data.loggedUser && (
            <Margin>
                {!inputAddress && editSubmission && (
                    <AddWrap>
                        <AddressSearch
                            locale="en_GB"
                            apiKey="WD58-CK19-KH43-AA25"
                            countries={["GB"]}
                            components={{ Input: AddressSearchInput }}
                            onSelect={(address) => {
                                reset();
                                setInputAddress(address);
                                seteditSubmission(true);
                            }}
                            inline
                            debounce={100}
                        />
                    </AddWrap>
                )}

                {data.loggedUser.addresses?.length > 0 && !editSubmission && (
                    <Addresses>
                        {data.loggedUser.addresses?.map(
                            (item: any, index: number) => (
                                <Address
                                    key={index}
                                    htmlFor={`#${index}`}
                                    className={`${activeAddress == index ? "active" : null
                                        }`}
                                >
                                    <div>
                                        <h4>Receiver: </h4>
                                        <h4 className="v">{item.fullname}</h4>
                                    </div>
                                    <div>
                                        <h4>Street: </h4>
                                        <h4 className="v">{item.street}</h4>
                                    </div>
                                    <div>
                                        <h4>Code: </h4>
                                        <h4 className="v">{item.postcode}</h4>
                                    </div>
                                    <div>
                                        <h4>City: </h4>
                                        <h4 className="v">{item.city}</h4>
                                    </div>
                                    <div>
                                        <h4>Country: </h4>
                                        <h4 className="v">{item.country}</h4>
                                    </div>
                                    <Select>
                                        <input
                                            type="radio"
                                            name="option"
                                            value={index}
                                            checked={activeAddress == index}
                                            id={`#${index}`}
                                            onChange={() => {
                                                dispatch(
                                                    setActiveAdress(index)
                                                );
                                                seteditSubmission(false);
                                                dispatch(stepRvAction());
                                            }}
                                        />
                                        <div>{`${activeAddress == index
                                                ? "SELECTED"
                                                : "CHANGE TO THIS"
                                            }`}</div>
                                    </Select>
                                </Address>
                            )
                        )}

                        {data.loggedUser &&
                            data.loggedUser.addresses?.length > 0 ? (
                            <NewAd>
                                {editSubmission ? (
                                    <button
                                        onClick={() => {
                                            seteditSubmission(false);
                                        }}
                                    >
                                        CHOOSE FROM LIST
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => {
                                            seteditSubmission(true);
                                        }}
                                    >
                                        ENTER NEW ADDRESS
                                    </button>
                                )}
                            </NewAd>
                        ) : null}
                    </Addresses>
                )}
                {/* <>
                    <button onClick={() => seteditSubmission(!editSubmission)}>
                        Change address
                    </button>
                </> 
                */}

                {inputAddress && editSubmission && (
                    <Form
                        onSubmit={handleSubmit(submitHandler)}
                        autoComplete="off"
                    >
                        <Submit type="submit">CONFIRM ADDRESS</Submit>
                        <Field>
                            <Label>NAME</Label>
                            <MdAccountCircle />
                            <Input
                                {...register("fullname")}
                                type="fullname"
                                placeholder="João Ninguém"
                                defaultValue={
                                    data.loggedUser ? data.loggedUser.name : ""
                                }
                                className={`${errors.fullname ? "invalid" : ""
                                    }`}
                            />
                        </Field>
                        <ErrorWrap>
                            {errTransNm((styles, errfullname) =>
                                errfullname ? (
                                    <Warn style={styles}>
                                        {errfullname?.message}
                                    </Warn>
                                ) : null
                            )}
                        </ErrorWrap>

                        <Field>
                            <Label>STREET</Label>
                            <MdEmail />
                            <Input
                                {...register("street")}
                                type="street"
                                placeholder="Av..."
                                defaultValue={`${inputAddress.Line1} ${inputAddress.Line2} ${inputAddress.Line3} `}
                                className={`${errors.street ? "invalid" : ""}`}
                            />
                        </Field>
                        <ErrorWrap>
                            {errTransSt((styles, errstreet) =>
                                errstreet ? (
                                    <Warn style={styles}>
                                        {errstreet?.message}
                                    </Warn>
                                ) : null
                            )}
                        </ErrorWrap>

                        <Field>
                            <Label>CITY</Label>
                            <HiLockOpen />
                            <Input
                                {...register("city")}
                                type="city"
                                placeholder="city"
                                defaultValue={`${inputAddress.City}`}
                                className={`${errors.city ? "invalid" : ""}`}
                            />
                        </Field>
                        <ErrorWrap>
                            {errTransCt((styles, errcity) =>
                                errcity ? (
                                    <Warn style={styles}>
                                        {errcity?.message}
                                    </Warn>
                                ) : null
                            )}
                        </ErrorWrap>

                        <Field>
                            <Label>ZIP CODE</Label>
                            <HiLockClosed />
                            <Input
                                {...register("postcode")}
                                type="postcode"
                                placeholder="postcode"
                                defaultValue={`${inputAddress.PostalCode}`}
                                className={`${errors.postcode ? "invalid" : ""
                                    }`}
                            />
                        </Field>
                        <ErrorWrap>
                            {errTransPc((styles, errpostcode) =>
                                errpostcode ? (
                                    <Warn style={styles}>
                                        {errpostcode?.message}
                                    </Warn>
                                ) : null
                            )}
                        </ErrorWrap>

                        <Field>
                            <label htmlFor="country">
                                <Input
                                    {...register("country")}
                                    type="country"
                                    id="country"
                                    defaultValue={`${inputAddress.CountryName}`}
                                    className={`${errors.country ? "invalid" : ""
                                        }`}
                                />
                                <Label>country</Label>
                            </label>
                        </Field>
                        <ErrorWrap>
                            {errTransCr((styles, errcountry) =>
                                errcountry ? (
                                    <Warn style={styles}>
                                        {errcountry?.message}
                                    </Warn>
                                ) : null
                            )}
                        </ErrorWrap>
                    </Form>
                )}
                {/* {inputAddress ? (
                    <button
                        onClick={() => {
                            setInputAddress(null);
                            seteditSubmission(false);
                        }}
                    >
                        reset address
                    </button>
                ) : (
                    <button
                        onClick={() => {
                            setInputAddress(mockInput);
                            seteditSubmission(true);
                        }}
                    >
                        fill address
                    </button>
                )} */}
            </Margin>
        )
    );
};

export default Shipping;

const Margin = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: 10px auto;
    padding: 10px;

    box-shadow: 1px 1px 15px hsla(240, 50%, 0%, 0.3);
    border-radius: 5px;
    background: white;

    display: flex;
    align-items: center;
    justify-content: start;
    flex-direction: column;
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

        background: hsla(34, 25%, 55%, 1);
        outline: 2px solid hsla(34, 25%, 55%, 1);
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

export const InputAdd = styled.input`
    width: 100%;
    height: 40px;
    padding: 0px 5px;
    margin: 0px auto;

    font-size: 16px;
    text-align: center;
    text-transform: uppercase;
    border: 1px solid hsla(200, 100%, 0%, 1);
    border-radius: 5px;
    background-color: hsla(0, 0%, 0%, 1);
    backdrop-filter: blur(15px);
    color: hsla(0, 0%, 80%, 1);
    box-shadow: inset 2px 2px 5px hsla(0, 0%, 0%, 0.15);

    transition: 0.5s;

    ::placeholder {
        transition: 0.3s;
        color: hsla(240, 0%, 80%, 1);
        font-size: 16px;
        font-weight: 100;
        text-align: center;
    }

    :focus {
        transition: 0.3s;
        // padding: 0px 60px;
        padding-top: 4px;
        padding-left: -35vw;

        outline: none;
        background: hsla(36, 30%, 100%, 1);
        border: 1px solid hsla(200, 100%, 50%, 1);
        color: hsla(0, 0%, 30%, 1);
        ::placeholder {
            transition: 0.3s;
            color: hsla(240, 0%, 30%, 0.2);
        }
    }
`;

const AddWrap = styled.div`
    position: relative;
    width: 100%;
    max-width: 600px;
    padding: 10px;

    ul {
        position: absolute;
        left: 0px !important;
        top: 70px !important;
        width: 100% !important;
        height: 350px;
        max-height: 70vh;
        max-height: 50vh;
        padding: 10px;
        overflow: scroll;
        z-index: 12;

        background: white !important;

        border-radius: 4px;
        box-shadow: 2px 2px 15px hsla(0, 0%, 0%, 0.3);
        list-style: none;

        li {
            padding: 5px 2px;
            margin: 0px 2px 15px;
            border-bottom: 1px solid hsla(0, 0%, 30%, 1);
            text-transform: uppercase;

            transition: 0.3s;
            :hover {
                transition: 0.05s;
                background: hsla(0, 0%, 30%, 1);
                color: white;
            }
        }
    }
`;

const Address = styled.label`
    display: block;
    max-width: 300px;
    width: 100%;
    transform: scale(1);
    z-index: 1;
    margin: 5px;
    padding: 10px;

    transition: 0.2s;
    background: hsla(280, 50%, 100%, 1);
    border-radius: 5px;
    box-shadow: 1px 1px 5px hsla(0, 0%, 0%, 0.1);
    cursor: pointer;

    display: flex;
    flex-direction: column;

    div {
        display: flex;
        h4 {
            width: 100px;
            padding: 0px 10px;
            color: hsla(206, 50%, 0%, 1);
            font-weight: 200;
            font-size: 12px;
            margin: 4px 0px;
            text-align: right;
        }
        .v {
            width: 100%;
            text-transform: uppercase;
            font-weight: 600;
            text-align: left;
        }
    }
`;
const Select = styled.div`
    margin: 0px 0px;
    padding: 10px;

    border-radius: 5px;
    background: hsla(34, 0%, 5%, 1);
    color: white;

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

const ErrorWrap = styled(animated.div)`
    position: relative;
`;
