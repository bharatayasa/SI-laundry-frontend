import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import api from '../../../../services/api';

export default function TotalTransaksiHariIni() {
    const [TransaksiHariIni, setTransaksiHariIni] = useState(null);

    const transaksiSekarang = async () => {
        const token = Cookies.get('token');

        if (token) {
            api.defaults.headers.common['Authorization'] = token;
            try {
                const response = await api.get('/sum/transaksi/hari');
                setTransaksiHariIni(response.data.data);
            } catch (error) {
                console.error("There was an error fetching the pelanggan!", error);
            }
        } else {
            console.log("Token is not available");
        }
    };

    useEffect(() => {
        transaksiSekarang();
    }, []);

    return (
        <div className='flex gap-2 items-center justify-center flex-wrap'>
            <div className=''>
                <p>Hari Ini: </p>
            </div>
            <div>
                <p>{TransaksiHariIni}</p>
            </div>
        </div>
    )
}

