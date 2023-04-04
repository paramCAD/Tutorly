import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import AppRoutes from "./app-router";
import { store } from "./store";
import { theme } from "./theme/theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <>
            <ToastContainer />
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <AppRoutes />
                </ThemeProvider>
            </Provider>
        </>
    );
}

export default App;
