import { Link, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import Cookies from 'js-cookie'

import { AuthContext } from '../context/AuthContext';

export default function SidebarMenu() {

    const navigate = useNavigate();

    const { setIsAuthenticated } = useContext(AuthContext);

    const logout = () => {

        Cookies.remove('token');
        Cookies.remove('user');

        setIsAuthenticated(false);

        navigate("/login", { replace: true });
    }

    return (
        <div>
            <div>
                MAIN MENU
            </div>
            <div>
                <div>
                    <Link to="/admin/dashboard">Dashboard</Link>

                    <Link to="/admin/pelanggan">Pelanggan</Link>

                    <a onClick={logout} style={{ cursor: 'pointer' }}>Logout</a>
                </div>
            </div>
        </div>
    )
}