/**
 * @author Bharatwaaj Shankaranarayanan
 */
import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { useLocation, useParams } from "react-router";
import CourseDetailsHeading from "../../components/CourseDetailsHeading";
import CourseBanner from "../../components/CourseBanner";
import { getAllCourses, getCourseDetails } from "./services/courses-rest";
import { useDispatch, useSelector } from "react-redux";
import { getEnrolledCourses } from "./services/courses-rest.js";
import TutorCourseBanner from "../../components/TutorCourseBanner";

export default function CourseDetails() {
    const isTutor = localStorage.getItem("user")?.includes("tutor");
    const { id } = useParams();
    const dispatch = useDispatch();
    const courseDetail =  useSelector(state => state.course.courseDetail);
  
    useEffect(() => {
      dispatch(getCourseDetails({ isTutor: true, courseId: id }));
    }, [dispatch]);

    const enrolledCourses = useSelector(state => state.course.enrolledCourses.data);
    const enrolledCourseDetail = enrolledCourses.filter(itr_ => itr_?.course?._id === id)?enrolledCourses.filter(itr_ => itr_?.course?._id === id)[0]:undefined;
    const initialEnrollStatus = enrolledCourseDetail ? true : false;
    const initialArchiveStatus = enrolledCourseDetail?.archive ? true : false;
    
    return (
        <Paper sx={{ maxWidth: 936, margin: "auto", overflow: "hidden", padding: 2 }}>
            <CourseDetailsHeading title={courseDetail?.data[0]?.name}></CourseDetailsHeading>
            {isTutor==='true'?(<TutorCourseBanner courseDescription={courseDetail?.data[0]?.description} courseImage={courseDetail?.data[0]?.imageURL} tutor={courseDetail?.data[0]?.tutor} courseRating={courseDetail?.data[0]?.rating} courseId={id}></TutorCourseBanner>):(<CourseBanner courseDescription={courseDetail?.data[0]?.description} courseImage={courseDetail?.data[0]?.imageURL} tutor={courseDetail?.data[0]?.tutor} courseRating={courseDetail?.data[0]?.rating} initialEnrollStatus={initialEnrollStatus} initialArchiveStatus={initialArchiveStatus} courseId={id}></CourseBanner>)}
        </Paper>
    );
}
