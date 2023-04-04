import { Grid } from "@mui/material";
import { Outlet } from "react-router";

const MessagingLayout = () => {
  return (
    <Grid
      container
      item
      md={12}
      sm={12}
      sx={{ height: "100%", maxHeight: "100%" }}
    >
      <Outlet />
    </Grid>
  );
};

export default MessagingLayout;
