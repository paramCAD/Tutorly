/**
 * @author Bharatwaaj Shankaranarayanan
 */
import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TCourseCard from "../../components/TCourseCard";
import TSearchBar from "../../components/TSearchBar";
import { Pagination, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateArchivedCourses } from "./slice/courseSlice";
import { getArchivedCourses } from "./services/courses-rest";

export default function ArchivedCoursesDashboard() {

    const dispatch = useDispatch();
    const allCourses =  useSelector(state => state.course.archivedCourses);
    const showCourses = useSelector(state => state.course.searchArchivedCourses);
    const [searchTerm, setSearchTerm] = useState("");
    const user=JSON.parse(localStorage.getItem("user"))

    useEffect(() => {
        dispatch(getArchivedCourses({ isTutor: false, studentId: user?.student?._id ||"62cd82d3330b4e2f98aca2f7" }));
    }, [dispatch]);

    const handleSearch = (value) => {
        setSearchTerm(value);
    };

    useEffect(() => {
        if (searchTerm !== "" && searchTerm !== null && searchTerm !== undefined) {
            const selectedCourses = allCourses.data.filter((x) => {
                const course = x.course;
                for (var i in course) {
                    if (i === "name" || i === "description") {
                        if (course[i]?.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)
                            return course;
                    } else if (i === "tutor") {
                        if (course[i]?.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)
                            return course;
                    }
                }
            });
            dispatch(updateArchivedCourses(selectedCourses));
        } else {
            dispatch(getArchivedCourses({ isTutor: false, studentId: user?.student?._id || "62cd82d3330b4e2f98aca2f7" }));
        }
    }, [searchTerm]);

    return (
        <Paper sx={{ maxWidth: 936, margin: "auto", overflow: "hidden" }}>
            <TSearchBar
                handleSearch={handleSearch}
                placeHolderText={"Search by course name or tutor name"}
            ></TSearchBar>
            <Grid container spacing={2} sx={{ padding: 2 }}>
                {showCourses.data.length > 0 ? (
                    showCourses.data.map((value, key) => (
                        <Grid item xs={12} sm={6} md={4} key={key}>
                                <TCourseCard key={key} courseId={value.course._id} courseName={value.course.courseName} tutorName={value.course.tutor.name} description={value.course.description} cost={value.course.cost} rating={value.course.rating} imageURL={value.course.imageURL} showProgress={false}></TCourseCard>
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
            {showCourses.data.length > 0 ? (
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
