import { guestState } from "../../types/states"

const initialState = {
    isAuthenticated: false,
    guestLoading: false,
    guestAddress: {}
};

export const guestReducer = (state: guestState = initialState, { type, payload }: any) => {
    switch (type) {

        case "LOADING_GUEST":
            return {
                ...state,
                guestLoading: true,
            };

        case "ADD_SHIPPING":
            return {
                ...state,
                guestLoading: false,
                guestAddress: payload
            };


        default:
            return state;
    }
}