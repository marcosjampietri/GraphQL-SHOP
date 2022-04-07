import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import { GET_LOGGED_USER_QUERY } from "../../backend/graphql/queries/logUser";
import { useQuery } from "@apollo/client";
import { useTypedSelector, AppState } from "../../store/__rootReducer";
import {
    stepShAction,
    stepRvAction,
    stepPayAction,
} from "../../store/stepper/stepperActions";
import { BsPencilSquare } from "react-icons/bs";

const Order = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const { loading, error, data } = useQuery(GET_LOGGED_USER_QUERY);
    useEffect(() => {
        console.log(data);
    }, [data]);
    const { yourCart, itemsTotal } = useTypedSelector(
        (state: AppState) => state.cart
    );
    const { Step } = useTypedSelector((state: AppState) => state.step);

    const tudao: number = itemsTotal * 1.2 + 1 * 5.99;

    const { activeAddress } = useTypedSelector((state: AppState) => state.cart);
    const deliverTo = data.loggedUser?.addresses[activeAddress];

    return (
        <Section>
            <Margin>
                <Button onClick={() => dispatch(stepPayAction())}>
                    PROCEED TO PAYMENT
                </Button>
                <Basket>
                    <Row>
                        <div>Purchased Items</div>

                        <ButtonA onClick={() => router.push("/cart")}>
                            <div>Change Items</div>
                            <BsPencilSquare />
                        </ButtonA>
                    </Row>
                    <ListOfProducts>
                        {yourCart.map((product: any, index: any) => (
                            <ProductOnOrder key={index}>
                                <h6 className="tt">{product.title}</h6>
                                <div className="pr">£{product.price}</div>
                                <div className="x"> X {product.quantity}</div>
                                <div className="ff">£{product.itemTotal}</div>
                            </ProductOnOrder>
                        ))}
                    </ListOfProducts>
                    <Row>
                        <div>Items Totals:</div>
                        <div>£{itemsTotal}</div>
                    </Row>
                </Basket>

                {deliverTo && (
                    <>
                        <Deliver>
                            <Row>
                                <div>Shipping Address</div>
                                <ButtonA
                                    onClick={() => dispatch(stepShAction())}
                                >
                                    <div>Change Address</div>
                                    <BsPencilSquare />
                                </ButtonA>
                            </Row>
                            <Row>
                                <h6>Receiver: </h6>
                                <h6>{deliverTo.fullname}</h6>
                            </Row>
                            <Row>
                                <h6>Street: </h6>
                                <h6>{deliverTo.street}</h6>
                            </Row>
                            <Row>
                                <h6>Code: </h6>
                                <h6>{deliverTo.postcode}</h6>
                            </Row>
                            <Row>
                                <h6>City: </h6>
                                <h6>{deliverTo.city}</h6>
                            </Row>
                            <Row>
                                <h6>Country: </h6>
                                <h6>{deliverTo.country}</h6>
                            </Row>
                        </Deliver>
                    </>
                )}

                <Totals>
                    <Row>
                        <div>Items Totals:</div>
                        <div>£{itemsTotal}</div>
                    </Row>
                    <Row>
                        <div>Shipping</div>
                        <div>£5.99</div>
                    </Row>
                    <Row>
                        <div>Tax</div>
                        <div>£{itemsTotal * 0.2}</div>
                    </Row>
                    <Row>
                        <h5>TOTAL DUE:</h5>
                        <h5>£{tudao}</h5>
                    </Row>
                </Totals>
            </Margin>
        </Section>
    );
};

export default Order;

const Box = styled.div`
    max-width: 600px;
    width: 100%;
    margin: 10px auto;
    // margin-top: 50px;
    // margin-bottom: 50px;
    padding: 10px;
    border: 1px solid hsla(0, 0%, 0%, 0.05);
    // box-shadow: 1px 1px 15px hsla(240, 50%, 50%, 0.1);
    // border-radius: 5px;
`;
const Center = styled.div`
    width: 100%;
    max-width: 600px;
    margin: 10px auto;
`;
const Section = styled.section``;

const Margin = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: 10px auto;
    padding: 10px;

    box-shadow: 1px 1px 15px hsla(240, 50%, 0%, 0.3);
    border-radius: 5px;
    background: white;
`;

const Button = styled.button`
    width: 100%;
    max-width: 600px;
    height: 35px;
    margin: 10px auto;

    background: hsla(340, 100%, 50%, 1);
    color: white;

    display: flex;
    justify-content: space-around;
    align-items: center;
`;

const ButtonA = styled(Button)`
    width: 50%;
    background: hsla(340, 0%, 50%, 1);
`;

const Basket = styled(Box)``;
const Deliver = styled(Box)`
    // max-width: 300px;
`;

const ListOfProducts = styled.div`
    margin: 0px auto;
    width: 100%;
`;

const ProductOnOrder = styled.div`
    margin: 4px 0px;
    width: 100%;
    height: 30px;

    border-bottom: 1px solid hsla(0, 0%, 83%, 1);

    display: flex;
    align-items: center;
    justify-content: space-between;

    .tt {
        width: 50%;
        min-width: 100px;
        margin: 0px;
    }
    .pr {
        width: 70px;
    }
    .x {
        width: 50px;
    }
    .ff {
        width: 30%;
        min-width: 50px;
        text-align: end;
    }
`;

const Totals = styled.div`
    width: 100%;
    max-width: 620px;
    margin: 0px auto;

    border-top: 2px solid red;
`;

const Row = styled.div`
    margin: 10px 0px;

    display: flex;
    justify-content: space-between;

    h5 {
        font-weight: bold;
        font-size: 16px;
        margin: 0px;
    }
`;
