import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useUpdatePasswordMutation } from '../../redux/api/usersApiSlice.js';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../features/authSlice.js';
import { toast } from 'react-toastify';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Les mots de passe ne correspondent pas');
            return;
        }
        try {
            const res = await updatePassword({ token, newPassword: password }).unwrap();
            dispatch(setCredentials(res));
            navigate('/home'); // Rediriger vers la page de profil après la connexion
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <div className="container">
            <form onSubmit={submitHandler}>
                <div className="row justify-content-md-center">
                    <div className="col-xl-4 col-lg-5 col-md-6 col-sm-12">
                        <div className="reset-password-screen">
                            <div className="reset-password-box">
                                <h5>Réinitialisez votre mot de passe</h5>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="form-control"
                                        placeholder="Nouveau mot de passe"
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="form-control"
                                        placeholder="Confirmer le nouveau mot de passe"
                                    />
                                </div>

                                <div className="actions mb-4">
                                    <button
                                        disabled={isLoading}
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        {isLoading ? 'Réinitialisation...' : 'Réinitialiser'}
                                    </button>
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

export default ResetPassword;
