// Author: Created By: Dhairya Shah
import React, { useEffect, useReducer, useState } from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { Container, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Card, CardActions, CardContent, Link, Rating, Box } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router";

let username;
const formReducer = (state, event) => {
    if (event.reset) {
        return {
            rating: "",
            review: "",
        };
    }
    return {
        ...state,
        [event.name]: event.value,
    };
};

const root = process.env.REACT_APP_DOMAIN;

let courseId;
const getFeedback = async () => {
    const responseData = await axios({
        method: "GET",
        params: {
            id: courseId
        },
        url: `${root}/api/feedback/course/${courseId}`,
        headers: {
            "Content-Type": "application/json",
        },
    });

    console.log("All feedbacks: ", responseData.data.data);

    return responseData.data.data;
};
const getContent = async () => {
    const responseData = await axios({
        method: "GET",
        params: {
            id: courseId
        },
        url: `${root}/api/upload/content/${courseId}`,
        headers: {
            "Content-Type": "application/json",
        },
    });
  
    console.log("All content: ", responseData.data.data);
  
    return responseData.data.data;
  };


  const getCourseDetails = async () => {
    const responseData = await axios({
        method: "GET",
        params: {
            id: courseId
        },
        url: `${root}/api/course/${courseId}`,
        headers: {
            "Content-Type": "application/json",
        },
    });

    console.log("All course Details: ", responseData.data.data);

    return responseData.data.data;
};

export default function Review() {
    username = JSON.parse(localStorage.getItem("user")).firstName;
    courseId = useParams().id;
    console.log("Course Id: ", courseId);
    username = JSON.parse(localStorage.getItem("user")).firstName;
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        getFeedback().then((feedbacks) => {
            setFeedbacks(feedbacks);
        });
    }, []);

    const [content, setContent] = useState([]);

    useEffect(() => {
        getContent().then((content) => {
            setContent(content);
        });
    }, []);

    const [getDetails, setDetails] = useState([]);

    useEffect(() => {
        getCourseDetails().then((course) => {
            setDetails(course);
        });
    }, []);

console.log("Set Details: ", getDetails);

    const [formData, setFormData] = useReducer(formReducer, {});
    const [posting, setPosting] = useState(false);
    const handleSubmit = (event) => {
        event.preventDefault();
        setPosting(true);
        alert("Review Submitted");

        setTimeout(() => {
            setPosting(false);
            setFormData({
                reset: true,
            });
        }, 100000);
    };

    const handleChange = (event) => {
        setFormData({
            name: event.target.name,
            value: event.target.value,
        });
    };

    const [ratingValue, setValue] = useState();

    const [feedback, setFeedback] = useState({
        courseId: courseId,
        userId: username,
        rating: "",
        feedback: "",
    });

    const handleFeedback = async () => {

    await axios({
        method: "PUT",
        url: `${root}/api/feedback/add`,
        headers: {
            "Content-Type": "application/json",
        },
        data: {feedback}
    });
    window.location.reload();
};




  return (
    <Container sx={{ maxWidth: 930, margin: 'auto', overflow: 'hidden' }}>
        <Typography variant="h5" component="h5" style={{color: "#009687", textAlign: "center", marginBottom: "1%"}}>
        {getDetails.map((course) => (
                    course.name
                    ))}
        </Typography>
        <Typography variant="body2" gutterBottom style={{textAlign: "justify", marginBottom: "1%"}}> 
        {getDetails.map((course) => (
                    course.description
                    ))}
        </Typography>
        <Divider variant='middle' />
        <Grid container columns={{ xs: 4, md: 12 }} style={{marginTop: "2%"}}>
            <Grid item xs={6} md={8} style={{paddingRight: "1%"}}>
                <Typography variant="overline" display="block" gutterBottom>
                    Module 1: {getDetails.map((course) => (
                    course.name
                    ))}
                </Typography>
                <Typography variant="subtitle2" gutterBottom component="div">
                    Overview
                </Typography>
                <Typography variant="body2" gutterBottom style={{textAlign: "justify", marginBottom: "1%"}}> 
                {content.map((content) => (
                    content.textContent
                    ))}
                </Typography>
                <video autoplay controls style={{marginTop: "1%"}}>
                    <source src="https://www.youtube.com/watch?v=kqtD5dpn9C8" type="video/mp4" />
                </video>
            </Grid>
            <Grid item xs={6} md={4}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead style={{backgroundColor: "#009687", color: "white"}}>
                        <TableRow>
                            <TableCell style={{color: "white"}}>#</TableCell>
                            <TableCell style={{color: "white"}}>Course Material</TableCell>
                            <TableCell style={{color: "white"}}>Download</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">1</TableCell>
                                <TableCell>Assignment Python Introduction</TableCell>
                                <TableCell style={{textAlign: "center"}}> <Link href="#" underline="none"><CloudDownloadIcon /></Link></TableCell>
                            </TableRow>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">2</TableCell>
                                <TableCell>Practice Code Examples</TableCell>
                                <TableCell style={{textAlign: "center"}}> <Link href="#" underline="none"><CloudDownloadIcon /></Link></TableCell>
                            </TableRow>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">3</TableCell>
                                <TableCell>Exercide Python Interfaces</TableCell>
                                <TableCell style={{textAlign: "center"}}> <Link href="#" underline="none"><CloudDownloadIcon /></Link></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
        <Divider variant='middle' style={{marginTop: "1%"}}/>
        <Typography variant="h6" component="h6" style={{color: "#009687", marginBottom: "1%"}}>
            Ratings & Reviews
        </Typography>
        <Card>
            <CardContent>
            <form>
                <fieldset style={{border: "1px solid lightgray", padding: "10px"}}>
                <label>
                    <p><Rating value={ratingValue} onChange={(e, val) =>  { setFeedback({ ...feedback , rating: val })}}/></p>
                    Review:<br />
                    <textarea name='review' id='review' style={{margin: "5px 5px", padding: "5px"}} placeholder='Post your Review...'  onChange={(e) => { setFeedback({ ...feedback , feedback: e.target.value });}} ></textarea>
                </label>
                <div className='d-grid gap-2 d-md-flex justify-content-md-end' style={{marginRight: "10px", marginBottom: "10px"}}> 
                    <button type='submit' className='btn btn-success' style={{width: "100px"}} onClick={handleFeedback}>Post</button>
                </div>
            </fieldset>
        </form>
                
                    {feedbacks.map((feedback) => (
                        <p>
                            <Divider variant="middle" style={{ marginTop: "1%", marginBottom: "1%" }}></Divider>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {feedback.userId}
                            </Typography>
                            <Rating value={feedback.rating} readOnly></Rating>
                            <Typography variant="subtitle2" gutterBottom component="div">
                                <p>{feedback.feedback}</p>
                            </Typography>
                        </p>
                    ))}
                </CardContent>
            </Card>
        </Container>
    );
}

getFeedback();
getContent();
getCourseDetails();