import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Loader from "../../components/Loader.jsx";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useCreateLeaveRequestMutation,  } from "../../redux/api/leavesApiSlice";

function AddLeaves() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [reason, setReason] = useState('');

    const [createLeaveRequest, { isLoading }] = useCreateLeaveRequestMutation();

    const cleanHTML = (html) => {
        // Remove HTML tags
        return html.replace(/<[^>]*>/g, '');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!startDate || !endDate || !reason) {
            toast.error("Veuillez remplir tous les champs.");
            return;
        }

        if (new Date(startDate) > new Date(endDate)) {
            toast.error("La date de début doit être avant la date de fin.");
            return;
        }

        try {
            const leaveRequestData = {
                startDate: startDate.toISOString().split('T')[0],
                endDate: endDate.toISOString().split('T')[0],
                reason: cleanHTML(reason),
            };

            await createLeaveRequest(leaveRequestData).unwrap();
            toast.success("Demande de congé envoyée avec succès !");
            setStartDate(null);
            setEndDate(null);
            setReason('');
        } catch (error) {
            toast.error("Erreur lors de la soumission de la demande de congé.");
        }
    };



    return (
        <div className="page-wrapper">
            <div className="page-content">
                <div className="main-container">
                    <div className="page-header">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">Demande Congé</li>
                        </ol>
                    </div>
                    <div className="row gutters">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="row gutters">
                                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                                <div className="form-group">
                                                    <label className="label">Date Début</label>
                                                    <DatePicker
                                                        selected={startDate}
                                                        onChange={(date) => setStartDate(date)}
                                                        dateFormat="yyyy-MM-dd"
                                                        className="form-control"
                                                        placeholderText="Sélectionnez une date de début"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                                <div className="form-group">
                                                    <label className="label">Date Fin</label>
                                                    <DatePicker
                                                        selected={endDate}
                                                        onChange={(date) => setEndDate(date)}
                                                        dateFormat="yyyy-MM-dd"
                                                        className="form-control"
                                                        placeholderText="Sélectionnez une date de fin"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <div className="card m-0">
                                                    <div className="card-header">
                                                        <div className="card-title">Raison</div>
                                                    </div>
                                                    <div className="card-body">
                                                        <ReactQuill
                                                            value={reason}
                                                            onChange={setReason}
                                                            placeholder="Entrez la raison de la demande"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="btn btn-primary" type="submit" disabled={isLoading}>
                                            {isLoading ? "Demander..." : "Demander"}
                                        </button>
                                        {isLoading && <Loader />}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddLeaves;
