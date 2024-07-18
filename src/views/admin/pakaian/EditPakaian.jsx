import { useState, useEffect } from "react";
import SidebarMenu from "../../../components/SidebarMenu";
import { Link, useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import api from "../../../services/api";
import Footer from "../../../components/Footer";

export default function EditPakaian() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [transaksi_pakaian, setTransaksi_pakaian] = useState('');
    const [jenis_pakaian, setJenis_pakaian] = useState('');
    const [jumlah_pakaian, setJumlah_pakaian] = useState('');
    
    const [validation, setValidation] = useState({});

    const getPakaianById = async () => {
        const token = Cookies.get("token");

        if (token) {
        api.defaults.headers.common["Authorization"] = token;

        try {
            const response = await api.get(`/pakaian/${id}`);
            const pakaianData = response.data.data[0];

            if (pakaianData) {
                setTransaksi_pakaian(pakaianData.transaksi_pakaian);
                setJenis_pakaian(pakaianData.jenis_pakaian);
                setJumlah_pakaian(pakaianData.jumlah_pakaian);
            } else {
            console.log("pakaian not found");
            }
        } catch (error) {
            console.error("There was an error fetching the user details!", error);
        }
        } else {
        console.error("Token is not available!");
        navigate("/login");
        }
    };

    useEffect(() => {
        getPakaianById();
    }, []);

    const updatePakaian = async (e) => {
        e.preventDefault();

        const token = Cookies.get("token");

        if (token) {
        try {
            await api.put(`/pakaian/${id}`, {
            transaksi_pakaian: transaksi_pakaian,
            jenis_pakaian: jenis_pakaian,
            jumlah_pakaian: jumlah_pakaian,
            });
            navigate("/admin/pakaian");
        } catch (error) {
            setValidation(error.response.data);
        }
        } else {
        console.error("Token is not available!");
        navigate("/login");
        }
    };
    return (
        <div>
            <div>
                <SidebarMenu />
            </div>
            <div>
                {validation.errors && (
                <div>
                    {validation.errors.map((error, index) => (
                    <p key={index}>
                        {error.path} : {error.msg}
                    </p>
                    ))}
                </div>
                )}
                <form onSubmit={updatePakaian}>
                <div className="mt-10">
                    <div className="bg-primary/20 py-14 mx-[400px] rounded-lg">
                    <div className='text-center text-2xl font-semibold mb-10'>
                        <h1>Edit Pakaian</h1>
                    </div>
                    <div className="flex justify-center flex-wrap mb-3">
                        <label className="form-control w-full max-w-lg">
                        <input
                            type="text"
                            value={transaksi_pakaian}
                            onChange={(e) => setTransaksi_pakaian(e.target.value)}
                            placeholder="Transaksi Pakaian"
                            className="input input-bordered input-primary w-full"
                        />
                        </label>
                    </div>

                    <div className="flex justify-center flex-wrap mb-3">
                        <label className="form-control w-full max-w-lg">
                        <textarea
                            type="text"
                            value={jenis_pakaian}
                            onChange={(e) => setJenis_pakaian(e.target.value)}
                            placeholder="Jenis Pakaian"
                            className="textarea textarea-primary"
                        />
                        </label>
                    </div>

                    <div className="flex justify-center flex-wrap mb-3">
                        <label className="form-control w-full max-w-lg">
                        <input
                            type="number"
                            value={jumlah_pakaian}
                            onChange={(e) => setJumlah_pakaian(e.target.value)}
                            placeholder="Jumlah Pakaian"
                            className="input input-bordered input-primary w-full"
                        />
                        </label>
                    </div>

                    <div className="flex justify-center flex-wrap mt-10 gap-3">
                        <div className="btn btn-primary">
                            <button type="submit">UPDATE</button>
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
