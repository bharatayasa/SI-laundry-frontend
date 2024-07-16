import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import api from '../../services/api';
import SidebarMenu from '../../components/SidebarMenu';
import Footer from '../../components/Footer';

export default function updatePassword() {
    const navigate = useNavigate(); 
    
    const [username, setUsername] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    
    const [validation, setValidation] = useState({});
    
    // Fungsi create data
    const updatePasswordBaru = async (e) => {
        e.preventDefault(); 
        
        const token = Cookies.get('token');
        api.defaults.headers.common['Authorization'] = token;

        await api.put('/change/password', {
            username,
            oldPassword,
            newPassword,
        })
        .then(() => {
            navigate('/admin/dashboard');
        })
        .catch(error => {
            setValidation(error.response.data);
        });
    }
    return (
        <div>
                <div>
                    <SidebarMenu />
                </div>
            <div>
                {
                    validation.errors && (
                        <div>
                            {
                                validation.errors.map((error, index) => (
                                    <p key={index}>{error.path} : {error.msg}</p>
                                ))
                            }
                        </div>
                    )
                }
                    <form onSubmit={updatePasswordBaru}>
                        <div className='mt-10'>
                            <div className='bg-primary/20 py-14 mx-[400px] rounded-lg'>
                                    <div className='flex justify-center flex-wrap mb-3'>
                                        <label className="form-control w-full max-w-lg">
                                            <input
                                                type="text"
                                                placeholder="Username"
                                                className="input input-bordered input-primary w-full"
                                                value={username} 
                                                onChange={(e) => setUsername(e.target.value)} 
                                            />
                                        </label>
                                    </div>

                                    <div className='flex justify-center flex-wrap mb-3'>
                                        <label className="form-control w-full max-w-lg">
                                            <input
                                                className="input input-bordered input-primary w-full"
                                                type="password" 
                                                value={oldPassword} 
                                                onChange={(e) => setOldPassword(e.target.value)} 
                                                placeholder="Password Lama" 
                                            />
                                        </label>
                                    </div>

                                    <div className='flex justify-center flex-wrap mb-3'>
                                        <label className="form-control w-full max-w-lg">
                                            <input
                                                className="input input-bordered input-primary w-full"
                                                type="password" 
                                                value={newPassword} 
                                                onChange={(e) => setNewPassword(e.target.value)} 
                                                placeholder="Password Baru" 
                                            />
                                        </label>
                                    </div>

                                    <div className='flex justify-center flex-wrap mt-10'>
                                        <div className='btn btn-primary'>
                                            <button type='submit'>Tambahkan</button>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </form>
            </div>
            <Footer />
        </div>
    )
}
