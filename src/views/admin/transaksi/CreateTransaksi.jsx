import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import api from '../../../services/api';
import SidebarMenu from '../../../components/SidebarMenu';
import Footer from '../../../components/Footer';

export default function CreateTransaksi() {
    const navigate = useNavigate(); 
    
    const [id_pakaian, setId_pakaian] = useState('');
    const [id_pelanggan, setId_pelanggan] = useState('');
    const [tanggal_masuk, setTanggal_masuk] = useState('');
    const [berat_transaksi, setBerat_transaksi] = useState('');
    const [tanggal_selesai, setTanggal_selesai] = useState('');
    const [status_transaksi, setStatus_transaksi] = useState('');
    
    const [validation, setValidation] = useState({});
    const [pakaians, setPakaians] = useState([]);
    const [pelanggans, setPelanggans] = useState([]);

    useEffect(() => {
        const token = Cookies.get('token');
        api.defaults.headers.common['Authorization'] = token;

        const fetchPakaians = async () => {
            try {
                const response = await api.get('/pakaian');
                setPakaians(response.data.data);
            } catch (error) {
                console.error("There was an error fetching the pakaian!", error);
            }
        };

        const fetchPelanggans = async () => {
            try {
                const response = await api.get('/pelanggan');
                setPelanggans(response.data.data);
            } catch (error) {
                console.error("There was an error fetching the pelanggan!", error);
            }
        };

        fetchPakaians();
        fetchPelanggans();
    }, []);

    const createTransaksiBaru = async (e) => {
        e.preventDefault(); 
        
        const token = Cookies.get('token');
        api.defaults.headers.common['Authorization'] = token;

        if (!pakaians.some(p => p.id_pakaian === parseInt(id_pakaian))) {
            setValidation({ errors: [{ path: 'id_pakaian', msg: 'ID Pakaian tidak valid' }] });
            return;
        }

        if (!pelanggans.some(p => p.id_pelanggan === parseInt(id_pelanggan))) {
            setValidation({ errors: [{ path: 'id_pelanggan', msg: 'ID Pelanggan tidak valid' }] });
            return;
        }

        await api.post('/transaksi', {
            id_pakaian, 
            id_pelanggan, 
            tanggal_masuk,
            berat_transaksi, 
            tanggal_selesai, 
            status_transaksi
        })
        .then(() => {
            navigate('/admin/transaksi');
        })
        .catch(error => {
            setValidation(error.response.data);
        });
    }

    return (
        <div>
            <div>
                <SidebarMenu />
            </div>
            <div>
                {
                    validation.errors && (
                        <div>
                            {
                                validation.errors.map((error, index) => (
                                    <p key={index}>{error.path} : {error.msg}</p>
                                ))
                            }
                        </div>
                    )
                }
                <form onSubmit={createTransaksiBaru}>
                    <div className='mt-10'>
                        <div className='bg-primary/20 py-14 mx-[400px] rounded-lg'>

                            <div className='flex justify-center flex-wrap mb-3'>
                                <label className="form-control w-full max-w-lg">
                                    <select
                                        className="select select-bordered select-primary w-full"
                                        value={id_pakaian}
                                        onChange={(e) => setId_pakaian(e.target.value)}
                                    >
                                        <option value="">Pilih Pakaian</option>
                                        {pakaians.map((pakaian) => (
                                            <option key={pakaian.id_pakaian} value={pakaian.id_pakaian}>
                                                {pakaian.transaksi_pakaian}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            </div>

                            <div className='flex justify-center flex-wrap mb-3'>
                                <label className="form-control w-full max-w-lg">
                                    <select
                                        className="select select-bordered select-primary w-full"
                                        value={id_pelanggan}
                                        onChange={(e) => setId_pelanggan(e.target.value)}
                                    >
                                        <option value="">Pilih Pelanggan</option>
                                        {pelanggans.map((pelanggan) => (
                                            <option key={pelanggan.id_pelanggan} value={pelanggan.id_pelanggan}>
                                                {pelanggan.nama_pelanggan}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            </div>

                            <div className='flex justify-center flex-wrap mb-3'>
                                <label className="form-control w-full max-w-lg">
                                    <input
                                        className="input input-bordered input-primary w-full"
                                        type="date" 
                                        value={tanggal_masuk} 
                                        onChange={(e) => setTanggal_masuk(e.target.value)} 
                                        placeholder="Tanggal Masuk" 
                                    />
                                </label>
                            </div>

                            <div className='flex justify-center flex-wrap mb-3'>
                                <label className="form-control w-full max-w-lg">
                                    <input
                                        className="input input-bordered input-primary w-full"
                                        type="number" 
                                        value={berat_transaksi} 
                                        onChange={(e) => setBerat_transaksi(e.target.value)} 
                                        placeholder="Berat Transaksi (Kg)" 
                                    />
                                </label>
                            </div>

                            <div className='flex justify-center flex-wrap mb-3'>
                                <label className="form-control w-full max-w-lg">
                                    <input
                                        className="input input-bordered input-primary w-full"
                                        type="date" 
                                        value={tanggal_selesai} 
                                        onChange={(e) => setTanggal_selesai(e.target.value)} 
                                        placeholder="Tanggal Selesai" 
                                    />
                                </label>
                            </div>

                            <div className='flex justify-center flex-wrap mb-3'>
                                <label className="form-control w-full max-w-lg">
                                    <select
                                        className="select select-bordered select-primary w-full"
                                        value={status_transaksi}
                                        onChange={(e) => setStatus_transaksi(e.target.value)}
                                    >
                                        <option value="">Pilih Status Transaksi</option>
                                        <option value="pending">Pending</option>
                                        <option value="finish">Finish</option>
                                        <option value="process">Process</option>
                                        <option value="new">New</option>
                                    </select>
                                </label>
                            </div>

                            <div className='flex justify-center flex-wrap mt-10'>
                                <div className='btn btn-primary'>
                                    <button type='submit'>Tambahkan</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    )
}
