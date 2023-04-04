/**
 * @author Harsh Shah
 */
import { TextField } from "@mui/material";

const SearchBar = ({ onChange }) => {

  const onChangeHandler = (key) => {
    onChange(key);
  };

  return (
    <TextField
      fullWidth
      id="outlined-basic-2"
      label="Search Contact"
      variant="outlined"
      onChange={(e) => onChangeHandler(e.target.value)}
    />
  );
};

export default SearchBar;
