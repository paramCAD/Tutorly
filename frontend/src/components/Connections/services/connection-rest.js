/**
 * @author Harsh Shah
 */
import { createAsyncThunk } from "@reduxjs/toolkit";
import httpClient from "../../../lib/httpClient";

export const getPendingConversationRequest = createAsyncThunk("connection/request", async (user_id) => {
    return (
        await httpClient.get(`/conversation/user/request`, {
            params: { user_id: user_id },
        })
    ).data;
});

export const actionOnConversationRequest = createAsyncThunk("connection/response", async (details, thunkAPI) => {
    const response = (await httpClient.post(`/conversation/user/request`, details)).data;

    thunkAPI.dispatch(getPendingConversationRequest(JSON.parse(localStorage.getItem("user")).id));
    return response;
});
