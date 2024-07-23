import SidebarMenu from '../../../components/SidebarMenu';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie'
import Footer from '../../../components/Footer';
import DataStatus from './components/DataStatus';
import DataSetiapBulan from './components/DataSetiapBulan';
import TotalTransaksi from './components/TotalTransaksi';
import TotalPakaian from './components/TotalPakaian';
import TotalPelanggan from './components/TotalPelanggan';
import TotalTransaksiHariIni from './components/TotalTransaksiHariIni';
import TotalTransaksiBulaniIni from './components/TotalTransaksiBulanIni';
import TotalTransaksiTahuniIni from './components/TotalTransaksiTahunIni';

export default function Dashboard() {
    const [user, setUser] = useState([]);

    useEffect(() => {
        const userData = Cookies.get('user');
        
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    return (
        <div>
            <div>
                <div>
                    <SidebarMenu />
                </div>

                <div className='flex justify-center mb-5'>
                    <div>
                        <div className='text-center font-semibold text-2xl'>
                            Dashboard
                        </div>
                        {/* <div>
                            Selamat Datang, <strong>{user?.username}</strong>
                        </div> */}
                    </div>
                </div>
                <div className='container mx-auto flex gap-5 items-center justify-center align-items-center'>
                    <div className='bg-primary/20 py-5 px-5 rounded-lg'>
                        <TotalPelanggan />
                    </div>
                    <div className='bg-primary/20 py-5 px-5 rounded-lg'>
                        <TotalPakaian />
                    </div>
                    <div className='bg-primary/20 py-5 px-5 rounded-lg'>
                        <TotalTransaksi />
                    </div>
                </div>
                <div className='container mx-auto flex gap-5 items-center'>
                    <div className='bg-primary/20 rounded-lg'>
                        <DataStatus />
                    </div>
                    <div>
                        <DataSetiapBulan />
                    </div>
                    <div className='bg-primary/10 rounded-lg mx-5'>
                        <div className='text-center font-semibold text-lg mb-5 my-2'>
                            <p>Seluruh pemasukan</p>
                        </div>
                        <div className='bg-primary/20 py-5 mx-5 rounded-lg mb-5'>
                            <TotalTransaksiHariIni />
                        </div>
                        <div className='bg-primary/20 py-5 mx-5 rounded-lg mb-5'>
                            <TotalTransaksiBulaniIni />
                        </div>
                        <div className='bg-primary/20 py-5 mx-5 px-3 rounded-lg mb-5'>
                            <TotalTransaksiTahuniIni />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}