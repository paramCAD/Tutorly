/**
 * @author Harsh Shah
 */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import httpClient from "../../../lib/httpClient";
import { sendEvent } from "../chat-area/ChatArea";
import { postMessage } from "../slice/MessageSlice";

// dispatch(addToContactList({userId1, userId2}))
export const addToContactList = createAsyncThunk("messages/add-contact", async (convo) => {
    const response =  (await httpClient.post("/conversation", convo)).data;

    if(response.id === null){
        toast.error("Conversation already exists")
    } else {
        toast.success("Request sent for connection")
    }

    return response;
});

// Integrated
export const fetchContactList = createAsyncThunk("messages/contact", async (userId) => {
    const status = [0, 1];
    return (await httpClient.get(`/conversation/user/${userId}`)).data;
});

export const fetchChats = createAsyncThunk("messages/chat", async (conversation_id) => {
    const status = [0, 1];

    return (await httpClient.get(`/messaging/${conversation_id}`)).data;
});

export const checkForNewMessage = createAsyncThunk("messages/new-chat", async (conversation_id) => {
    return (await httpClient.get(`/messaging/${conversation_id}`)).data;
});

export const sendChatMessage = createAsyncThunk("messages/post", async (payload, thunkAPI) => {
    const { message, conversation_id, sender_user_id, other_person, is_important } = payload;

    const receiver_user_id = other_person.user_id;

    const response = await httpClient.post("/messaging", {
        sender_user_id,
        receiver_user_id,
        conversation_id,
        is_important,
        message,
    });

    sendEvent("new-message", {conversation_id, receiver_user_id, sender_user_id})

    thunkAPI.dispatch(postMessage(response.data));
});


export const deleteConversation = createAsyncThunk("messages/delete-contact", async (conversation_id, thunkAPI) => {
   

    const response = await httpClient.delete("/conversation", {
        params: {
            conversation_id
        }
    });

    if(response.status){
        toast.error("Connection removed successfully")
  }

    thunkAPI.dispatch(fetchContactList(JSON.parse(localStorage.getItem("user")).id));
});
