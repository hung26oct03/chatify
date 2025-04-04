import React, { createContext, useContext, useState } from 'react';
import dynamic from 'next/dynamic';

const DefaultAlert = dynamic(() => import('../components/Common/CustomAlert/DefaultAlert'), {
    ssr: false,
});

type AlertContextType = {
    showAlert: (message: string, type: string) => void;
};

const AlertContext = createContext<AlertContextType>({
    showAlert: () => {},
});

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
    const [alert, setAlert] = useState({ visible: false, message: '', type: '' });

    const showAlert = (message: string, type: string) => {
        setAlert({ visible: true, message, type });
        console.log("Alert state:", { visible: true, message, type });
        setTimeout(() => {
            setAlert({ visible: false, message: '', type: '' });
        }, 3000);
    };

    return (
        <AlertContext.Provider value={{ showAlert }}>
            {children}
            {alert.visible && (
                <DefaultAlert
                    type={alert.type as "success" | "warning" | "error"}
                    message={alert.message}
                    onClose={() => setAlert({ visible: false, message: '', type: '' })}
                />
            )}
        </AlertContext.Provider>
    );
};

export const useAlert = () => {
    return useContext(AlertContext);
};