import {Link} from "react-router-dom";
const Navigation = () => {
    return (
        <div>
            <div className="page-wrapper">
                <nav id="sidebar" className="sidebar-wrapper">
                    <div className="sidebar-brand">
                        <Link to="index.html" className="logo">
                            <img src="img/logo.png" alt="Goldfinch Admin Dashboard"/>
                        </Link>
                    </div>
                    <div className="sidebar-user-details">
                        <div className="user-profile">
                            <img src="img/user2.png" className="profile-thumb" alt="User Thumb"/>
                            <h6 className="profile-name">Yuki Hayashi</h6>
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
                                    <a href="login.html">
                                        <i className="icon-exit_to_app"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="sidebar-content">
                        <div className="sidebar-menu">
                            <ul>
                                <li className="active">
                                    <Link to="/home" className="current-page">
                                        <i className="icon-home2"></i>
                                        <span className="menu-text">Dashboard</span>
                                    </Link>
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
