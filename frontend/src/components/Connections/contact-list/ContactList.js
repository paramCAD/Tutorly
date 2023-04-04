/**
 * @author Harsh Shah
 */
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../widgets/Loader";
import { getPendingConversationRequest } from "../services/connection-rest";
import { searchRequest } from "../slice/connectionsSlice";
import ConnectionItemList from "./ConnectionItemList";
import SearchBar from "./SearchBar";

const ContactList = () => {
    const { isFetching, list, filteredList } = useSelector((state) => state.connections.requests);
    const dispatch = useDispatch();

    const [searchKey, setSearchKey] = useState("");

    const isSearchPerformed = searchKey.length !== 0;

    useEffect(() => {
        dispatch(getPendingConversationRequest(JSON.parse(localStorage.getItem("user")).id));
    }, [dispatch]);

    const onChangeHandler = (key) => {
        setSearchKey(key);
    };

    useEffect(() => {
        if (isSearchPerformed) {
            dispatch(searchRequest(searchKey));
        }
    }, [searchKey, isSearchPerformed, dispatch]);

    const contacts = isSearchPerformed ? filteredList : list;

    return (
        <Box sx={{ height: "100%" }}>
            <Box sx={{ height: "10%", mx: "20px" }}>
                <SearchBar onChange={onChangeHandler} />
            </Box>
            <Box sx={{ height: "90%", maxHeight: "90%", overflow: "auto" }}>{isFetching ? <Loader /> :
             <ConnectionItemList list={contacts} />}</Box>
        </Box>
    );
};

export default ContactList;
