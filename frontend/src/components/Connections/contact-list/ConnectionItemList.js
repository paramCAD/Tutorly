/**
 * @author Harsh Shah
 */
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { Badge, Box, Button, ListItemButton, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { blue, green, red } from "@mui/material/colors";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import { useDispatch } from "react-redux";
import { actionOnConversationRequest } from "../services/connection-rest";

export default function ConnectionItemList({ list }) {
    const dispatch = useDispatch();

    const actionOnRequest = (conversation_id, status) => {
        dispatch(actionOnConversationRequest({ conversation_id, status }));
    };

    const isTutor = localStorage.getItem("user")?.includes("tutor");

    const colorShade = {
        pending: [blue[100], blue[900]],
        accepted: [green[100], green[900]],
        rejected: [red[100], red[900]],
    };

    return (
        <>
            {list.length !== 0 ? (
                <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                    {list.map((item, idx) => {
                        return (
                            <React.Fragment key={item.conversation_id + "-box"}>
                                <ListItem
                                    key={item.conversation_id}
                                    alignItems="flex-start"
                                    secondaryAction={
                                        <>
                                            {isTutor ? (
                                                <>
                                                    <Button onClick={() => actionOnRequest(item.conversation_id, "reject")} variant="contained" color="error" startIcon={<CloseIcon />}>
                                                        Reject
                                                    </Button>
                                                    <Button onClick={() => actionOnRequest(item.conversation_id, "accepted")} sx={{ marginLeft: "10px" }} variant="contained" startIcon={<CheckIcon />}>
                                                        Accept
                                                    </Button>
                                                </>
                                            ) : (
                                                <Typography
                                                    p={1}
                                                    borderRadius={1}
                                                    sx={{
                                                        fontWeight: "bold",
                                                        backgroundColor: colorShade[item.status][0],
                                                        color: colorShade[item.status][1],
                                                    }}
                                                >
                                                    {`${item.status[0].toUpperCase()}${item.status.slice(1)}`}
                                                </Typography>
                                            )}
                                        </>
                                    }
                                >
                                    <ListItemAvatar>
                                        <Badge color={item.status === 1 ? "success" : "default"} variant="dot" component="div" anchorOrigin={{ horizontal: "right", vertical: "bottom" }} overlap="circular">
                                            <Avatar alt={item.name} src="dummy" />
                                        </Badge>
                                    </ListItemAvatar>
                                    <ListItemText primary={item.caption || item.name} secondary={item.message} />
                                    <ListItemButton></ListItemButton>
                                </ListItem>
                                {idx !== list.length - 1 ? <Divider key={item.id + "-divider"} variant="inset" component="li" /> : <></>}
                            </React.Fragment>
                        );
                    })}
                </List>
            ) : (
                <Box display={"flex"} width="100%" height="100%" flexDirection={"column"} justifyContent="center" alignItems={"center"}>
                    <SearchOffIcon sx={{ fontSize: "5rem", mb: "1rem" }} />
                    <Typography variant="h5"> No Result Found </Typography>
                </Box>
            )}
        </>
    );
}
