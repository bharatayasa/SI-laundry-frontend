import { useState, useEffect } from 'react';
import SidebarMenu from '../../../components/SidebarMenu';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import api from '../../../services/api';
import Footer from '../../../components/Footer';

export default function index() {
    const [transaksis, setTransaksi] = useState([]);
    const [search, setSearch] = useState('');
    const [searchCriteria, setSearchCriteria] = useState('status_transaksi');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    const fetchDataTransaksi = async () => {
        const token = Cookies.get('token');

        if (token) {
            api.defaults.headers.common['Authorization'] = token;
            try {
                const response = await api.get('/transaksi');
                setTransaksi(response.data.data);
            } catch (error) {
                console.error("There was an error fetching the users!", error);
            }
        } else {
            console.log("Token is not available");
        }
    }

    useEffect(() => {
        fetchDataTransaksi();
    }, []);

    const deleteTransaksi = async (id) => {
        const token = Cookies.get('token'); 

        if (token) {
            api.defaults.headers.common['Authorization'] = token; 

            try {
                if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
                    await api.delete(`/transaksi/${id}`)
                    fetchDataTransaksi();
                }
            } catch (error) {
                console.error("There was an error deleting the user!", error);
            }
        } else {
            console.error("Token is not available!");
        }
    }

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
        setCurrentPage(1);
    };

    const handleSearchCriteriaChange = (event) => {
        setSearchCriteria(event.target.value);
        setCurrentPage(1);
    };

    const filteredTransaksi = transaksis.filter((transaksi) => {
        return transaksi[searchCriteria].toLowerCase().includes(search.toLowerCase());
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredTransaksi.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <div>
                <SidebarMenu /> 
            </div>
            <div>
                <div className='container mx-auto'>
                    <button className='btn btn-outline btn-primary'>
                        <Link to="/admin/pelanggan/CreatePelanggan">Tambah</Link>
                    </button>
                </div>
                <div className='container mx-auto my-4 flex items-center gap-4'>
                    <input
                        type="text"
                        placeholder="Search Pelanggan"
                        value={search}
                        onChange={handleSearchChange}
                        className="input input-bordered w-full max-w-xs"
                    />
                    <select
                        value={searchCriteria}
                        onChange={handleSearchCriteriaChange}
                        className="select select-bordered w-full max-w-xs"
                    >
                        <option value="status_transaksi">status_transaksi</option>
                    </select>
                </div>
                <div className='container mx-auto'>
                    <div className="overflow-x-auto">
                        <table className="table table-lg table-pin-rows table-pin-cols">
                            <thead>
                                <tr className='text-lg font-bold text-center'>
                                    <th>id_transaksi</th>
                                    <th>id_harga</th>
                                    <th>id_pakaian</th>
                                    <th>id_pelanggan</th>
                                    <th>tanggal_masuk</th>
                                    <th>harga_transaksi</th>
                                    <th>berat_transaksi</th>
                                    <th>tanggal_selesai</th>
                                    <th>status_transaksi</th>
                                    <th>transaksi_harga</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.length > 0 ? (
                                    currentItems.map((transaksi, index) => (
                                        <tr key={index} className="hover">
                                            <td>{transaksi.id_transaksi}</td>
                                            <td>{transaksi.id_harga}</td>
                                            <td>{transaksi.id_pakaian}</td>
                                            <td>{transaksi.id_pelanggan}</td>
                                            <td>{transaksi.tanggal_masuk}</td>
                                            <td>{transaksi.harga_transaksi}</td>
                                            <td>{transaksi.berat_transaksi}</td>
                                            <td>{transaksi.tanggal_selesai}</td>
                                            <td>{transaksi.status_transaksi}</td>
                                            <td>{transaksi.transaksi_harga}</td>
                                            <td>
                                                <div className='flex gap-2 justify-center'>
                                                    <div className="btn btn-outline btn-success">
                                                        <Link to={`/admin/transaksi/EditPelanggan/${transaksi.id_transaksi}`}>ubah</Link>
                                                    </div>
                                                    <div className="btn btn-outline btn-secondary">
                                                        <button onClick={() => deleteTransaksi(transaksi.id_transaksi)}>hapus</button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className='text-center'>
                                            Data Belum Tersedia!
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className='flex justify-center my-4'>
                        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className='btn btn-primary mr-2'>
                            Sebelumnya
                        </button>
                        <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastItem >= filteredTransaksi.length} className='btn btn-primary'>
                            Selanjutnya
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
