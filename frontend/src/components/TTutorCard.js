/**
 * @author Arshdeep Singh
 */

import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Rating from "@mui/material/Rating";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button, Grid } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import { theme } from "../theme/theme";
import { useNavigate } from "react-router";
import { addToContactList } from "./Messaging/services/messaging-rest";
import { useDispatch } from "react-redux";
const BorderLinearProgress = styled(LinearProgress)(() => ({
    height: 10,
    borderRadius: 5,
}));
export default function TTutorCard({ tutorId, tutorName, description, rating, imageURL, courses, expertise }) {
    const [favorite, setFavorite] = React.useState(false);
    const dispatch = useDispatch();
    const [studentId, setStudentId] = React.useState("");
    const navigate = useNavigate();
    const handleFavoriteClick = () => {
        if (favorite) {
            setFavorite(false);
        } else {
            setFavorite(true);
        }
    };

    React.useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        setStudentId(user?.tutor?._id || user?.student?._id);
    }, []);

    const handleOnClick = () => {
        navigate(`/tutors/${tutorId}`);
    };
    return (
        <Card sx={{ maxWidth: 350 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {tutorName ? tutorName.substring(0, 1) : ""}
                    </Avatar>
                }
                title={tutorName}
                subheader={expertise}
            />
            <CardMedia component="img" height="194" image={imageURL} alt="Paella dish" />
            <CardContent style={{ maxHeight: 150 }}>
                <Rating name="half-rating" defaultValue={rating?.$numberDecimal} precision={0.5} readOnly />
                <br />
                <Typography variant="body2" color="text.secondary">
                    {description ? description?.substring(0, 120) + "..." : ""}
                </Typography>
                <br />
            </CardContent>
            <CardActions disableSpacing>
                <Grid container spacing={1}>
                    <Grid item xs={3} style={{ textAlign: "right" }}>
                        <Button onClick={() => dispatch(addToContactList({ userId1: tutorId, userId2: JSON.parse(localStorage.getItem("user")).id }))}>CHAT</Button>
                    </Grid>
                    <Grid item xs={9} style={{ textAlign: "right" }}>
                        <Button onClick={handleOnClick}>GO TO TUTOR PAGE</Button>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    );
}
