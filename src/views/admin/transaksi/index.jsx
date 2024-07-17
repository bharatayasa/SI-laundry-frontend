import { useState, useEffect } from 'react';
import SidebarMenu from '../../../components/SidebarMenu';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import api from '../../../services/api';
import Footer from '../../../components/Footer';

export default function TransaksiPage() {
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
                console.error("There was an error fetching the transactions!", error);
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
                    await api.delete(`/transaksi/${id}`);
                    fetchDataTransaksi();
                }
            } catch (error) {
                console.error("There was an error deleting the transaction!", error);
            }
        } else {
            console.error("Token is not available!");
        }
    }

    const downloadTransaksi = async (id) => {
        const token = Cookies.get('token'); 

        if (token) {
            api.defaults.headers.common['Authorization'] = token; 

            try {
                const response = await api.get(`/transaksi/pdf/${id}`, { responseType: 'blob' });
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `transaksi_${id}.pdf`);
                document.body.appendChild(link);
                link.click();
                link.remove();
            } catch (error) {
                console.error("There was an error downloading the .pdf file!", error);
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
            <div className='text-center text-2xl font-semibold'>
                <h1>Data Transaksi</h1>
            </div>
            <div>
                <div className='container mx-auto'>
                    <button className='btn btn-outline btn-primary'>
                        <Link to="/admin/transaksi/CreateTransaksi">Tambah</Link>
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
                                    <th>ID Transaksi</th>
                                    <th>ID Pakaian</th>
                                    <th>Nama Pelanggan</th>
                                    <th>Tanggal Transaksi</th>
                                    <th>Berat</th>
                                    <th>Total dan Status</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.length > 0 ? (
                                    currentItems.map((transaksi, index) => (
                                        <tr key={index} className="hover">
                                            <td>{transaksi.id_transaksi}</td>
                                            <td>{transaksi.id_pakaian }</td>
                                            <td>{transaksi.nama_pelanggan}</td>
                                            <td>
                                                <div className='flex gap-1'>
                                                    <p className='text-primary'>masuk:</p>{transaksi.tanggal_masuk}
                                                </div>
                                                <div className='flex gap-1'>
                                                    <p className='text-secondary'>selesai: </p> { transaksi.tanggal_selesai}
                                                </div>
                                            </td>
                                            <td>
                                                {transaksi.berat_transaksi} Kg
                                            </td>
                                            <td>
                                                <div>
                                                    {transaksi.transaksi_harga}
                                                </div>
                                                <div className='text-accent'>
                                                    {transaksi.status_transaksi}
                                                </div>
                                            </td>
                                            <td>
                                                <div className='flex gap-2 justify-center'>
                                                    <div className="btn btn-outline btn-accent">
                                                        <button onClick={() => downloadTransaksi(transaksi.id_transaksi)}>cetak</button>
                                                    </div>
                                                    <div className="btn btn-outline btn-success">
                                                        <Link to={`/admin/transaksi/EditTransaksi/${transaksi.id_transaksi}`}>ubah</Link>
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
                                        <td colSpan="11" className='text-center'>
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
