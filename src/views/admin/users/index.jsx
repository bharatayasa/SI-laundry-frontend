import { useState, useEffect } from 'react';
import SidebarMenu from '../../../components/SidebarMenu';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import api from '../../../services/api';

export default function UsersIndex() {
    const [users, setUsers] = useState([]);

    // read data pelanggan
    const fetchDataUsers = async () => {
    
        const token = Cookies.get('token');

        if (token) {
            api.defaults.headers.common['Authorization'] = token;

            try {
                const response = await api.get('/pelanggan');
                setUsers(response.data.data);
            } catch (error) {
                console.error("There was an error fetching the users!", error);
            }
        } else {
            console.error("Token is not available!");
        }

    }

    useEffect(() => {
        fetchDataUsers();
    }, []);

    // delete data pelanggan
    const deleteUser = async (id) => {
        const token = Cookies.get('token'); 

        if (token) {
            api.defaults.headers.common['Authorization'] = token;

            try {
                await api.delete(`/pelanggan/${id}`)

                fetchDataUsers()
            } catch (error) {
                console.error("There was an error deleting the user!", error);
            }
        } else {
            console.error("Token is not available!");
        }
    }

    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-md-3">
                    <SidebarMenu />
                </div>
                <div className="col-md-9">
                    <div className="card border-0 rounded shadow-sm">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <span>PELANGGAN</span>
                            <Link to="/admin/users/create" className="btn btn-sm btn-success rounded shadow-sm border-0">ADD USER</Link>
                        </div>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead className="bg-dark text-white">
                                    <tr className='center'>
                                        <th scope="col">ID Pelanggan</th>
                                        <th scope="col">Nama Pelanggan</th>
                                        <th scope="col">Tlp Pelanggan</th>
                                        <th scope="col">Alamat Pelanggan</th>
                                        <th scope="col" style={{ width: "17%" }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        users.length > 0
                                            ? users.map((user, index) => (
                                                <tr key={index}>
                                                    <td>{user.id_pelanggan}</td>
                                                    <td>{user.nama_pelanggan}</td>
                                                    <td>{user.tlp_pelanggan}</td>
                                                    <td>{user.alamat_pelanggan}</td>
                                                    <td className="text-center">
                                                        <Link to={`/admin/users/edit/${user.id_pelanggan}`} className="btn btn-sm btn-primary rounded-sm shadow border-0 me-2">EDIT</Link>
                                                        <button onClick={() => deleteUser(user.id_pelanggan)} className="btn btn-sm btn-danger rounded-sm shadow border-0">DELETE</button>
                                                    </td>
                                                </tr>
                                            ))

                                            : <tr>
                                                <td colSpan="4" className="text-center">
                                                    <div className="alert alert-danger mb-0">
                                                        Data Belum Tersedia!
                                                    </div>
                                                </td>
                                            </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}