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

    // Utilisation de la mutation de login
    const [login, { isLoading }] = useLoginMutation();

    // Récupérer les informations de l'utilisateur depuis le store Redux
    const { userInfo } = useSelector((state) => state.auth);

    // Récupérer le paramètre de redirection de l'URL
    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/home';

    useEffect(() => {
        // Rediriger l'utilisateur s'il est déjà connecté
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            // Effectuer la mutation de login
            const res = await login({ email, password }).unwrap();
            // Mettre à jour les informations de l'utilisateur dans le store Redux
            dispatch(setCredentials({ ...res }));
            navigate(redirect);
        } catch (err) {
            console.error("Login error:", err); // Log de l'erreur
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
                                <div className="text-center">
                                    <Link to="/register" className="text-decoration-none">
                                        Vous n'avez pas de compte? Inscrivez-vous ici
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;
