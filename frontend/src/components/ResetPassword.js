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

export default function ResetPassword() {
    const navigate = useNavigate();
    const rootDomain = process.env.REACT_APP_BACKEND_BASE_URL;
    // Defining form validation
    const validationSchema = yup.object({
        // Email is required and should be in proper format
        email: yup.string("Enter your email").email("Enter a valid email").required("Email is required"),
        // OTP is required and should be in proper format
        otp: yup
            .string("Enter your OTP")
            .required("OTP is required")
            .matches(/^[0-9 ]*$/, "Please enter valid OTP"),
        // Password is required and should be of min of 8 characters containing one uppercase, one lower case and one special character
        password: yup
            .string("Enter your password")
            .min(8, "Password should be of minimum 8 characters length")
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character")
            .required("Password is required"),
        // Confirm Password is required and should match Password field
        confirmPassword: yup
            .string("Confirm your password")
            .oneOf([yup.ref("password"), null], "Confirm Password does not match")
            .required("Confirm Password is required"),
    });
    const formik = useFormik({
        initialValues: {
            email: "",
            otp: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            fetch(`${rootDomain}/user/resetPassword`, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: values.email,
                    otp:values.otp,
                    password:values.password
                })
            }).then(async (response) => {
                const body = await response.json();
                if (response.status === 200) {
                    alert(body.message)
                    navigate('/login', { state: values })
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
                        marginTop="5%"
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
                            Reset Password
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
                                <TextField // Input field for OTP
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="otp"
                                    label="OTP"
                                    name="otp"
                                    autoComplete="otp"
                                    value={formik.values.otp}
                                    onChange={formik.handleChange}
                                    error={formik.touched.otp && Boolean(formik.errors.otp)}
                                    helperText={formik.touched.otp && formik.errors.otp}
                                />

                                <TextField // Input field for Password
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="New Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                />
                                <TextField // Input field for Confirm Password
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirmPassword"
                                    autoComplete="current-password"
                                    value={formik.values.confirmPassword}
                                    onChange={formik.handleChange}
                                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                />

                                <Button // Submit Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    SUBMIT
                                </Button>

                                <Grid container>
                                    <Grid item xs align="center">
                                        <Link href="/" variant="body2">
                                            Home Page
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
