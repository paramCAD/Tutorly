/**
 * @author Harsh Shah
 */
import { createSlice, current } from "@reduxjs/toolkit";
import { getPendingConversationRequest } from "../services/connection-rest";

const initialState = {
    requests: {
        list: [],
        filteredList: [],
        isFetching: false,
    },
};

const highlightText = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    highlight = highlight.toLowerCase();

    return (
        <span>
            {parts.map((part, i) => (
                <span key={i} style={part.toLowerCase() === highlight ? { fontWeight: "bold" } : {}}>
                    {part}
                </span>
            ))}
        </span>
    );
};

export const connectionsSlice = createSlice({
    name: "connections",
    initialState,
    reducers: {
        searchRequest: (state, action) => {
            state.requests.filteredList = [...current(state.requests.list)]
                .filter((person) => new RegExp(action.payload, "gi").test(person.name))
                .map((person) => {
                    const name = person.name;
                    return { ...person, caption: highlightText(name, action.payload) };
                });
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getPendingConversationRequest.fulfilled, (state, action) => {
            state.requests.list = action.payload;
            state.requests.isFetching = false;
        });
        builder.addCase(getPendingConversationRequest.pending, (state) => {
            state.requests.isFetching = true;
        });
    },
});

export const { searchRequest } = connectionsSlice.actions;

export default connectionsSlice.reducer;
