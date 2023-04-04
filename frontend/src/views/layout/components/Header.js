import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import NotificationDialog from "../../../components/notificationDialog";
import * as React from "react";
import TabLayout from "../TabLayout";
import { useNavigate } from "react-router-dom";

function Header({ tabs, onDrawerToggle }) {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const user = JSON.parse(localStorage.getItem("user"));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <NotificationDialog open={open} handleClose={handleClose} />
            <AppBar color="primary" position="sticky" elevation={0}>
                <Toolbar>
                    <Grid container spacing={1} alignItems="center">
                        <Grid sx={{ display: { sm: "none", xs: "block" } }} item>
                            <IconButton color="inherit" aria-label="open drawer" onClick={onDrawerToggle} edge="start">
                                <MenuIcon />
                            </IconButton>
                        </Grid>
                        <Grid item xs>
                            <Typography color="inherit" variant="h6" component="h1">
                                Welcome, {user?.firstName || "John"} {user?.lastName || "Doe"}
                            </Typography>
                        </Grid>
                        <Grid item xs />
                        <Grid item>
                            <Tooltip title="View Notifications">
                                <IconButton color="inherit" onClick={handleClickOpen}>
                                    <NotificationsIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item>
                            <IconButton color="inherit" sx={{ p: 0.5 }} onClick={() => navigate("/profile")}>
                                <Avatar />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>

            {tabs && tabs.length > 0 && (
                <AppBar component="div" position="static" elevation={0} sx={{ zIndex: 0 }}>
                    <TabLayout data={tabs}></TabLayout>
                </AppBar>
            )}
        </>
    );
}

Header.propTypes = {
    onDrawerToggle: PropTypes.func.isRequired,
};

export default Header;
