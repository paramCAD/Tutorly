/*
Author: Parampal Singh
*/
import React from 'react'
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import axios from 'axios';
import io from 'socket.io-client';
let socket = null;
const url = process.env.REACT_APP_DOMAIN;

export default function AddNotification(props) {

    const sendNotification = async () => {

        props.setSendNotify(true);
        props.setToastMsg("Notification sent successfully!")
        // API to save the data
        const user=JSON.parse(localStorage.getItem("user"))
        console.log(user.id)
        const response = await axios.post(url +"/api/notifications/", { user: user.id , text: text, type: notificationType });

        socket.emit("send_notification", {
            notificationInfo: response?.data?.notification
        });
        props.updateNotificationsList(response?.data?.notification);
        props.handleClose();
    };

    React.useEffect(() => {

        if (!socket) {
            socket = io.connect(url);
            socket.on("receive_notification", (data) => {
                props.setSendNotify(true);
                props.setToastMsg(data.notificationInfo.text)
                props.setHPosition("right")
                props.setMsgType("info")
            })
        }
    }, [])

    const [text, setText] = React.useState();
    const [disabled, setDisabled] = React.useState(true);
    const [notificationType, setType] = React.useState("Reminder");

    const setParams = (value) => {
        setText(value)
        if (value)
            setDisabled(false);
        else
            setDisabled(true);
    }

    return (<div>
        <Dialog
            open={props.open}
            onClose={props.handleClose}

        >
            <DialogTitle>Create Notification</DialogTitle>
            <DialogContent>
                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Select Type</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        defaultValue="Reminder"
                        value={notificationType}
                        onChange={(event) => { setType(event.target.value) }}
                    >
                        <FormControlLabel value="Reminder" control={<Radio />} label="Reminder" />
                        <FormControlLabel value="Promotions" control={<Radio />} label="Promotions" />
                    </RadioGroup>
                </FormControl>
                <TextField
                    autoFocus
                    margin="dense"
                    id="message"
                    label="Message"
                    fullWidth
                    variant="standard"
                    value={text}
                    onChange={(event) => { setParams(event.target.value) }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose}>Cancel</Button>
                <Button disabled={disabled} onClick={sendNotification}>Send</Button>
            </DialogActions>
        </Dialog>
    </div>
    )
}
