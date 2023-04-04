import { Grid } from "@mui/material";
import { Outlet } from "react-router";

const DiscussionLayout = () => {
  return (
    <Grid
      container
      item
      md={12}
      sm={12}
      sx={{ height: "90%", maxHeight: "90%" }}
    >
      <Outlet />
    </Grid>
  );
};

export default DiscussionLayout;
