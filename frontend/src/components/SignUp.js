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
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import background from "../images/image.svg";
import { theme } from "../theme/theme";
import { useNavigate } from "react-router-dom";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function SignUp() {
    const navigate = useNavigate();
    const rootDomain = process.env.REACT_APP_BACKEND_BASE_URL;
    // Defining form validation
    const validationSchema = yup.object({
        // First name is required
        firstName: yup
            .string("Enter your First Name")
            .matches(/^[A-Za-z ]*$/, "Please enter valid name")
            .required("First Name is required"),
        // Last Name is required
        lastName: yup
            .string("Enter your Last Name")
            .matches(/^[A-Za-z ]*$/, "Please enter valid name")
            .required("Last Name is required"),
        // Email is required and should be in proper format
        email: yup.string("Enter your email").email("Enter a valid email").required("Email is required"),
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
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: ""
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            fetch(`${rootDomain}/user/signup`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    password: values.password,
                    roles: values.role
                })
            }).then(async (response) => {
                const body = await response.json();
                if (response.status === 200) {
                    alert(body.message)
                    navigate('/verifyEmail', { state: values })
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
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography align="center" variant="h5">
                            Register
                        </Typography>
                        <Paper elevation={20} style={{ padding: "30px 20px", maxWidth: 400, margin: "20px auto" }}>
                            <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 1 }} borderRadius="50%">
                                <TextField // Input field for First Name
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    name="firstName"
                                    autoComplete="firstName"
                                    autoFocus
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange}
                                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                    helperText={formik.touched.firstName && formik.errors.firstName}
                                />
                                <TextField // Input field for Last name
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lastName"
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}
                                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                    helperText={formik.touched.lastName && formik.errors.lastName}
                                />
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
                                <FormControl>
                                    <FormLabel id="role" name="role" margin="normal">Role</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="role"
                                        onChange={formik.handleChange}
                                        value={formik.values.role}
                                    >
                                        <FormControlLabel value="tutor" control={<Radio />} label="Tutor" required />
                                        <FormControlLabel value="student" control={<Radio />} label="Student" required />
                                    </RadioGroup>
                                </FormControl>

                                <Button // SignUp Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Register
                                </Button>
                                <Grid container>
                                    <Grid item xs align="center">
                                        Already on Tutorly?
                                        <Link href="/login" variant="body2">
                                            Login
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
