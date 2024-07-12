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
            {/*  */}
            <div className="container mx-auto">
                <div className="navbar bg-primary/20 rounded-lg">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <ul tabindex="0" className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                <li>
                                    <a>
                                        <Link to="/admin/dashboard">Dashboard</Link>
                                    </a>
                                </li>
                                <li>
                                    <a>
                                        <Link to="/admin/pelanggan">Pelanggan</Link>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            <li>
                                <a>
                                    <Link to="/admin/dashboard">Dashboard</Link>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <Link to="/admin/pelanggan">Pelanggan</Link>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="navbar-end">
                        <a className="btn" onClick={logout} style={{ cursor: 'pointer' }}>Logout</a>
                    </div>
                </div>
            </div>
        </div>
    )
}