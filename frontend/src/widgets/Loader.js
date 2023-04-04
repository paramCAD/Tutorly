import { Box, CircularProgress } from "@mui/material";
import React from "react";

const Loader = () => {
  return (
    <Box
      display={"flex"}
      height={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loader;
