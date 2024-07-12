import SidebarMenu from '../../../components/SidebarMenu';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie'

export default function Dashboard() {
    const [user, setUser] = useState([]);

    useEffect(() => {
        const userData = Cookies.get('user');
        
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    return (
        <div className="">
            <div className="">
                <div className="">
                    <SidebarMenu />
                </div>
                <div className="">
                    <div className="">
                        <div className="">
                            DASHBOARD
                        </div>
                        <div className="">
                            Selamat Datang, <strong>{user?.username}</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}