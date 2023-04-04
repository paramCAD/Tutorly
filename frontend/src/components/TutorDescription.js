/**
 * @author Arshdeep Singh
 */

import React from "react";
const TutorDescription = ({ tutorDescription }) => {
    return (
        <>
            <h1 className="my-4">Tutor Description</h1>
            <p>
                {tutorDescription ||
                    "A tutor works with students to improve their academic performance. They are typically found in educational institutions and businesses that provide after-school tutoring. A tutor will meet with students individually or in groups to supervise their completion of schoolwork. A tutor can also assist students in improving their test-taking abilities, taking better notes, and expanding on classroom concepts. They are designed to assist students and encourage a deeper understanding of course materials."}
            </p>
            {/* <h1>What You’ll Learn?</h1>
            <ul className="list-unstyled">
                <li className="mb-3">
                    {" "}
                    <i className="fas fa-check text-info me-2"></i>
                    <strong>Updated for 2020</strong>
                </li>
                <li className="mb-3">
                    {" "}
                    <i className="fas fa-check text-info me-2"></i>
                    <strong>Learn Python from beginner to advanced</strong>
                </li>
                <li className="mb-3">
                    {" "}
                    <i className="fas fa-check text-info me-2"></i>
                    <strong>Wagtail Pythons top Content Management System (Like WordPress, but better)</strong>
                </li>
                <li className="mb-3">
                    {" "}
                    <i className="fas fa-check text-info me-2"></i>
                    <strong>Learn the LAMP Stack: Linux, Apache, PHP and MySQL</strong>
                </li>
                <li className="mb-3">
                    {" "}
                    <i className="fas fa-check text-info me-2"></i>
                    <strong>Build a Login/Registration/Members-only website, just like Facebook</strong>
                </li>
                <li className="mb-3">
                    {" "}
                    <i className="fas fa-check text-info me-2"></i>
                    <strong>Learn HTML5, CSS3, Vanilla JS (ES6+), Python, Wagtail CMS, PHP and MySQL all from scratch</strong>
                </li>
                <li className="mb-3">
                    {" "}
                    <i className="fas fa-check text-info me-2"></i>
                    <strong>Learn MySQL for saving data (databases)</strong>
                </li>
            </ul> */}
        </>
    );
};
export default TutorDescription;
