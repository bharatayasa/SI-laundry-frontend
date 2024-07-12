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
        <div className="card border-0 rounded shadow-sm">
            <div className="card-header">
                MAIN MENU
            </div>
            <div className="card-body">
                <div className="list-group">
                    <Link to="/admin/dashboard" className="list-group-item list-group-item-action">Dashboard</Link>

                    <Link to="/admin/pelanggan" className="list-group-item list-group-item-action">Pelanggan</Link>

                    <a onClick={logout} className="list-group-item list-group-item-action" style={{ cursor: 'pointer' }}>Logout</a>
                </div>
            </div>
        </div>
    )
}