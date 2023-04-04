/**
 * @author Bharatwaaj Shankaranarayanan
 */
import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TCourseCard from "../../components/TCourseCard";
import TSearchBar from "../../components/TSearchBar";
import { Pagination, Typography } from "@mui/material";
import NewCourseDialog from "../../components/NewCourseDialog";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { getEnrolledCourses } from "./services/courses-rest";
import { updateEnrolledCourses } from "./slice/courseSlice";

export default function MyCoursesDashboard() {

    const dispatch = useDispatch();
    const allCourses =  useSelector(state => state.course.enrolledCourses);
    const showCourses = useSelector(state => state.course.searchEnrolledCourses);
    const [searchTerm, setSearchTerm] = useState("");
    const isTutor = localStorage.getItem("user")?.includes("tutor");
    const user=JSON.parse(localStorage.getItem("user"))

    useEffect(() => {
        dispatch(getEnrolledCourses({ isTutor: isTutor, studentId: user?.tutor?._id || user?.student?._id || "62ca2f7a4f3727bc5d9a3e98" }));
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
            dispatch(updateEnrolledCourses(selectedCourses));
        } else {
            dispatch(getEnrolledCourses({ isTutor: isTutor, studentId: user?.tutor?._id || user?.student?._id || "62ca2f7a4f3727bc5d9a3e98" }));
        }
    }, [searchTerm]);

    return (
        <>
            <Container fixed>
                <Box>
                    <Grid container spacing={8}>
                        <Grid item xs={9} md={9} />
                        <Grid item xs={3} md={3}>
                            {isTutor && <NewCourseDialog />}
                        </Grid>
                    </Grid>
                </Box>
            </Container>

            <Grid container spacing={2}>
                <Grid item xs={12} md={12}></Grid>
                <Grid item xs={12} md={12}></Grid>
            </Grid>
            <Paper sx={{ maxWidth: 936, margin: "auto", overflow: "hidden" }}>
                <TSearchBar handleSearch={handleSearch} placeHolderText={"Search by course name or tutor name"}></TSearchBar>
                <Grid container spacing={2} sx={{ padding: 2 }}>
                    { isTutor && showCourses.data.length > 0 ? (
                        showCourses.data.map((value, key) => (
                            <Grid item xs={12} sm={6} md={4} key={key}>
                                <TCourseCard key={key} courseId={value?._id} courseName={value?.courseName} tutorName={value?.tutor?.name} description={value?.description} cost={value?.cost} rating={value?.rating} imageURL={value?.imageURL} showProgress={true} progress={value?.progress}></TCourseCard>
                            </Grid>
                        ))
                    ) : !isTutor && showCourses.data.length > 0 ? (
                        showCourses.data.map((value, key) => (
                            <Grid item xs={12} sm={6} md={4} key={key}>
                                <TCourseCard key={key} courseId={value?.course?._id} courseName={value?.course?.courseName} tutorName={value?.course?.tutor?.name} description={value?.course?.description} cost={value?.course?.cost} rating={value?.course?.rating} imageURL={value?.course?.imageURL} showProgress={true} progress={value?.progress}></TCourseCard>
                            </Grid>
                        ))
                    ) : 
                    (
                        <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" style={{ minHeight: "50vh" }}>
                            <Grid item xs={3}>
                                <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
                                    No courses found.
                                </Typography>
                            </Grid>
                        </Grid>
                    )}
                </Grid>
                {showCourses.data.length > 0 ? (
                    <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" style={{ minHeight: "10vh" }}>
                        <Grid item xs={3}>
                            <Pagination count={1} />
                        </Grid>
                    </Grid>
                ) : (
                    <></>
                )}
            </Paper>
        </>
    );
}
