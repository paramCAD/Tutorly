/**
 * @author Harsh Shah
 */
import { createSlice, current } from "@reduxjs/toolkit";
import { checkForNewMessage, fetchChats, fetchContactList } from "../services/messaging-rest";

const initialState = {
    contacts: {
        list: [],
        filteredList: [],
        isFetching: false,
    },
    chat: {
        list: [],
        isFetching: false,
    },
    activeChat: {
        id: null,
        person: {},
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

export const messageSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        setActiveChat: (state, action) => {
            state.activeChat.id = action.payload;
            const activeChatPerson = [...current(state.contacts.list)].find((person) => person.conversation_id === action.payload);
            state.activeChat.person = activeChatPerson ? activeChatPerson : {};
        },
        searchContact: (state, action) => {
            state.contacts.filteredList = [...current(state.contacts.list)]
                .filter((person) => new RegExp(action.payload, "gi").test(person.name))
                .map((person) => {
                    const name = person.name;
                    return { ...person, caption: highlightText(name, action.payload) };
                });
        },
        postMessage: (state, action) => {
            if (state.activeChat.id === action.payload.conversation_id) {
                state.chat.list.push(action.payload);
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchContactList.fulfilled, (state, action) => {
            state.contacts.list = action.payload;
            state.contacts.isFetching = false;
        });
        builder.addCase(fetchContactList.pending, (state) => {
            state.contacts.isFetching = true;
        });

        builder.addCase(fetchChats.fulfilled, (state, action) => {
            state.chat.list = action.payload;
            state.chat.isFetching = false;
        });
        builder.addCase(fetchChats.pending, (state) => {
            state.chat.isFetching = true;
        });

        builder.addCase(checkForNewMessage.fulfilled, (state, action) => {
            if (current(state.chat.list).length !== action.payload.length) {
                state.chat.list = action.payload;
            }
        });
    },
});

export const { setActiveChat, searchContact, postMessage } = messageSlice.actions;

export default messageSlice.reducer;
