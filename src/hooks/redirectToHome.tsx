import {useContext, useEffect} from "react";
import {AuthContext} from "../contexts/AuthContext";
import {useNavigate} from "react-router-dom";

const useAuthNavigation = () => {
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (!token) {
            navigate('/');

            return;
        }
    });

    return navigate;
};

export default useAuthNavigation;