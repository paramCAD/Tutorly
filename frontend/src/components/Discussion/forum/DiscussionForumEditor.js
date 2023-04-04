import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Form, FormikProvider, useFormik } from "formik";
import { toast } from "react-toastify";
import { createForumPost } from "../services/discussion-rest";
import { useDispatch } from "react-redux";

/**
 * @author Harsh Shah
 */
const DiscussionForumEditor = ({ open, forum_id, onClose }) => {
    const [isOpen, setOpen] = useState(open);

    const dispatch = useDispatch();

    const handleClose = () => {
        onClose();
    };

    const initialValues = {
        title: "",
        message: "",
    };

    const formik = useFormik({
        initialValues,
        onSubmit: async (values) => {
            try {
                const { title, message } = values;

                const payload = {
                    user_id: JSON.parse(localStorage.getItem("user")).id,
                    forum_id,
                    title,
                    message,
                };

                dispatch(createForumPost(payload));
                onClose();
            } catch (error) {
                toast.error(error.message);
                console.error(error);
            }
        },
    });

    const { errors, touched, handleSubmit, getFieldProps } = formik;

    return (
        <Dialog open={isOpen} onClose={handleClose} fullWidth>
            <DialogTitle>Create Post </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <Typography variant="p" fontWeight={"bold"}>
                        Enter below details to create a post{" "}
                    </Typography>
                </DialogContentText>
                <FormikProvider value={formik}>
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                        <Stack spacing={3} mt={3}>
                            <TextField fullWidth label="Title" {...getFieldProps("title")} error={Boolean(touched.title && errors.title)} helperText={touched.title && errors.title} />

                            <TextField fullWidth label="Description" {...getFieldProps("message")} multiline rows={10} error={Boolean(touched.message && errors.message)} helperText={touched.message && errors.message} />

                            <Stack justifyContent={"end"} direction={"row"} spacing={2}>
                                <Button variant="outlined" color="error" onClick={handleClose}>
                                    Cancel
                                </Button>
                                <Button variant="contained" type="submit">
                                    Create Post
                                </Button>
                            </Stack>
                        </Stack>
                    </Form>
                </FormikProvider>
            </DialogContent>
        </Dialog>
    );
};

export default DiscussionForumEditor;
