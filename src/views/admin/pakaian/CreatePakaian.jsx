import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import api from '../../../services/api';
import SidebarMenu from '../../../components/SidebarMenu';
import Footer from '../../../components/Footer';
import { Link } from 'react-router-dom';

export default function CreatePakaian() {
    const navigate = useNavigate(); 
    
    const [transaksi_pakaian, setTransaksi_pakaian] = useState('');
    const [jenis_pakaian, setJenis_pakaian] = useState('');
    const [jumlah_pakaian, setJumlah_pakaian] = useState('');
    
    const [validation, setValidation] = useState({});
    
    // Fungsi create data
    const createPakaianBaru = async (e) => {
        e.preventDefault(); 
        
        const token = Cookies.get('token');
        api.defaults.headers.common['Authorization'] = token;

        await api.post('/pakaian', {
            transaksi_pakaian, 
            jenis_pakaian, 
            jumlah_pakaian
        })
        .then(() => {
            navigate('/admin/pakaian');
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
                    <form onSubmit={createPakaianBaru}>
                        <div className='mt-10'>
                            <div className='bg-primary/20 py-14 mx-[400px] rounded-lg'>
                            <div className='text-center text-2xl font-semibold mb-10'>
                                <h1>Tambah Pakaian</h1>
                            </div>
                                    <div className='flex justify-center flex-wrap mb-3'>
                                        <label className="form-control w-full max-w-lg">
                                            <input
                                                type="text"
                                                placeholder="Transaksi Pakaian"
                                                className="input input-bordered input-primary w-full"
                                                value={transaksi_pakaian} 
                                                onChange={(e) => setTransaksi_pakaian(e.target.value)} 
                                            />
                                        </label>
                                    </div>

                                    <div className='flex justify-center flex-wrap mb-3'>
                                        <label className="form-control w-full max-w-lg">
                                            <textarea
                                                className="textarea textarea-primary"
                                                type="text" 
                                                value={jenis_pakaian} 
                                                onChange={(e) => setJenis_pakaian(e.target.value)} 
                                                placeholder="Jenis Pakaian" 
                                            />
                                        </label>
                                    </div>

                                    <div className='flex justify-center flex-wrap mb-3'>
                                        <label className="form-control w-full max-w-lg">
                                            <input
                                                className="input input-bordered input-primary w-full"
                                                type="number" 
                                                value={jumlah_pakaian} 
                                                onChange={(e) => setJumlah_pakaian(e.target.value)} 
                                                placeholder="Jumlah Pakaian" 
                                            />
                                        </label>
                                    </div>

                                    <div className='flex justify-center flex-wrap mt-10 gap-3'>
                                        <div className='btn btn-primary'>
                                            <button type='submit'>Tambahkan</button>
                                        </div>
                                        <div className='btn btn-accent'>
                                            <button>
                                                <Link to="/admin/pakaian">Batal</Link>
                                            </button>
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
