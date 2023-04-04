/*
    Author: Manasvi(mn838732@dal.ca)
*/

// Importing the required modules
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import * as yup from "yup";
import { useFormik } from "formik";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import background from "../images/image.svg";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { theme } from "../theme/theme";

const url = process.env.REACT_APP_DOMAIN;;

export default function Login() {
    const navigate = useNavigate();
    const rootDomain = process.env.REACT_APP_BACKEND_BASE_URL;
    // Defining form validation
    const validationSchema = yup.object({
        // Email is required and should be in proper format
        email: yup.string("Enter your email").email("Enter a valid email").required("Email is required"),
        // Password is required and should be of min of 8 characters containing one uppercase, one lower case and one special character
        password: yup.string("Enter your password").required("Password is required"),
    });
    const setUserDetails = async (uid) =>{
        const response = await axios.post(url +"/api/notifications/details", { favorites : [], preference: "on", user: uid });
    }
    
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const email = values.email
            const password = values.password
            fetch(`${rootDomain}/user/login`, {
                method: 'POSt',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: values.email,
                    password: values.password
                })
            }).then(async (response) => {
                const body = await response.json();
                if (response.status === 200) {
                    console.log(body.data[0].accessToken)
                    if (body.data[0].accessToken) {
                        setUserDetails(body.data[0].id);
                        localStorage.setItem("user", JSON.stringify(body.data[0]));
                    }
                    alert(body.message)

                    navigate('/', { state: values })
                } else {
                    alert(body.message)
                }
            })
        },
    });
    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: "100vh" }}>
                <Grid
                    // Importing image
                    item
                    xs={false}
                    sm={4}
                    md={6}
                    sx={{
                        backgroundImage: `url(${background})`,
                        backgroundRepeat: "no-repeat",
                        backgroundColor: (t) => (t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900]),
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
                <Grid item xs={12} sm={8} md={6} component={Paper} elevation={20} square>
                    <Box
                        sx={{
                            marginTop: 5,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }} // Importing Lock Icon
                    >
                        <Avatar className="mx-auto mt-3 lock_icon" sx={{ backgroundColor: "primary.main" }}>
                            <LoginRoundedIcon />
                        </Avatar>
                        <Typography align="center" variant="h5" marginTop="20px">
                            LOGIN
                        </Typography>
                        <Paper elevation={20} style={{ padding: "30px 20px", maxWidth: 400, margin: "20px auto" }}>
                            <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 1 }} borderRadius="50%">
                                <TextField // Input field for Email Address
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />

                                <TextField // Input field for Password
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                />
                                <Button // SignUp Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                // component={RouterLink} to="/profile"
                                // onClick={() => navigate("/home")}
                                >
                                    LOGIN
                                </Button>

                                <Grid container>
                                    <Grid item xs>
                                        Don't have an account?
                                        <Link href="/signup" variant="body2">
                                            Register
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link href="/forgotPassword" variant="body2">
                                            {"Forgot Password?"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
