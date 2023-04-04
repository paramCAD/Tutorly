/*
    Author: Parth Shah
*/

import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import SaveIcon from "@mui/icons-material/Save";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import AttachmentIcon from "@mui/icons-material/Attachment";
import Stack from "@mui/material/Stack";
import moment from "moment";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AssignmentNew = () => {
    const navigate = useNavigate();

    const rootDomain = process.env.REACT_APP_BACKEND_BASE_URL;
    const courseId = useParams().id;

    const [assignment, setAssignment] = useState({
        title: "",
        description: "",
        startDate: moment().subtract(1, "days").toDate(),
        endDate: moment().add(7, "days").toDate(),
        attachments: [],
    });

    const saveAssignment = async (e) => {
        // check if all fields are filled
        if (assignment.title.length > 0 && assignment.description.length > 0 && assignment.startDate && assignment.endDate) {
            await axios({
                method: "PUT",
                url: `${rootDomain}/course/${courseId}/assignment/new`,
                headers: {
                    "Content-Type": "application/json",
                },
                data: { assignment },
            });
            navigate(`/courses/${courseId}/assignments`);
        } else {
            handleClick();
        }
    };

    const processAttachments = async (e) => {
        const attachments = [];
        for (let i = 0; i < e.target.files.length; i++) {
            const response = await axios({
                method: "GET",
                url: `${rootDomain}/course/${courseId}/assignment/attachment/upload`,
            });

            await axios({
                method: "PUT",
                url: response.data.data.url,
                headers: {
                    "content-type": "application/octet-stream",
                },
                data: e.target.files[i],
            });
            attachments.push(response.data.data.id);
        }
        handleClickAttachment();
        setAssignment({ ...assignment, attachments });
    };

    const [open, setOpen] = React.useState(false);
    const [openAttachment, setOpenAttachment] = React.useState(false);
    const handleClickAttachment = () => {
        setOpenAttachment(true);
    };

    const handleCloseAttachment = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenAttachment(false);
    };

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    return (
        <>
            <Stack spacing={2} sx={{ width: "100%" }}>
                <Snackbar open={openAttachment} autoHideDuration={4000} onClose={handleCloseAttachment} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
                    <Alert onClose={handleCloseAttachment} severity="success" sx={{ width: "100%" }}>
                        Assignments Uploaded Successfully!
                    </Alert>
                </Snackbar>
            </Stack>
            <Stack spacing={2} sx={{ width: "100%" }}>
                <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
                        Please fill in all the fields!
                    </Alert>
                </Snackbar>
            </Stack>
            <Container fixed>
                <Box
                    component="form"
                    sx={{
                        "& > :not(style)": { mb: 2, mr: 2, width: "30ch" },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        label="Assignment Title"
                        variant="outlined"
                        style={{ background: "white", borderRadius: "10px" }}
                        onChange={(e) => {
                            setAssignment({
                                ...assignment,
                                title: e.target.value,
                            });
                        }}
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} variant="outlined" style={{ background: "white", borderRadius: "10px" }} />}
                            label="Pick Start Date"
                            value={assignment.startDate}
                            onChange={(newValue) => {
                                setAssignment({
                                    ...assignment,
                                    startDate: newValue.toISOString(),
                                });
                            }}
                        />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} variant="outlined" style={{ background: "white", borderRadius: "10px" }} />}
                            label="Pick End Date"
                            value={assignment.endDate}
                            onChange={(newValue) => {
                                setAssignment({
                                    ...assignment,
                                    endDate: newValue.toISOString(),
                                });
                            }}
                        />
                    </LocalizationProvider>
                </Box>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            multiline
                            rows={10}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            label="Notes"
                            onChange={(e) => {
                                setAssignment({
                                    ...assignment,
                                    description: e.target.value,
                                });
                            }}
                            style={{ background: "white", borderRadius: "10px" }}
                        />
                    </Grid>
                    <Grid item xs={12}></Grid>
                </Grid>
                <Box>
                    <Button variant="contained" startIcon={<AttachmentIcon />} component="label" sx={{ mr: 2 }}>
                        Add Attachments
                        <input hidden multiple type="file" onChange={processAttachments} />
                    </Button>
                    <Button variant="contained" startIcon={<SaveIcon />} onClick={saveAssignment}>
                        Save
                    </Button>
                </Box>
            </Container>
        </>
    );
};

export default AssignmentNew;
