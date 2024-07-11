import { useState } from 'react';
import SidebarMenu from '../../../components/SidebarMenu';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import api from '../../../services/api';

const token = Cookies.get('token');

export default function UsersCreate() {

    const navigate = useNavigate();

    const [nama_pelanggan, setNama_pelanggan] = useState('');
    const [tlp_pelanggan, setTlp_pelanggan] = useState('');
    const [alamat_pelanggan, setAlamat_pelanggan] = useState('');

    const [validation, setValidation] = useState([]);

    const storeUser = async (e) => {
        e.preventDefault();

        api.defaults.headers.common['Authorization'] = token;
        await api.post('/pelanggan', {
            nama_pelanggan   : nama_pelanggan,
            tlp_pelanggan    : tlp_pelanggan,
            alamat_pelanggan : alamat_pelanggan
        })
            .then(() => {
                navigate('/admin/users')
            })
            .catch(error => {
                setValidation(error.response.data);
            })
    }


    return (
        <div class="container mt-5 mb-5">
            <div class="row">
                <div className="col-md-3">
                    <SidebarMenu />
                </div>
                <div class="col-md-9">
                    <div class="card border-0 rounded shadow-sm">
                        <div class="card-header">
                            ADD PELANGGAN
                        </div>
                        <div class="card-body">
                            {
                                validation.errors && (
                                    <div className="alert alert-danger mt-2 pb-0">
                                        {
                                            validation.errors.map((error, index) => (
                                                <p key={index}>{error.path} : {error.msg}</p>
                                            ))
                                        }
                                    </div>
                                )
                            }
                            <form onSubmit={storeUser}>

                                <div class="form-group mb-3">
                                    <label class="mb-1 fw-bold">Nama Pelanggan</label>
                                    <input type="text" value={nama_pelanggan} onChange={(e) => setNama_pelanggan(e.target.value)} class="form-control" placeholder="Nama Pelanggan" />
                                </div>

                                <div class="form-group mb-3">
                                    <label class="mb-1 fw-bold">Telpon Pelanggan</label>
                                    <input type="text" value={tlp_pelanggan} onChange={(e) => setTlp_pelanggan(e.target.value)} class="form-control"
                                        placeholder="Telpon Pelanggan" />
                                </div>

                                <div class="form-group mb-3">
                                    <label class="mb-1 fw-bold">Alamat Pelanggan</label>
                                    <input type="text" value={alamat_pelanggan} onChange={(e) => setAlamat_pelanggan(e.target.value)} class="form-control"
                                        placeholder="Alamat Pelanggan" />
                                </div>

                                <button type="submit" class="btn btn-sm btn-primary">SAVE</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )

}