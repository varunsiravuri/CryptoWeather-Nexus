import { configureStore } from "@reduxjs/toolkit";
import userPreferencesReducer from "./slices/userPreferencesSlice";
import dataReducer from "./slices/dataSlice";
import cryptoReducer from "./crytpoSlice"; // Import the crypto reducer (note the typo in filename)

export const store = configureStore({
    reducer: {
        userPreferences: userPreferencesReducer,
        data: dataReducer,
        crypto: cryptoReducer, // Add the crypto reducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
