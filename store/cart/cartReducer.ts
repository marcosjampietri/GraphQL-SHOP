import {
    CartState,
    CartActionType,
} from "./types";

import { product } from "../../types";

const initialState: CartState = {
    yourCart: [],
    itemsTotal: 0,
    activeAddress: 0
}

export const cartReducer = (
    state: CartState = initialState,
    { type, payload }: CartActionType
): CartState => {

    switch (type) {
        case "ADD_TO_CART":
            return {
                ...state, yourCart: state.yourCart.some((product: product) => product._id === payload._id)
                    ? [...state.yourCart]
                    : [...state.yourCart, {
                        ...payload, quantity: 1, itemTotal: payload.price
                    }],
            }
        case "GET_TOTALS":
            return {
                ...state, itemsTotal: payload
            }

        case "REMOVE_FROM_CART":
            return { ...state, yourCart: state.yourCart.filter((product: product) => product._id !== payload) }

        case "CLEAR_CART":
            return initialState;

        case "ADD_QTY_ITEM":
            return {
                ...state, yourCart: state.yourCart.map((product: product) => {
                    if (product._id === payload) {
                        return {
                            ...product,
                            quantity: product.quantity + 1,
                            itemTotal: (product.quantity + 1) * product.price
                        };
                    }
                    return product;
                })
            };

        case "MINUS_QTY_ITEM":
            return {
                ...state, yourCart: state.yourCart.map((product: product) => {
                    if (product.quantity > 0) {
                        if (product._id === payload) {
                            return {
                                ...product,
                                quantity: product.quantity - 1,
                                itemTotal: (product.quantity - 1) * product.price
                            };
                        }
                    } else {
                        state.yourCart.filter((product: product) => product._id !== payload);
                    }
                    return product;
                })
            };

        case "SET_ADDRESS":
            return {
                ...state,
                activeAddress: payload
            }
        default:
            return state;
    }
};
