/**
 * @author Arshdeep Singh
 */
import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Stack from "@mui/material/Stack";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import httpClient from "../lib/httpClient";
import TagsInput from "./TagsInput";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllCourses } from "../views/pages/services/courses-rest";

export default function NewCourseDialogue() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [registered, setRegistered] = useState(null);
    const [registerFailed, setRegisterFailed] = useState(null);
    const user=JSON.parse(localStorage.getItem("user"))

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [details, setDetails] = useState({
        name: "",
        type: "",
        tutor:  user?.tutor?._id || "62cd523d5f8539afeb85aeaf",
        cost: 0,
        description: "",
        tags: [],
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [newCourse, setnewCourse] = useState([]);

    const handleRegister = async () => {
        const res = await httpClient.post("/course/add", {
            course: { ...details, startDate: startDate, endDate:endDate}
        });
        console.log("Temp: ",res.data.data);
        if (res.data.success) {
            setnewCourse(res.data.data)
            console.log("new response: ",res.data.data);
            setRegistered(true);
            setRegisterFailed(null);
        } else {
            setRegisterFailed(false);
            setRegistered(null);
        }
    };

    const [errorName, setErrorName] = useState("");
    const [errorType, setErrorType] = useState("");
    const [errorEndDate, setErrorEndDate] = useState("");
    const [errorCost, setErrorCost] = useState("");
    const [errorDescription, setErrorDescription] = useState("");

    const handleChange = (prop, event) => {
        if (prop === "name") {
            validateName(event);
            setDetails((details) => {
                return { ...details, name: event.target.value };
            });
        } else if (prop === "type") {
            validateType(event);
            setDetails((details) => {
                return { ...details, type: event.target.value };
            });
        } else if (prop === "cost") {
            validateCost(event);
            setDetails((details) => {
                return { ...details, cost: event.target.value };
            });
        } else if (prop === "description") {
            validateDescription(event);
            validateCost(event);
            setDetails((details) => {
                return { ...details, description: event.target.value };
            });
        }
    };

    const handleDateChange = (prop, newValue) => {
        if (prop === "startDate") {
            setStartDate(newValue);
        } else {
            // Validate End date
            if (newValue.getTime() < startDate.getTime()) {
                setErrorEndDate("End date must be after start date");
            } else {
                setErrorEndDate(null);
                setEndDate(newValue);
            }
        }
    };

    const handleFinish = () => {
        navigate("/my-courses/upload", {state: newCourse});
    };

    const validateName = (event) => {
        if (event.target.value.match("^[A-Za-z ]*$") === null) {
            setErrorName("Course name can only contain letters");
        } else {
            setErrorName(null);
        }
    };

    const validateType = (event) => {
        if (event.target.value.length === 0) {
            setErrorType("Type cannot be empty");
        } else {
            setErrorType(null);
        }
    };

    const validateCost = (event) => {
        if (event.target.value.match("^[0-9]*$") === null) {
            setErrorCost("Enter a valid price");
        } else {
            setErrorCost(null);
        }
    };

    const validateDescription = (event) => {
        if (event.target.value.length === 0) {
            setErrorDescription("Description cannot be empty");
        } else {
            setErrorDescription(null);
        }
    };

    const handleSelecetedTags = (items) => {
        setDetails((details) => {
            return { ...details, tags: items };
        });
    };

    useEffect(() => {
        dispatch(getAllCourses({ isTutor: false}));
    }, [dispatch, registered]);

    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen}>
                New Course
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Course</DialogTitle>
                <DialogContent>
                    <DialogContentText>Please try to be as specific as possible about the details</DialogContentText>
                    <Stack spacing={2}>
                        <TextField id="outlined-basic" label="Name" variant="outlined" error={errorName != null} helperText={errorName} onChange={(e) => handleChange("name", e)} />
                        <TextField id="outlined-multiline-static" label="Description" multiline rows={4} placeholder="Describe the course in your own words" error={errorDescription != null} helperText={errorDescription} onChange={(e) => handleChange("description", e)} />
                        <TextField id="outlined-basic" label="Type" variant="outlined" error={errorType != null} helperText={errorType} onChange={(e) => handleChange("type", e)} />
                        <TagsInput selectedTags={handleSelecetedTags} fullWidth id="tags" name="tags" placeholder="Relevant tags" label="tags" />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Start Date"
                                value={startDate}
                                onChange={(newValue) => {
                                    handleDateChange("startDate", newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="End Date"
                                value={endDate}
                                onChange={(newValue) => {
                                    handleDateChange("endDate", newValue);
                                }}
                                renderInput={(params) => <TextField {...params} error={errorEndDate != null} helperText={errorEndDate} />}
                            />
                        </LocalizationProvider>
                        <OutlinedInput id="outlined-adornment-amount" onChange={(e) => handleChange("cost", e)} startAdornment={<InputAdornment position="start">$</InputAdornment>} placeholder={"Course Price"} error={errorCost != null} helperText={errorCost} />
                        {registerFailed && <Alert severity="error">Course was not registered! Please validate all details.</Alert>}
                        {registered && <Alert severity="success">Course have been registered! Please click on finish to proceed.</Alert>}
                    </Stack>
                </DialogContent>
                <DialogActions>
                    {!registered && (
                        <Button onClick={handleRegister} disabled={!(errorName === null && errorType === null && errorCost === null && errorEndDate === null && errorDescription === null)}>
                            Register
                        </Button>
                    )}
                    {registered && <Button onClick={handleFinish}>Finish</Button>}
                </DialogActions>
            </Dialog>
        </div>
    );
}
