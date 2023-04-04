/**
 * @author Harsh Shah
 */
import { TextField } from "@mui/material";

const SearchBar = ({ label, onChange }) => {
    const onChangeHandler = (key) => {
        onChange(key);
    };

    return <TextField fullWidth id="outlined-basic-2" label={label || "Search Contact"} variant="outlined" onChange={(e) => onChangeHandler(e.target.value)} />;
};

export default SearchBar;
