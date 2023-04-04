import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function TCard({ data, onSelect }) {
    const { name, picture, description, caption, id } = data;

    return (
        <Card
            onClick={() => onSelect(id)}
            sx={{
                height: "100%",

                "&:hover": {
                    cursor: "pointer",
                },
            }}
        >
            <CardMedia component="img" height={240} image={picture} alt={name} />
            <CardContent>
                <Typography variant="h5">
                    {caption || name}
                </Typography>
                <Typography sx={{ maxHeight: "190px", overflow: "hidden", whiteSpace: "wrap", textOverflow: "ellipsis" }} mt={1} fontStyle={"italic"} color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
}
