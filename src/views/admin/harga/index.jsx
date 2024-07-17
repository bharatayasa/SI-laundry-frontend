import { useState, useEffect } from 'react';
import SidebarMenu from '../../../components/SidebarMenu';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import api from '../../../services/api';
import Footer from '../../../components/Footer';

export default function Index() {
    const [harga, setHarga] = useState([]);

    const fetchDataHarga = async () => {
        const token = Cookies.get('token');

        if (token) {
            api.defaults.headers.common['Authorization'] = token;
            try {
                const response = await api.get('/harga');
                setHarga(response.data.data);
            } catch (error) {
                console.error("There was an error fetching the harga!", error);
            }
        } else {
            console.log("Token is not available");
        }
    };

    useEffect(() => {
        fetchDataHarga();
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <SidebarMenu />
            <div className='text-center text-2xl font-semibold'>
                <h1>Data Harga</h1>
            </div>
            <div className="flex-grow">
                <div className="container mx-auto py-6">
                    <div className="overflow-x-auto">
                        <table className="table table-lg table-pin-rows table-pin-cols">
                            <thead>
                                <tr className="text-lg font-bold text-center">
                                    <th>ID</th>
                                    <th>Harga Per Kilo</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {harga.length > 0 ? (
                                    harga.map((item, index) => (
                                        <tr key={index} className="hover">
                                            <td className="text-center">{item.id_harga}</td>
                                            <td>{item.harga_perkilo}</td>
                                            <td>
                                                <div className="flex gap-2 justify-center">
                                                    <div className="btn btn-outline btn-success">
                                                        <Link to={`/admin/harga/EditHarga/${item.id_harga}`}>Ubah</Link>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="text-center">
                                            Data Belum Tersedia!
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
