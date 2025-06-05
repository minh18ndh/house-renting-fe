import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { STATIC_URL } from '../apis/apiFetch';

const getCookie = (name) => {
    const cookies = document.cookie.split('; ');
    const found = cookies.find(row => row.startsWith(name + '='));
    return found ? found.split('=')[1] : null;
};

const setCookie = (name, value, days = 1) => {
    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${value}; max-age=${maxAge}; path=/`;
};

const AdPopup = () => {
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (getCookie('hideAdPopup')) return;

        const timer = setTimeout(() => {
            setShowPopup(true);
        }, 60000); // 1 minute

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setShowPopup(false);
        setCookie('hideAdPopup', 'true', 1); // Expires in 1 day (won't show again in 1 day)
    };

    const handleViewNow = () => {
        setCookie('hideAdPopup', 'true', 1);
        navigate('/house/e24ded6e-6741-41be-8cbe-c960f097d393');
    };

    if (!showPopup) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
                <button
                    onClick={handleClose}
                    className="absolute top-2 right-2 text-gray-400 hover:text-black text-xl"
                >
                    &times;
                </button>
                <h2 className="text-xl font-bold mb-2">🔥 Special Offer!</h2>
                <p className="text-text-muted mb-4">Check out our featured rental listing of the week!</p>

                <img
                    src={`https://7dfa-14-232-114-126.ngrok-free.app/api/uploads/ny1.jpg`}
                    onError={(e) => {
                        e.target.src = `/placeholder.svg?width=400&height=250&text=House+Image`;
                    }}
                    alt="Featured House"
                    className="w-full h-48 object-cover rounded mb-4"
                />

                <button
                    onClick={handleViewNow}
                    className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-80 w-full"
                >
                    View Now
                </button>
            </div>
        </div>
    );
};

export default AdPopup;