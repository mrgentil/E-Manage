import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from "../components/Header.jsx";

const Home = () => {
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.auth);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalEmployees, setTotalEmployees] = useState(0);

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        } else {
            console.log('User Info from Redux:', userInfo);
        }

        const fetchTotalUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users/count');
                setTotalUsers(response.data.total);
            } catch (error) {
                console.error('Failed to fetch total users:', error);
            }
        };

        const fetchTotalEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users/employees/count');
                setTotalEmployees(response.data.total);
            } catch (error) {
                console.error('Failed to fetch total employees:', error);
            }
        };

        fetchTotalUsers();
        fetchTotalEmployees();
    }, [userInfo, navigate]);



    return (
        <div className="page-wrapper">
            <div className="page-content">
                <div className="main-container">
                    <div className="page-header">
                        <ol className="breadcrumb">
                            <h3 className="breadcrumb-item">Admin Dashboard, Bienvenu(e) {userInfo?.user?.name}!</h3>
                        </ol>
                        <ul className="app-actions">
                            <li>
                                <a href="#"> <i className="icon-export"></i> Export </a>
                            </li>
                        </ul>
                    </div>
                    <div className="row gutters">
                        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="info-stats2">
                                <div className="info-icon">
                                    <i className="icon-users"></i>
                                </div>
                                <div className="sale-num">
                                    <h2>{totalUsers}</h2>
                                    <p>Utilisateurs</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="info-stats2">
                                <div className="info-icon">
                                    <i className="icon-users"></i>
                                </div>
                                <div className="sale-num">
                                    <h2>{totalEmployees}</h2>
                                    <p>Employé(e)s</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="info-stats2">
                                <div className="info-icon">
                                    <i className="icon-shopping-bag1"></i>
                                </div>
                                <div className="sale-num">
                                    <h2>8423</h2>
                                    <p>Sales</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="info-stats2">
                                <div className="info-icon">
                                    <i className="icon-activity"></i>
                                </div>
                                <div className="sale-num">
                                    <h2>2619</h2>
                                    <p>Expenses</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
