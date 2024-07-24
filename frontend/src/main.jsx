// main.jsx
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from "./pages/users/Register.jsx";
import AllUsers from "./pages/users/AllUsers.jsx";
import store from './redux/store';
import PrivateRoute from './components/PrivateRoute.jsx';
import ResetPassword from "./pages/users/ResetPassword.jsx";
import UpdatePassword from "./pages/users/UpdatePassword.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="update-password" element={<UpdatePassword />} />
            <Route element={<PrivateRoute />}>
                <Route path="home" element={<Home />} />
                <Route path="register" element={<Register />} />
                <Route path="users" element={<AllUsers />} />
            </Route>
        </Route>
    )
);

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);
