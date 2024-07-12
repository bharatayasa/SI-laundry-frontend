import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from '../../services/api'
import Cookies from 'js-cookie'
import { AuthContext } from '../../context/AuthContext';

export default function Login() {
    const navigate = useNavigate();

    const { setIsAuthenticated } = useContext(AuthContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [validation, setValidation] = useState([]);
    const [loginFailed, setLoginFailed] = useState([]);

    const login = async (e) => {
        e.preventDefault();

        await api.post('/login', {
            username: username,
            password: password,
        })
            .then(response => {

                Cookies.set('token', response.data.data.token);
                Cookies.set('user', JSON.stringify(response.data.data.user));

                setIsAuthenticated(true);

                navigate("/admin/dashboard", { replace: true });
            })
            .catch(error => {
                setValidation(error.response.data);

                setLoginFailed(error.response.data);
            })
    };

    return (
        <div >
            <div >
                <div >
                    <div >
                        <h4>LOGIN</h4>
                        <hr />
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
                        {
                            loginFailed.message && (
                                <div>
                                    {loginFailed.message}
                                </div>
                            )
                        }
                        <form onSubmit={login}>
                            <div>
                                <label>Username</label>
                                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                            </div>

                            <div>
                                <label>Password</label>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                            </div>
                            <button type="submit" >LOGIN</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}