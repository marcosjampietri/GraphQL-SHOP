import NextLink from "next/link";
import { useDispatch } from "react-redux";
import Image from "next/image";
import styled from "styled-components";
import { LIST_PRODUCT_QUERY } from "../../backend/graphql/queries/product";
import { useQuery } from "@apollo/client";
import {
    addToBasket,
    addQtyItem,
    minusQtyItem,
    getTotals,
    removeFromBasket,
} from "../../store/cart/cartActions";
import { useTypedSelector, AppState } from "../../store/__rootReducer";
import { product } from "../../types";

import { FiStar } from "react-icons/fi";
import { FaMinus, FaPlus } from "react-icons/fa";

const Cards = () => {
    const dispatch = useDispatch();

    const { loading, error, data } = useQuery(LIST_PRODUCT_QUERY);
    const productsAll = data?.listProduct.edges;

    const { yourCart } = useTypedSelector((state: AppState) => state.cart);
    const qty = (productID: string) =>
        yourCart[yourCart.findIndex((x) => x._id === productID)].quantity;

    if (loading || error) {
        return <div>LOADING...</div>;
    }

    return (
        <New id="New-Items">
            <Title>NEW ITEMS</Title>

            <Table data-test="comp-cards">
                {productsAll.map((product: product, index: number) => (
                    <ProductCard key={index}>
                        <Photo />
                        <NextLink href={`/product/${product._id}`} passHref>
                            <Image
                                src={product.image}
                                alt={product.title}
                                width={350}
                                height={400}
                                id="pic"
                                objectFit="cover"
                                objectPosition="center center"
                            />
                        </NextLink>
                        <Photo />
                        {/*                         <Tags>cat1, outras</Tags> */}
                        <Star>
                            {[...Array(5)].map((_, index) => (
                                <FiStar key={index} />
                            ))}
                        </Star>
                        <ProductName>
                            <h2>{product.title.toUpperCase()}</h2>
                        </ProductName>

                        <Price>
                            <h3>£ {product.price} </h3>
                            <h4>£ {product.price * 1.2} </h4>
                        </Price>

                        <Controls>
                            {!yourCart.find((x) => x._id === product._id) ? (
                                <Add>
                                    <button
                                        onClick={() => {
                                            dispatch(addToBasket(product));
                                            dispatch(getTotals());
                                        }}
                                    >
                                        ADD TO CART
                                    </button>
                                </Add>
                            ) : (
                                <Quantity>
                                    <Button
                                        onClick={() => {
                                            if (qty(product._id) > 1) {
                                                dispatch(
                                                    minusQtyItem(product._id)
                                                );
                                            } else {
                                                dispatch(
                                                    removeFromBasket(
                                                        product._id
                                                    )
                                                );
                                            }
                                            dispatch(getTotals(product));
                                        }}
                                    >
                                        <FaMinus />
                                    </Button>
                                    <h3>{qty(product._id)}</h3>
                                    <Button
                                        onClick={() => {
                                            dispatch(addQtyItem(product._id));
                                            dispatch(getTotals(product));
                                        }}
                                    >
                                        <FaPlus />
                                    </Button>
                                </Quantity>
                            )}
                        </Controls>
                    </ProductCard>
                ))}
            </Table>
        </New>
    );
};

export default Cards;

const New = styled.section`
    width: 100vw;
    padding: 60px 20px;
`;

const Title = styled.h1`
    width: 100%;
    max-width: 500px;
    margin: 0px auto 50px;
    padding: 20px;
    text-align: center;
    font-weight: 200;
    letter-spacing: 0.4em;
    font-size: clamp(2em, 4vw, 3em);

    color: hsla(0, 0%, 45%, 1);
    border-bottom: 1px solid hsla(0, 0%, 60%, 1);
`;

const Table = styled.div`
    max-width: 1200px;
    margin: 0px auto;

    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const ProductCard = styled.div`
    margin: 30px 3vw;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 200px;
    max-width: 250px;
`;
const Photo = styled.div`
    span {
        span img {
            cursor: pointer;
            width: 100%;
            height: 500px;
            margin: 0px auto;

            object-fit: cover;
            object-position: center center;
            border-bottom: 1px solid hsla(0, 0%, 0%, 0.1);
            border-radius: 4px;
            box-shadow: 2px 2px 10px hsla(0, 0%, 0%, 0.1);
        }
    }
`;

const ProductName = styled.div`
    margin: 0px 0px;

    h2 {
        margin: 0px 0px;
        min-height: 2em;
        font-weight: 400;
        font-size: clamp(0.8em, 1.2vw, 1em);
        color: hsla(0, 0%, 10%, 1);
    }
`;

const Price = styled.div`
    margin: 5px 0px;
    padding: 5px 0px;

    border-top: 1px solid hsla(0, 0%, 80%, 1);

    h3,
    h4 {
        padding: 0px 10px 0px 0px;
        font-size: clamp(0.8em, 1.2vw, 1em);
        font-weight: 200;
    }
    h3 {
        color: hsla(0, 90%, 0%, 1);
    }

    h4 {
        color: hsla(0, 0%, 80%, 1);
        text-decoration: line-through;
    }

    span {
        margin: 0px 5px;
    }

    display: flex;
`;

const Star = styled.div`
    position: relative;
    left: -4px;
    margin: 10px 0px 10px 0px;

    svg {
        fill: hsla(35, 100%, 50%, 1);
        stroke: none;
        font-size: 1.3em;
    }
`;
const Tags = styled.div`
    margin: 10px 0px;
    color: hsla(240, 50%, 40%, 1);
    font-size: 0.7em;
`;

const Controls = styled.div`
    width: 100%;
`;

const Add = styled.div`
    button {
        cursor: pointer;
        width: 100%;
        height: 50px;

        background-color: hsla(34, 25%, 55%, 1);
        border: 1px solid hsla(0, 0%, 100%, 1);
        border-radius: 4px;
        color: white;
        font-size: 12px;
        font-weight: 600;
    }
`;

const Quantity = styled.div`
    height: 50px;
    width: 100%;

    padding: 4px;

    border-radius: 4px;
    box-shadow: inset 1px 1px 5px hsla(0, 0%, 50%, 0.3);

    display: flex;

    align-items: center;
    justify-content: center;

    h3 {
        width: 100%;
        padding: 4px;

        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

const Button = styled.div`
    width: 100%;
    max-width: 100px;
    height: 100%;

    border-radius: 2px;
    background-color: hsla(34, 25%, 55%, 1);
    border: none;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        fill: white;
    }
`;
