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
import AddressSearch from "react-loqate";
import { useAddAddress } from "../../backend/graphql/queries/logUser";
import { AppState, useTypedSelector } from "../../store/__rootReducer";
import { addressAction } from "../../store/guest/guestActions";

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
    const { loggedUser } = data;

    const [editAddress, seteditAddress] = useState(false);
    const [inputAddress, setInputAddress] = useState<inputAddressType | null>();

    const { addAddress } = useAddAddress();

    const { guestLoading, guestAddress } = useTypedSelector(
        (state: AppState) => state.guest
    );

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm<Inputs>();

    const submitHandler: SubmitHandler<Inputs> = async (userAddress) => {
        try {
            dispatch(addressAction(userAddress));

            seteditAddress(false);

            router.push(`/guestcheckout`);
        } catch (err) {
            alert("something wrong is not right");
        }
    };

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
        <Margin>
            {!inputAddress && (
                <AddWrap>
                    <AddressSearch
                        locale="en_GB"
                        apiKey="UY35-YP55-CP12-NB95"
                        countries={["GB"]}
                        components={{ Input: AddressSearchInput }}
                        onSelect={(address) => {
                            reset();
                            setInputAddress(address);
                            seteditAddress(true);
                        }}
                        inline
                        debounce={100}
                    />
                </AddWrap>
            )}

            <Addresses>
                {inputAddress && !editAddress && guestAddress && (
                    <Address>
                        <h4>Receiver: {guestAddress.fullname}</h4>
                        <h4>Street: ....{guestAddress.street}</h4>
                        <h4>Code: .....{guestAddress.postcode}</h4>
                        <h4>City: ......{guestAddress.city}</h4>
                        <h4>Country: .{guestAddress.country}</h4>
                        <Select>
                            <input type="radio" name="option" />
                        </Select>
                    </Address>
                )}
                <>
                    <button onClick={() => seteditAddress(!editAddress)}>
                        Change address
                    </button>
                    <button onClick={() => setInputAddress(null)}>
                        Delete address
                    </button>
                </>
            </Addresses>

            {inputAddress && editAddress && (
                <Wrap>
                    <FormA
                        onSubmit={handleSubmit(submitHandler)}
                        autoComplete="off"
                    >
                        <div style={{ color: "white" }}>
                            ENTER YOUR SHIPPING DETAILS
                        </div>
                        {/* <Field>
                            <Label>FULL NAME</Label>
                            <MdAccountCircle />

                            <Input
                                {...register("fullname")}
                                type="fullname"
                                placeholder="João Ninguém de Jesus"
                                defaultValue=""
                                className={`${errors.fullname ? "-is-invalid" : ""
                                    }`}
                            />
                            <Warn>{errors.fullname?.message}</Warn>
                        </Field> */}

                        <Field>
                            <Label>STREET</Label>
                            <MdEmail />
                            <Input
                                {...register("street")}
                                type="street"
                                placeholder="Av..."
                                defaultValue={`${inputAddress.Line1} ${inputAddress.Line2} ${inputAddress.Line3} `}
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
                                defaultValue={`${inputAddress.City}`}
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
                                defaultValue={`${inputAddress.PostalCode}`}
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
                                    defaultValue={`${inputAddress.CountryName}`}
                                    className={`form-check-input ${errors.country ? "is-invalid" : ""
                                        }`}
                                />
                                <Label>country</Label>
                                <Warn>{errors.country?.message}</Warn>
                            </label>
                        </Field>
                        <Submit> CONFIRM SHIPPING</Submit>
                        {/*                         <Submit type="submit"> CONFIRM SHIPPING</Submit> */}
                    </FormA>
                </Wrap>
            )}
        </Margin>
    );
};

export default Shipping;

const Margin = styled.div`
    margin: 10px auto;
    padding: 10px;
    padding-top: 80px;
    width: 100%;
    max-width: 600px;

    box-shadow: 1px 1px 15px hsla(240, 50%, 50%, 0.1);
    border-radius: 5px;

    display: flex;
    align-items: center;
    justify-content: start;
    flex-direction: column;
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

const FormA = styled(Form)`
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

export const InputAdd = styled.input`
    width: 100%;
    height: 40px;
    padding: 0px 5px;
    margin: 0px auto;

    font-size: 16px;
    text-align: center;
    text-transform: uppercase;
    border: 1px solid hsla(200, 100%, 25%, 0.3);
    border-radius: 10px;
    background-color: hsla(0, 0%, 100%, 0.5);
    backdrop-filter: blur(15px);
    color: hsla(0, 0%, 10%, 1);
    box-shadow: inset 2px 2px 5px hsla(0, 0%, 0%, 0.15);

    transition: 0.5s;

    ::placeholder {
        transition: 0.3s;
        color: hsla(240, 0%, 60%, 1);
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
        background: hsla(36, 30%, 50%, 1);
        color: hsla(0, 0%, 100%, 1);
        ::placeholder {
            transition: 0.3s;
            color: hsla(240, 0%, 100%, 0.2);
        }
    }
`;

const AddWrap = styled.div`
    position: relative;
    width: 100%;
    height: 50px;

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
