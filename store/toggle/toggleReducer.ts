interface cartState {
    CartOn: boolean;
    NavOn: boolean;
}

const initState = {
    CartOn: false,
    NavOn: false,
};

export const toggleReducer = (state: cartState = initState, { type, payload }: any) => {
    switch (type) {
        case "TOGGLE_CART_ON":
            return {
                ...state,
                CartOn: true,
            };
        case "TOGGLE_CART_OFF":
            return {
                ...state,
                CartOn: false,
            };
        case "TOGGLE_NAV_ON":
            return {
                ...state,
                NavOn: true,
            };
        case "TOGGLE_NAV_OFF":
            return {
                ...state,
                NavOn: false,
            };
        default:
            return {
                ...state,
            };
    }
};
