import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import api from '../../../../services/api';
import pakaian from "../../../../icon/cloth.svg"

export default function TotalPakaian() {
    const [Pakaian, setPakaian] = useState(null);

    const fetchDataPakaian = async () => {
        const token = Cookies.get('token');

        if (token) {
            api.defaults.headers.common['Authorization'] = token;
            try {
                const response = await api.get('/total/pakaian');
                setPakaian(response.data.data[0]?.total);
            } catch (error) {
                console.error("There was an error fetching the pelanggan!", error);
            }
        } else {
            console.log("Token is not available");
        }
    };

    useEffect(() => {
        fetchDataPakaian();
    }, []);

    return (
        <div>
            <div className='flex gap-2 items-center'>
                <div className='w-10 center'>
                        <img src={pakaian} />
                </div>
                <div>
                    <p>Total Pakaian: {Pakaian}</p>
                </div>
            </div>
        </div>
    )
}

