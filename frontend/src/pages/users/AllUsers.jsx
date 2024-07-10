import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header.jsx";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader.jsx";
import { FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [entreprises, setEntreprises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(10); // Nombre d'utilisateurs par page
    const [editableUserId, setEditableUserId] = useState(null);
    const [editableUser, setEditableUser] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        role: "",
        entreprise: ""
    });

    useEffect(() => {
        fetchUsers();
        fetchRoles();
        fetchEntreprises();
    }, [currentPage, perPage]);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5000/api/users?page=${currentPage}&limit=${perPage}`);
            setUsers(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching users:', error);
            toast.error('Erreur lors de la récupération des utilisateurs.');
        }
    };

    const fetchRoles = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/roles');
            setRoles(response.data);
        } catch (error) {
            console.error('Error fetching roles:', error);
            toast.error('Erreur lors de la récupération des rôles.');
        }
    };

    const fetchEntreprises = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/entreprises');
            setEntreprises(response.data);
        } catch (error) {
            console.error('Error fetching entreprises:', error);
            toast.error('Erreur lors de la récupération des entreprises.');
        }
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const toggleEdit = (user) => {
        if (editableUserId === user._id) {
            setEditableUserId(null);
        } else {
            setEditableUserId(user._id);
            setEditableUser({
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role._id,
                entreprise: user.entreprise._id
            });
        }
    };

    const handleUpdateUser = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/users/${id}`, editableUser);
            setEditableUserId(null);
            fetchUsers(); // Recharge la liste des utilisateurs après la mise à jour
            toast.success('Utilisateur mis à jour avec succès.');
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
            toast.error('Erreur lors de la mise à jour de l\'utilisateur.');
        }
    };

    const handleDeleteUser = async (userId) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
            try {
                await axios.delete(`http://localhost:5000/api/users/${userId}`);
                fetchUsers(); // Recharge la liste des utilisateurs après la suppression
                toast.success('Utilisateur supprimé avec succès.');
            } catch (error) {
                console.error('Erreur lors de la suppression de l\'utilisateur :', error);
                toast.error('Erreur lors de la suppression de l\'utilisateur.');
            }
        }
    };

    if (loading) {
        return <Loader />;
    }

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
                                            <tr key={user._id}>
                                                <td>
                                                    {editableUserId === user._id ? (
                                                        <input
                                                            type="text"
                                                            value={editableUser.name}
                                                            onChange={(e) => setEditableUser({ ...editableUser, name: e.target.value })}
                                                            className="form-control"
                                                        />
                                                    ) : (
                                                        user.name
                                                    )}
                                                </td>
                                                <td>
                                                    {editableUserId === user._id ? (
                                                        <input
                                                            type="text"
                                                            value={editableUser.email}
                                                            onChange={(e) => setEditableUser({ ...editableUser, email: e.target.value })}
                                                            className="form-control"
                                                        />
                                                    ) : (
                                                        user.email
                                                    )}
                                                </td>
                                                <td>
                                                    {editableUserId === user._id ? (
                                                        <input
                                                            type="text"
                                                            value={editableUser.phone}
                                                            onChange={(e) => setEditableUser({ ...editableUser, phone: e.target.value })}
                                                            className="form-control"
                                                        />
                                                    ) : (
                                                        user.phone
                                                    )}
                                                </td>
                                                <td>
                                                    {editableUserId === user._id ? (
                                                        <input
                                                            type="text"
                                                            value={editableUser.address}
                                                            onChange={(e) => setEditableUser({ ...editableUser, address: e.target.value })}
                                                            className="form-control"
                                                        />
                                                    ) : (
                                                        user.address
                                                    )}
                                                </td>
                                                <td>
                                                    {editableUserId === user._id ? (
                                                        <select
                                                            value={editableUser.role}
                                                            onChange={(e) => setEditableUser({ ...editableUser, role: e.target.value })}
                                                            className="form-control"
                                                        >
                                                            {roles.map(role => (
                                                                <option key={role._id} value={role._id}>{role.name}</option>
                                                            ))}
                                                        </select>
                                                    ) : (
                                                        user.role.name
                                                    )}
                                                </td>
                                                <td>
                                                    {editableUserId === user._id ? (
                                                        <select
                                                            value={editableUser.entreprise}
                                                            onChange={(e) => setEditableUser({ ...editableUser, entreprise: e.target.value })}
                                                            className="form-control"
                                                        >
                                                            {entreprises.map(entreprise => (
                                                                <option key={entreprise._id} value={entreprise._id}>{entreprise.name}</option>
                                                            ))}
                                                        </select>
                                                    ) : (
                                                        user.entreprise.name
                                                    )}
                                                </td>
                                                <td>
                                                    <div className="td-actions">
                                                        {editableUserId === user._id ? (
                                                            <button className="btn btn-success" onClick={() => handleUpdateUser(user._id)}>
                                                                <FaCheck />
                                                            </button>
                                                        ) : (
                                                            <button className="btn btn-primary" onClick={() => toggleEdit(user)}>
                                                                <FaEdit />
                                                            </button>
                                                        )}
                                                        <button className="btn btn-danger" onClick={() => handleDeleteUser(user._id)}>
                                                            <FaTrash />
                                                        </button>
                                                    </div>
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
                        <button onClick={handleNextPage}>Suivant</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;
