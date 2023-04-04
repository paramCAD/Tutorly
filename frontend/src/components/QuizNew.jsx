/*
    Author: Parth Shah
*/

import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Typography from "@mui/material/Typography";
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
import moment from "moment";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const QuizNew = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const rootDomain = process.env.REACT_APP_BACKEND_BASE_URL;
    const courseId = useParams().id;

    // Declaring the quiz state
    const [quiz, setQuiz] = useState({
        title: "",
        startDate: moment().subtract(1, "days").toDate(),
        endDate: moment().add(7, "days").toDate(),
        timeAllowed: 0,
        questions: [
            {
                id: 1,
                question: "",
                options: [
                    {
                        option: "",
                        isCorrect: false,
                    },
                    {
                        option: "",
                        isCorrect: false,
                    },
                    {
                        option: "",
                        isCorrect: false,
                    },
                    {
                        option: "",
                        isCorrect: false,
                    },
                ],
            },
        ],
    });

    // The following method is used to add a new question to the quiz state
    const addQuestion = () => {
        const newQuestions = [...quiz.questions];
        newQuestions.push({
            id: quiz.questions.length + 1,
            question: "",
            options: [
                {
                    option: "",
                    isCorrect: false,
                },
                {
                    option: "",
                    isCorrect: false,
                },
                {
                    option: "",
                    isCorrect: false,
                },
                {
                    option: "",
                    isCorrect: false,
                },
            ],
        });
        setQuiz({ ...quiz, questions: newQuestions });
    };

    // The following method is used to update the quiz state on user input
    const updateField = (value, type, index, optionIndex = null) => {
        if (type === "question") {
            const currentQuestions = quiz.questions;
            currentQuestions[index - 1].question = value;
            setQuiz({ ...quiz, questions: currentQuestions });
        } else if (type === "option") {
            const currentQuestions = quiz.questions;
            currentQuestions[index - 1].options[optionIndex - 1].option = value;
            setQuiz({ ...quiz, questions: currentQuestions });
        } else if (type === "isCorrect") {
            const currentQuestions = quiz.questions;
            currentQuestions[index - 1].options[optionIndex - 1].isCorrect = value === "on" ? true : false;
            setQuiz({ ...quiz, questions: currentQuestions });
        }
    };

    // The following method is used to save the quiz state to the database
    const saveQuiz = async () => {
        // check if any questions or options are empty
        const emptyQuestions = quiz.questions.filter((question) => {
            return question.question === "" || question.options.some((option) => option.option === "");
        });
        if (emptyQuestions.length > 0 || quiz.title === "" || quiz.timeAllowed === 0) {
            handleClick();
        } else {
            await axios({
                method: "PUT",
                url: `${rootDomain}/course/${courseId}/quiz/new`,
                headers: {
                    "Content-Type": "application/json",
                },
                data: { quiz },
            });
            navigate(`/courses/${courseId}/quiz`);
        }
    };

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    return (
        <>
            <Stack spacing={2} sx={{ width: "100%" }}>
                <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
                        Please fill in all the fields!
                    </Alert>
                </Snackbar>
            </Stack>
            <Container fixed>
                <Box
                    component="form"
                    sx={{
                        "& > :not(style)": { mb: 2, mr: 2, width: "30ch" },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        label="Quiz Title"
                        variant="outlined"
                        onChange={(e) => {
                            setQuiz({ ...quiz, title: e.target.value });
                        }}
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            label="Pick Start Date"
                            value={quiz.startDate}
                            onChange={(newValue) => {
                                setQuiz({ ...quiz, startDate: newValue.toISOString() });
                            }}
                        />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            label="Pick End Date"
                            value={quiz.endDate}
                            onChange={(newValue) => {
                                setQuiz({ ...quiz, endDate: newValue.toISOString() });
                            }}
                        />
                    </LocalizationProvider>
                    <TextField
                        label="Enter Allowed Time (minutes)"
                        type="number"
                        variant="outlined"
                        onChange={(e) => {
                            setQuiz({ ...quiz, timeAllowed: e.target.value });
                        }}
                    />
                </Box>
                <Box>
                    <Button variant="contained" startIcon={<AddIcon />} onClick={addQuestion} sx={{ mr: 2 }}>
                        New Question
                    </Button>

                    <Button variant="contained" startIcon={<SaveIcon />} onClick={saveQuiz}>
                        Save
                    </Button>

                    {quiz.questions.map((question) => (
                        <Grid container spacing={2} style={{ backgroundColor: "#FFF", marginTop: "20px" }} key={question.id}>
                            <Grid item xs={12}>
                                <Typography variant="h6">Question {question.id}</Typography>
                                <Box
                                    component="form"
                                    sx={{
                                        "& > :not(style)": { m: 1, width: "90%" },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField
                                        label={`Enter Question ${question.id} Here`}
                                        variant="outlined"
                                        onChange={(e) => {
                                            updateField(e.target.value, "question", question.id);
                                        }}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl>
                                    <FormLabel id="demo-radio-buttons-group-label">Options</FormLabel>
                                    <Box
                                        component="form"
                                        sx={{
                                            "& > :not(style)": { m: 1, width: "90%" },
                                        }}
                                        noValidate
                                        autoComplete="off"
                                    >
                                        <TextField
                                            label={`Option 1`}
                                            variant="standard"
                                            onChange={(e) => {
                                                updateField(e.target.value, "option", question.id, 1);
                                            }}
                                        />
                                        <FormGroup>
                                            <FormControlLabel
                                                control={<Checkbox size="small" />}
                                                label="Correct Answer"
                                                onChange={(e) => {
                                                    updateField(e.target.value, "isCorrect", question.id, 1);
                                                }}
                                            />
                                        </FormGroup>
                                    </Box>

                                    <Box
                                        component="form"
                                        sx={{
                                            "& > :not(style)": { m: 1, width: "90%" },
                                        }}
                                        noValidate
                                        autoComplete="off"
                                    >
                                        <TextField
                                            label={`Option 2`}
                                            variant="standard"
                                            onChange={(e) => {
                                                updateField(e.target.value, "option", question.id, 2);
                                            }}
                                        />
                                        <FormGroup>
                                            <FormControlLabel
                                                control={<Checkbox size="small" />}
                                                label="Correct Answer"
                                                onChange={(e) => {
                                                    updateField(e.target.value, "isCorrect", question.id, 1);
                                                }}
                                            />
                                        </FormGroup>
                                    </Box>

                                    <Box
                                        component="form"
                                        sx={{
                                            "& > :not(style)": { m: 1, width: "90%" },
                                        }}
                                        noValidate
                                        autoComplete="off"
                                    >
                                        <TextField
                                            label={`Option 3`}
                                            variant="standard"
                                            onChange={(e) => {
                                                updateField(e.target.value, "option", question.id, 3);
                                            }}
                                        />
                                        <FormGroup>
                                            <FormControlLabel
                                                control={<Checkbox size="small" />}
                                                label="Correct Answer"
                                                onChange={(e) => {
                                                    updateField(e.target.value, "isCorrect", question.id, 1);
                                                }}
                                            />
                                        </FormGroup>
                                    </Box>

                                    <Box
                                        component="form"
                                        sx={{
                                            "& > :not(style)": { m: 1, width: "90%" },
                                        }}
                                        noValidate
                                        autoComplete="off"
                                    >
                                        <TextField
                                            label={`Option 4`}
                                            variant="standard"
                                            onChange={(e) => {
                                                updateField(e.target.value, "option", question.id, 4);
                                            }}
                                        />
                                        <FormGroup>
                                            <FormControlLabel
                                                control={<Checkbox size="small" />}
                                                label="Correct Answer"
                                                onChange={(e) => {
                                                    updateField(e.target.value, "isCorrect", question.id, 1);
                                                }}
                                            />
                                        </FormGroup>
                                    </Box>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider variant="middle" />
                            </Grid>
                            <Grid item xs={12}></Grid>
                        </Grid>
                    ))}
                </Box>
            </Container>
        </>
    );
};

export default QuizNew;
