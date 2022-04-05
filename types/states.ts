import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

import { product } from "./index";


export interface navState {
    NavOn: boolean;
    ModOn: boolean;
}
export interface guestState {
    isAuthenticated: boolean,
    guestLoading: boolean,
    guestAddress: object | null,
}

export interface storeType {
    product: product;
}

export interface typingActionTP {
    obj: { type: "TOGGLE_NAV", payload: string };
}

export interface navActionTP {
    obj: { type: "TOGGLE_NAV" };
}

export type allActions = navActionTP | typingActionTP;

export type actionCreator<allActions extends Action> = (arg?: any, arg2?: any) => ThunkAction<
    void,
    storeType,
    {},
    allActions
>;