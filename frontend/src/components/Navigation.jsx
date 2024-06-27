import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useLogoutMutation} from '../redux/api/usersApiSlice.js';
import {logout} from "../features/authSlice";
import {useState} from 'react';

const Navigation = () => {
    const {userInfo} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [activeMenu, setActiveMenu] = useState('home'); // État pour suivre le menu actif
    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    const handleMenuClick = (menu) => {
        setActiveMenu(menu); // Mettre à jour le menu actif
    };

    return (
        <div>
            <div className="page-wrapper">
                <nav id="sidebar" className="sidebar-wrapper">
                    <div className="sidebar-brand">
                        <Link to="/home" className="logo" onClick={() => handleMenuClick('home')}>
                            <img src="img/logo.png" alt="Goldfinch Admin Dashboard"/>
                        </Link>
                    </div>
                    <div className="sidebar-user-details">
                        <div className="user-profile">
                            <img src="img/user2.png" className="profile-thumb" alt="User Thumb"/>
                            <h6 className="profile-name">{userInfo?.name}</h6>
                            <ul className="profile-actions">
                                <li>
                                    <a href="javascript:void(0)">
                                        <i className="icon-gitlab"></i>
                                        <span className="count-label green"></span>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)">
                                        <i className="icon-twitter1"></i>
                                    </a>
                                </li>
                                <li>
                                    <button onClick={logoutHandler} className="btn btn-link">
                                        <i className="icon-exit_to_app"></i> Déconnexion
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="sidebar-content">
                        <div className="sidebar-menu">
                            <ul>
                                <li className={activeMenu === 'home' ? 'active' : ''}>
                                    <Link to="/home" className="current-page" onClick={() => handleMenuClick('home')}>
                                        <i className="icon-home2"></i>
                                        <span className="menu-text">Dashboard</span>
                                    </Link>
                                </li>
                                <li className={`sidebar-dropdown ${activeMenu === 'users' ? 'active' : ''}`}>
                                    <a href="#" onClick={() => handleMenuClick('users')}>
                                        <i className="icon-user"></i>
                                        <span className="menu-text">Utilisateurs</span>
                                    </a>
                                    <div className="sidebar-submenu">
                                        <ul>
                                            <li>
                                                <Link to="/users" onClick={() => handleMenuClick('view-users')}>
                                                    Voir Utilisateurs
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/register"
                                                      onClick={() => handleMenuClick('add-user')}>
                                                    Ajouter Utilisateur
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Navigation;
