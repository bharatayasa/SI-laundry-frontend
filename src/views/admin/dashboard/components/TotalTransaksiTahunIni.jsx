import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import api from '../../../../services/api';

export default function TotalTransaksiTahuniIni() {
    const [TransaksiTahunIni, setTransaksiTahunIni] = useState(null);

    const transaksiTahunIni = async () => {
        const token = Cookies.get('token');

        if (token) {
            api.defaults.headers.common['Authorization'] = token;
            try {
                const response = await api.get('/sum/transaksi');
                setTransaksiTahunIni(response.data.data);
            } catch (error) {
                console.error("There was an error fetching the pelanggan!", error);
            }
        } else {
            console.log("Token is not available");
        }
    };

    useEffect(() => {
        transaksiTahunIni();
    }, []);

    return (
        <div className='flex gap-2 items-center justify-center flex-wrap'>
            <div className=''>
                <p>Tahun Ini: </p>
            </div>
            <div>
                <p>{TransaksiTahunIni}</p>
            </div>
        </div>
    )
}
