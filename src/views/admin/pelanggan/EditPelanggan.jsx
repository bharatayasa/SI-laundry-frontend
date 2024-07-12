import { useState, useEffect } from 'react';
import SidebarMenu from '../../../components/SidebarMenu';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import api from '../../../services/api';

export default function EditPelanggan() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [nama_pelanggan, setNama_pelanggan] = useState(''); 
    const [tlp_pelanggan, setTlp_pelanggan] = useState(''); 
    const [alamat_pelanggan, setAlamat_pelanggan] = useState(''); 

    const [validation, setValidation] = useState([])

    // get pelanggan by id
    const getPelangganById = async() => {
        const token = Cookies.get('token'); 

        if (token) {
            api.defaults.headers.common['Authorization'] = token

            try {
                const  response = await api.get(`/pelanggan/${id}`)
                const pelangganData = response.data.data[0]

                if (pelangganData) {
                    setNama_pelanggan(pelangganData.nama_pelanggan);
                    setTlp_pelanggan(pelangganData.tlp_pelanggan);
                    setAlamat_pelanggan(pelangganData.alamat_pelanggan);
                } else{
                    console.log("pelanggan not found");
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
        getPelangganById();
    }, []);
    
    // update user by input data
    const updatePelanggan = async (e) => {
        e.preventDefault();

        const token = Cookies.get('token'); 

        if (token) {
            try {
                await api.put(`/pelanggan/${id}`, {
                    nama_pelanggan: nama_pelanggan,
                    tlp_pelanggan: tlp_pelanggan,
                    alamat_pelanggan: alamat_pelanggan
                })
                navigate('/admin/pelanggan');
            } catch (error) {
                setValidation(error.response.data);
            }
        }else {
            console.error("Token is not available!");
            navigate('/login');
        }
    }

    return (
        <div>
            <div>
                <div className="col-md-3">
                    <SidebarMenu />
                </div>
            </div>

            <div>
                <p>EDIT PELANGGAN</p>
            </div>
            <div>
            {validation.errors && (
                <div className="alert alert-danger mt-2 pb-0">
                {validation.errors.map((error, index) => (
                    <p key={index}>
                    {error.path} : {error.msg}
                    </p>
                ))}
                </div>
            )}
            <form onSubmit={updatePelanggan}>
                <div>
                    <label>Nama Pelanggan</label>
                    <input type="text" value={nama_pelanggan} onChange={(e) => setNama_pelanggan(e.target.value)}/>
                </div>

                <div>
                    <label>Telpon Pelanggan</label>
                    <input type="number" value={tlp_pelanggan} onChange={(e) => setTlp_pelanggan(e.target.value)}/>
                </div>

                <div>
                    <label>Alamat Pelanggan</label>
                    <input type="text" value={alamat_pelanggan} onChange={(e) => setAlamat_pelanggan(e.target.value)}/>
                </div>

                <button type="submit" className="btn btn-sm btn-primary">UPDATE</button>
            </form>
            </div>
        </div>
    );
}