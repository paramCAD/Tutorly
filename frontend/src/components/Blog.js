import ChildBlogs from "./ChildBlogs";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { theme } from "../theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const FormData = require('form-data');


const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "700",
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    height: 700,
    p: 2,
};

export default function Blog() {
    const navigate = useNavigate();
    const rootDomain = process.env.REACT_APP_BACKEND_BASE_URL;
    const currentUser = JSON.parse(localStorage.getItem("user"))
    const [open, setOpen] = React.useState(false);
    const [blogs, setBlogs] = React.useState([]);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [blog, setBlog] = useState({})
    const formData = new FormData();
    useEffect(() => {
        async function getBlogs() {
          const response = await axios.get(`${rootDomain}/blog/getBlogs`);
          console.log(response)
          if (response.status === 200) {
            setBlogs(response.data.data)

            navigate('/blogs')
        } else {
            alert(response.data.message)
        }
          
        }
        getBlogs();
      }, []);

    const saveBlog = async () => {
        formData.append('title', blog.title);
        formData.append('description', blog.description);
        formData.append('image', blog.image);
        formData.append('user_id', currentUser.id);

        await axios.post(`${rootDomain}/blog/addBlogs`, formData).then(async (response) => {
            console.log(response)
            if (response.status === 200) {
                alert(response.data.message)
                window.location.reload();

                navigate('/blogs')
            } else {
                alert(response.data.message)
            }
        })
    };

    return (
        <React.Fragment>
            <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Typography component="h2" variant="h5" color="#009688" align="center" noWrap sx={{ flex: 1 }} fontWeight="bold">
                    BLOGS
                </Typography>
                <IconButton>{/* <SearchIcon /> */}</IconButton>
                <Button variant="contained" size="small" sx={{ mt: 3, mb: 2, backgroundColor: "#009688", ":hover": { backgroundColor: "#009688" } }} onClick={handleOpen}>
                    Add Blogs
                </Button>
                <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                    <Box sx={style}>
                        <Grid container>
                            <Container maxWidth="xs">
                                <Typography align="center" variant="h6" fontWeight="bold" marginTop="20px" color="#009688">
                                    Add Blog
                                </Typography>
                                <Box component="form" noValidate sx={{ mt: 1 }} borderRadius="50%">

                                    <TextField // Input field for First Name
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="title"
                                        label="Title"
                                        name="title"
                                        autoComplete="title"
                                        autoFocus
                                        onChange={(e) => {
                                            setBlog({ ...blog, title: e.target.value });
                                        }}
                                    />
                                    <TextField // Input field for First Name
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="description"
                                        label="Description"
                                        name="description"
                                        autoComplete="description"
                                        autoFocus
                                        multiline
                                        rows={5}
                                        type="file"
                                        onChange={(e) => {
                                            setBlog({ ...blog, description: e.target.value });
                                        }}

                                    />

                                    <input style={{ display: "none" }} id="contained-button-file" type="file" onChange={(e) => {
                                        setBlog({ ...blog, image: e.target.files[0] });
                                    }} />
                                    <label htmlFor="contained-button-file">
                                        <Button variant="contained" color="primary" component="span" fullWidth o>
                                            UPLOAD IMAGE
                                        </Button>
                                    </label>
                                </Box>
                            </Container>
                        </Grid>

                        <Button // SignUp Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={saveBlog}
                        >
                            SAVE
                        </Button>
                    </Box>
                </Modal>
            </Toolbar>
            <Toolbar component="nav" variant="dense" sx={{ justifyContent: "space-between", overflowX: "auto" }}></Toolbar>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Grid>
                    <Container maxWidth="lg">
                        <main>
                            <Grid container spacing={4}>
                                {blogs.map((post) => (
                                    <ChildBlogs key={post.title} post={post} />
                                ))}
                            </Grid>
                        </main>
                    </Container>
                </Grid>
            </ThemeProvider>
        </React.Fragment>
    );
}
