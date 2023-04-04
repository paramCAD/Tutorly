/**
 * @author Arshdeep Singh
 * @author Bharatwaaj Shankaranarayanan
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
import { getEnrolledCourses, getArchivedCourses } from "../views/pages/services/courses-rest.js";
import { EditCourseDialog } from "./EditCourseDialog";

const CourseBanner = ({ courseImage, tutor, courseRating, courseDescription, tutorDescription, initialEnrollStatus, initialArchiveStatus, courseId }) => {
    const [open, setOpen] = useState(false);
    const [openArchive, setOpenArchive] = useState(false);
    const dispatch = useDispatch();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
    const isTutor = localStorage.getItem("user")?.includes("tutor");
    const user = JSON.parse(localStorage.getItem("user"));
    const allCourses = useSelector((state) => state.course.enrolledCourses);

    const [isEnrolled, setIsEnrolled] = useState(initialEnrollStatus);
    const [action, setAction] = useState(initialEnrollStatus === true ? "unenroll" : "enroll");
    const [enrollmentStatus, setEnrollmentStatus] = useState("initiated");

    const [isArchived, setIsArchived] = useState(initialArchiveStatus);
    const [archiveAction, setArchiveAction] = useState(initialArchiveStatus === true ? "unarchive" : "archive");
    const [archiveStatus, setArchiveStatus] = useState("initiated");

    const enrolledCourses = useSelector((state) => state.course.enrolledCourses);
    const archivedCourses =  useSelector(state => state.course.archivedCourses);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClickClose = () => {
        setOpen(false);
    };

    const handleFinish = () => {
        setOpen(false);
        setEnrollmentStatus("initiated");
        setAction((state) => (state === "enroll" ? "unenroll" : "enroll"));
    };

    const handleClickOpenArchive = () => {
        setOpenArchive(true);
    };

    const handleClickCloseArchive = () => {
        setOpenArchive(false);
    };

    const handleFinishArchive = () => {
        setOpenArchive(false);
        setArchiveStatus("initiated");
        setArchiveAction((state) => (state === "archive" ? "unarchive" : "archive"));
    };

    const handleEnrollment = async () => {
        console.log("WORKED");
        const id = user?.student?._id || "62ca2f7a4f3727bc5d9a3e98";
        const res = await httpClient.post(`/student/course/${action}/${courseId}`, {
            student: {
                id: id,
            },
        });
        console.log("RESP", res);
        if (res.data.success) {
            setEnrollmentStatus("success");
        } else {
            setEnrollmentStatus("fail");
        }
        setIsEnrolled((state) => !state);
    };

    const handleArchive = async () => {
        console.log("WORKEDarchive");
        const id = user?.student?._id || "62ca2f7a4f3727bc5d9a3e98";
        const res = await httpClient.post(`/student/course/${archiveAction}/${courseId}`, {
            student: {
                id: id,
            },
        });

        console.log("RESP", res);
        if (res.data.success) {
            setArchiveStatus("success");
        } else {
            setArchiveStatus("fail");
        }
        setIsArchived((state) => !state);
    };

    useEffect(() => {
        dispatch(getEnrolledCourses({ isTutor: isTutor, studentId: user?.tutor?._id || user?.student?._id || "62ca2f7a4f3727bc5d9a3e98" }));
        dispatch(getArchivedCourses({ isTutor: false, studentId: user?.student?._id ||"62cd82d3330b4e2f98aca2f7" }));
    }, [dispatch]);

    useEffect(() => {
        console.log("Data", enrolledCourses, archivedCourses);
        if (enrolledCourses && enrolledCourses.data.length > 0) {
            console.log("entered enrolled")
            const courseDetailE = enrolledCourses?.data?.filter((itr_) => itr_?.course?._id === courseId) ? enrolledCourses?.data?.filter((itr_) => itr_?.course?._id === courseId)[0] : undefined;
            console.log("courseDetailE", courseDetailE);
            setIsEnrolled(courseDetailE?.course?._id ? true : false);
            setAction(courseDetailE?.course?._id? "unenroll" : "enroll")
        }
        if(archivedCourses && archivedCourses.data.length > 0){
            console.log("entered Archived")
            const courseDetailA = archivedCourses?.data?.filter((itr_) => itr_?.course?._id === courseId) ? archivedCourses?.data?.filter((itr_) => itr_?.course?._id === courseId)[0] : undefined;
            console.log("courseDetailA", courseDetailA);
            setIsArchived(courseDetailA?.archived ? true : false);
            setArchiveAction(courseDetailA?.archived ? "unarchive" : "archive");
        }
    }, [enrolledCourses, archivedCourses]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={8}>
                <img className="w-100" src={courseImage || "assets/img/gallery/ux-designer.png"} alt="..." />
                <Grid container spacing={1} style={{ marginTop: 15 }}>
                    <Grid item xs={4}>
                        <Rating name="half-rating" defaultValue={courseRating?.$numberDecimal} precision={0.5} readOnly />
                    </Grid>
                    <Grid item xs={8} style={{ textAlign: "right" }}>
                        {(() => {
                            console.log("isEA", isArchived, isEnrolled);
                            if (!isTutor) {
                                if (isArchived) {
                                    return (
                                        <Button variant="contained" type="submit" onClick={handleClickOpenArchive}>
                                            Unarchive
                                        </Button>
                                    );
                                } else if (isEnrolled && !isArchived) {
                                    return (
                                        <>
                                            <Button style={{ marginRight : 10 }} variant="contained" type="submit" onClick={handleClickOpenArchive}>
                                                Archive
                                            </Button>
                                            <Button style={{ marginRight : 10 }} variant="contained" type="submit" onClick={handleClickOpen}>
                                                Unenroll
                                            </Button>
                                        </>
                                    );
                                } else if (!isEnrolled) {
                                    return (
                                        <Button variant="contained" type="submit" onClick={handleClickOpen}>
                                            Enroll
                                        </Button>
                                    );
                                }
                            }
                        })()}
                    </Grid>
                </Grid>
                <CourseDescription courseDescription={courseDescription} tutorDescription={tutorDescription}></CourseDescription>
            </Grid>
            <Grid item xs={4}>
                {tutor && <TTutorCard tutorId={tutor._id} courses={tutor.courses} tutorName={tutor.name} description={tutor.description} rating={tutor.rating} imageURL={tutor.imageURL} expertise={tutor.expertise}></TTutorCard>}
            </Grid>
            <Dialog fullScreen={fullScreen} open={open} onClose={handleClickClose} aria-labelledby="responsive-dialog-title">
                <DialogTitle id="responsive-dialog-title">{"Are you sure you want to proceed?"}</DialogTitle>
                <DialogContent>
                    {enrollmentStatus === "initiated" && <DialogContentText>{`Do you want to proceed with ${action}ment?`}</DialogContentText>}
                    {enrollmentStatus === "fail" && <Alert severity="error">{`There was a problem processing your request`}</Alert>}
                    {enrollmentStatus === "success" && <Alert severity="success">{`Your request was successful`}</Alert>}
                </DialogContent>
                {enrollmentStatus === "initiated" ? (
                    <DialogActions>
                        <Button onClick={handleClickClose} type="submit">
                            Cancel
                        </Button>
                        <Button type="submit" onClick={handleEnrollment} autoFocus>
                            Confirm
                        </Button>
                    </DialogActions>
                ) : (
                    <DialogActions>
                        <Button type="submit" onClick={handleFinish} autoFocus>
                            Close
                        </Button>
                    </DialogActions>
                )}
            </Dialog>

            <Dialog fullScreen={fullScreen} open={openArchive} onClose={handleClickCloseArchive} aria-labelledby="responsive-dialog-title">
                <DialogTitle id="responsive-dialog-title">{"Are you sure you want to proceed?"}</DialogTitle>
                <DialogContent>
                    {archiveStatus === "initiated" && <DialogContentText>{`Do you want to proceed with ${archiveAction}?`}</DialogContentText>}
                    {archiveStatus === "fail" && <Alert severity="error">{`There was a problem processing your request`}</Alert>}
                    {archiveStatus === "success" && <Alert severity="success">{`Your request was successful`}</Alert>}
                </DialogContent>
                {archiveStatus === "initiated" ? (
                    <DialogActions>
                        <Button onClick={handleClickCloseArchive} type="submit">
                            Cancel
                        </Button>
                        <Button type="submit" onClick={handleArchive} autoFocus>
                            Confirm
                        </Button>
                    </DialogActions>
                ) : (
                    <DialogActions>
                        <Button type="submit" onClick={handleFinishArchive} autoFocus>
                            Close
                        </Button>
                    </DialogActions>
                )}
            </Dialog>
        </Grid>
    );
};
export default CourseBanner;
