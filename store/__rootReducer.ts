import { combineReducers } from "redux";
import { useSelector, TypedUseSelectorHook } from "react-redux";

import { modalReducer } from "./modal/modalReducer";
import { cartReducer } from "./cart/cartReducer";
import { toggleReducer } from "./toggle/toggleReducer";
import { guestReducer } from "./guest/guestReducer";
import { stepperReducer } from "./stepper/stepperReducer";


const rootReducer = combineReducers({
    mod: modalReducer,
    cart: cartReducer,
    tog: toggleReducer,
    guest: guestReducer,
    step: stepperReducer

});

export type AppState = ReturnType<typeof rootReducer>;

export const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector;

export default rootReducer;