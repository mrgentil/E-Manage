import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from './features/authSlice';
import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        const token = localStorage.getItem('token');
        if (userInfo && token) {
            dispatch(setCredentials({ user: JSON.parse(userInfo), token }));
            console.log('Retrieved userInfo from localStorage:', JSON.parse(userInfo));
            console.log('Retrieved token from localStorage:', token);
        }
    }, [dispatch]);

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
