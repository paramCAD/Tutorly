import { createSlice } from '@reduxjs/toolkit';
import { getAllCourses, getArchivedCourses, getCourseDetails, getEnrolledCourses, getRecommendedCourses, getRecommendedTutors } from '../services/courses-rest';

const initialState = {
    enrolledCourses: {
        loading: true,
        data: []
    },
    recommendedCourses: {
        loading: true,
        data: [],
    },
    recommendedTutors: {
        loading: true,
        data: [],
    },
    archivedCourses: {
        loading: true,
        data: [],
    },
    allCourses: {
        loading: true,
        data: []
    },
    searchCourses: {
        loading: true,
        data: []
    },
    searchEnrolledCourses: {
        loading: true,
        data: []
    },
    searchArchivedCourses: {
        loading: true,
        data: []
    },
    searchRecommendedCourses: {
        loading: true,
        data: []
    },
    searchRecommendedTutors: {
        loading: true,
        data: []
    },
    courseDetail: {
        data: [],
        loading: true
    }
};

export const courseSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {
        updateSearchCourses: (state, action) => {
            state.searchCourses.data = action.payload;
        },
        updateEnrolledCourses: (state, action) => {
            state.searchEnrolledCourses.data = action.payload;
        },
        updateArchivedCourses: (state, action) => {
            state.searchArchivedCourses.data = action.payload;
        },
        updateRecommendedCourses: (state, action) => {
            state.searchRecommendedCourses.data = action.payload;
        },
        updateRecommendedTutors: (state, action) => {
            state.searchRecommendedTutors.data = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(getAllCourses.fulfilled, (state, action) => {
            state.allCourses.data = action.payload.data
            state.searchCourses.data = action.payload.data
            state.allCourses.loading = false
            state.searchCourses.loading = false
        });
        builder.addCase(getEnrolledCourses.fulfilled, (state, action) => {
            state.enrolledCourses.data = action.payload.data
            state.searchEnrolledCourses.data = action.payload.data
            state.enrolledCourses.loading = false
            state.searchEnrolledCourses.loading = false
        });
        builder.addCase(getArchivedCourses.fulfilled, (state, action) => {
            state.archivedCourses.data = action.payload.data
            state.searchArchivedCourses.data = action.payload.data
            state.archivedCourses.loading = false
            state.searchArchivedCourses.loading = false
        });
        builder.addCase(getRecommendedCourses.fulfilled, (state, action) => {
            state.recommendedCourses.data = action.payload.data
            state.searchRecommendedCourses.data = action.payload.data
            state.recommendedCourses.loading = false
            state.searchRecommendedCourses.loading = false
        });
        builder.addCase(getRecommendedTutors.fulfilled, (state, action) => {
            state.recommendedTutors.data = action.payload.data
            state.searchRecommendedTutors.data = action.payload.data
            state.recommendedTutors.loading = false
            state.searchRecommendedTutors.loading = false
        });
        builder.addCase(getCourseDetails.fulfilled, (state, action) => {
            state.courseDetail.data = action.payload.data
            state.courseDetail.loading = false
        });
    }
});

export const { updateSearchCourses, updateEnrolledCourses, updateArchivedCourses, updateRecommendedCourses, updateRecommendedTutors } = courseSlice.actions;

export default courseSlice.reducer;