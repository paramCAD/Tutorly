import { Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setActiveTab } from "../../store/slice/appSlice";

const TabLayout = ({ data }) => {
  const navigate = useNavigate();

  const [value, setValue] = useState(data[0].label);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setActiveTab(newValue)
  };

  const activeTab = useSelector((state) => state.app.tab.active);

  useEffect(() => {
    if (activeTab) {
      handleChange(null, activeTab);
    }
  }, [activeTab]);

  return (
    <>
      <Tabs value={value} onChange={handleChange} textColor="inherit">
        {data.map(({ label, route }) => (
          <Tab
            key={label}
            value={label}
            label={label}
            onClick={() => navigate(route)}
          />
        ))}
      </Tabs>
    </>
  );
};

export default TabLayout;
