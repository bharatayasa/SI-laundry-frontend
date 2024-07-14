import { Link, useNavigate, useLocation } from "react-router-dom";
import React, { useContext } from "react";
import Cookies from 'js-cookie';

import { AuthContext } from '../context/AuthContext';

export default function SidebarMenu() {
    const navigate = useNavigate();
    const location = useLocation();
    const { setIsAuthenticated } = useContext(AuthContext);

    const logout = () => {
        Cookies.remove('token');
        Cookies.remove('user');
        setIsAuthenticated(false);
        navigate("/login", { replace: true });
    }

    return (
        <div className="pb-20">
            <div className="navbar fixed w-full z-50 bg-primary/20 backdrop-blur-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>  
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li className={location.pathname === '/admin/dashboard' ? 'active' : ''}>
                                <Link to="/admin/dashboard">Dashboard</Link>
                            </li>
                            <li className={location.pathname === '/admin/pelanggan' ? 'active' : ''}>
                                <Link to="/admin/pelanggan">Pelanggan</Link>
                            </li>
                            <li className={location.pathname === '/admin/pakaian' ? 'active' : ''}>
                                <Link to="/admin/pakaian">Pakaian</Link>
                            </li>
                            <li className={location.pathname === '/admin/harga' ? 'active' : ''}>
                                <Link to="/admin/harga">Harga</Link>
                            </li>
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">Laundry</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 font-bold">
                        <li className={location.pathname === '/admin/dashboard' ? 'active' : ''}>
                            <Link to="/admin/dashboard">Dashboard</Link>
                        </li>
                        <li className={location.pathname === '/admin/pelanggan' ? 'active' : ''}>
                            <Link to="/admin/pelanggan">Pelanggan</Link>
                        </li>
                        <li className={location.pathname === '/admin/pakaian' ? 'active' : ''}>
                            <Link to="/admin/pakaian">Pakaian</Link>
                        </li>
                        <li className={location.pathname === '/admin/harga' ? 'active' : ''}>
                            <Link to="/admin/harga">Harga</Link>
                        </li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <div>
                        <a className="btn" onClick={logout} style={{ cursor: 'pointer' }}>Logout</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
