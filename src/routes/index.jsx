import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../views/home/index.jsx";
import Login from "../views/auth/login.jsx";

import Dashboard from "../views/admin/dashboard/index.jsx";

// data pelanggan
import PelangganIndex from '../views/admin/pelanggan/index.jsx';
import CreatePelanggan from '../views/admin/pelanggan/CreatePelanggan.jsx';
import EditPelanggan from '../views/admin/pelanggan/EditPelanggan.jsx';

// data pakaian
import PakaianIndex from '../views/admin/pakaian/index.jsx';
import CreatePakaian from '../views/admin/pakaian/CreatePakaian.jsx';
import EditPakaian from '../views/admin/pakaian/EditPakaian.jsx';

// data harga
import HargaIndex from '../views/admin/harga/index.jsx';
import EditHarga from '../views/admin/harga/EditHarga.jsx';
export default function AppRoutes() {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={
                isAuthenticated ? <Navigate to="/admin/dashboard" replace /> : <Login />
            } />
            <Route path="/admin/dashboard" element={
                isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
            } />

            {/* route pelanggan */}
            <Route path="/admin/pelanggan" element={
                isAuthenticated ? <PelangganIndex /> : <Navigate to="/login" replace />
            } />
            <Route path="/admin/pelanggan/CreatePelanggan" element={
                isAuthenticated ? <CreatePelanggan /> : <Navigate to="/login" replace />
            } />
            <Route path="/admin/pelanggan/EditPelanggan/:id" element={
                isAuthenticated ? <EditPelanggan /> : <Navigate to="/login" replace />
            } />

            {/* route pakaian */}
            <Route path="/admin/pakaian" element={
                isAuthenticated ? <PakaianIndex /> : <Navigate to="/login" replace />
            } />
            <Route path="/admin/pakaian/CreatePakaian" element={
                isAuthenticated ? <CreatePakaian /> : <Navigate to="/login" replace />
            } />
            <Route path="/admin/pakaian/EditPakaian/:id" element={
                isAuthenticated ? <EditPakaian /> : <Navigate to="/login" replace />
            } />

            {/* harga */}
            <Route path="/admin/harga" element={
                isAuthenticated ? <HargaIndex /> : <Navigate to="/login" replace />
            } />
            <Route path="/admin/harga/EditHarga/:id" element={
                isAuthenticated ? <EditHarga /> : <Navigate to="/login" replace />
            } />
        </Routes>
    );
}