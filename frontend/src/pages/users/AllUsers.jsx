import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import axios from "axios";
import Header from "../../components/Header.jsx";
import { Link } from "react-router-dom";

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editableUserId, setEditableUserId] = useState(null);
    const [editableUserName, setEditableUserName] = useState("");
    const [editableUserEmail, setEditableUserEmail] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem("jwtToken");
            const response = await axios.get("http://localhost:5000/api/users", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUsers(response.data); // Mettre à jour la liste des utilisateurs
            setIsLoading(false);
        } catch (error) {
            setError(error.message || "Une erreur s'est produite lors du chargement des utilisateurs.");
            setIsLoading(false);
        }
    };

    const toggleEdit = (id, name, email) => {
        setEditableUserId(id);
        setEditableUserName(name);
        setEditableUserEmail(email);
        // Ajouter ici d'autres champs à éditer si nécessaire
    };

    // Fonction pour mettre à jour un utilisateur
    const updateHandler = async (id) => {
        try {
            // Code pour mettre à jour l'utilisateur avec axios
            // Assurez-vous de gérer les champs à éditer comme vous l'avez fait précédemment
        } catch (err) {
            console.error("Erreur lors de la mise à jour de l'utilisateur:", err);
            // Ajoutez ici la gestion des erreurs lors de la mise à jour
        }
    };

    // Fonction pour supprimer un utilisateur
    const deleteHandler = async (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
            try {
                // Code pour supprimer l'utilisateur avec axios
                // Assurez-vous d'actualiser la liste des utilisateurs après la suppression
            } catch (err) {
                console.error("Erreur lors de la suppression de l'utilisateur:", err);
                // Ajoutez ici la gestion des erreurs lors de la suppression
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
                            <li className="breadcrumb-item">Liste des utilisateurs</li>
                        </ol>
                        <ul className="app-actions">
                            <li>
                                <a href="#">
                                    <i className="icon-export"></i> Export
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="row gutters">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="table-container">
                                <div className="t-header">Utilisateurs</div>
                                {isLoading ? (
                                    <Loader />
                                ) : error ? (
                                    <Message variant="danger">
                                        {error}
                                    </Message>
                                ) : (
                                    <div className="table-responsive">
                                        <table id="basicExample" className="table custom-table">
                                            <thead>
                                            <tr>
                                                <th>Nom</th>
                                                <th>Adresse Email</th>
                                                <th>Téléphone</th>
                                                <th>Adresse</th>
                                                <th>Est Administrateur</th>
                                                <th>Actions</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {users.map((user) => (
                                                <tr key={user._id}>
                                                    <td className="px-4 py-2">{user.name}</td>
                                                    <td className="px-4 py-2">
                                                        {editableUserId === user._id ? (
                                                            <div className="flex items-center">
                                                                <input
                                                                    type="text"
                                                                    value={editableUserName}
                                                                    onChange={(e) => setEditableUserName(e.target.value)}
                                                                    className="w-full p-2 border rounded-lg"
                                                                />
                                                                <button
                                                                    onClick={() => updateHandler(user._id)}
                                                                    className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
                                                                >
                                                                    <FaCheck />
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <div className="flex items-center">
                                                                {user.email}{" "}
                                                                <button
                                                                    onClick={() =>
                                                                        toggleEdit(user._id, user.name, user.email)
                                                                    }
                                                                >
                                                                    <FaEdit className="ml-[1rem]" />
                                                                </button>
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-2">{user.phone}</td>
                                                    <td className="px-4 py-2">{user.address}</td>
                                                    <td className="px-4 py-2">
                                                        {user.isAdmin ? (
                                                            <FaCheck style={{ color: "green" }} />
                                                        ) : (
                                                            <FaTimes style={{ color: "red" }} />
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        {!user.isAdmin && (
                                                            <div className="flex">
                                                                <button
                                                                    onClick={() => deleteHandler(user._id)}
                                                                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                                                >
                                                                    <FaTrash />
                                                                </button>
                                                            </div>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;
