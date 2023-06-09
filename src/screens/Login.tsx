import React, {useState, useContext, useEffect} from "react";
import {AuthContext} from "../contexts/AuthContext";
import {AlertContext} from "../contexts/AlertContext";
import {login} from "../services/user";
import { useNavigate } from 'react-router-dom';
import {getErrorMessage} from "../utils/getError";
import {BalanceContext} from "../contexts/BalanceContext";
import {balance} from "../services/balance";
import useAuth from "../hooks/auth";

export const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { token, setToken } = useContext(AuthContext);
    const { setBalance } = useContext(BalanceContext);
    const { showAlert, hideAlert } = useContext(AlertContext);
    const auth = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        hideAlert();
        try {
            const userToken = await login(email, password);
            console.log("set roken")
            setToken(userToken);
        } catch (e) {
            showAlert('danger', getErrorMessage(e));
            console.log({e});
        }
    };

    useEffect(() => {
        const updateBalance = async () => {
            try {
                const userBalance = await balance(auth);
                await setBalance(userBalance);

                navigate('/operations');
            } catch (e) {
                console.log(e);
            }
        }

        if (token) {
            updateBalance();
        }
    }, [token]);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 mx-auto mt-5">
                    <h2>Login</h2>
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
                        <button type="button" className="btn btn-primary" onClick={handleLogin}>
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};