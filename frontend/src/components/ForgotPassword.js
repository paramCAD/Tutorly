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
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import background from "../images/ForgotPassword.png";

import { useNavigate } from "react-router-dom";
import { theme } from "../theme/theme";

export default function ForgotPassword() {
    const navigate = useNavigate();
    const rootDomain = process.env.REACT_APP_BACKEND_BASE_URL;
    // Defining form validation
    const validationSchema = yup.object({
        // Email is required and should be in proper format
        email: yup.string("Enter your email").email("Enter a valid email").required("Email is required"),
    });
    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            fetch(`${rootDomain}/user/sendotp`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: values.email
                })
            }).then(async (response) => {
                const body = await response.json();
                if (response.status === 200) {
                    alert(body.message)
                    navigate('/resetPassword', { state: values })
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
                        height: "70%",
                    }}
                />
                <Grid item xs={12} sm={8} md={6} component={Paper} elevation={20} square>
                    <Box
                        marginTop="90px"
                        sx={{
                            marginTop: 5,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }} // Importing Lock Icon
                    >
                        <Avatar className="mx-auto mt-3 lock_icon" sx={{ backgroundColor: "primary.main" }}>
                            <KeyRoundedIcon />
                        </Avatar>
                        <Typography align="center" variant="h6" marginTop="20px">
                            Forgot Password
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
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                                <Button // SignUp Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    SUBMIT
                                </Button>

                                <Grid container>
                                    <Grid item xs align="center">
                                        Click{" "}
                                        <Link href="/resetPassword" variant="body2">
                                            here{" "}
                                        </Link>
                                        to reset password!
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
