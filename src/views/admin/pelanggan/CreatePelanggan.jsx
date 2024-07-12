import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import api from '../../../services/api';


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
                    <div className="form-group mb-3">
                        <label className="mb-1 fw-bold">Nama Pelanggan</label>
                        <input 
                            type="text" 
                            value={nama_pelanggan} 
                            onChange={(e) => setNamaPelanggan(e.target.value)} 
                            className="form-control" 
                            placeholder="Nama Pelanggan" 
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label className="mb-1 fw-bold">Telpon Pelanggan</label>
                        <input 
                            type="text" 
                            value={tlp_pelanggan} 
                            onChange={(e) => setTlpPelanggan(e.target.value)} 
                            className="form-control"
                            placeholder="Telpon Pelanggan" 
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label className="mb-1 fw-bold">Alamat Pelanggan</label>
                        <input 
                            type="text" 
                            value={alamat_pelanggan} 
                            onChange={(e) => setAlamatPelanggan(e.target.value)} 
                            className="form-control"
                            placeholder="Alamat Pelanggan" 
                        />
                    </div>

                    <button type='submit'>SAVE</button>
                </form>
            </div>
        </div>
    );
}
