import { createSlice } from "@reduxjs/toolkit";

const buttonSlice = createSlice({
    name: "button", // 👈 this key must match useSelector
    initialState: { value: false },
    reducers: {
        toggle: (state) => {
            state.value = !state.value;
        },
    },
});

export const { toggle } = buttonSlice.actions;
export default buttonSlice.reducer;
