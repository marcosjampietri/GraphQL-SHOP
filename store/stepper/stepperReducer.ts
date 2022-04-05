interface stepState {
    Step: number;
}

const initState = {
    Step: 0
};

export const stepperReducer = (state: stepState = initState, { type, payload }: any) => {
    switch (type) {
        case "SET_STEP_SH":
            return {
                ...state,
                Step: 0,
            };

        case "SET_STEP_RV":
            return {
                ...state,
                Step: 1,
            };

        case "SET_STEP_PAY":
            return {
                ...state,
                Step: 2,
            };

        default:
            return {
                ...state,
            };
    }
};
