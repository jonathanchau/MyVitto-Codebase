import { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = () => {
    const { authenticated, rememberLogin } = useAuth();
    const [authStatusKnown, setAuthStatusKnown] = useState(false);

    useEffect(() => {
        const checkAuthStatus = async () => {
          await rememberLogin(); // Check if user is already logged in via cookie
          setAuthStatusKnown(true); // Once authentication status is known, set authStatusKnown to true
        };
        checkAuthStatus();
    }, [rememberLogin]);

    if (!authStatusKnown) {
        return (null);
    }

    // TODO: Fix bug where login appears for a brief moment
    return (
        authenticated ? <Outlet/> : <Navigate to="/login" />
    );
};

export default PrivateRoute;
