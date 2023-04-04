import { useLocation } from "react-router";
import AppLayout from "./AppLayout";
import HomeLayout from "./HomeLayout";

const MasterLayout = () => {
    const location = useLocation();
    const mainRoute = location.pathname.split("/")[1];

    return <>{mainRoute === "discussion" || mainRoute === "chat" ? <AppLayout /> : <HomeLayout></HomeLayout>}</>;
};

export default MasterLayout;
