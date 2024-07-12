import { useState, useEffect } from 'react';
import SidebarMenu from '../../../components/SidebarMenu';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import api from '../../../services/api';

export default function Index() {
    const [pelanggans, setPelanggans] = useState([]);

    // Read data pelanggan
    const fetchDataPelanggan = async () => {
        const token = Cookies.get('token');

        if (token) {
            api.defaults.headers.common['Authorization'] = token;
            try {
                const response = await api.get('/pelanggan');
                setPelanggans(response.data.data);
            } catch (error) {
                console.error("There was an error fetching the users!", error);
            }
        } else {
            console.log("Token is not available");
        }
    }

    useEffect(() => {
        fetchDataPelanggan();
    }, []);

    // Delete pelanggan
    const deletePelanggan = async (id) => {
        const token = Cookies.get('token'); 

        if (token) {
            api.defaults.headers.common['Authorization'] = token; 

            try {
                await api.delete(`/pelanggan/${id}`)
                fetchDataPelanggan();
            } catch (error) {
                console.error("There was an error deleting the user!", error);
            }
        } else {
            console.error("Token is not available!");
        }
    }

    return (
        <div>
            <div>
                <div>
                    <SidebarMenu />
                </div>
                <div>
                    <div>
                        <Link to="/admin/pelanggan/CreatePelanggan">ADD PELANGGAN</Link>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nama Pelanggan</th>
                                <th>Tlp Pelanggan</th>
                                <th>Alamat Pelanggan</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pelanggans.length > 0 ? (
                                pelanggans.map((pelanggan, index) => (
                                    <tr key={index}>
                                        <td>{pelanggan.id_pelanggan}</td>
                                        <td>{pelanggan.nama_pelanggan}</td>
                                        <td>{pelanggan.tlp_pelanggan}</td>
                                        <td>{pelanggan.alamat_pelanggan}</td>

                                        <td>
                                        <Link to={`/admin/pelanggan/EditPelanggan/${pelanggan.id_pelanggan}`}>EDIT</Link>
                                            <button onClick={() => deletePelanggan(pelanggan.id_pelanggan)}>DELETE</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td>
                                        <div>
                                            Data Belum Tersedia!
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
