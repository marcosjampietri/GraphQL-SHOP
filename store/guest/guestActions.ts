import { actionCreator } from "../../types/states";

export const addressAction: actionCreator<any> = (address: object) => async (
    dispatch: Function,
    getState: Function
) => {
    dispatch({
        type: "LOADING_GUEST",
    });

    dispatch({
        type: "ADD_SHIPPING",
        payload: address,
    });



};