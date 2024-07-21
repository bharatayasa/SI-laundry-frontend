import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import api from '../../../../services/api';
import transaction from "../../../../icon/transaction.svg"

export default function TotalTransaksi() {
    const [Transaksi, setTransaksi] = useState(null);

    const fetchDataTransaksi = async () => {
        const token = Cookies.get('token');

        if (token) {
            api.defaults.headers.common['Authorization'] = token;
            try {
                const response = await api.get('/total/transaksi');
                setTransaksi(response.data.data[0]?.total);
            } catch (error) {
                console.error("There was an error fetching the pelanggan!", error);
            }
        } else {
            console.log("Token is not available");
        }
    };

    useEffect(() => {
        fetchDataTransaksi();
    }, []);

    return (
        <div>
            <div className='flex gap-2 items-center'>
                <div className='w-10 center'>
                    <img src={transaction} />
                </div>
                <p>
                    Total Transaksi: {Transaksi}
                </p>
            </div>
        </div>
    )
}
