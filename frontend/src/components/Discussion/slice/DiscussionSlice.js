/**
 * @author Harsh Shah
 */
import { faker } from "@faker-js/faker";
import { createSlice, current } from "@reduxjs/toolkit";
import { fetchCourseList, fetchForumPost, fetchPostDetails } from "../services/discussion-rest";

const initialState = {
    courses: {
        list: [],
        filteredList: [],
        isFetching: false,
    },
    posts: {
        list: [],
        filteredList: [],
        isFetching: false,
    },
    postDetails: {
        id: null,
        details: {},
        responses: [],
        isFetching: false,
    },
    activeCourse: {
        id: null,
        details: {},
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

export const discussionSlice = createSlice({
    name: "discussion",
    initialState,
    reducers: {
        setActiveCourse: (state, action) => {
            state.activeCourse.id = action.payload;
        },
        searchCourses: (state, action) => {
            state.courses.filteredList = [...current(state.courses.list)]
                .filter((person) => new RegExp(action.payload, "gi").test(person.name))
                .map((person) => {
                    const name = person.name;
                    return { ...person, caption: highlightText(name, action.payload) };
                });
        },
        postMessage: (state, action) => {
            state.chat.list.push({
                id: faker.datatype.uuid(),
                sender: 1,
                message: action.payload,
                timestamp: new Date().toLocaleString(),
            });
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCourseList.fulfilled, (state, action) => {
            state.courses.list = action.payload;
            state.courses.isFetching = false;
        });
        builder.addCase(fetchCourseList.pending, (state) => {
            state.courses.isFetching = true;
        });

        builder.addCase(fetchForumPost.fulfilled, (state, action) => {
            state.posts.list = action.payload;
            state.posts.isFetching = false;
        });
        builder.addCase(fetchForumPost.pending, (state) => {
            state.posts.isFetching = true;
        });

        builder.addCase(fetchPostDetails.fulfilled, (state, action) => {
            state.postDetails.details = action.payload.data;
            state.postDetails.responses = action.payload.data.responses || [];
            state.postDetails.isFetching = false;
        });
        builder.addCase(fetchPostDetails.pending, (state) => {
            state.postDetails.isFetching = true;
        });
    },
});

export const { setActiveCourse, postMessage, searchCourses } = discussionSlice.actions;

export default discussionSlice.reducer;
