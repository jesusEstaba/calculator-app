import React, {useContext, useState} from "react";
import {AlertContext} from "../contexts/AlertContext";
import {useNavigate} from "react-router-dom";
import {register} from "../services/user";
import {getErrorMessage} from "../utils/getError";

export const Register: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { showAlert, hideAlert } = useContext(AlertContext);
    const navigate = useNavigate();

    const handleRegister = async () => {
        hideAlert();
        try {
            await register(email, password)
            navigate('/login');
            showAlert('success', 'User registered.');
        } catch (e) {
            showAlert('danger', getErrorMessage(e));
            console.log({e});
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 mx-auto mt-5">
                    <h2>Register</h2>
                    <form>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="button" className="btn btn-primary" onClick={handleRegister}>
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};