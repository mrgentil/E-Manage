import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import Header from "../components/Header.jsx";

const Home = () => {
    const { userInfo } = useSelector((state) => state.auth);

    return (
        <div className="page-wrapper">
            <div className="page-content">
                <div className="main-container">
                    <Link
                        to="/home"
                        className="theme-switch"
                        target="_blank"
                    ></Link>
                    <Header />
                    <div className="page-header">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">Admin Dashboard</li>
                        </ol>
                        <ul className="app-actions">
                            <li>
                                <a href="#"> <i className="icon-export"></i> Export </a>
                            </li>
                        </ul>
                    </div>
                    <div className="user-info">
                        <h3>Welcome, {userInfo?.name}!</h3>
                        <p>Email : {userInfo?.email}</p>
                        <p>
                            Roles :{" "}
                            {userInfo?.roles?.map((role) => role.name).join(', ')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
