// main.jsx
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { Route, RouterProvider, createRoutesFromElements } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import store from './redux/store';
import { AuthProvider } from './features/Auth.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route index element={<Login />} />
            <Route element={<PrivateRoute />}>
                <Route path="home" element={<Home />} />
            </Route>

        </Route>
    )
);

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </Provider>
);
