/*
    Author: Parth Shah
*/

import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import QuizQuestion from "./QuizQuestion";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import SaveIcon from "@mui/icons-material/Save";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Chip from "@mui/material/Chip";
import Countdown from "react-countdown";
import moment from "moment";
import { useParams } from "react-router-dom";

const QuizAttempt = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem("user"));
    const rootDomain = process.env.REACT_APP_BACKEND_BASE_URL;

    const courseId = useParams().id;
    const quizId = useParams().quizId;
    const studentId = user.id;

    const [quiz, setQuiz] = useState({});
    const [attempt, setAttempt] = useState({
        student: studentId,
        answers: [],
    });

    // The following method is used to get the quiz details from the server
    const getQuiz = async () => {
        const response = await axios({
            method: "GET",
            url: `${rootDomain}/course/${courseId}/quiz/${quizId}`,
            headers: {
                "Content-Type": "application/json",
            },
        });
        setQuiz(response.data.data);
    };

    // The following method is used to update the quiz state after the user changes an answer radio button
    const setAnswer = (questionId, attemptAnswer) => {
        // push to answers array, update if it already exists
        const currentAttemptState = attempt;
        const findAttemptAnswer = currentAttemptState.answers.find((answer) => answer.id === questionId);
        if (findAttemptAnswer) {
            currentAttemptState.answers = currentAttemptState.answers.map((answer) => {
                if (answer.id === questionId) {
                    answer.option = attemptAnswer;
                }
                return answer;
            });
        } else {
            currentAttemptState.answers.push({
                id: questionId,
                option: attemptAnswer,
            });
        }
        setAttempt(currentAttemptState);
    };

    // The following method is used to submit the quiz attempt to the server
    const submitQuiz = async () => {
        await axios({
            method: "PUT",
            url: `${rootDomain}/course/${courseId}/quiz/${quizId}/attempt`,
            headers: {
                "Content-Type": "application/json",
            },
            data: {
                attempt,
            },
        });
        navigate(`/courses/${courseId}/quiz/`);
    };

    useEffect(() => {
        getQuiz();
    }, []);

    return (
        <>
            <Container fixed>
                <Box>
                    <Typography variant="h5">{quiz.title}</Typography>
                </Box>
                <Box>
                    <Button
                        variant="contained"
                        startIcon={<DeleteIcon />}
                        sx={{ mr: 2, mt: 3 }}
                        onClick={() => {
                            navigate(`/courses/${courseId}/quiz`);
                        }}
                        color="error"
                    >
                        Cancel
                    </Button>
                    <Button variant="contained" color="success" startIcon={<SaveIcon />} sx={{ mr: 2, mt: 3 }} onClick={submitQuiz}>
                        Submit Quiz
                    </Button>
                </Box>

                <Box>
                    <Grid container spacing={2} style={{ backgroundColor: "#FFF", marginTop: "20px" }}>
                        {quiz.questions && quiz.questions.map((question) => <QuizQuestion key={question.id} question={question} type="attempt" setAnswer={setAnswer} />)}
                    </Grid>
                </Box>
            </Container>
        </>
    );
};

export default QuizAttempt;
