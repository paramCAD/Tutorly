import { AppBar, Typography, Link, Box, Toolbar, List, ListItem, ListItemText, IconButton, Drawer, Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import myteam from "../images/landing.png";

const Header = (props) => {
    const links = [
        { id: 1, route: "SignUp", url: "/signup" },
        { id: 2, route: "Login", url: "/login" },
        { id: 2, route: "Contact Us", url: "#" },
    ];

    const [state, setState] = React.useState({
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(anchor, false)} onKeyDown={toggleDrawer(anchor, false)}>
            <List>
                {links.map((link) => (
                    <ListItem button key={link.id}>
                        <ListItemText primary={link.route} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("sm"));

    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const submitForm = (e) => {
        e.preventDefault();
        console.log({ email, firstName, subject, message });
    };

    return (
        <Box>
            <Box sx={{ marginBottom: "70px" }}>
                <AppBar>
                    <Toolbar height="10vh" display="flex" justifyContent="space-between" padding="20px" backgroundColor="white">
                        <Link href="#" underline="none" display="flex" flexGrow="1.1" justifyContent="space-between">
                            <Typography variant="h5" color="#fff" fontWeight="bold" cursor="pointer">
                                <LaptopMacIcon paddingTop="2px" />
                                Tutorly
                            </Typography>
                        </Link>

                        {matches ? (
                            <Box>
                                <IconButton size="large" edge="end" color="inherit" aria-label="menu" onClick={toggleDrawer("right", true)}>
                                    <MenuIcon fontSize="" />
                                </IconButton>

                                <Drawer anchor="right" open={state["right"]} onClose={toggleDrawer("right", false)}>
                                    {list("right")}
                                </Drawer>
                            </Box>
                        ) : (
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexGrow: "0.1",
                                }}
                            >
                                {links.map((link) => (
                                    <Link href={link.url} underline="none" key={link.id} display="flex" flexGrow="1.1">
                                        <Typography color="#fff" fontWeight="bold">
                                            {link.route}
                                        </Typography>
                                    </Link>
                                ))}
                            </Box>
                        )}
                    </Toolbar>
                </AppBar>
            </Box>
            <Box width="100%" display="flex" minHeight="600px" alignItems="center" justifyContent="center">
                <Grid container spacing={6} display="flex" alignItems="center" maxWidth="1300px" padding="50px">
                    <Grid item xs={12} md={7}>
                        <Typography variant="h3" fontWeight={700} paddingBottom="15px">
                            Raising Confident Learners!!
                        </Typography>
                        <Typography variant="h6" opacity="0.4" paddingBottom="30px">
                            Tutorly provides organisations, and schools with a fair and cost-effective online tutoring platform. Through rapid, on-demand, drop-in access to qualified teachers at any time, anywhere, and all inside a safe and secure online learning environment,
                            students have limitless learning options.
                        </Typography>
                        <Button variant="contained" color="primary" sx={{ width: "200px", fontSize: "16px" }}>
                            Find Out More
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <img src={myteam} alt="My Team" width="100%" />
                    </Grid>
                </Grid>
            </Box>
            );
            <Box flexGrow="1" padding="10px" maxWidth="700px" margin="30px auto">
                <Typography variant="h4" textAlign="center">
                    Contact Us
                </Typography>
                <Box marginTop="30px" component="form" noValidate autoComplete="off">
                    <TextField label="Full Name" variant="outlined" fullWidth marginBottom="20px !important" value={firstName} onChange={(e) => setFirstName(e.target.value)} style={{ padding: "6px", marginBottom: "20px !important" }} />

                    <TextField label="Email" variant="outlined" fullWidth marginBottom="20px !important" value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: "6px", marginBottom: "20px !important" }} />

                    <TextField label="Subject" variant="outlined" fullWidth marginBottom="20px !important" value={subject} onChange={(e) => setSubject(e.target.value)} style={{ padding: "6px", marginBottom: "20px !important" }} />

                    <TextField label="Message" variant="outlined" fullWidth marginBottom="20px !important" value={subject} onChange={(e) => setSubject(e.target.value)} rows={5} style={{ padding: "6px", marginBottom: "20px !important" }} />

                    <Button variant="contained" type="submit" color="primary" sx={{ width: "200px", fontSize: "16px" }} onClick={submitForm}>
                        Submit
                    </Button>
                </Box>
            </Box>
            <Box sx={{ flexGrow: 1 }} flexGrow={1} padding="20px" minHeight="10vh" display="flex" alignItems="center" justifyContent="center" flexDirection="column">
                <Typography paddingBottom="10px">
                    Copyright @{" "}
                    <Link href="#" target="_blank" underline="none">
                        Tutorly
                    </Link>
                </Typography>
                <Typography opacity="0.4"></Typography>
            </Box>
        </Box>
    );
};

export default Header;
