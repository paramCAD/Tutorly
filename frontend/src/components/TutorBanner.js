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
import { Card, CardActions, CardContent, CardMedia, Grid, Rating, Stack } from "@mui/material";
import TTutorCard from "./TTutorCard";
import TCourseCard from "./TCourseCard";
import TutorDescription from "./TutorDescription";

const TutorBanner = ({ tutorImage, name, expertise, rating, description, courses }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={8}>
                <img className="w-100" src={tutorImage || "assets/img/gallery/ux-designer.png"} alt="..." />
                <Grid container spacing={1} style={{marginTop: 15}}>
                    <Grid item xs={4}>
                        <h3>Rating </h3>
                        <Rating name="half-rating" defaultValue={rating?.$numberDecimal} precision={0.5} readOnly />
                    </Grid>
                    <Grid item xs={8} style={{textAlign: "right"}}>
                        { expertise && (<><h3>Expertise </h3><p>{expertise}</p></>)}
                    </Grid>
                </Grid>
                <TutorDescription tutorDescription={description}></TutorDescription>
            </Grid>
            <Grid item xs={4}>
            <Grid container spacing={1}>
                {courses && courses.map(course => {
                    return (
                        <Grid item>
                        <TCourseCard courseId={course._id} courseName={course.name} tutorName={name} description={course.description} cost={course.cost} rating={course.rating} imageURL={course.imageURL} showProgress={false} progress={0}/>
                        </Grid>
                    )
                })}
                </Grid>
            </Grid>
        </Grid>
    );
};
export default TutorBanner;
