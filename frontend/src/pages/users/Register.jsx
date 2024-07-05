import Header from "../../components/Header.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Loader from "../../components/Loader";
import { useRegisterMutation, useGetRolesQuery } from "../../redux/api/usersApiSlice";
import { setCredentials } from '../../features/authSlice.js';
import { toast } from "react-toastify";

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [selectedRole, setSelectedRole] = useState('');

    const { data: roles, isLoading: rolesLoading } = useGetRolesQuery();
    const [register, { isLoading }] = useRegisterMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Les mots de passe ne correspondent pas");
            return;
        }

        const userData = { name, email, phone, address, password, role: selectedRole };
        console.log('Sending registration request:', userData); // Debug log

        try {
            const res = await register(userData).unwrap();
            dispatch(setCredentials({ ...res }));
            toast.success("Utilisateur enregistré avec succès");
            navigate('/');
        } catch (err) {
            console.error("Registration error:", err);
            toast.error(err.data?.message || "Une erreur s'est produite");
        }
    };

    return (
        <div className="page-wrapper">
            <div className="page-content">
                <div className="main-container">
                    <Header />
                    <div className="page-header">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">Ajouter un utilisateur</li>
                        </ol>
                    </div>
                    <div className="row gutters">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={submitHandler}>
                                        <div className="row gutters">
                                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                                <div className="form-group">
                                                    <label htmlFor="inputName">Nom d'utilisateur</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="inputName"
                                                        placeholder="Entrer un nom d'utilisateur"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                                <div className="form-group">
                                                    <label htmlFor="inputEmail">Adresse email</label>
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        id="inputEmail"
                                                        placeholder="Entrer email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                                <div className="form-group">
                                                    <label htmlFor="inputPwd">Mot de passe</label>
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        id="inputPwd"
                                                        placeholder="Mot de passe"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                                <div className="form-group">
                                                    <label htmlFor="inputAddress">Adresse</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="inputAddress"
                                                        placeholder="Entrer une adresse"
                                                        value={address}
                                                        onChange={(e) => setAddress(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                                <div className="form-group">
                                                    <label htmlFor="inputPhone">Téléphone</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="inputPhone"
                                                        placeholder="Entrer un numéro de téléphone"
                                                        value={phone}
                                                        onChange={(e) => setPhone(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                                <div className="form-group">
                                                    <label htmlFor="inputConfirmPwd">Confirmer mot de passe</label>
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        id="inputConfirmPwd"
                                                        placeholder="Confirmer mot de passe"
                                                        value={confirmPassword}
                                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                                                <div className="form-group">
                                                    <label htmlFor="inputRole">Role</label>
                                                    <select
                                                        className="form-control"
                                                        id="inputRole"
                                                        value={selectedRole}
                                                        onChange={(e) => setSelectedRole(e.target.value)}
                                                    >
                                                        {rolesLoading ? (
                                                            <option>Loading...</option>
                                                        ) : (
                                                            roles?.map((role) => (
                                                                <option key={role._id} value={role._id}>
                                                                    {role.name}
                                                                </option>
                                                            ))
                                                        )}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            disabled={isLoading}
                                            type="submit"
                                            className="btn btn-primary"
                                        >
                                            {isLoading ? "Enregistrement..." : "Enregistrer"}
                                        </button>
                                        {isLoading && <Loader />}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
