import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header.jsx";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader.jsx";
import { FaTrash, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import Select from 'react-select';

const Employes = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [editUserId, setEditUserId] = useState(null);
    const [editedUserData, setEditedUserData] = useState({});
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                };
                // Remplacez par l'URL appropriée pour obtenir les employés
                const response = await axios.get(`http://localhost:5000/api/users/employees/?page=${currentPage}&pageSize=10`, config);
                setUsers(response.data.users);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error('Failed to fetch users:', error);
                toast.error('Failed to fetch users. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        const fetchRoles = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/roles`);
                setRoles(response.data.map(role => ({ value: role.id, label: role.name })));
            } catch (error) {
                console.error('Failed to fetch roles:', error);
                toast.error('Failed to fetch roles. Please try again later.');
            }
        };

        fetchUsers();
        fetchRoles();
    }, [currentPage]);

    const handlePreviousPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    const handleEditClick = (user) => {
        setEditUserId(user.id);
        setEditedUserData({
            ...user,
            roleId: user.roleId || user.Role.id // Assurez-vous que roleId est bien initialisé
        });
    };

    const handleCancelEdit = () => {
        setEditUserId(null);
        setEditedUserData({});
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUserData({ ...editedUserData, [name]: value });
    };

    const handleRoleChange = (selectedOption) => {
        setEditedUserData({ ...editedUserData, roleId: selectedOption ? selectedOption.value : editedUserData.roleId });
    };

    const handleSaveChanges = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            };

            const updatedData = {
                name: editedUserData.name,
                email: editedUserData.email,
                phone: editedUserData.phone,
                address: editedUserData.address,
                roleId: editedUserData.roleId // Utilisez roleId pour correspondre au backend
            };

            const response = await axios.put(`http://localhost:5000/api/users/${editUserId}`, updatedData, config);

            setUsers(users.map(user => user.id === editUserId ? { ...user, ...updatedData, Role: roles.find(role => role.value === updatedData.roleId) } : user));
            setEditUserId(null);
            toast.success('User updated successfully.');
        } catch (error) {
            console.error('Failed to update user:', error);
            toast.error('Failed to update user. Please try again later.');
        }
    };

    const handleDeleteUser = async (userId) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                };
                await axios.delete(`http://localhost:5000/api/users/${userId}`, config);
                toast.success("Utilisateur supprimé avec succès");
                setUsers(users.filter(user => user.id !== userId));
            } catch (error) {
                console.error('Failed to delete user:', error);
                toast.error('Échec de la suppression de l\'utilisateur.');
            }
        }
    };

    return (
        <div className="page-wrapper">
            <div className="page-content">
                <div className="main-container">
                    <Link to="/home" className="theme-switch" target="_blank"></Link>
                    <Header />
                    <div className="page-header">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">Liste des employés</li>
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
                                        {loading ? (
                                            <tr>
                                                <td colSpan="6">
                                                    <Loader />
                                                </td>
                                            </tr>
                                        ) : users.map((user) => (
                                            <tr key={user.id}>
                                                <td>
                                                    {editUserId === user.id ? (
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            value={editedUserData.name}
                                                            onChange={handleInputChange}
                                                        />
                                                    ) : (
                                                        user.name
                                                    )}
                                                </td>
                                                <td>
                                                    {editUserId === user.id ? (
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            value={editedUserData.email}
                                                            onChange={handleInputChange}
                                                        />
                                                    ) : (
                                                        user.email
                                                    )}
                                                </td>
                                                <td>
                                                    {editUserId === user.id ? (
                                                        <input
                                                            type="text"
                                                            name="phone"
                                                            value={editedUserData.phone}
                                                            onChange={handleInputChange}
                                                        />
                                                    ) : (
                                                        user.phone
                                                    )}
                                                </td>
                                                <td>
                                                    {editUserId === user.id ? (
                                                        <input
                                                            type="text"
                                                            name="address"
                                                            value={editedUserData.address}
                                                            onChange={handleInputChange}
                                                        />
                                                    ) : (
                                                        user.address
                                                    )}
                                                </td>
                                                <td>
                                                    {editUserId === user.id ? (
                                                        <Select
                                                            value={roles.find(role => role.value === editedUserData.roleId)} // Utilisez roleId ici
                                                            onChange={handleRoleChange}
                                                            options={roles}
                                                        />
                                                    ) : (
                                                        user.Role.name
                                                    )}
                                                </td>
                                                <td>
                                                    {editUserId === user.id ? (
                                                        <>
                                                            <button
                                                                className="btn btn-success btn-sm"
                                                                onClick={handleSaveChanges}
                                                            >
                                                                <FaSave /> Enregistrer
                                                            </button>
                                                            <button
                                                                className="btn btn-secondary btn-sm"
                                                                onClick={handleCancelEdit}
                                                            >
                                                                <FaTimes /> Annuler
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <button
                                                                className="btn btn-primary btn-sm"
                                                                onClick={() => handleEditClick(user)}
                                                            >
                                                                <FaEdit /> Modifier
                                                            </button>
                                                            <button
                                                                className="btn btn-danger btn-sm"
                                                                onClick={() => handleDeleteUser(user.id)}
                                                            >
                                                                <FaTrash /> Supprimer
                                                            </button>
                                                        </>
                                                    )}
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

export default Employes;
