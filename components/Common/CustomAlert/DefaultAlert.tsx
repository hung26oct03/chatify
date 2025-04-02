import React from 'react';
import { createPortal } from 'react-dom';

type ToastProps = {
    type: "success" | "warning" | "error";
    message: string;
    onClose: () => void;
};

const DefaultAlert: React.FC<ToastProps> = ({ type, message, onClose }) => {

    const renderIcon = () => {
        switch (type) {
            case 'success':
                return (
                    <div className="flex bg-green-100 h-12 justify-center p-2 rounded-full w-12 dark:bg-green-900 items-center mb-3.5 mx-auto">
                        <svg
                            aria-hidden="true"
                            className="h-8 text-green-500 w-8 dark:text-green-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span className="sr-only">Success</span>
                    </div>
                );
            case 'warning':
                return (
                    <div className="flex bg-orange-100 h-12 justify-center p-2 rounded-full w-12 dark:bg-orange-800 items-center mb-3.5 mx-auto">
                        <svg
                            className="h-5 text-orange-500 w-5 dark:text-orange-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
                        </svg> 
                        <span className="sr-only">Warning</span>
                    </div>
                );
            case 'error':
                return (
                    <div className="flex bg-red-100 h-12 justify-center p-2 rounded-full w-12 dark:bg-red-800 items-center mb-3.5 mx-auto">
                        <svg
                            className="h-5 text-red-500 w-5 dark:text-red-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
                        </svg> 
                        <span className="sr-only">Error</span>
                    </div>
                );
            default:
                return null;
        }
    };

    return createPortal(
        <div
            id="alert-root"
            role='alert'
            className="flex h-full justify-center w-full fixed inset-0 items-center z-[9999]"
        >
            <div className="h-full p-4 w-full max-w-md md:h-auto relative">
                <div className="p-4 rounded-lg shadow text-cente dark:bg-gray-800 relative sm:p-5"
                    style={{
                        backgroundColor: 'rgba(0,0,0,0.7)'
                    }}
                >
                    <button
                        type="button"
                        className="bg-transparent p-1.5 rounded-lg text-sm text-white absolute dark:hover:bg-gray-600 dark:hover:text-white hover:bg-gray-800 inline-flex items-center ml-auto right-2.5 top-2.5"
                        onClick={onClose}
                    >
                        <svg
                            aria-hidden="true"
                            className="h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                        <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    {renderIcon()}
                    <p className="text-base text-center text-white dark:text-white font-semibold my-2">
                        {message}
                    </p>
                </div>
            </div>
        </div>
        ,
        document.body
    );
};

export default DefaultAlert;