import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Form, FormikProvider, useFormik } from "formik";
import { toast } from "react-toastify";
import { createForumPost, createPostResponse, updateForumPost } from "../services/discussion-rest";
import { useDispatch } from "react-redux";

/**
 * @author Harsh Shah
 */
const DiscussionForumResponseEditor = ({ open, post_id, onClose, editable, values }) => {
    const [isOpen, setOpen] = useState(open);

    const dispatch = useDispatch();

    const handleClose = () => {
        onClose();
    };

    const initialValues = {
        title: editable ? values.title : "",
        message: editable ? values.message : "",
    };

    const formik = useFormik({
        initialValues,
        onSubmit: async (values) => {
            try {
                const { title, message } = values;

                const payload = {
                    user_id: JSON.parse(localStorage.getItem("user")).id,
                    post_id,
                    title,
                    message,
                };

                if(editable){
                    dispatch(updateForumPost(payload));
                } else {
                    dispatch(createPostResponse(payload));
                }

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
            <DialogTitle>{editable ? "Edit Post" : "Add Response"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <Typography variant="p" fontWeight={"bold"}>
                        Enter below details to add response
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
                                    {editable ? "Update Post" : "Submit Response"}
                                </Button>
                            </Stack>
                        </Stack>
                    </Form>
                </FormikProvider>
            </DialogContent>
        </Dialog>
    );
};

export default DiscussionForumResponseEditor;
