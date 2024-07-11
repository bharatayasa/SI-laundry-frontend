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
        <div className="row justify-content-center mt-5">
            <div className="col-md-4">
                <div className="card border-0 rounded shadow-sm">
                    <div className="card-body">
                        <h4>LOGIN</h4>
                        <hr />
                        {
                            validation.errors && (
                                <div className="alert alert-danger mt-2 pb-0">
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
                                <div className="alert alert-danger mt-2">
                                    {loginFailed.message}
                                </div>
                            )
                        }
                        <form onSubmit={login}>
                            <div className="form-group mb-3">
                                <label className="mb-1 fw-bold">Username</label>
                                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" placeholder="Username" />
                            </div>

                            <div className="form-group mb-3">
                                <label className="mb-1 fw-bold">Password</label>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control"
                                    placeholder="Password" />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">LOGIN</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}