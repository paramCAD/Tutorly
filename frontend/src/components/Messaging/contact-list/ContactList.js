/**
 * @author Harsh Shah
 */
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ItemList from "../../../widgets/ItemList";
import Loader from "../../../widgets/Loader";
import { deleteConversation, fetchContactList } from "../services/messaging-rest";
import { searchContact, setActiveChat } from "../slice/MessageSlice";
import SearchBar from "./SearchBar";

const ContactList = () => {
  const { isFetching, list, filteredList } = useSelector(
    (state) => state.messages.contacts
  );
  const dispatch = useDispatch();

  const [searchKey, setSearchKey] = useState("");

  const isSearchPerformed = searchKey.length !== 0;

  useEffect(() => {
    dispatch(fetchContactList(JSON.parse(localStorage.getItem("user")).id));
  }, [dispatch]);

  const onSelectedHandler = (id) => {
    dispatch(setActiveChat(id));
  };

  const onDeleteHandler = (id) => {
       dispatch(deleteConversation(id))
  }

  const onChangeHandler = (key) => {
    setSearchKey(key);
  };

  useEffect(() => {
    if (isSearchPerformed) {
      dispatch(searchContact(searchKey));
    }
  }, [searchKey, isSearchPerformed, dispatch]);

  const contacts = isSearchPerformed ? filteredList : list;

  return (
    <Box sx={{ height: "100%" }}>
      <Box sx={{ height: "10%", mx: "20px" }}>
        <SearchBar onChange={onChangeHandler} />
      </Box>
      <Box sx={{ height: "90%", maxHeight: "90%", overflow: "auto" }}>
        {isFetching ? (
          <Loader />
        ) : (
          <ItemList list={contacts} onSelect={onSelectedHandler} onDelete={onDeleteHandler} />
        )}
      </Box>
    </Box>
  );
};

export default ContactList;
