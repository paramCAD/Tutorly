/**
 * @author Bharatwaaj Shankaranarayanan
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
const BorderLinearProgress = styled(LinearProgress)(() => ({
    height: 10,
    borderRadius: 5,
}));
export default function TCourseCard({ courseId, courseName, tutorName, description, cost, rating, imageURL, showProgress, progress }) {
    const [favorite, setFavorite] = React.useState(false);
    const navigate = useNavigate();
    const handleFavoriteClick = () => {
        if (favorite) {
            setFavorite(false);
        } else {
            setFavorite(true);
        }
    };
    const handleOnClick = () => {
        navigate(`/courses/${courseId}`);
    };
    return (
        <Card sx={{ maxWidth: 350}}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {tutorName? tutorName.substring(0,1) : ""}
                    </Avatar>
                }
                title={courseName}
                subheader={tutorName}
                style={{
                    height: "100px"
                }}
            />
            <CardMedia component="img" height="194" image={imageURL} alt="Paella dish" style={{
                    width: "auto",
                    maxHeight: "200px",
                    objectFit: "contain",
                    background: "#F1F1F1"
                  }}/>
            <CardContent style={{
                height: "150px"
            }}>
                <Rating name="half-rating" defaultValue={rating?.$numberDecimal} precision={0.5} readOnly />
                <br />
                <Typography variant="body2" color="text.secondary">
                    {description? description?.substring(0, 120) + "..." : ""}
                </Typography>
                <br />
            </CardContent>
            {showProgress && <BorderLinearProgress style={{ marginTop: 15, marginLeft: 15, marginRight: 15 }} theme={theme} variant="determinate" value={progress?.$numberDecimal} />}
            <CardActions disableSpacing>
                <Grid container spacing={1}>
                    <Grid item xs={3}>
                        <Button>
                            <Typography color="text.secondary" style={{ fontWeight: "bold" }}>
                                {cost?.$numberDecimal}
                            </Typography>
                        </Button>
                    </Grid>
                    <Grid item xs={6} style={{ textAlign: "right" }}>
                        <Button onClick={handleOnClick}>GO TO COURSE</Button>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    );
}
