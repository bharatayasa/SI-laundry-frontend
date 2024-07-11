// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from '../../services/api'

// export default function Register() {
//     const navigate = useNavigate();

    
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");

//     const [validation, setValidation] = useState([]);

//     const register = async (e) => {
//         e.preventDefault();

//         await api.post('/register', {
//             username:username,
//             password: password,
//         })
//             .then(() => {
//                 navigate("/login");
//             })
//             .catch(error => {
//                 setValidation(error.response.data);
//             })
//     };

//     return (
//         <div className="row justify-content-center">
//             <div className="row justify-content-center">
//                 <div className="col-md-5">
//                     <div className="card border-0 rounded shadow-sm">
//                         <div className="card-body">
//                             <h4>REGISTER</h4>
//                             <hr />
//                             {
//                                 validation.errors && (
//                                     <div className="alert alert-danger mt-2 pb-0">
//                                         {
//                                             validation.errors.map((error, index) => (
//                                                 <p key={index}>{error.path} : {error.msg}</p>
//                                             ))
//                                         }
//                                     </div>
//                                 )
//                             }
//                             <form onSubmit={register}>
//                                 <div className="row">
//                                     <div className="col-md-6 mb-3">
//                                         <div className="form-group">
//                                             <label className="mb-1 fw-bold">Username</label>
//                                             <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control"
//                                                 placeholder="Username" />
//                                         </div>
//                                     </div>
//                                     <div className="col-md-6 mb-3">
//                                         <div className="form-group">
//                                             <label className="mb-1 fw-bold">Password</label>
//                                             <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control"
//                                                 placeholder="Password" />
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <button type="submit" className="btn btn-primary w-100">REGISTER</button>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }