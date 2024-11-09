import { Outlet, useNavigate } from "react-router-dom"
import NavBar from "../components/NavBar"
import Auth from "../components/Auth/Auth";
import { useSelector } from "react-redux";
import { useEffect, useCallback } from "react";  // Import useCallback
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from "jwt-decode";

const Root = () => {
    const { token } = useSelector(state => state.auth)
    const navigate = useNavigate()

    // Use useCallback to memoize the function
    const isTokenExpired = useCallback(() => {
        if (!token) return true;
        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            return decodedToken.exp < currentTime;
        } catch (error) {
            return true;
        }
    }, [token]);  // Add token as a dependency

    useEffect(() => {
        if (isTokenExpired()) {
            localStorage.removeItem('jwtToken');
            toast.error('Session expired, please login again');
            navigate('/account/login');
        }
    }, [isTokenExpired, navigate]);  // Include isTokenExpired and navigate

    return (
        <>
            <NavBar />
            <main>
                <Outlet />
            </main>
            <Auth />
            <ToastContainer position="top-right" autoClose={2000}/>
        </>
    )
}

export default Root;
