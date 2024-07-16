import { useState, useEffect } from "react";
import SidebarMenu from "../../../components/SidebarMenu";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import api from "../../../services/api";
import Footer from "../../../components/Footer";

export default function EditHarga() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [harga_perkilo, setHargaPerkilo] = useState('');
    
    const [validation, setValidation] = useState({});

    const getHargaById = async () => {
        const token = Cookies.get("token");

        if (token) {
        api.defaults.headers.common["Authorization"] = token;

        try {
            const response = await api.get(`/harga/${id}`);
            const HargaData = response.data.data[0];

            if (HargaData) {
                setHargaPerkilo(HargaData.harga_perkilo);
            } else {
            console.log("harga not found");
            }
        } catch (error) {
            console.error("There was an error fetching the user details!", error);
        }
        } else {
        console.error("Token is not available!");
        navigate("/login");
        }
    };
    
    const getHarga = async () => {
        const token = Cookies.get("token");

        if (token) {
        api.defaults.headers.common["Authorization"] = token;

        try {
            const response = await api.get(`/harga`);
            const HargaData = response.data.data[0];

            if (HargaData) {
                setHargaPerkilo(HargaData.harga_perkilo);
            } else {
            console.log("harga not found");
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
        getHargaById();
        getHarga();
    }, []);

    const updateHarga = async (e) => {
        e.preventDefault();

        const token = Cookies.get("token");

        if (token) {
        try {
            await api.put(`/harga/${id}`, {
            harga_perkilo: harga_perkilo,
            });
            navigate("/admin/harga");
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
                <form onSubmit={updateHarga}>
                <div className="mt-10">
                    <div className="bg-primary/20 py-14 mx-[400px] rounded-lg">
                    <div className="flex justify-center flex-wrap mb-3">
                        <label className="form-control w-full max-w-lg">
                        <input
                            type="text"
                            value={harga_perkilo}
                            onChange={(e) => setHargaPerkilo(e.target.value)}
                            placeholder="harga per kilo"
                            className="input input-bordered input-primary w-full"
                        />
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
    )
}
