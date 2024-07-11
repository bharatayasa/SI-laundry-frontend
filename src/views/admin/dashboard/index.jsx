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
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-md-3">
                    <SidebarMenu />
                </div>
                <div className="col-md-9">
                    <div className="card border-0 rounded shadow-sm">
                        <div className="card-header">
                            DASHBOARD
                        </div>
                        <div className="card-body">
                            Selamat Datang, <strong>{user?.username}</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}