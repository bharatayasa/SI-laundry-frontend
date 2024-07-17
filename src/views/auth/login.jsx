import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Cookies from "js-cookie";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
    const navigate = useNavigate();
    const { setIsAuthenticated } = useContext(AuthContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [validation, setValidation] = useState([]);
    const [loginFailed, setLoginFailed] = useState([]);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const login = async (e) => {
        e.preventDefault();

        await api
        .post("/login", {
            username: username,
            password: password,
        })
        .then((response) => {
            Cookies.set("token", response.data.data.token);
            Cookies.set("user", JSON.stringify(response.data.data.user));

            setIsAuthenticated(true);

            navigate("/admin/dashboard", { replace: true });
        })
        .catch((error) => {
            setValidation(error.response.data);
            setLoginFailed(error.response.data);
        });
    };

    return (
        <div>
            {validation.errors && (
                <div>
                    {validation.errors.map((error, index) => (
                        <p key={index}>
                            {error.path} : {error.msg}
                        </p>
                    ))}
                </div>
            )}
            {loginFailed.message && (
                <div className="container flex justify-center items-center mx-auto">
                    <div role="alert" className="alert alert-warning">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 shrink-0 stroke-current"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                        <span>{loginFailed.message}</span>
                    </div>
                </div>
            )}

            <div className="container flex justify-center items-center mx-auto">
                <form onSubmit={login}>
                    <div className="bg-primary/20 py-7 px-20 mx-10 rounded-lg my-20">

                        <div className="text-center font-bold mb-5">
                            <h1>Login</h1>
                        </div>

                        <div className="w-full">

                            <div className="mb-5">
                                <input
                                    type="text"
                                    placeholder="Username"
                                    className="input input-bordered input-primary w-full"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>

                            <div className="mb-5 relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className="input input-bordered input-primary w-full"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 px-3 flex items-center"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? (
                                        <p>hide</p>
                                    ) : (
                                        <p>show</p>
                                    )}
                                </button>
                            </div>

                            <div className="flex justify-center items-center">
                                <button
                                    type="submit"
                                    className="btn btn-outline btn-primary"
                                >
                                    LOGIN
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
