/**
 * @author Harsh Shah
 */
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import SendIcon from "@mui/icons-material/Send";
import { Box, FormControl, IconButton, TextField, Typography } from "@mui/material";
import { grey, red } from "@mui/material/colors";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendEvent } from "../../../socket";
import { sendChatMessage } from "../services/messaging-rest";

const ChatEditor = () => {
    const { id: conversation_id, person: other_person } = useSelector((state) => state.messages.activeChat);
    const [message, messageHandler] = useState("");

    const [isImportant, setImportantHandler] = useState(false);
    const dispatch = useDispatch();

    const isTutor = JSON.parse(localStorage.getItem("user")).role === "tutor";

    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage(message);
    };

    const sendMessage = (message) => {
        if (message.length === 0 || message.length > 200) {
            return;
        }

        const sender_user_id = JSON.parse(localStorage.getItem("user")).id
        dispatch(sendChatMessage({ conversation_id, other_person, message, is_important: isImportant, sender_user_id }));
        messageHandler("");
    };

    return (
        <form style={{ width: "100%" }} onSubmit={handleSubmit}>
            <FormControl sx={{ width: "100%" }}>
                <TextField
                    fullWidth
                    error={message.length > 200 ? true : false}
                    id="chat-message-editor"
                    placeholder="Type your message here"
                    label="Message"
                    variant="outlined"
                    onChange={(e) => messageHandler(e.target.value)}
                    value={message}
                    helperText={
                        <Box component={"span"} display={"flex"} justifyContent={"space-between"}>
                            <Typography variant="span">{message.length > 200 ? "Maximum length of message is 200 characters" : ""}</Typography>
                            <Typography variant="span">{message.length + "/200"}</Typography>
                        </Box>
                    }
                    InputProps={{
                        startAdornment: (
                            <>
                                {isTutor && (
                                    <IconButton aria-label="important" onClick={() => setImportantHandler((state) => !state)} sx={{ color: isImportant ? red[700] : grey[500] }}>
                                        <PriorityHighIcon />
                                    </IconButton>
                                )}
                            </>
                        ),
                        endAdornment: (
                            <IconButton onClick={() => sendMessage(message)}>
                                <SendIcon />
                            </IconButton>
                        ),
                    }}
                />
            </FormControl>
        </form>
    );
};

export default ChatEditor;
