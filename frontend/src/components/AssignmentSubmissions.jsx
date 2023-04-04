/*
    Author: Parth Shah
*/

import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/Save";

function Row({ row }) {
    const navigate = useNavigate();
    const courseId = useParams().id;
    const assignmentId = useParams().assId;

    const rootDomain = process.env.REACT_APP_BACKEND_BASE_URL;

    const [open, setOpen] = useState(false);

    const [feedback, setFeedback] = useState("");

    const saveFeedback = async () => {
        await axios({
            method: "POST",
            url: `${rootDomain}/course/${courseId}/assignment/${assignmentId}/feedback`,
            data: {
                attemptId: row._id,
                feedback,
            },
        });
        alert("Assignment feedback saved successfully!");
    };

    return (
        <>
            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.studentName}
                </TableCell>
                <TableCell align="right">{moment(row.submittedAt).format("llll")}</TableCell>
                <TableCell align="right">
                    <a href="#" onClick={() => setOpen(!open)}>
                        Enter Feedback
                    </a>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="body1" gutterBottom component="div">
                                {row.description}
                            </Typography>
                            {row.attachments.length > 0 && (
                                <Typography variant="h6" gutterBottom component="div">
                                    Attachments
                                </Typography>
                            )}
                            <Typography variant="body1" gutterBottom component="div"></Typography>
                            <Typography variant="body1" gutterBottom component="div">
                                {row.attachmentUrls.map((url) => (
                                    <a href={url} key={url}>
                                        Attachment.pdf
                                        <br />
                                    </a>
                                ))}
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        multiline
                                        rows={10}
                                        fullWidth
                                        margin="normal"
                                        variant="outlined"
                                        label="Feedback"
                                        value={row.feedback}
                                        onChange={(e) => {
                                            setFeedback(e.target.value);
                                        }}
                                        style={{ background: "white", borderRadius: "10px" }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="contained" startIcon={<SaveIcon />} onClick={saveFeedback}>
                                        Save
                                    </Button>
                                </Grid>
                                <Grid item xs={12}></Grid>
                            </Grid>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

const AssignmentSubmissions = () => {
    const navigate = useNavigate();

    const rootDomain = process.env.REACT_APP_BACKEND_BASE_URL;
    const courseId = useParams().id;
    const assignmentId = useParams().assId;

    const [assignments, setAssignments] = useState([]);

    const getAssignments = async () => {
        const response = await axios({
            method: "GET",
            url: `${rootDomain}/course/${courseId}/assignment/${assignmentId}/attempts`,
        });
        setAssignments(response.data.data);
    };

    useEffect(() => {
        getAssignments();
    }, []);

    return (
        <>
            <Container fixed>
                <Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                            <Typography sx={{ mt: 4, mb: 2 }} variant="h5" component="div">
                                Assignment Submissions
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TableContainer component={Paper}>
                                <Table aria-label="collapsible table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell />
                                            <TableCell>
                                                <b>Student Name</b>
                                            </TableCell>
                                            <TableCell align="right">
                                                <b>Submission Date</b>
                                            </TableCell>
                                            <TableCell align="right">
                                                <b>Actions</b>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {assignments.map((row) => (
                                            <Row key={row._id} row={row} />
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    );
};

export default AssignmentSubmissions;
