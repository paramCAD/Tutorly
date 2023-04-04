/**
 * @author Arshdeep Singh
 */
import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import TSearchBar from "../../components/TSearchBar";
import { useLocation, useParams } from "react-router";
import CourseDetailsHeading from "../../components/CourseDetailsHeading";
import TutorBanner from "../../components/TutorBanner";
import { getAllCourses, getCourseDetails } from "./services/courses-rest";
import { getAllTutors } from "./services/tutors-rest";
import { useDispatch, useSelector } from "react-redux";

export default function TutorDetails() {
    const isTutor = localStorage.getItem("isTutor") ? localStorage.getItem("isTutor") === "true" : true;
    const { id } = useParams();
    const dispatch = useDispatch();
    const tutorDetails = useSelector(state => state.tutor.allTutors).data;

    const tutor = tutorDetails.find(itr => itr._id === id);

    useEffect(() => {
        dispatch(getAllTutors());
    }, [dispatch]);


    return (
        <Paper sx={{ maxWidth: 936, margin: "auto", overflow: "hidden", padding: 2 }}>
            <h1 className="mb-6">{tutor?.name || "John Doe"}</h1>
            <TutorBanner tutorImage={tutor?.imageURL} name={tutor?.name} expertise={tutor?.expertise} rating={tutor?.rating} description={tutor?.description} courses={tutor?.courses}></TutorBanner>
        </Paper>
    );
}
