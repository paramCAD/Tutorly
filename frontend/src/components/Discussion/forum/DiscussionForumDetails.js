/**
 * @author Harsh Shah
 */
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import EditIcon from "@mui/icons-material/Edit";
import { Avatar, Box, Button, Card, CardContent, CardHeader, Checkbox, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Loader from "../../../widgets/Loader";
import { fetchPostDetails, updatePostResponseOfForum } from "../services/discussion-rest";
import DiscussionForumResponseEditor from "./DiscussionForumResponseEditor";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const DiscussionForumDetails = () => {
    const navigate = useNavigate();
    const { id: post_id } = useParams();

    const [expanded, setExpanded] = useState(false);
    const { id: forum_id } = useSelector((state) => state.discussion.activeCourse);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const dispatch = useDispatch();
    const [createResponseDialog, toggleResponseDialog] = useState(false);

    const { isFetching, details, responses } = useSelector((state) => state.discussion.postDetails);

    useEffect(() => {
        dispatch(fetchPostDetails(post_id));
    }, [dispatch, post_id]);

    const user_id = JSON.parse(localStorage.getItem("user")).id;
    let editable = null;
    if (details && details.author_by) {
        editable = details.author_by._id === user_id;
    }

    const updateResponseStatusHandler = (e, post_id, post_response_id) => {
        const status = e.target.checked;

        dispatch(
            updatePostResponseOfForum({
                post_id,
                post_response_id,
                status,
            })
        );
    };

    return (
        <>
            <Box width={"100%"} height={"90%"}>
                {isFetching || Object.keys(details).length === 0 ? (
                    <Loader />
                ) : (
                    <>
                        <Box my={3} display={"flex"} justifyContent={"space-between"}>
                            <Button onClick={() => navigate("/discussion/forums/posts", { state: { forum_id } })} variant="outlined" startIcon={<ArrowBackIosNewIcon />}>
                                Back
                            </Button>
                            <Button onClick={() => toggleResponseDialog(true)} variant="contained" startIcon={editable ? <EditIcon /> : <AddIcon />}>
                                {editable ? "Edit Post" : "Add Response"}
                            </Button>
                        </Box>
                        <Card>
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                        {details.author_by.firstname[0]}
                                    </Avatar>
                                }
                                title={`${details.author_by.firstname} ${details.author_by.lastname}`}
                                subheader={`${new Date(details.audit.updated_on).toDateString()} ${new Date(details.audit.updated_on).toLocaleTimeString()}`}
                            />
                            <CardContent>
                                <Typography sx={{ textTransform: "capitalize" }} variant="h6" color="text.secondary">
                                    {details.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {details.message}
                                </Typography>
                            </CardContent>
                        </Card>

                        <Box>
                            <Typography mt={2} variant="h6">
                                Responses
                            </Typography>
                        </Box>

                        <Box display={"flex"} alignItems="flex-end" flexDirection={"column"}>
                            {responses.map((response) => (
                                <Box display={"flex"}>
                                    <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
                                        <Box component={"span"} height={"fit-content"}>
                                            {editable ? (
                                                <Checkbox checked={response.status} sx={{ "& .MuiSvgIcon-root": { fontSize: 30 }, mr: 4 }} onChange={(e) => updateResponseStatusHandler(e, details._id, response._id)} />
                                            ) : (
                                                <Box px={2}>
                                                    <CheckCircleIcon sx={{ color: "#009688" }} />
                                                </Box>
                                            )}
                                        </Box>
                                    </Box>

                                    <Card sx={{ maxWidth: 1000, my: 3 }}>
                                        <CardHeader
                                            avatar={
                                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                                    {response.author_by.firstname[0]}
                                                </Avatar>
                                            }
                                            title={`${response.author_by.firstname} ${response.author_by.lastname}`}
                                            subheader={new Date(response.audit.created_on).toDateString()}
                                        />
                                        <CardContent>
                                            <Typography sx={{ textTransform: "capitalize" }} variant="h6" color="text.secondary">
                                                {response.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {response.message}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Box>
                            ))}
                        </Box>

                        {createResponseDialog && <DiscussionForumResponseEditor open={createResponseDialog} post_id={post_id} editable={editable} values={details} onClose={() => toggleResponseDialog(false)} />}
                    </>
                )}
            </Box>
        </>
    );
};

export default DiscussionForumDetails;
