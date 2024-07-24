import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header.jsx";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader.jsx";
import { FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchUsers = async (page) => {
        try {
            const response = await axios.get('http://localhost:5000/api/users', { params: { page, limit: 15 } });
            console.log('Fetched users:', response.data.rows); // Log des données récupérées
            setUsers(response.data.rows); // rows contiendra les utilisateurs
            setTotalPages(Math.ceil(response.data.count / 15)); // total des pages
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers(currentPage);
    }, [currentPage]);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    if (loading) return <Loader />;
    if (error) return <p>Erreur: {error}</p>;

    return (
        <div className="page-wrapper">
            <div className="page-content">
                <div className="main-container">
                    <Link to="/home" className="theme-switch" target="_blank"></Link>
                    <Header />
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
                                            <th>Entreprise</th>
                                            <th>Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {users.map(user => (
                                            <tr key={user.id}>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>{user.phone}</td>
                                                <td>{user.address}</td>
                                                <td>{user.role}</td>
                                                <td>{user.Entreprise ? user.Entreprise.name : 'N/A'}</td>
                                                <td>
                                                    <FaEdit />
                                                    <FaTrash />
                                                    <FaCheck />
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pagination-buttons">
                        <button onClick={handlePrevPage} disabled={currentPage === 1}>Précédent</button>
                        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Suivant</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;
