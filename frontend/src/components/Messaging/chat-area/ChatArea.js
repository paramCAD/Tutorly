/**
 * @author Harsh Shah
 */
import ChatIcon from "@mui/icons-material/Chat";
import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../widgets/Loader";
import { checkForNewMessage, fetchChats } from "../services/messaging-rest";
import ChatEditor from "./ChatEditor";
import ChatHeader from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import io from "socket.io-client";
const socket = io(process.env.REACT_APP_DOMAIN, {}).connect();

export const sendEvent = async (name, data) => {
    socket.emit(name, data);
};

const ChatArea = () => {
    const { isFetching, list } = useSelector((state) => state.messages.chat);
    const activeChat = useSelector((state) => state.messages.activeChat);
    const isActiveChatSelected = activeChat.id != null;

    const dispatch = useDispatch();

    useEffect(() => {
        if (activeChat.id) {
            dispatch(fetchChats(activeChat.id));
        }
    }, [dispatch, activeChat.id]);

    // useEffect(() => {
    //     let id = setInterval(() => {
    //         if (activeChat.id) {
    //             dispatch(checkForNewMessage(activeChat.id));
    //         }
    //     }, 2000);
    //     return () => clearInterval(id);
    // }, [dispatch, activeChat.id]);

    socket.on("NEW_MESSAGE", (data) => {
        console.log(data);
        const { conversation_id, receiver_user_id, sender_user_id } = data;
        const user_id = JSON.parse(localStorage.getItem("user")).id;
    
        if (receiver_user_id !== user_id) {
            return;
        }
    
        if (activeChat.id !== conversation_id) {
            return;
        }
    
        dispatch(checkForNewMessage(conversation_id))
    });
    

    return (
        <Grid sx={{ height: "100%" }} container>
            {isActiveChatSelected ? (
                <>
                    <Grid
                        sx={{
                            height: "10%",
                            width: "100%",
                            boxShadow: 3,
                            borderRadius: "10px",
                        }}
                        item
                        md={12}
                    >
                        <ChatHeader person={activeChat.person} />
                    </Grid>
                    <Grid sx={{ height: "78%", maxHeight: "80%", width: "100%" }} item md={12}>
                        {isFetching ? <Loader /> : <ChatMessages messages={list} />}
                    </Grid>
                    <Grid sx={{ height: "12%", width: "100%" }} item md={12}>
                        <Box sx={{ width: "initial" }}>
                            <ChatEditor />
                        </Box>
                    </Grid>
                </>
            ) : (
                <Box display={"flex"} flexDirection={"column"} width={"100%"} justifyContent={"center"} alignItems={"center"}>
                    <ChatIcon sx={{ fontSize: "8rem", mb: "2rem" }} />
                    <Typography variant={"h4"}> No Conversation Selected </Typography>
                </Box>
            )}
        </Grid>
    );
};

export default ChatArea;
