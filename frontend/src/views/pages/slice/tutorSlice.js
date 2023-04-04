import { createSlice } from '@reduxjs/toolkit';
import { getAllTutors } from '../services/tutors-rest';

const initialState = {
    allTutors: {
        loading: true,
        data: []
    }
};

export const tutorSlice = createSlice({
    name: 'tutors',
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        builder.addCase(getAllTutors.fulfilled, (state, action) => {
            state.allTutors.data = action.payload.data
            state.allTutors.loading = false
        });
    }
});

//export const { updateSearchCourses, updateEnrolledCourses, updateArchivedCourses, updateRecommendedCourses, updateRecommendedTutors } = courseSlice.actions;

export default tutorSlice.reducer;