import { product } from './index';

export type CartState = {
    yourCart: product[],
    itemsTotal: number,
}

export const ADD_TO_CART = 'ADD_TO_CART';

export interface AddToCartAction {
    type: typeof ADD_TO_CART;
    payload: product;
}

export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export interface RemoveFromCartAction {
    type: typeof REMOVE_FROM_CART;
    payload: string;
}

export const CLEAR_CART = 'CLEAR_CART';

export interface ClearCartAction {
    type: typeof CLEAR_CART;
    payload?: any;
}

export const ADD_QTY_ITEM = 'ADD_QTY_ITEM';

export interface AddQtyItemAction {
    type: typeof ADD_QTY_ITEM;
    payload: string;
}

export const MINUS_QTY_ITEM = 'MINUS_QTY_ITEM';

export interface MinusQtyItemAction {
    type: typeof MINUS_QTY_ITEM;
    payload: string;
}
export interface itemsTotalAction {
    type: "GET_TOTALS"
    payload: number;
}


export type CartActionType =
    | AddToCartAction
    | RemoveFromCartAction
    | ClearCartAction
    | AddQtyItemAction
    | MinusQtyItemAction
    | itemsTotalAction;
