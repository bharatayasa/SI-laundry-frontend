import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import api from '../../../services/api';
import SidebarMenu from '../../../components/SidebarMenu';

export default function CreatePelanggan() {
    const navigate = useNavigate(); 
    
    const [nama_pelanggan, setNamaPelanggan] = useState('');
    const [tlp_pelanggan, setTlpPelanggan] = useState('');
    const [alamat_pelanggan, setAlamatPelanggan] = useState('');
    
    const [validation, setValidation] = useState({});
    
    // Fungsi create data
    const createPelangganBaru = async (e) => {
        e.preventDefault(); 
        
        const token = Cookies.get('token');
        api.defaults.headers.common['Authorization'] = token;

        await api.post('/pelanggan', {
            nama_pelanggan, 
            tlp_pelanggan, 
            alamat_pelanggan
        })
        .then(() => {
            navigate('/admin/pelanggan');
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
                    <form onSubmit={createPelangganBaru}>
                        <div className='mt-10'>
                            <div className='bg-primary/20 py-14 mx-[400px] rounded-lg'>
                                    <div className='flex justify-center flex-wrap mb-3'>
                                        <label className="form-control w-full max-w-lg">
                                            <input
                                                type="text"
                                                placeholder="Nama Pelanggan"
                                                className="input input-bordered input-primary w-full"
                                                value={nama_pelanggan} 
                                                onChange={(e) => setNamaPelanggan(e.target.value)} 
                                            />
                                        </label>
                                    </div>

                                    <div className='flex justify-center flex-wrap mb-3'>
                                        <label className="form-control w-full max-w-lg">
                                            <input
                                                className="input input-bordered input-primary w-full"
                                                type="number" 
                                                value={tlp_pelanggan} 
                                                onChange={(e) => setTlpPelanggan(e.target.value)} 
                                                placeholder="Telpon Pelanggan" 
                                            />
                                        </label>
                                    </div>

                                    <div className='flex justify-center flex-wrap mb-3'>
                                        <label className="form-control w-full max-w-lg">
                                            <input
                                                className="input input-bordered input-primary w-full"
                                                type="text" 
                                                value={alamat_pelanggan} 
                                                onChange={(e) => setAlamatPelanggan(e.target.value)} 
                                                placeholder="Alamat Pelanggan" 
                                            />
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
        </div>
    );
}
