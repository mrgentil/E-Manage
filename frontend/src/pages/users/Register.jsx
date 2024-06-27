import Header from "../../components/Header.jsx";
import {Link, useLocation, useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from '../../features/authSlice.js';
import { toast } from "react-toastify";

const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register, { isLoading }] = useRegisterMutation();

    const { userInfo } = useSelector((state) => state.auth);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get("redirect") ;

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Les mots de passe ne correspondent pas");
        } else {
            try {
                const res = await register({ name, email, phone, address, password }).unwrap();
                dispatch(setCredentials({ ...res }));
                navigate(redirect);
                toast.success("Utilisateur enregistré avec succès");
            } catch (err) {
                console.log(err);
                toast.error(err.data.message);
            }
        }
    };

    return (
        <div className="page-wrapper">
            <div className="page-content">
                <div className="main-container">
                    <Link
                        to="/home"
                        className="theme-switch"
                        target="_blank"
                    ></Link>
                    <Header/>
                    <div className="page-header">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">Ajouter un utilisateur</li>
                        </ol>
                        <ul className="app-actions">
                            <li>
                                <a href="#"> <i className="icon-export"></i> Export </a>
                            </li>
                        </ul>
                    </div>
                    <div className="row gutters">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={submitHandler}>
                                        <div className="row gutters">
                                            <div className="col-xl-4 col-lglg-4 col-md-4 col-sm-4 col-12">
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
                                            <div className="col-xl-4 col-lglg-4 col-md-4 col-sm-4 col-12">
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
                                            <div className="col-xl-4 col-lglg-4 col-md-4 col-sm-4 col-12">
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
                                            <div className="col-xl-4 col-lglg-4 col-md-4 col-sm-4 col-12">
                                                <div className="form-group">
                                                    <label htmlFor="inputName">Adresse</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="inputName"
                                                        placeholder="Entrer une adresse"
                                                        value={address}
                                                        onChange={(e) => setAddress(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lglg-4 col-md-4 col-sm-4 col-12">
                                                <div className="form-group">
                                                    <label htmlFor="inputName">Téléphone</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="inputName"
                                                        placeholder="Entrer un numéro de téléphone"
                                                        value={phone}
                                                        onChange={(e) => setPhone(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lglg-4 col-md-4 col-sm-4 col-12">
                                                <div className="form-group">
                                                    <label htmlFor="inputName">Confirmer mot de passe</label>
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        id="inputName"
                                                        placeholder="Confirmer mot de passe"
                                                        value={confirmPassword}
                                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                                    />
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
