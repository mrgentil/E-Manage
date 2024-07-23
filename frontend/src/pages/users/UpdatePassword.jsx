import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { updatePassword } from '../../redux/api/authActions';
import { toast } from 'react-toastify';

const UpdatePassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const token = new URLSearchParams(location.search).get('token');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(updatePassword(token, newPassword));
            navigate('/home'); // Redirige vers la page d'accueil après la mise à jour et la connexion
        } catch (err) {
            setMessage('Erreur lors de la mise à jour du mot de passe');
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="row justify-content-md-center">
                    <div className="col-xl-4 col-lg-5 col-md-6 col-sm-12">
                        <div className="login-screen">
                            <div className="login-box">
                                <Link to="#" className="login-logo">
                                    <img src="img/logo.png" alt="Logo"/>
                                </Link>
                                <h5>
                                    Bienvenue <br/>
                                    Mettre à jour le mot de passe
                                </h5>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="form-control"
                                        placeholder="Nouveau mot de passe"
                                    />
                                </div>


                                <div className="actions mb-4">
                                    <button type="submit" className="btn btn-primary">Mettre à jour</button>
                                </div>
                                <hr/>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default UpdatePassword;

