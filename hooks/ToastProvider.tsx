import React, { createContext, useContext, useState } from 'react';
import DefaultToast from '../components/Common/CustomToast/DefaultToast';

type ToastContextType = {
    showToast: (message: string, type: string) => void;
};

const ToastContext = createContext<ToastContextType>({
    showToast: () => {},
});

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    const [toast, setToast] = useState({ visible: false, message: '', type: '' });

    const showToast = (message: string, type: string) => {
        setToast({ visible: true, message, type });
        console.log("Toast state:", { visible: true, message, type });
        setTimeout(() => {
            setToast({ visible: false, message: '', type: '' });
        }, 3000);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {toast.visible && <DefaultToast type={toast.type as "success" | "warning" | "error"} message={toast.message} onClose={() => setToast({ visible: false, message: '', type: '' })} />}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    return useContext(ToastContext);
};