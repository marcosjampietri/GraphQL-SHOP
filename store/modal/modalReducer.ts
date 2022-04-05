interface modState {
    ModOn: boolean;
    AllowMod: boolean;
}

const initState = {
    ModOn: false,
    AllowMod: true,
};

export const modalReducer = (state: modState = initState, { type, payload }: any) => {
    switch (type) {
        case "TOGGLE_MOD_ON":
            return {
                ...state,
                ModOn: true,

            };
        case "TOGGLE_MOD_OFF":
            return {
                ...state,
                ModOn: false,
                AllowMod: false,
            };
        default:
            return {
                ...state,
            };
    }
};
