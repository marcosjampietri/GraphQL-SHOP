import { useDispatch } from "react-redux";
import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";

import { READ_PRODUCT_QUERY } from "../../backend/graphql/queries/product";
import { useQuery } from "@apollo/client";
{
    /* import { addToBasket } from "../../"; */
}

const Product = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { id } = router.query;

    const { loading, error, data } = useQuery(READ_PRODUCT_QUERY, {
        variables: { id },
    });
    const product = data?.readProduct;

    console.log(data);

    if (!product || loading) {
        return (
            <Page>
                <h1>Looking for this product</h1>
            </Page>
        );
    }

    return (
        product && (
            <Page>
                <Margin>
                    <Description>
                        <Photo>
                            <Image
                                src={product.image}
                                alt={product.title}
                                width={100}
                                height={100}
                            />
                        </Photo>
                        <Text>
                            <Name>
                                <h2>{product.title.toUpperCase()}</h2>
                            </Name>
                            <h6>
                                Lorem ipsum dolor sit amet, consectetur
                                consectetur adipis Lorem ipsum dolor sit amet,
                                adipis Lorem ipsum dolor sit amet, consectetur
                                adipis
                            </h6>

                            <h3>£ {product.price}</h3>
                            <div></div>
                            <Add
                                onClick={() => {
                                    {
                                        /*                                     dispatch(addToBasket(product)); */
                                    }
                                    router.push("/cart");
                                }}
                            >
                                <button>ADD TO CART</button>
                            </Add>
                        </Text>
                    </Description>
                </Margin>
            </Page>
        )
    );
};

export default Product;

const Page = styled.div`
    margin: 20px auto;
    padding-bottom: 30px;
    border-bottom: 1px solid hsla(0, 0%, 50%, 0.1);
`;

const Margin = styled.div`
    width: 100%;
    margin: 20px auto;
    max-width: 1000px;
`;

const Description = styled.div`
    margin: 20px auto;

    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`;

const FlexBox = styled.div`
    flex: 1 1 200px;

    height: 50vw;
    max-height: 300px;

    margin: 10px 20px;
`;

const Text = styled(FlexBox)`
    max-width: 300px;

    h4,
    h5,
    h6 {
        letter-spacing: initial;
        line-height: 1.2;
        etter-spacing: 0.05em;
    }

    h4 {
        padding: 6px;
        font-weight: 600;
        font-size: 0.8em;
        color: hsla(0, 0%, 40%, 1);
    }
    h5 {
        padding: 6px;
        margin-bottom: 10px;
        font-weight: 200;
        font-size: 0.8em;
        color: hsla(0, 0%, 40%, 1);
    }
    h6 {
        margin: 0px 0px;
        padding: 16px 0px;
        margin-bottom: 10px;
        font-weight: 200;
        font-size: 0.8em;
        color: hsla(0, 0%, 40%, 1);
        font-style: italic;
    }
`;

const Photo = styled(FlexBox)`
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center center;
        border: 2px solid hsla(0, 0%, 0%, 0.1);
    }
`;

const Add = styled.div`
    button {
        width: 150px;
        height: 50px;
        margin: 20px 0px 20px -10px;

        background-color: hsla(280, 90%, 25%, 1);
        border: 1px solid hsla(0, 0%, 100%, 1);
        border-radius: 50px;
        color: white;
        font-size: 12px;
        font-weight: 600;
    }
`;
const Name = styled.div`
    position: relative;
    height: 56px;

    h2 {
        font-size: 26px;
        font-weight: 600;
    }

    :after {
        content: "";
        position: absolute;
        bottom: 0px;
        width: 100px;
        height: 4px;
        background-color: hsla(280, 90%, 25%, 1);
    }
`;
