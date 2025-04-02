import React from 'react';
import { createPortal } from 'react-dom';

type ToastProps = {
    type: "success" | "warning" | "error";
    message: string;
    onClose: () => void;
};

const DefaultToast: React.FC<ToastProps> = ({ type, message, onClose }) => {

    const renderIcon = () => {
        switch (type) {
            case 'success':
                return (
                    <div className="flex-shrink-0 bg-green-100 h-8 justify-center rounded-lg text-green-500 w-8 dark:bg-green-800 dark:text-green-200 inline-flex items-center">
                        <svg
                            className="h-5 w-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                        </svg>                
                    </div>
                );
            case 'warning':
                return (
                    <div className="flex-shrink-0 bg-orange-100 h-8 justify-center rounded-lg text-orange-500 w-8 dark:bg-orange-800 dark:text-orange-200 inline-flex items-center">
                        <svg
                            className="h-5 w-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
                        </svg>                
                    </div>
                );
            case 'error':
                return (
                    <div className="flex-shrink-0 bg-red-100 h-8 justify-center rounded-lg text-red-500 w-8 dark:bg-red-800 dark:text-red-200 inline-flex items-center">
                        <svg
                            className="h-5 w-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
                        </svg>                
                    </div>
                );
            default:
                return null;
        }
    };

    return createPortal(
        <div
            id="toast-root"
            className="flex bg-white p-4 rounded-lg shadow text-gray-500 w-full -translate-x-1/2 animate-slideDown dark:bg-gray-800 dark:text-gray-400 items-center left-1/2 max-w-xs mb-4 top-0 transform z-[9999]"
            role="alert"
            style={{
                animation: 'slideDown ease-out forwards',
                transition: '0.8s'
            }}
        >
            {renderIcon()}
            <div className="text-sm font-normal ms-3">{message}</div>
            <button
                type="button"
                className="bg-white h-8 justify-center p-1.5 rounded-lg text-gray-400 w-8 -mx-1.5 -my-1.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white dark:text-gray-500 focus:ring-2 focus:ring-gray-300 hover:bg-gray-100 hover:text-gray-900 inline-flex items-center ms-auto"
                aria-label="Close"
                onClick={onClose}
            >
                <span className="sr-only">Close</span>
                <svg
                    className="h-3 w-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                </svg>
            </button>
        </div>,
        document.body
    );
};

export default DefaultToast;