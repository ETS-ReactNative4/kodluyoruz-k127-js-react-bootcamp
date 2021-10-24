import { configureStore } from "@reduxjs/toolkit";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { combineReducers } from "redux";
import reducers from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

export default function createStore(history) {
  const persistConfig = {
    key: "twitter-app",
    storage,
    blacklist: ["router"],
  };

  const rootReducer = combineReducers({
    router: connectRouter(history),
    ...reducers,
  });

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const middleware = [routerMiddleware(history), thunk];

  const store = configureStore({
    reducer: persistedReducer,
    middleware: middleware,
  });

  const persistor = persistStore(store);

  return { store, persistor };
}
