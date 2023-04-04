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
import Alert from "@mui/material/Alert";
import httpClient from "../lib/httpClient";
import TagsInput from "./TagsInput";
import { Tooltip } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllCourses } from "../views/pages/services/courses-rest";

export default function EditCourseDialog({ courseId }) {
    const [open, setOpen] = useState(false);
    const [editStatus, setEditStatus] = useState("initiate");
    const dispatch = useDispatch();
    const tutor = JSON.parse(localStorage.getItem("tutor"));

    const allCourses = useSelector(state => state.course.allCourses).data;
    const currentCourse = allCourses.filter(course_ => course_._id === courseId)[0]
    const currentCourseDetails = currentCourse?Object.fromEntries(Object.entries(currentCourse).filter(([key]) => key!=="_id")):{};

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [details, setDetails] = useState({
        ...currentCourseDetails
    });

    const isCourseCompleted = endDate > (new Date())?true:false;
    let isOwner;
    try{
        isOwner = tutor?.courses?.filter(course_ => course_.includes(courseId)).length>0?true:false; 
    } catch (err){
        isOwner = true;
    }
    

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditStatus("initiate");
    };

    const handleEdit = async () => {
        const res = await httpClient.put(`/course/update/${courseId}`, {
            course: details,
        });
        if (res.data.success) {
            setEditStatus("success");
        } else {
            setEditStatus("fail");
        }
    };


    const [errorType, setErrorType] = useState(null);
    const [errorEndDate, setErrorEndDate] = useState(null);
    const [errorDescription, setErrorDescription] = useState(null)

    const handleChange = (prop, event) => {
        if (prop === "type") {
            validateType(event);
            setDetails((details) => {
                return { ...details, type: event.target.value };
            });
        } else if (prop === "description") {
            validateDescription(event);
            setDetails((details) => {
                return { ...details, description: event.target.value };
            });
        }
    };

    const handleDateChange = (prop, newValue) => {
        if (newValue.getTime() < startDate.getTime()) {
            setErrorEndDate("End date must be after start date");
        } else {
            setErrorEndDate(null);
            setEndDate(newValue);
        }
    };

    const handleSelecetedTags = (items) => {
        setDetails((details) => {
            const currentTags = details?.tags?details.tags:[];
            return { ...details, tags: [...currentTags, ...items] };
        });
    };

    const validateType = (event) => {
        if (event.target.value.length === 0) {
            setErrorType("Type cannot be empty");
        } else {
            setErrorType(null);
        }
    };

    const validateDescription = (event) => {
        if (event.target.value.length === 0) {
            setErrorDescription("Description cannot be empty");
        } else {
            setErrorDescription(null);
        }
    };

    useEffect(() => {
        dispatch(getAllCourses({ isTutor: false}));
    }, [dispatch, editStatus]);

    return (
        <div>
            <Tooltip title={!isOwner?"You are not the owner":(isCourseCompleted?"Cannot edit once the course has been completed":"") }>
                <Button variant="contained" onClick={handleClickOpen} disabled={isCourseCompleted || !isOwner}>
                    Edit Course
                </Button>
            </Tooltip>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Course</DialogTitle>
                <DialogContent>
                    <DialogContentText>Please try to be as specific as possible about the details</DialogContentText><br />
                    <Stack spacing={2}>
                        <TextField id="outlined-basic" label="Name" value={details.name} variant="outlined" helperText={"Cannot change name after course creation"} disabled />
                        <TextField id="outlined-multiline-static" value={details.description} label="Description" multiline rows={4} placeholder="Describe the course in your own words" error={errorDescription != null} helperText={errorDescription} onChange={(e) => handleChange("description", e)} />
                        <TextField id="outlined-basic" label="Type" value={details.type} variant="outlined" error={errorType != null} helperText={errorType} onChange={(e) => handleChange("type", e)} />
                        <TagsInput selectedTags={handleSelecetedTags} fullWidth id="tags" name="Tags" placeholder="add more tags" label="tags" />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Start Date"
                                value={startDate}
                                renderInput={(params) => <TextField {...params} helperText={"Cannot change start date after course creation"} disabled />}
                                onChange={() => ""}
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
                        <OutlinedInput id="outlined-adornment-amount" value={details?.cost?.$numberDecimal} onChange={(e) => handleChange("cost", e)} startAdornment={<InputAdornment position="start">$</InputAdornment>} placeholder={"Course Price"} disabled />
                        {editStatus==="fail" && <Alert severity="error">Course was not updated! Please validate all details.</Alert>}
                        {editStatus==="success" && <Alert severity="success">Course have been been updated! Please click on finish to proceed.</Alert>}
                    </Stack>
                </DialogContent>
                <DialogActions>
                    {editStatus==="initiate" && (
                        <Button onClick={handleEdit} disabled={!(errorType === null && errorEndDate === null && errorDescription === null)}>
                            Apply
                        </Button>
                    )}
                    {editStatus!=="initiate" && <Button onClick={handleClose}>Finish</Button>}
                </DialogActions>
            </Dialog>
        </div>
    );
}
