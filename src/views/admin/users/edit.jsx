import { useState, useEffect } from 'react';
import SidebarMenu from '../../../components/SidebarMenu';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import api from '../../../services/api';

export default function UsersEdit() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [nama_pelanggan, setNama_pelanggan] = useState('');
    const [tlp_pelanggan, setTlp_pelanggan] = useState('');
    const [alamat_pelanggan, setAlamat_pelanggan] = useState('');

    const [validation, setValidation] = useState([]);

    // get user by id
    const fetchDetailUser = async () => {
        const token = Cookies.get('token');

        if (token) {
            api.defaults.headers.common['Authorization'] = token;

            try {
                const response = await api.get(`/pelanggan/${id}`);
                const userData = response.data.data[0];

                if (userData) {
                    setNama_pelanggan(userData.nama_pelanggan);
                    setTlp_pelanggan(userData.tlp_pelanggan);
                    setAlamat_pelanggan(userData.alamat_pelanggan);
                } else {
                    console.error("User data not found!");
                }
            } catch (error) {
                console.error("There was an error fetching the user details!", error);
            }
        } else {
            console.error("Token is not available!");
            navigate('/login');
        }
    };

    useEffect(() => {
        fetchDetailUser();
    }, []);

    // update user by input data
    const updateUser = async (e) => {
        e.preventDefault();

        const token = Cookies.get('token');

        if (token) {
            api.defaults.headers.common['Authorization'] = token;

            try {
                await api.put(`/pelanggan/${id}`, {
                    nama_pelanggan: nama_pelanggan,
                    tlp_pelanggan: tlp_pelanggan,
                    alamat_pelanggan: alamat_pelanggan
                });
                navigate('/admin/users');
            } catch (error) {
                setValidation(error.response.data);
            }
        } else {
            console.error("Token is not available!");
            navigate('/login');
        }
    };

    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-md-3">
                    <SidebarMenu />
                </div>
                <div className="col-md-9">
                    <div className="card border-0 rounded shadow-sm">
                        <div className="card-header">
                            EDIT PELANGGAN
                        </div>
                        <div className="card-body">
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
                            <form onSubmit={updateUser}>
                                <div className="form-group mb-3">
                                    <label className="mb-1 fw-bold">Full Name</label>
                                    <input type="text" value={nama_pelanggan} onChange={(e) => setNama_pelanggan(e.target.value)} className="form-control" placeholder="Nama Pelanggan" />
                                </div>

                                <div className="form-group mb-3">
                                    <label className="mb-1 fw-bold">Telpon Pelanggan</label>
                                    <input type="text" value={tlp_pelanggan} onChange={(e) => setTlp_pelanggan(e.target.value)} className="form-control" placeholder="Telpon Pelanggan" />
                                </div>

                                <div className="form-group mb-3">
                                    <label className="mb-1 fw-bold">Alamat Pelanggan</label>
                                    <input type="text" value={alamat_pelanggan} onChange={(e) => setAlamat_pelanggan(e.target.value)} className="form-control" placeholder="Alamat Pelanggan" />
                                </div>

                                <button type="submit" className="btn btn-sm btn-primary">UPDATE</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
