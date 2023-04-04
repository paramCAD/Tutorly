/**
 * @author Harsh Shah
 */
import { Grid } from "@mui/material";
import ContactList from "./contact-list/ContactList";

export const Connections = () => {
    return (
        <>
            <Grid px={20} item xs={12} sm={12} sx={{ height: "100%" }}>
                <ContactList />
            </Grid>
        </>
    );
};
