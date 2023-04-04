/**
 * @author Arshdeep Singh
 * @author Bharatwaaj Shankaranarayanan
 */
import React from "react";
const CourseDetailsHeading = ({ title }) => {
    console.log("title", title)
    return <h1 className="mb-6">{title || "Web Development"}</h1>;
};
export default CourseDetailsHeading;
