import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";
import discussionReducer from "../components/Discussion/slice/DiscussionSlice";
import messageReducer from "../components/Messaging/slice/MessageSlice";
import appReducer from "./slice/appSlice";
import courseReducer from "../views/pages/slice/courseSlice";
import tutorReducer from "../views/pages/slice/tutorSlice";
import connectionsReducer from "../components/Connections/slice/connectionsSlice";

export const store = configureStore({
  reducer: {
    messages: messageReducer,
    discussion: discussionReducer,
    app: appReducer,
    course: courseReducer,
    tutor: tutorReducer,
    connections: connectionsReducer
  },
  middleware: [thunk, logger],
});

export const currentState = store.getState();

export const dispatch = store.dispatch