import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const App = () => {



    return (
        <>
            <ToastContainer />
            <Navigation />
            <main className="py-3">
                <Outlet />
            </main>
        </>
    );
};

export default App;
