/**
 * @author Harsh Shah
 */
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { grey, red } from "@mui/material/colors";
import { useEffect, useRef } from "react";
import { theme } from "../../../theme/theme";

export const ChatMessages = ({ messages }) => {
    const logged_in_user = JSON.parse(localStorage.getItem("user")).id;

    const isScrollNotAtBottom = (element) => {
        return element ? element.scrollHeight - Math.round(element.scrollTop) !== element.clientHeight : false;
    };

    const scrollToBottom = (element, smoothly = false) => {
        element.scrollTo({
            top: element.scrollHeight,
            behavior: smoothly ? "smooth" : "auto",
        });
    };

    useEffect(() => {
        if (!messageContainer.current) {
            return;
        }

        if (isScrollNotAtBottom(messageContainer.current)) {
            scrollToBottom(messageContainer.current, true);
        }
    }, [messages]);

    const messageContainer = useRef(null);

    return (
        <Box
            ref={messageContainer}
            m={2}
            sx={{
                height: "94%",
                maxHeight: "94%",
                overflow: "auto",
            }}
        >
            {messages.map((item) => (
                <Box key={item.id} display={"flex"} flexDirection={"column"} my={1} mr={item.sender_user_id === logged_in_user ? 1 : 0} alignItems={item.sender_user_id === logged_in_user ? "end" : "start"} key={item.id}>
                    <Typography
                        flexGrow={1}
                        display={"inline-block"}
                        maxWidth={"45%"}
                        bgcolor={item.sender_user_id === logged_in_user ? theme.palette.primary.main : theme.palette.secondary.main}
                        color={"white"}
                        borderRadius={"10px"}
                        textAlign={"left"}
                        p={2}
                        variant={"span"}
                        sx={{
                            overflowWrap: "break-word",
                            wordWrap: "break-word",
                            hyphens: "auto",
                        }}
                    >
                        {item.is_important && <PriorityHighIcon sx={{ color: red[700], verticalAlign: "middle" }} />}
                        {item.message}
                    </Typography>

                    <Typography maxWidth={"45%"} color={grey[500]} variant={"span"} fontSize={"0.7rem"} mx={"5px"} mt={"2px"}>
                        {`${new Date(item.timestamp).toLocaleDateString()} - ${new Date(item.timestamp).toLocaleTimeString()}`}
                    </Typography>
                </Box>
            ))}
        </Box>
    );
};
