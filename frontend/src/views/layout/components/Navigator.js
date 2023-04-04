import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

const item = {
    py: "2px",
    px: 3,
    color: "rgba(255, 255, 255, 0.7)",
    "&:hover, &:focus": {
        bgcolor: "rgba(255, 255, 255, 0.08)",
    },
};

const itemCategory = {
    boxShadow: "0 -1px 0 rgb(255,255,255,0.1) inset",
    py: 1.5,
    px: 3,
};

const rootDomain = process.env.REACT_APP_BACKEND_BASE_URL;

export default function Navigator(props) {
    const { ...other } = props;

    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem("user"))

    const [categories, updateCategories] = useState([
        {
            id: "Interactions",
            children: [
                {
                    id: "Chat",
                    icon: <PeopleIcon />,
                    route: "/chat",
                },
                {
                    id: "Discussion Forum",
                    icon: <PeopleIcon />,
                    route: "/discussion",
                },
                {
                    id: "Blogs",
                    icon: <PeopleIcon />,
                    route: "/blogs",
                },
            ],
        },
    ]);

    const setActiveRoute = (category, child) => {
        updateCategories((oldState) => {
            const copy = [...oldState];
            copy.forEach((itr) => {
                [...itr.children].forEach((childItr) => {
                    if (itr.id === category && childItr.id === child) {
                        childItr.active = true;
                    } else {
                        childItr.active = false;
                    }
                });
            });

            return copy;
        });
    };

    return (
        <Drawer variant="permanent" {...other}>
            <List disablePadding>
                <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: "#fff" }}>Tutorly</ListItem>
                <ListItem
                    onClick={() => {
                        navigate("/");
                    }}
                    sx={{ ...item, ...itemCategory }}
                >
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText>Dashboard</ListItemText>
                </ListItem>
                {categories.map(({ id, children }) => (
                    <Box key={id} sx={{ bgcolor: "#101F33" }}>
                        <ListItem sx={{ py: 2, px: 3 }}>
                            <ListItemText sx={{ color: "#fff" }}>{id}</ListItemText>
                        </ListItem>
                        {children.map(({ id: childId, icon, active, route, tabs }) => (
                            <ListItem disablePadding key={childId}>
                                <ListItemButton
                                    onClick={() => {
                                        setActiveRoute(id, childId);
                                        navigate(route, { state: { tabs } });
                                    }}
                                    selected={active}
                                    sx={item}
                                >
                                    <ListItemIcon>{icon}</ListItemIcon>
                                    <ListItemText>{childId}</ListItemText>
                                </ListItemButton>
                            </ListItem>
                        ))}

                        <Divider sx={{ mt: 2 }} />
                    </Box>
                ))}
                <ListItem
                    onClick={() => {
                        fetch(`${rootDomain}/user/logout/${currentUser.id}`, {
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
                            } else {
                                alert(body.message)
                            }
                        })
                    }}
                    sx={{ ...item, ...itemCategory }}
                >
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                </ListItem>
            </List>
        </Drawer>
    );
}
