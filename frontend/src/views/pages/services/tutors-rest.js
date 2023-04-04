import { faker } from "@faker-js/faker";
import { createAsyncThunk } from "@reduxjs/toolkit";
import httpClient from "../../../lib/httpClient";

export const getAllTutors = createAsyncThunk(
  "/tutor/all",
  async () => {
    return (
      await httpClient.get("/tutor/all")
    ).data;
  }
);


