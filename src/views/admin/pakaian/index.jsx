import { useState, useEffect } from 'react';
import SidebarMenu from '../../../components/SidebarMenu';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import api from '../../../services/api';
import Footer from '../../../components/Footer';

export default function index() {
    const [pakains, setPakaian] = useState([]);
    const [search, setSearch] = useState('');
    const [searchCriteria, setSearchCriteria] = useState('transaksi_pakaian');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    const fetchDataPakaian = async () => {
        const token = Cookies.get('token');

        if (token) {
            api.defaults.headers.common['Authorization'] = token;
            try {
                const response = await api.get('/pakaian');
                setPakaian(response.data.data);
            } catch (error) {
                console.error("There was an error fetching the users!", error);
            }
        } else {
            console.log("Token is not available");
        }
    }

    useEffect(() => {
        fetchDataPakaian();
    }, []);

    const deletePakaian = async (id) => {
        const token = Cookies.get('token'); 

        if (token) {
            api.defaults.headers.common['Authorization'] = token; 

            try {
                if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
                    await api.delete(`/pakaian/${id}`)
                    fetchDataPakaian();
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

    const filteredPakaians = pakains.filter((pakaian) => {
        return pakaian[searchCriteria].toLowerCase().includes(search.toLowerCase());
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredPakaians.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <div>
                <SidebarMenu /> 
            </div>
            <div>
                <div className='container mx-auto'>
                    <button className='btn btn-outline btn-primary'>
                        <Link to="/admin/pakaian/CreatePakaian">Tambah</Link>
                    </button>
                </div>
                <div className='container mx-auto my-4 flex items-center gap-4'>
                    <input
                        type="text"
                        placeholder="Search Pakaian"
                        value={search}
                        onChange={handleSearchChange}
                        className="input input-bordered w-full max-w-xs"
                    />
                    <select
                        value={searchCriteria}
                        onChange={handleSearchCriteriaChange}
                        className="select select-bordered w-full max-w-xs"
                    >
                        <option value="transaksi_pakaian">Transaksi Pakaian</option>
                        <option value="jenis_pakaian">Jenis Pakaian</option>
                    </select>
                </div>
                <div className='container mx-auto'>
                    <div className="overflow-x-auto">
                        <table className="table table-lg table-pin-rows table-pin-cols">
                            <thead>
                                <tr className='text-lg font-bold text-center'>
                                    <th>ID</th>
                                    <th>Transaksi Pakaian</th>
                                    <th>Jenis Pakaian</th>
                                    <th>Jumlah Pakaian</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.length > 0 ? (
                                    currentItems.map((pakaian, index) => (
                                        <tr key={index} className="hover">
                                            <td className='text-center'>{pakaian.id_pakaian}</td>
                                            <td>{pakaian.transaksi_pakaian}</td>
                                            <td>{pakaian.jenis_pakaian}</td>
                                            <td>{pakaian.jumlah_pakaian}</td>
                                            <td>
                                                <div className='flex gap-2 justify-center'>
                                                    <div className="btn btn-outline btn-success">
                                                        <Link to={`/admin/pakaian/EditPakaian/${pakaian.id_pakaian}`}>ubah</Link>
                                                    </div>
                                                    <div className="btn btn-outline btn-secondary">
                                                        <button onClick={() => deletePakaian(pakaian.id_pakaian)}>hapus</button>
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
                        <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastItem >= filteredPakaians.length} className='btn btn-primary'>
                            Selanjutnya
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
