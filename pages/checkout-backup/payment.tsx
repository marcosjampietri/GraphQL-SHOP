import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import styled from "styled-components";
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";

import { GET_LOGGED_USER_QUERY } from "../../backend/graphql/queries/logUser";
import { useQuery } from "@apollo/client";
import { useTypedSelector, AppState } from "../../store/__rootReducer";

const elemOptions = {
    style: {
        base: {
            fontSize: "18px",
            color: "#424770",
            letterSpacing: "0.025em",
            "::placeholder": {
                color: "#aab7c4",
            },
        },
        invalid: {
            color: "#9e2146",
        },
    },
};

const PaymentForm = () => {
    const router = useRouter();

    const { yourCart, itemsTotal } = useTypedSelector(
        (state: AppState) => state.cart
    );
    const { loading, error, data } = useQuery(GET_LOGGED_USER_QUERY);
    const { loggedUser } = data;

    console.log(loggedUser);

    const elements = useElements();
    const stripe = useStripe();
    const dispatch = useDispatch();

    const handleSubmit = async (ev: any) => {
        ev.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        try {
            if (loggedUser) {
                //create order
                const { data: orderId } = await axios.post("/api/order", {
                    yourCart,
                    loggedUser,
                });
                //pay
                const { data: clientSecret } = await axios.post(
                    "/api/payment",
                    {
                        orderId,
                    }
                );
                const cardElement = elements!.getElement(CardNumberElement);

                const paymentMethodReq = await stripe!.createPaymentMethod({
                    type: "card",
                    card: cardElement!,
                    billing_details: { name: "MG Costumer" },
                });
                const { error } = await stripe!.confirmCardPayment(
                    clientSecret,
                    {
                        payment_method: paymentMethodReq.paymentMethod!.id,
                    }
                );
            }
            //TODO Send Error messages
            //TODO Redirect In success
        } catch (err) {
            console.log(err);
        }
    };

    const intentingPay = false;

    return (
        <>
            <Form onSubmit={handleSubmit}>
                {intentingPay ? (
                    <Loading>
                        <h4>Connecting to your Bank...</h4>
                        <div />
                    </Loading>
                ) : null}
                <Label htmlFor="name">Full Name</Label>
                <Name
                    id="name"
                    placeholder="João Ninguém"
                    style={{ mixBlendMode: "initial" }}
                />

                <Label htmlFor="cardNumber">Card Number</Label>
                <CardNumberElementStyled
                    id="cardNumber"
                    options={elemOptions}
                />

                <div>
                    <div>
                        <Label htmlFor="expiry">Card Expiration</Label>
                        <CardExpiryElementStyled
                            id="expiry"
                            options={elemOptions}
                        />
                    </div>

                    <div>
                        <Label htmlFor="cvc">CVC</Label>
                        <CardCvcElementStyled id="cvc" options={elemOptions} />
                    </div>
                </div>

                <Button type="submit" disabled={!stripe}>
                    Pay
                </Button>
            </Form>
        </>
    );
};

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

export default PaymentForm;

const Form = styled.form`
    position: relative;
    max-width: 600px;
    margin: 10px auto;

    margin-bottom: 50px;
    padding: 20px;

    box-shadow: 1px 1px 15px hsla(240, 50%, 50%, 0.1);
    border-radius: 5px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    div {
        display: flex;
        width: 100%;

        div {
             {
                /*             margin: 0px 10px 0px 0px; */
            }
            width: 90%;
            display: flex;
            flex-direction: column;
            align-items: space-between;
        }
    }
`;

const Label = styled.label`
    padding: 24px 0px 4px 2px;

    align-self: start;
`;

const Button = styled.button`
    width: 80%;
    height: 50px;
    margin: 20px;

    background: hsla(340, 100%, 50%, 1);
    background-image: linear-gradient(
        hsla(345, 100%, 65%, 1),
        hsla(350, 100%, 40%, 1)
    );
    box-shadow: 1px -1px 4px hsla(240, 50%, 0%, 0.53);
    border-radius: 5px;
    border: none;
    color: white;
`;

const Name = styled.input`
    width: 100%;

    border: 1px solid hsla(0, 0%, 70%, 1);
    border-radius: 5px;
    padding: 5px;

    font-size: 18px;

    letterspacing: 0.025em;
    ::placeholder {
        color: #aab7c4;
    }
    :focus {
        border-color: hsla(10, 85%, 51%, 1);
    }
`;

const CardNumberElementStyled = styled(CardNumberElement)`
    width: 100%;
    border: 1px solid hsla(0, 0%, 70%, 1);
    border-radius: 5px;
    padding: 5px;

    :focus {
        color: hsla(10, 85%, 51%, 1);
    }
`;

const CardExpiryElementStyled = styled(CardExpiryElement)`
    width: 100%;
    border: 1px solid hsla(0, 0%, 70%, 1);
    border-radius: 5px;
    padding: 5px;
`;

const CardCvcElementStyled = styled(CardCvcElement)`
    width: 100%;
    border: 1px solid hsla(0, 0%, 70%, 1);
    border-radius: 5px;
    padding: 5px;
`;

const Loading = styled.span`
    position: absolute;
    width: 100%;
    height: 100%;

    background: hsla(290, 100%, 10%, 0.8);
    backdrop-filter: blur(10px);
    border-radius: 5px;

    z-index: 3;

    display: flex;
    flex-direction: column;
    place-items: center;

    h4 {
        padding: 30px 0px;
        text-align: center;
        text-transform: uppercase;
        font-size: 12px;
        color: hsla(0, 0%, 90%, 1);
    }
`;
