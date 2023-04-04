import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import NotificationDialog from "../components/notificationDialog";

function THomeHeader(props) {
    const { onDrawerToggle } = props;
    const [chosenTab, setChosenTab] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    const isTutor = localStorage.getItem("user")?.includes("tutor");
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const route_path = location.pathname.split("/");
        console.log("loca", location.pathname.split, route_path);
        if (route_path === undefined) {
            setChosenTab(0);
        } else if (route_path.includes("my-courses")) {
            setChosenTab(1);
        } else if (route_path.includes("archived-courses")) {
            setChosenTab(2);
        } else if (route_path.includes("recommended-courses")) {
            setChosenTab(3);
        } else if (route_path.includes("recommended-tutors")) {
            setChosenTab(4);
        }
    }, []);

    const handleHomeTabClick = () => {
        setChosenTab(0);
        navigate("/");
    };

    const handleMyCoursesTabClick = () => {
        setChosenTab(1);
        navigate("/my-courses/");
    };

    const handleArchivedCoursesTabClick = () => {
        setChosenTab(2);
        navigate("/archived-courses/");
    };

    const handleRecommendedCoursesTabClick = () => {
        setChosenTab(3);
        navigate("/recommended-courses/");
    };

    const handleRecommendedTutorsTabClick = () => {
        setChosenTab(4);
        navigate("/recommended-tutors/");
    };

    const [open, setOpen] = useState(false);

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
                                <Avatar/>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <AppBar component="div" position="static" elevation={0} sx={{ zIndex: 0 }}>
                <Tabs value={chosenTab} textColor="inherit">
                    <Tab label="Home" onClick={handleHomeTabClick} />
                    <Tab label="My Courses" onClick={handleMyCoursesTabClick} />
                    {isTutor===false && <Tab label="Archived Courses" onClick={handleArchivedCoursesTabClick} />}
                    {isTutor===false && <Tab label="Recommended Courses" onClick={handleRecommendedCoursesTabClick} />}
                    {isTutor===false && <Tab label="Recommended Tutors" onClick={handleRecommendedTutorsTabClick} />}
                </Tabs>
            </AppBar>
        </>
    );
}

THomeHeader.propTypes = {
    onDrawerToggle: PropTypes.func.isRequired,
};

export default THomeHeader;
