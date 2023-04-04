/**
 * @author Harsh Shah
 */
import { Grid } from "@mui/material";
import ChatArea from "./chat-area/ChatArea";
import ContactList from "./contact-list/ContactList";

export const Messaging = () => {
  return (
    <>
      <Grid item md={3} xs={12} sm={12} sx={{ height: "100%" }}>
        <ContactList />
      </Grid>
      <Grid
        item
        md={9}
        sm={12}
        xs={12}
        px={3}
        sx={{ height: "100%", mt: { xs: "1rem", md: "0px" } }}
      >
        <ChatArea />
      </Grid>
    </>
  );
};
