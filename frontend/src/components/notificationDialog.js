/*
Author: Parampal Singh
*/
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Tab from "@mui/material/Tab";
import AppBar from "@mui/material/AppBar";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Switch from "@mui/material/Switch";
import { Alert, Checkbox, Snackbar } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import NotificationAddIcon from "@mui/icons-material/NotificationAdd";
import Tooltip from "@mui/material/Tooltip";
import Grid from "@mui/material/Grid";
import AddNotification from "./AddNotification";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import moment from "moment";
import io from "socket.io-client";

const url = process.env.REACT_APP_DOMAIN;
const socket = io.connect(url);

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function NotificationDialog(props) {
    const [updateNotification, setUpdateNotification] = React.useState(false);
    const [tabValue, setTabValue] = React.useState("1");
    const [sendNotify, setSendNotify] = React.useState(false);

    const handleCloseSnackbar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setUpdateNotification(false);
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const [open, setOpen] = React.useState(false);

    const handleCreateNotification = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseSendNotifySnackbar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setSendNotify(false);
    };

    const [allNotifications, setAllNotifications] = React.useState([]);
    const [favNotifications, setAllFavoriteNotifications] = React.useState([]);
    const [sentNotifications, setAllSentNotifications] = React.useState([]);
    const [userNotificationDetails, setUserNotificationDetails] = React.useState([]);
    const [isNotificationOn, setIsNotificationOn] = React.useState(false);
    const [isTutor, SetIsTutor] = React.useState(false);

    let isTutorFromStore;
    const getNotificationData = async () => {
        const user = JSON.parse(localStorage.getItem("user"));

        const notifications = await axios.get(url + "/api/notifications/" + user.id);
        if (isTutorFromStore === "true") {
            const sentNotifications = await axios.get(url + "/api/notifications/tutor/" + user.id);
            setAllSentNotifications(sentNotifications.data.userSentNotifications);

            const filteredNotifications = notifications.data.notification?.filter((el) => {
                return !sentNotifications.data.userSentNotifications?.find((f) => {
                    return f._id === el._id;
                });
            });

            setAllNotifications(filteredNotifications);
        } else {
            setAllNotifications(notifications.data.notification);
        }

        const starNotification = await axios.get(url + "/api/notifications/favorite/" + user.id);
        setAllFavoriteNotifications(starNotification.data.starNotifications);
    };

    const getData = async () => {
        const user = JSON.parse(localStorage.getItem("user"));

        const userDetails = await axios.get(url + "/api/notifications/details/" + user.id);
        setUserNotificationDetails(userDetails.data.userNotificationDetails);
        getNotificationData();
        if (userDetails.data.userNotificationDetails.preference === "on") {
            setIsNotificationOn(true);
            getNotificationData();
        }
    };

    React.useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        isTutorFromStore = user?.role === "tutor" ? "true" : "false";

        SetIsTutor(user?.role === "tutor");
        getData();
        socket.on("receive_notification", (data) => {
            getData();
        });
    }, []);

    const isNotificationFavorite = (id) => {
        const favN = favNotifications.find((notification) => notification?._id === id);
        if (favN) return true;

        return false;
    };

    const updateFavouriteNotification = async (id) => {
        const user = JSON.parse(localStorage.getItem("user"));

        const favNotification = favNotifications.find((notification) => {
            return notification._id === id;
        });
        if (favNotification) {
            const filteredN = favNotifications.filter((notification) => {
                return notification._id !== id;
            });
            setAllFavoriteNotifications([...filteredN]);
            await axios.put(url + "/api/notifications/favorite/" + user.id, { favorite: "false", notificationId: id });
        } else {
            const newNotification = allNotifications.find((notification) => {
                return notification._id === id;
            });
            setAllFavoriteNotifications([...favNotifications, newNotification]);
            await axios.put(url + "/api/notifications/favorite/" + user.id, { favorite: "true", notificationId: id });
        }
    };

    const updateNotificationsList = (notification) => {
        setAllSentNotifications([...sentNotifications, notification]);
    };

    const updatePreference = async (value) => {
        setIsNotificationOn(!value);

        var notificationState = !value ? "on" : "off";

        if (!value) getNotificationData();

        //API call to change the value
        const user = JSON.parse(localStorage.getItem("user"));
        const updatePreference = await axios.put(url + "/api/notifications/preference/" + user.id, { preference: notificationState });
        setUpdateNotification(true);
    };

    const [toastMsg, setToastMsg] = React.useState("");
    const [hPosition, setHPosition] = React.useState("left");
    const [msgType, setMsgType] = React.useState("success");

    return (
        <div>
            <AddNotification open={open} handleClose={handleClose} setSendNotify={setSendNotify} setToastMsg={setToastMsg} setHPosition={setHPosition} setMsgType={setMsgType} updateNotificationsList={updateNotificationsList} />
            <Snackbar anchorOrigin={{ vertical: "bottom", horizontal: hPosition }} autoHideDuration={4000} open={sendNotify} onClose={handleCloseSendNotifySnackbar}>
                <Alert color="primary" variant="filled" severity={msgType}>
                    {toastMsg}
                </Alert>
            </Snackbar>
            <Dialog fullScreen open={props.open} onClose={props.handleClose} TransitionComponent={Transition}>
                <AppBar color="primary" position="sticky" elevation={0}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={props.handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Notifications
                        </Typography>
                        <Typography>Off</Typography>
                        <Switch
                            // defaultChecked
                            color="default"
                            checked={isNotificationOn}
                            onClick={() => updatePreference(isNotificationOn)}
                            inputProps={{ "aria-label": "controlled" }}
                        />
                        <Snackbar autoHideDuration={4000} open={updateNotification} onClose={handleCloseSnackbar}>
                            <Alert color="primary" variant="filled" severity="success">
                                Notification preference updated successfully!
                            </Alert>
                        </Snackbar>
                        <Typography>On</Typography>

                        {isTutor && (
                            <Grid item>
                                <Tooltip title="Create Notifications">
                                    <IconButton color="inherit" onClick={handleCreateNotification}>
                                        <NotificationAddIcon />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        )}
                    </Toolbar>
                </AppBar>
                <TabContext value={tabValue}>
                    <AppBar component="div" position="static" elevation={0} sx={{ zIndex: 0 }}>
                        <TabList onChange={handleTabChange} textColor="inherit">
                            {/* {testFlag && <Tab label="All Notifications" value="1" />} */}
                            <Tab label="All Notifications" value="1" />
                            <Tab label="Starred" value="2" />
                            {isTutor && <Tab label="Sent Notifications" value="3" />}
                        </TabList>
                    </AppBar>
                    {isNotificationOn && (
                        <TabPanel value="1">
                            {allNotifications.map((notification, index) => (
                                <List>
                                    <ListItem button>
                                        <Checkbox
                                            checkedIcon={<StarIcon />}
                                            icon={<StarBorderIcon />}
                                            checked={isNotificationFavorite(notification?._id)}
                                            onClick={() => {
                                                updateFavouriteNotification(notification?._id);
                                            }}
                                        />
                                        <ListItemText primary={notification.type} secondary={notification.text} />
                                        <ListItemSecondaryAction>
                                            <Typography color="textSecondary" variant="body2">
                                                {moment(notification.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                                            </Typography>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                    <Divider />
                                </List>
                            ))}
                        </TabPanel>
                    )}
                    <TabPanel value="2">
                        {favNotifications.map((notification, index) => (
                            <List>
                                <ListItem button>
                                    <Checkbox
                                        checkedIcon={<StarIcon />}
                                        icon={<StarBorderIcon />}
                                        checked={isNotificationFavorite(notification?._id)}
                                        onClick={() => {
                                            updateFavouriteNotification(notification?._id);
                                        }}
                                    />
                                    <ListItemText primary={notification.type} secondary={notification.text} />
                                    <ListItemSecondaryAction>
                                        <Typography color="textSecondary" variant="body2">
                                            {moment(notification.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                                        </Typography>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <Divider />
                            </List>
                        ))}
                    </TabPanel>
                    {isTutor && (
                        <TabPanel value="3">
                            {sentNotifications.map((notification, index) => (
                                <List>
                                    <ListItem button>
                                        <ListItemText primary={notification.type} secondary={notification.text} />
                                        <ListItemSecondaryAction>
                                            <Typography color="textSecondary" variant="body2">
                                                {moment(notification.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                                            </Typography>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                    <Divider />
                                </List>
                            ))}
                        </TabPanel>
                    )}
                </TabContext>
            </Dialog>
        </div>
    );
}

export default NotificationDialog;
