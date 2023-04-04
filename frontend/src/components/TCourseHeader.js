/**
 * @author Bharatwaaj Shankaranarayanan
 */

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
function TCourseHeader(props) {
    const { onDrawerToggle } = props;
    const [chosenTab, setChosenTab] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        const route_path = location.pathname.split("/")[2];
        if (route_path === undefined) {
            setChosenTab(0);
        } else if (route_path === "my-courses") {
            setChosenTab(1);
        } else if (route_path === "archived-courses") {
            setChosenTab(2);
        } else if (route_path === "recommended-courses") {
            setChosenTab(3);
        }
    }, []);
    const handleHomeTabClick = () => {
        setChosenTab(0);
        navigate(`/courses/${location.pathname.split("/")[2]}`);
    };
    const handleMyCoursesTabClick = () => {
        setChosenTab(1);
        navigate(`/courses/${location.pathname.split("/")[2]}/quiz`);
    };
    const handleArchivedCoursesTabClick = () => {
        setChosenTab(2);
        navigate(`/courses/${location.pathname.split("/")[2]}/assignments`);
    };
    const handleRecommendedCoursesTabClick = () => {
        setChosenTab(3);
        navigate(`/courses/${location.pathname.split("/")[2]}/review`);
    };
    const handleLeaderBoardTabClick = () => {
        setChosenTab(4);
        navigate(`/courses/${location.pathname.split("/")[2]}/leaderboard`);
    };
    return (
        <>
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
                                Course Home Page
                            </Typography>
                        </Grid>
                        <Grid item xs />
                        <Grid item>
                            <Tooltip title="Alerts • No alerts">
                                <IconButton color="inherit">
                                    <NotificationsIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item>
                            <IconButton color="inherit" sx={{ p: 0.5 }}>
                                <Avatar  />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <AppBar component="div" position="static" elevation={0} sx={{ zIndex: 0 }}>
                <Tabs value={chosenTab} textColor="inherit">
                    <Tab label="Home" onClick={handleHomeTabClick} />
                    <Tab label="Quiz" onClick={handleMyCoursesTabClick} />
                    <Tab label="Assignment" onClick={handleArchivedCoursesTabClick} />
                    <Tab label="Details" onClick={handleRecommendedCoursesTabClick} />
                    <Tab label="Leaderboard" onClick={handleLeaderBoardTabClick} />
                </Tabs>
            </AppBar>
        </>
    );
}
TCourseHeader.propTypes = {
    onDrawerToggle: PropTypes.func.isRequired,
};
export default TCourseHeader;
