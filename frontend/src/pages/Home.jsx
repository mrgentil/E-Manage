import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        } else {
            console.log('User Info from Redux:', userInfo);
        }
    }, [userInfo, navigate]);

    return (
        <div className="page-wrapper">
            <div className="page-content">
                <div className="main-container">
                    <div className="page-header">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">Admin Dashboard</li>
                        </ol>
                    </div>
                    <div className="user-info">
                        {userInfo ? (
                            <>
                                <h3>Bienvenue, {userInfo?.user?.name}!</h3>
                                <p>Email : {userInfo?.user?.email}</p>
                                <p>Role de l'utilisateur : {userInfo?.user?.Role?.name}</p>
                            </>
                        ) : (
                            <p>Loading user information...</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
