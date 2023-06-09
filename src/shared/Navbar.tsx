import React, {useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../contexts/AuthContext";
import {BalanceContext} from "../contexts/BalanceContext";

export const Navbar: React.FC = () => {
    const { token, setToken } = useContext(AuthContext);
    const { balance } = useContext(BalanceContext);
    const navigate = useNavigate();

    const logout = (e: any) => {
        e.preventDefault();
        setToken(null);
        navigate('/');
    }

    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link to="/" className="navbar-brand">
                    Calculator App
                </Link>
                <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/login" className="nav-link">
                                Login
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/register" className="nav-link">
                                Register
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/operations" className="nav-link">
                                Calculator
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/history" className="nav-link">
                                History
                            </Link>
                        </li>

                    </ul>
                    <ul className="navbar-nav" hidden={!token}>
                        <li className="nav-item">
                            <span className="nav-link">
                                <span className="badge bg-secondary">Balance ${balance}</span>
                            </span>
                        </li>
                        <li className="nav-item">
                            <a onClick={logout} href="#" className="nav-link">
                                Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};