import React, {createContext, ReactNode, useState} from "react";

interface AuthContextProps {
    token: string | null;
    setToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextProps>({
    token: null,
    setToken: () => {},
});

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };