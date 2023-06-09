import React, {createContext, ReactNode, useEffect, useState} from "react";

interface BalanceContextProps {
    balance: number | null;
    setBalance: (token: number | null) => void;
}

const BalanceContext = createContext<BalanceContextProps>({
    balance: null,
    setBalance: () => {},
});

const BalanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [balance, setBalance] = useState<number | null>(0);

    return (
        <BalanceContext.Provider value={{ balance, setBalance }}>
            {children}
        </BalanceContext.Provider>
    );
};

export { BalanceContext, BalanceProvider };