import { useState, useEffect } from "react";
import SidebarMenu from "../../../components/SidebarMenu";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import api from "../../../services/api";
import Footer from "../../../components/Footer";

export default function EditTransaksi() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [id_pakaian, setId_pakaian] = useState('');
    const [id_pelanggan, setId_pelanggan] = useState('');
    const [tanggal_masuk, setTanggal_masuk] = useState('');
    const [berat_transaksi, setBerat_transaksi] = useState('');
    const [tanggal_selesai, setTanggal_selesai] = useState('');
    const [status_transaksi, setStatus_transaksi] = useState('');

    const [validation, setValidation] = useState({});
    const [pakaians, setPakaians] = useState([]);
    const [pelanggans, setPelanggans] = useState([]);

    const getTransaksiById = async () => {
        const token = Cookies.get("token");

        if (token) {
            api.defaults.headers.common["Authorization"] = token;

            try {
                const response = await api.get(`/transaksi/${id}`);
                const transaksiData = response.data.data;

                const formattedTanggalMasuk = new Date(transaksiData.tanggal_masuk).toISOString().split('T')[0];
                const formatTanggalSelesai = new Date(transaksiData.tanggal_selesai).toISOString().split('T')[0];

                if (transaksiData) {
                    setId_pakaian(transaksiData.id_pakaian);
                    setId_pelanggan(transaksiData.id_pelanggan);
                    setTanggal_masuk(formattedTanggalMasuk);
                    setBerat_transaksi(transaksiData.berat_transaksi);
                    setTanggal_selesai(formatTanggalSelesai);
                    setStatus_transaksi(transaksiData.status_transaksi);
                } else {
                    console.log("Transaksi not found");
                }
            } catch (error) {
                console.error("There was an error fetching the transaction details!", error);
            }
        } else {
            console.error("Token is not available!");
            navigate("/login");
        }
    };

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

    useEffect(() => {
        getTransaksiById();
        fetchPakaians();
        fetchPelanggans();
    }, []);

    const updateTransaksi = async (e) => {
        e.preventDefault();
        
        const token = Cookies.get("token");
        api.defaults.headers.common["Authorization"] = token;

        if (!pakaians.some(p => p.id_pakaian === parseInt(id_pakaian))) {
            setValidation({ errors: [{ path: 'id_pakaian', msg: 'ID Pakaian tidak valid' }] });
            return;
        }

        if (!pelanggans.some(p => p.id_pelanggan === parseInt(id_pelanggan))) {
            setValidation({ errors: [{ path: 'id_pelanggan', msg: 'ID Pelanggan tidak valid' }] });
            return;
        }

        if (token) {
            try {
                await api.put(`/transaksi/${id}`, {
                    id_pakaian,
                    id_pelanggan,
                    tanggal_masuk,
                    berat_transaksi,
                    tanggal_selesai,
                    status_transaksi,
                });
                navigate("/admin/transaksi");
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
            <SidebarMenu />
            <div>
                {validation.errors && (
                    <div>
                        {validation.errors.map((error, index) => (
                            <p key={index}>{error.path} : {error.msg}</p>
                        ))}
                    </div>
                )}
                <form onSubmit={updateTransaksi}>
                    <div className="mt-10">
                        <div className="bg-primary/20 py-14 mx-[400px] rounded-lg">
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

                            <div className="flex justify-center flex-wrap mb-3">
                                <label className="form-control w-full max-w-lg">
                                    <input
                                        type="date"
                                        value={tanggal_masuk}
                                        onChange={(e) => setTanggal_masuk(e.target.value)}
                                        placeholder="Tanggal Masuk"
                                        className="input input-bordered input-primary w-full"
                                    />
                                </label>
                            </div>

                            <div className="flex justify-center flex-wrap mb-3">
                                <label className="form-control w-full max-w-lg">
                                    <input
                                        type="number"
                                        value={berat_transaksi}
                                        onChange={(e) => setBerat_transaksi(e.target.value)}
                                        placeholder="Berat Transaksi"
                                        className="input input-bordered input-primary w-full"
                                    />
                                </label>
                            </div>

                            <div className="flex justify-center flex-wrap mb-3">
                                <label className="form-control w-full max-w-lg">
                                    <input
                                        type="date"
                                        value={tanggal_selesai}
                                        onChange={(e) => setTanggal_selesai(e.target.value)}
                                        placeholder="Tanggal Selesai"
                                        className="input input-bordered input-primary w-full"
                                    />
                                </label>
                            </div>
                            <div className="flex justify-center flex-wrap mb-3">
                                <label className="form-control w-full max-w-lg">
                                    <select
                                        value={status_transaksi}
                                        onChange={(e) => setStatus_transaksi(e.target.value)}
                                        className="input input-bordered input-primary w-full"
                                    >
                                        <option value="">Pilih Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="finish">Finish</option>
                                        <option value="process">Process</option>
                                        <option value="new">New</option>
                                    </select>
                                </label>
                            </div>
                            <div className="flex justify-center flex-wrap mt-10">
                                <div className="btn btn-primary">
                                    <button type="submit">UPDATE</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
}
