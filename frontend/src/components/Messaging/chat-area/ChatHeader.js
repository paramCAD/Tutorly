/**
 * @author Harsh Shah
 */
import { Avatar, Badge, Box, Typography } from "@mui/material"
import { grey } from "@mui/material/colors"


const ChatHeader = ({ person }) => {
    return (
        <Box sx={{ display: "flex", height: "100%" }}>
            <Box display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                px={2}>
                <Badge
                    component="div"
                    color={person.status === 1 ? "success" : "default"}
                    variant="dot"
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    overlap="circular">
                    <Avatar alt={person.name} src="dummy" />
                </Badge>
            </Box>
            <Box display={"flex"}
                justifyContent={"center"}
                flexDirection={"column"} >
                <Typography textAlign={"start"}
                    variant={"span"}>
                    {person.name}
                </Typography>
                <Typography fontSize={"small"}
                    color={grey[500]}
                    textAlign={"start"}
                    variant={"span"}>
                    {person.status === 1 ? "Online" : "Offline"}
                </Typography>
            </Box>
        </Box>
    )
}

export default ChatHeader;