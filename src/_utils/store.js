import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import rootReducer from "./rootReducer";

const persistConfig = {
  key: "root",
  storage
};

const loggerMiddleware = createLogger();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [thunkMiddleware];

if (process.env.NODE_ENV !== "production") {
  middleWares.push(loggerMiddleware);
}

const store = createStore(persistedReducer, applyMiddleware(...middleWares));
const persistor = persistStore(store);

export { store, persistor };
