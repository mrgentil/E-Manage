import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header.jsx";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader.jsx";
import { FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";
import Select from 'react-select';


const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [entreprises, setEntreprises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [editUserId, setEditUserId] = useState(null);
    const [editedUser, setEditedUser] = useState({});

    // Fonction pour récupérer les utilisateurs
    const fetchUsers = async (page) => {
        try {
            const response = await axios.get('http://localhost:5000/api/users', { params: { page, limit: 15 } });
            setUsers(response.data.rows);
            setTotalPages(Math.ceil(response.data.count / 15));
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    // Fonction pour récupérer les entreprises
    const fetchEntreprises = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/entreprises');
            setEntreprises(response.data.map(ent => ({
                value: ent.id,
                label: ent.name
            })));
        } catch (err) {
            setError(err.message);
        }
    };

    // Hook d'effet pour récupérer les données au chargement du composant
    useEffect(() => {
        fetchUsers(currentPage);
        fetchEntreprises();
    }, [currentPage]);

    // Fonction pour gérer le clic sur le bouton d'édition
    const handleEditClick = (user) => {
        setEditUserId(user.id);
        setEditedUser(user);
    };

    // Fonction pour gérer les changements dans les champs de saisie
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser(prevState => ({ ...prevState, [name]: value }));
    };

    // Fonction pour gérer les changements dans le sélecteur d'entreprise
    const handleSelectChange = (selectedOption) => {
        setEditedUser(prevState => ({ ...prevState, entrepriseId: selectedOption.value }));
    };

    // Fonction pour sauvegarder les modifications
    const handleSaveClick = async () => {
        try {
            console.log("Updating user with data: ", editedUser); // Ajout du débogage
            const response = await axios.put(`http://localhost:5000/api/users/${editedUser.id}`, editedUser, { withCredentials: true });
            console.log("API response: ", response.data); // Ajout du débogage
            toast.success('Utilisateur mis à jour avec succès!');
            setEditUserId(null);
            fetchUsers(currentPage);
        } catch (err) {
            console.error('Erreur lors de la mise à jour!', err); // Ajout du débogage
            toast.error('Erreur lors de la mise à jour!');
        }
    };

    // Fonction pour aller à la page suivante
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    // Fonction pour aller à la page précédente
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
                                                <td>
                                                    {editUserId === user.id ? (
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            value={editedUser.name}
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
                                                            value={editedUser.email}
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
                                                            value={editedUser.phone}
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
                                                            value={editedUser.address}
                                                            onChange={handleInputChange}
                                                        />
                                                    ) : (
                                                        user.address
                                                    )}
                                                </td>
                                                <td>
                                                    {editUserId === user.id ? (
                                                        <select
                                                            name="role"
                                                            value={editedUser.role}
                                                            onChange={handleInputChange}
                                                        >
                                                            <option value="Admin">Admin</option>
                                                            <option value="Recruteur">Recruteur</option>
                                                            <option value="Employe">Employe</option>
                                                            <option value="Formateur">Formateur</option>
                                                            <option value="DirecteurRH">DirecteurRH</option>
                                                        </select>
                                                    ) : (
                                                        user.role
                                                    )}
                                                </td>
                                                <td>
                                                    {editUserId === user.id ? (
                                                        <Select
                                                            name="entrepriseId"
                                                            value={entreprises.find(ent => ent.value === editedUser.entrepriseId)}
                                                            onChange={handleSelectChange}
                                                            options={entreprises}
                                                            placeholder="Sélectionnez une entreprise"
                                                        />
                                                    ) : (
                                                        user.Entreprise ? user.Entreprise.name : 'N/A'
                                                    )}
                                                </td>
                                                <td>
                                                    {editUserId === user.id ? (
                                                        <>
                                                            <FaCheck onClick={handleSaveClick} />
                                                            <FaTrash onClick={() => setEditUserId(null)} />
                                                        </>
                                                    ) : (
                                                        <FaEdit onClick={() => handleEditClick(user)} />
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
                        <button onClick={handlePrevPage} disabled={currentPage === 1}>Précédent</button>
                        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Suivant</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;
