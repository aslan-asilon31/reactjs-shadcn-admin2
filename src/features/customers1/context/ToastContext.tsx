// src/context/ToastContext.tsx
import React, { createContext, useContext, useState } from 'react';
import * as ToastPrimitives from '@radix-ui/react-toast';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = (toast) => {
        setToasts((prev) => [...prev, toast]);
    };

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            <ToastViewport toasts={toasts} removeToast={removeToast} />
        </ToastContext.Provider>
    );
};

const ToastViewport = ({ toasts, removeToast }) => {
    return (
        <ToastPrimitives.Viewport>
            {toasts.map((toast) => (
                <Toast key={toast.id} toast={toast} removeToast={removeToast} />
            ))}
        </ToastPrimitives.Viewport>
    );
};

const Toast = ({ toast, removeToast }) => {
    return (
        <ToastPrimitives.Root>
            <ToastPrimitives.Title>{toast.title}</ToastPrimitives.Title>
            <ToastPrimitives.Description>{toast.description}</ToastPrimitives.Description>
            <ToastPrimitives.Action asChild altText="Close">
                <button onClick={() => removeToast(toast.id)}>Close</button>
            </ToastPrimitives.Action>
        </ToastPrimitives.Root>
    );
};

export const useToast = () => {
    return useContext(ToastContext);
};
