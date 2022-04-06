import { product } from "../../types";
import { actionCreator } from "../../types/states";

import {
    AddToCartAction,
    RemoveFromCartAction,
    ClearCartAction,
    AddQtyItemAction,
    MinusQtyItemAction,
} from "../../types/cart";



export const addToBasket = (product: product): AddToCartAction => ({
    type: "ADD_TO_CART",
    payload: product,
});

export const removeFromBasket = (_id: string): RemoveFromCartAction => ({
    type: "REMOVE_FROM_CART",
    payload: _id,
});

export const clearCart = (): ClearCartAction => ({
    type: "CLEAR_CART",
});

export const addQtyItem = (_id: string): AddQtyItemAction => ({
    type: "ADD_QTY_ITEM",
    payload: _id,
});

export const minusQtyItem = (_id: string): MinusQtyItemAction => ({
    type: "MINUS_QTY_ITEM",
    payload: _id,
});


export const getTotals: actionCreator<any> = () => async (
    dispatch: Function,
    getState: Function
) => {

    const itemsTotal = getState().cart.yourCart
        .map((product: product): number => product.price * product.quantity)
        .reduce((a: any, b: any) => a + b, 0)
        .toFixed(2)

    console.log(itemsTotal)

    dispatch({
        type: "GET_TOTALS",
        payload: itemsTotal,
    })
};


export const setActiveAdress: actionCreator<any> = (index) => async (
    dispatch: Function,
    getState: Function
) => {

    dispatch({
        type: "SET_ADDRESS",
        payload: index,
    })
};