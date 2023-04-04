import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as React from "react";
import { Outlet, useLocation } from "react-router";
import { theme } from "../../theme/theme";
import Header from "./components/Header";
import Navigator from "./components/Navigator";

const drawerWidth = 256;

export default function AppLayout() {
    const location = useLocation();
    const tabsConfig = {
        chat: {
            tabs: [
                {
                    label: "Messages",
                    route: "chat/messages",
                },
                {
                    label: "Connections",
                    route: "chat/connections",
                },
            ],
        },
        discussion: {
            tabs: [
                {
                    label: "Courses",
                    route: "discussion/courses",
                },
                {
                    label: "Forum",
                    route: "discussion/forums/posts",
                },
            ],
        },
    };

    const [mobileOpen, setMobileOpen] = React.useState(false);
    const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{ display: "flex", height: "100%" }}>
            <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
                {isSmUp ? null : <Navigator PaperProps={{ style: { width: drawerWidth } }} variant="temporary" open={mobileOpen} onClose={handleDrawerToggle} />}

                <Navigator PaperProps={{ style: { width: drawerWidth } }} sx={{ display: { sm: "block", xs: "none" } }} />
            </Box>
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column", height: "100%" }}>
                <Header onDrawerToggle={handleDrawerToggle} tabs={tabsConfig[location.pathname.split("/")[1]]?.tabs} />
                <Box sx={{ flex: 1, py: 2, px: 2, bgcolor: "#eaeff1", height: "100%", maxHeight: "100%", overflow: "auto" }}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
}
