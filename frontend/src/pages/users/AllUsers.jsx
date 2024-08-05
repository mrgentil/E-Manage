import React, {useEffect, useState} from "react";
import axios from "axios";
import Header from "../../components/Header.jsx";
import {Link} from "react-router-dom";
import Loader from "../../components/Loader.jsx";
import {FaTrash, FaEdit, FaCheck} from "react-icons/fa";
import {toast} from "react-toastify";
import Select from 'react-select';

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, // Assurez-vous que le token est récupéré correctement
                    },
                };
                const response = await axios.get(`http://localhost:5000/api/users?page=${currentPage}&pageSize=10`, config);
                setUsers(response.data.users);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error('Failed to fetch users:', error);
                toast.error('Failed to fetch users. Please try again later.');
            }
        };

        fetchUsers();
    }, [currentPage]);

    const handlePreviousPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    return (
        <div className="page-wrapper">
            <div className="page-content">
                <div className="main-container">
                    <Link to="/home" className="theme-switch" target="_blank"></Link>
                    <Header/>
                    <div className="page-header">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">Liste des utilisateurs</li>
                        </ol>
                        <ul className="app-actions">
                            <li>
                                <a href="#">
                                    <i className="icon icon-export"></i> Export
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="row gutters">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="table-container">
                                <div className="table-responsive">
                                    <table id="basicExample" className="table custom-table m-0">
                                        <thead>
                                        <tr>
                                            <th>Nom</th>
                                            <th>Adresse Email</th>
                                            <th>Téléphone</th>
                                            <th>Adresse</th>
                                            <th>Role</th>
                                            <th>Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {users.map((user) => (
                                            <tr key={user.id}>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>{user.phone}</td>
                                                <td>{user.address}</td>
                                                <td>{user.Role.name}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pagination-buttons">
                        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                            Previous
                        </button>
                        <span>
                         Page {currentPage} of {totalPages}
                </span>
                        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;
