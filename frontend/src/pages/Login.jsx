// Login.jsx
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader.jsx';
import { useLoginMutation } from '../redux/api/usersApiSlice.js';
import { setCredentials } from '../features/authSlice.js';
import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login, { isLoading }] = useLoginMutation();
    const { userInfo } = useSelector((state) => state.auth);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/home';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({ user: res.user, token: res.token }));
            navigate(redirect);
        } catch (err) {
            console.error("Login error:", err);
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <div className="container">
            <form onSubmit={submitHandler}>
                <div className="row justify-content-md-center">
                    <div className="col-xl-4 col-lg-5 col-md-6 col-sm-12">
                        <div className="login-screen">
                            <div className="login-box">
                                <Link to="#" className="login-logo">
                                    <img src="img/logo.png" alt="Logo" />
                                </Link>
                                <h5>
                                    Bienvenue à nouveau,<br />
                                    Veuillez vous connecter à votre compte.
                                </h5>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="form-control"
                                        placeholder="Email"
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="form-control"
                                        placeholder="Mot de passe"
                                    />
                                </div>
                                <div className="actions mb-4">
                                    <button
                                        disabled={isLoading}
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        {isLoading ? 'Connexion...' : 'Connexion'}
                                    </button>
                                    {isLoading && <Loader />}
                                </div>
                                <hr />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;
