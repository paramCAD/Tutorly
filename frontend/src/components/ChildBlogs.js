import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

function ChildBlogs(props) {
    const { post } = props;

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const base64String = btoa(String.fromCharCode(...new Uint8Array(post.img.data)));
    var x=post.description
    x=x.substring(0,100)+"..."
    console.log(x)

    

    return (
        <>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                    {post.title}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                       {post.description}
                    </Typography>
                </Box>
            </Modal>
            <Grid item xs={12} md={6}>
                <CardActionArea component="a" href="#" onClick={handleOpen}>
                    <Card sx={{ display: "flex" }}>
                        <CardContent sx={{ flex: 1 }}>
                            <Typography component="h2" variant="h5" color="primary">
                                {post.title}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                {post.date}
                            </Typography>
                            <Typography variant="subtitle1" paragraph numberOfLines={1}>
                                {x}
                            </Typography>
                            
                        </CardContent>
                        <CardMedia component="img" sx={{ width: 160, display: { xs: "none", sm: "block" } }} image={`data:image/png;base64,${base64String}`} alt={post.imageLabel} />
                    </Card>
                </CardActionArea>
            </Grid>
        </>
    );
}

ChildBlogs.propTypes = {
    post: PropTypes.shape({
        date: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        imageLabel: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    }).isRequired,
};

export default ChildBlogs;
