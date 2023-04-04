/**
 * @author Harsh Shah
 */
import AddIcon from "@mui/icons-material/Add";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { Box, Button, CircularProgress, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { setActiveTab } from "../../../store/slice/appSlice";
import { fetchForumPost } from "../services/discussion-rest";
import DiscussionForumEditor from "./DiscussionForumEditor";
import ForumPost from "./ForumPost";
import SearchBar from "./SearchBar";
import WarningIcon from "@mui/icons-material/Warning";

const DiscussionForum = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { forum_id } = location.state === null ? {} : location.state;

    const [searchKey, setSearchKey] = useState("");
    const [createPostDialog, toggleCreatePostDialog] = useState(false);
    const isSearchPerformed = searchKey.length !== 0;

    const { isFetching, filteredList, list } = useSelector((state) => state.discussion.posts);

    useEffect(() => {
        if (forum_id !== undefined) {
            dispatch(setActiveTab("Forum"));
            dispatch(fetchForumPost(forum_id));
        }
    }, [dispatch, navigate, forum_id]);

    const onChangeHandler = (key) => {
        setSearchKey(key);
    };

    const resultantList = isSearchPerformed ? filteredList : list;

    useEffect(() => {}, [searchKey, isSearchPerformed, dispatch]);

    const onSelectHandler = (id) => {
        navigate("/discussion/forums/posts/" + id);
    };

    const createPostHandler = () => {
        toggleCreatePostDialog(true);
    };

    return (
        <>
            {!forum_id ? (
                <Box display={"flex"} width="100%" height="80%" flexDirection={"column"} justifyContent="center" alignItems={"center"}>
                    <WarningIcon sx={{ fontSize: "5rem", mb: "1rem" }} />
                    <Typography variant="h5"> Please select the course </Typography>
                </Box>
            ) : (
                <>
                    <Box width={"100%"} height={"90%"}>
                        <Box
                            sx={{
                                pt: 1,
                                pb: 1,
                            }}
                        >
                            <Container maxWidth="md">
                                <Box display={"flex"} alignItems={"center"}>
                                    <SearchBar label={"Search Posts"} onChange={onChangeHandler} />
                                    <Box minWidth={200} ml={5}>
                                        <Button variant="outlined" onClick={createPostHandler} startIcon={<AddIcon />}>
                                            Create Post
                                        </Button>
                                    </Box>
                                </Box>
                            </Container>
                        </Box>
                        <Box sx={{ py: 1, px: 4 }} height={"80%"}>
                            {isFetching ? (
                                <Box height={"100%"} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                                    <CircularProgress />
                                </Box>
                            ) : (
                                <>
                                    <Typography variant="h5" color="text.secondary" paragraph>
                                        Posts ({resultantList.length})
                                    </Typography>
                                    {resultantList.length === 0 ? (
                                        <Box display={"flex"} width="100%" height="80%" flexDirection={"column"} justifyContent="center" alignItems={"center"}>
                                            <SearchOffIcon sx={{ fontSize: "5rem", mb: "1rem" }} />
                                            <Typography variant="h5"> No Result Found </Typography>
                                        </Box>
                                    ) : (
                                        <Grid mt={1} container spacing={2}>
                                            <ForumPost list={resultantList} onSelect={onSelectHandler}></ForumPost>
                                        </Grid>
                                    )}
                                </>
                            )}
                        </Box>
                    </Box>

                    {createPostDialog && <DiscussionForumEditor open={createPostDialog} forum_id={forum_id} onClose={() => toggleCreatePostDialog(false)} />}
                </>
            )}
        </>
    );
};

export default DiscussionForum;
