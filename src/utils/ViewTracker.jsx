import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { incrementView } from '../apis/totalViewApi';

let lastPath = null;

const ViewTracker = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.pathname !== lastPath) {
            lastPath = location.pathname;
            incrementView().catch(err => {
                console.error('Failed to track view:', err.message);
            });
        }
    }, [location]);

    return null;
};

export default ViewTracker;