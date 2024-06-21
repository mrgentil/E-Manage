import {Link} from "react-router-dom";

const Header = () => {
    return (
        <div>
            <header className="header">
                <div className="toggle-btns">
                    <Link id="toggle-sidebar" to="#">
                        <i className="icon-list"></i>
                    </Link>
                    <Link id="pin-sidebar" to="#">
                        <i className="icon-list"></i>
                    </Link>
                </div>
                <div className="header-items">
                    <div className="custom-search">
                        <input
                            type="text"
                            className="search-query"
                            placeholder="Search here ..."
                        />
                        <i className="icon-search1"></i>
                    </div>
                    <ul className="header-actions">
                        <li className="dropdown">
                            <Link
                                to="#"
                                id="notifications"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                            >
                                <i className="icon-bell"></i>
                                <span className="count-label">8</span>
                            </Link>
                            <div
                                className="dropdown-menu dropdown-menu-right lrg"
                                aria-labelledby="notifications"
                            >
                                <div className="dropdown-menu-header">Notifications (40)</div>
                                <ul className="header-notifications">
                                    <li>
                                        <Link to="#">
                                            <div className="user-img away">
                                                <img src="img/user21.png" alt="User"/>
                                            </div>
                                            <div className="details">
                                                <div className="user-title">Abbott</div>
                                                <div className="noti-details">
                                                    Membership has been ended.
                                                </div>
                                                <div className="noti-date">Oct 20, 07:30 pm</div>
                                            </div>
                                        </Link>
                                    </li>
                                    {/* More notification items */}
                                </ul>
                            </div>
                        </li>
                        {/* More header actions */}
                    </ul>
                </div>
            </header>
        </div>
    );
};

export default Header;
