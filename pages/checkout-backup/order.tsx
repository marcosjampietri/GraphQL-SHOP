import React from "react";
import Image from "next/image";

import styled from "styled-components";
import { GET_LOGGED_USER_QUERY } from "../../backend/graphql/queries/logUser";
import { useQuery } from "@apollo/client";
import { useTypedSelector, AppState } from "../../store/__rootReducer";

const Order = () => {
    const { loading, error, data } = useQuery(GET_LOGGED_USER_QUERY);
    const { loggedUser } = data;
    const { yourCart, itemsTotal } = useTypedSelector(
        (state: AppState) => state.cart
    );

    const tudao: number = itemsTotal * 1.2 + 5.99;

    const activeAddress = loggedUser.addresses.length - 1;
    const deliverTo = loggedUser.addresses[activeAddress];

    if (!deliverTo) return <div></div>;

    return (
        <Section>
            <div>Order Summary</div>
            <Margin>
                <div>Purchased Items</div>
                <Basket>
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
                <div>Shipping Address</div>

                <Deliver>
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
                <div>Total due</div>

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
                        <h5>TOTALS:</h5>
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
const Section = styled.section``;
const Margin = styled.div`
    padding: 10px;
    box-shadow: 1px 1px 15px hsla(240, 50%, 50%, 0.1);
    border-radius: 5px;
    max-width: 600px;
    width: 100%;
    margin: 10px auto;
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
