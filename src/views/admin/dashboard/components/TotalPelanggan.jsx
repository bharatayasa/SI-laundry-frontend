import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import api from '../../../../services/api';
import users from "../../../../icon/users.svg"

export default function TotalPelanggan() {
    const [Pelanggan, setPelanggan] = useState(null);

    const fetchDataPelanggan = async () => {
        const token = Cookies.get('token');

        if (token) {
            api.defaults.headers.common['Authorization'] = token;
            try {
                const response = await api.get('/total/pelanggan');
                setPelanggan(response.data.data[0]?.total);
            } catch (error) {
                console.error("There was an error fetching the pelanggan!", error);
            }
        } else {
            console.log("Token is not available");
        }
    };

    useEffect(() => {
        fetchDataPelanggan();
    }, []);

    return (
            <div className='flex gap-2 items-center'>
                <div className='w-10 center'>
                    <img src={users} />
                </div>
                <div>
                    <p>Total pelanggan: {Pelanggan}</p>
                </div>
            </div>
    )
}
