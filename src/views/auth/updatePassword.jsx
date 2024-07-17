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
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    
    const [validation, setValidation] = useState({});

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    
    const togglePasswordVisibilityNew = () => {
        setShowNewPassword(!showNewPassword);
    };

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
                                    <div className='text-center text-2xl font-semibold mb-5'>
                                        <h1>Update Passwod</h1>
                                    </div>
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

                                    <div className="flex justify-center mb-3">
                                        <label className="form-control w-full max-w-lg relative">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Old Password"
                                                className="input input-bordered input-primary w-full pr-16"
                                                value={oldPassword} 
                                                onChange={(e) => setOldPassword(e.target.value)} 
                                            />
                                            <button
                                                type="button"
                                                className="absolute inset-y-0 right-0 px-3 flex items-center"
                                                onClick={togglePasswordVisibility}
                                            >
                                                {showPassword ? (
                                                    <span>Hide</span>
                                                ) : (
                                                    <span>Show</span>
                                                )}
                                            </button>
                                        </label>
                                    </div>

                                    <div className="flex justify-center mb-3">
                                        <label className="form-control w-full max-w-lg relative">
                                            <input
                                                type={showNewPassword ? "text" : "password"}
                                                placeholder="New Password"
                                                className="input input-bordered input-primary w-full pr-16"
                                                value={newPassword} 
                                                onChange={(e) => setNewPassword(e.target.value)} 
                                            />
                                            <button
                                                type="button"
                                                className="absolute inset-y-0 right-0 px-3 flex items-center"
                                                onClick={togglePasswordVisibilityNew}
                                            >
                                                {showNewPassword ? (
                                                    <span>Hide</span>
                                                ) : (
                                                    <span>Show</span>
                                                )}
                                            </button>
                                        </label>
                                    </div>
                                    <div className='flex justify-center flex-wrap mt-10'>
                                        <div className='btn btn-primary'>
                                            <button type='submit'>Ubah</button>
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
