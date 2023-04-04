/**
 * @author Harsh Shah
 */
import { faker } from "@faker-js/faker";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import httpClient from "../../../lib/httpClient";

export const createCourseDiscussion = createAsyncThunk("discussion/create", async (course_id) => {
    return (
        await httpClient.post("/forum", {
            course_id,
        })
    ).data;
});

export const fetchCourseList = createAsyncThunk("discussion/courses", async (user_id) => {
    const forums = (
        await httpClient.get("/forum", {
            params: { user_id },
        })
    ).data;

    return forums.map((f) => {
        const { _id: id, course_id: course } = f;
        const { _id: course_id, name, description: rawDescription, imageURL: picture } = course;
        const words = rawDescription.split(" ");
        const limit = 40;
        const description = words.length > limit ? words.slice(0, limit).join(" ") + " ..." : rawDescription;
        return {
            id,
            course_id,
            name,
            description,
            picture,
        };
    });
});

export const fetchForumPost = createAsyncThunk("discussion/forum", async (forum_id) => {
    return (await httpClient.get(`/forum/posts/${forum_id}`)).data;
});

export const createForumPost = createAsyncThunk("discussion/forum-post", async (details, thunkAPI) => {
    const response = (await httpClient.post("/forum/posts", details)).data;
    toast.success("Post added successful");

    thunkAPI.dispatch(fetchForumPost(details.forum_id));
    return response;
});

export const fetchPostDetails = createAsyncThunk("discussion/post", async (post_id) => {

    return (await httpClient.get(`/forum/post/details/${post_id}`))
});


export const createPostResponse = createAsyncThunk("discussion/forum-post-response", async (details, thunkAPI) => {
    const response = (await httpClient.post("/forum/post/response ", details)).data;
    toast.success("Response to the post added successful");

    thunkAPI.dispatch(fetchPostDetails(details.post_id));
    return response;
});


export const updateForumPost = createAsyncThunk("discussion/forum-post", async (details, thunkAPI) => {
    const response = (await httpClient.put("/forum/posts", details)).data;
    toast.success("Updated the post successful");

    thunkAPI.dispatch(fetchPostDetails(details.post_id));
    return response;
});

export const updatePostResponseOfForum = createAsyncThunk("discussion/forum-post-response-status", async (details, thunkAPI) => {
    const response = (await httpClient.put("/forum/post/response", details)).data;
    toast.success("Updated post response status successful");

    thunkAPI.dispatch(fetchPostDetails(details.post_id));
    return response;
});