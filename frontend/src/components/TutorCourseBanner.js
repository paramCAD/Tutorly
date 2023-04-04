/**
 * @author Arshdeep Singh
 */

import React from "react";
import CourseDescription from "./CourseDescription";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material/styles";
import { Grid, Rating } from "@mui/material";
import TTutorCard from "./TTutorCard";
import { useDispatch, useSelector } from "react-redux";
import httpClient from "../lib/httpClient";
import Alert from "@mui/material/Alert";
import { useState, useEffect } from "react";
import { getEnrolledCourses } from "../views/pages/services/courses-rest.js";
import EditCourseDialog from "./EditCourseDialog";



const TutorCourseBanner = ({ courseImage, tutor, courseRating, courseDescription, tutorDescription, courseId }) => {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));    

    return (
        <Grid container spacing={2}>
            <Grid item xs={8}>
                <img className="w-100" src={courseImage || "assets/img/gallery/ux-designer.png"} alt="..." />
                <Grid container spacing={1} style={{ marginTop: 15 }}>
                    <Grid item xs={4}>
                        <Rating name="half-rating" defaultValue={courseRating?.$numberDecimal} precision={0.5} readOnly />
                    </Grid>
                    <Grid item xs={8} style={{ textAlign: "right" }}>
                        <EditCourseDialog courseId={courseId}/>
                    </Grid>
                </Grid>
                <CourseDescription courseDescription={courseDescription} tutorDescription={tutorDescription}></CourseDescription>
            </Grid>
            <Grid item xs={4}>
                {tutor && <TTutorCard tutorId={tutor._id} courses={tutor.courses} tutorName={tutor.name} description={tutor.description} rating={tutor.rating} imageURL={tutor.imageURL} expertise={tutor.expertise}></TTutorCard>}
            </Grid>
        </Grid>
    );
};
export default TutorCourseBanner;
