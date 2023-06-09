import React, {createContext, ReactNode, useState} from 'react';

interface Alert {
    type: string;
    message: string;
}

interface AlertContextProps {
    alert: Alert | null;
    showAlert: (type: string, message: string) => void;
    hideAlert: () => void;
}

export const AlertContext = createContext<AlertContextProps>({
    alert: null,
    showAlert: () => {},
    hideAlert: () => {},
});

export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [alert, setAlert] = useState<Alert | null>(null);

    const showAlert = (type: string, message: string) => {
        setAlert({ type, message });
    };

    const hideAlert = () => {
        setAlert(null);
    };

    return (
        <AlertContext.Provider value={{ alert, showAlert, hideAlert }}>
            {children}
        </AlertContext.Provider>
    );
};