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
        <div>
            <div>
                <div>
                    <SidebarMenu />
                </div>
                <div>
                    <div>
                        <div>
                            DASHBOARD
                        </div>
                        <div>
                            Selamat Datang, <strong>{user?.username}</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}