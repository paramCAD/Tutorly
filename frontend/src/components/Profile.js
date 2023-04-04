/*
    Author: Manasvi(mn838732@dal.ca)
*/

// Importing the required modules
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import * as yup from 'yup';
import { useFormik } from 'formik';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "../theme/theme";
import { Container } from '@mui/system';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from "react-router-dom";



export default function SignUp() {
    const [open, setOpen] = React.useState(false);
    const currentUser=JSON.parse(localStorage.getItem("user"))
    const rootDomain = process.env.REACT_APP_BACKEND_BASE_URL;
    const navigate = useNavigate()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseYes = () => {
        fetch(`${rootDomain}/user/delete/${currentUser.id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            })
        }).then(async (response) => {
            const body = await response.json();
            if (response.status === 200) {

                localStorage.removeItem("user");
                navigate('/landing')
                alert(body.message)
            } else {
                alert(body.message)
            }
        })
    };
   
    // Defining form validation 
    const validationSchema = yup.object({
        // First name is required
        firstName: yup
            .string('Enter your First Name')
            .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
            .required('First Name is required'),
        // Last Name is required
        lastName: yup
            .string('Enter your Last Name')
            .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
            .required('Last Name is required'),
        // Email is required and should be in proper format
        email: yup
            .string('Enter your email')
            .email('Enter a valid email')
            .required('Email is required'),
        // Password is required and should be of min of 8 characters containing one uppercase, one lower case and one special character
        password: yup
            .string('Enter your password')
            .min(8, 'Password should be of minimum 8 characters length')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
            ),
    });
    const formik = useFormik({
        initialValues: {
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            email: currentUser.email,
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            fetch(`${rootDomain}/user/updateProfile/${currentUser.id}`, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    password: values.password
                })
            }).then(async (response) => {
                const body = await response.json();
                if (response.status === 200) {
                    alert(body.message)
                    localStorage.setItem("user", JSON.stringify({"id":currentUser.id,"accessToken":currentUser.accessToken,
                    "role":currentUser.role,"firstName":values.firstName,"lastName":values.lastName,"email":values.email}));
                    window.location.reload();
                    navigate('/profile', { state: values })
                } else {
                    alert(body.message)
                }
            })

        },

    });

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }} backgroundColor="#009688">
                <Container component="main" maxWidth="xs" sx={{ height: '100vh' }} >



                    <Box marginTop="40px" sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }} // Importing Lock Icon
                    >
                        <Avatar className='mx-auto mt-3 lock_icon' sx={{ backgroundColor: '#ffffff', color: 'primary.main' }}>
                            <AccountCircleIcon />
                        </Avatar>
                        <Typography align='center' variant="h5" fontWeight="bold" marginTop="20px" color="#ffffff">
                            Update Profile
                        </Typography>
                        <Paper elevation={20} style={{ padding: '30px 20px', maxWidth: 400, margin: '20px auto' }} >
                            <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 1 }} borderRadius="50%">
                                <TextField    // Input field for First Name
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
                                <TextField    // Input field for Last name
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
                                <TextField    // Input field for Email Address
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                    placeholder='mnsvi07@gmail.com'
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />

                                <TextField    // Input field for Password
                                    margin="normal"
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

                                <Button   // SignUp Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                // component={RouterLink} to="/profile"
                                >
                                    UPDATE
                                </Button>
                                <Grid container>
                                    <Grid item xs align='center'>
                                        <div>
                                            <Link href="#" variant="body2" onClick={handleClickOpen}>
                                                Delete Account?
                                            </Link>
                                            <Dialog
                                                open={open}
                                                onClose={handleClose}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description"
                                            >
                                                <DialogTitle id="alert-dialog-title">
                                                </DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText id="alert-dialog-description">
                                                        Do you want to delete account?
                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={handleClose}>No</Button>
                                                    <Button onClick={handleCloseYes} autoFocus>
                                                        Yes
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>
                                        </div>

                                    </Grid>

                                </Grid>
                            </Box>
                        </Paper>
                    </Box>
                </Container>
            </Grid>
        </ThemeProvider>
    );

}