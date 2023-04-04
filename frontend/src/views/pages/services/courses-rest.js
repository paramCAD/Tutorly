import { faker } from "@faker-js/faker";
import { createAsyncThunk } from "@reduxjs/toolkit";
import httpClient from "../../../lib/httpClient";

export const getAllCourses = createAsyncThunk("/course/all", async ({ isTutor }) => {
    return (
        await httpClient.get("/course/all", {
            isTutor,
        })
    ).data;
});

export const getEnrolledCourses = createAsyncThunk("/course/enrolled", async ({ isTutor, studentId }) => {
    if (!isTutor) {
        return (
            await httpClient.post("/student/courses/enrolled", {
                isTutor,
                student: {
                    id: studentId,
                },
            })
        ).data;
    } else {
        return (
          await httpClient.get(`/tutor/${studentId}/courses`, {
            isTutor
          })
        ).data;
    }
});

export const getArchivedCourses = createAsyncThunk("/course/archived", async ({ isTutor, studentId }) => {
    return (
        await httpClient.post("/student/courses/archived", {
            isTutor,
            student: {
                id: studentId,
            },
        })
    ).data;
});

export const getRecommendedCourses = createAsyncThunk("/course/recommendations", async ({ isTutor, studentId }) => {
    return (
        await httpClient.post("/student/courses/recommendations", {
            isTutor,
            student: {
                id: studentId,
            },
        })
    ).data;
});

export const getRecommendedTutors = createAsyncThunk("/course/tutors", async ({ isTutor, studentId }) => {
    return (
        await httpClient.post("/student/tutors/recommendations", {
            isTutor,
            student: {
                id: studentId,
            },
        })
    ).data;
});

export const getCourseDetails = createAsyncThunk("/course/:id", async ({ isTutor, courseId }) => {
    return (await httpClient.get(`/course/${courseId}`)).data;
});

export const fetchForumPost = createAsyncThunk("discussion/forum", async () => {
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(
                Array.from({ length: 5 }, () => {
                    return {
                        id: faker.datatype.uuid(),
                        name: faker.name.findName() + " " + faker.name.lastName(),
                        title: faker.random.words(15),
                        message: faker.random.words(150),
                        timestamp: faker.date.between("2022-01-01T00:00:00.000Z", "2022-06-01T00:00:00.000Z"),
                    };
                })
                    .sort((x, y) => x.timestamp.getTime() - y.timestamp.getTime())
                    .map((itr) => {
                        const timestamp = itr.timestamp.toLocaleString();
                        return { ...itr, timestamp };
                    })
            );
        }, 1000);
    });
});

export const fetchPostDetails = createAsyncThunk("discussion/post", async () => {
    return await new Promise((resolve) => {
        setTimeout(() => {
            const data = {
                id: faker.datatype.uuid(),
                name: faker.name.findName() + " " + faker.name.lastName(),
                title: faker.lorem.words(15),
                message: faker.random.words(150),
                description: faker.random.words(150),
                timestamp: faker.date.between("2022-01-01T00:00:00.000Z", "2022-06-01T00:00:00.000Z"),
            };

            const responses = Array.from({ length: 5 }, () => {
                return {
                    id: faker.datatype.uuid(),
                    name: faker.name.findName() + " " + faker.name.lastName(),
                    title: faker.lorem.words(15),
                    message: faker.random.words(150),
                    description: faker.random.words(150),
                    timestamp: faker.date.between("2022-01-01T00:00:00.000Z", "2022-06-01T00:00:00.000Z"),
                };
            });

            resolve({ data, responses });
        }, 1000);
    });
});
