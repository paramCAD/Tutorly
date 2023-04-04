/**
 * @author Bharatwaaj Shankaranarayanan
 */

import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TCourseCard from "../../components/TCourseCard";
import TSearchBar from "../../components/TSearchBar";
import { Pagination, Typography } from "@mui/material";
import { getAllCourses } from "./services/courses-rest";
import { getAllTutors } from "./services/tutors-rest";
import { useDispatch, useSelector } from 'react-redux';
import { updateSearchCourses } from "./slice/courseSlice";

export default function HomeDashboard() {
    
    const dispatch = useDispatch();
    const allCourses =  useSelector(state => state.course.allCourses);
    const showCourses = useSelector(state => state.course.searchCourses);
    const [searchTerm, setSearchTerm] = useState("");
  
    useEffect(() => {
      dispatch(getAllCourses({ isTutor: true }));
      dispatch(getAllTutors());
    }, [dispatch]);

    const handleSearch = (value) => {
        setSearchTerm(value);
    };

    useEffect(() => {
        if (searchTerm !== "" && searchTerm !== null && searchTerm !== undefined) {
            const selectedCourses = allCourses.data.filter((x) => {
                for (var i in x) {
                    if (i === "name" || i === "description") {
                        if (x[i]?.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)
                            return x;
                    } else if (i === "tutor") {
                        if (x[i]?.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)
                            return x
                    }
                }
            });
            dispatch(updateSearchCourses(selectedCourses));
        } else {
            dispatch(getAllCourses({ isTutor: true }));
        }
    }, [searchTerm]);

    return (
        <Paper sx={{ maxWidth: 936, margin: "auto", overflow: "hidden" }}>
            <TSearchBar
                handleSearch={handleSearch}
                placeHolderText={"Search by course name or tutor name"}
            ></TSearchBar>
            <Grid container spacing={2} sx={{ padding: 2 }}>
                {showCourses?.data?.length > 0 ? (
                    showCourses?.data?.map((value, key) => (
                        <Grid item xs={12} sm={6} md={4} key={key}>
                            <TCourseCard
                                key={key}
                                courseId={value._id}
                                courseName={value.name}
                                tutorName={value.tutor?.name}
                                description={value.description}
                                cost={value.cost}
                                rating={value.rating}
                                imageURL={value.imageURL}
                            ></TCourseCard>
                        </Grid>
                    ))
                ) : (
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        style={{ minHeight: "50vh" }}
                    >
                        <Grid item xs={3}>
                            <Typography
                                sx={{ my: 5, mx: 2 }}
                                color="text.secondary"
                                align="center"
                            >
                                No courses found.
                            </Typography>
                        </Grid>
                    </Grid>
                )}
            </Grid>
            {showCourses?.data?.length > 0 ? (
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    style={{ minHeight: "10vh" }}
                >
                    <Grid item xs={3}>
                        <Pagination count={1} />
                    </Grid>
                </Grid>
            ) : (
                <></>
            )}
        </Paper>
    );
}
