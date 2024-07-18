import SidebarMenu from '../../../components/SidebarMenu';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie'
import Footer from '../../../components/Footer';

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

                <div className='flex justify-center'>
                    <div>
                        <div className='text-center font-semibold text-2xl'>
                            Dashboard
                        </div>
                        <div>
                            Selamat Datang, <strong>{user?.username}</strong>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}