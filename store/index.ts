import { useMemo } from "react";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./__rootReducer";
import { persistStore } from "redux-persist";

let store: any;

const initStore = (initialState: any) => {
    const isClient = typeof window !== "undefined";

    if (isClient) {
        const { persistReducer } = require("redux-persist");
        const storage = require("redux-persist/lib/storage").default;

        const persistConfig = {
            key: "root",
            storage,
        };

        store = createStore(
            persistReducer(persistConfig, rootReducer),
            initialState,
            composeWithDevTools(applyMiddleware(thunkMiddleware))
        );

        store.__PERSISTOR = persistStore(store);
    } else {
        store = createStore(
            rootReducer,
            initialState,
            composeWithDevTools(applyMiddleware(thunkMiddleware))
        );
    }

    return store;
};

export const initializeStore = (preloadedState: any) => {
    let _store = store ?? initStore(preloadedState);

    // After navigating to a page with an initial Redux state, merge that state
    // with the current state in the store, and create a new store
    if (preloadedState && store) {
        _store = initStore({
            ...store.getState(),
            ...preloadedState,
        });
        // Reset the current store
        store = undefined;
    }

    // For SSG and SSR always create a new store
    if (typeof window === "undefined") return _store;
    // Create the store once in the client
    if (!store) store = _store;

    return _store;
};

export const useStore = (initialState: any) => {
    const store = useMemo(() => initializeStore(initialState), [initialState]);

    return store;
};