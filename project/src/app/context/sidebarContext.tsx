'use client'
import React, { createContext, useState, useContext, useEffect } from 'react';

interface SidebarContextType {
    isOpen: boolean;
    handleMenuToggle: () => void;
    handleActiveLink: () => void;
}

const SidebarContext = createContext<SidebarContextType>({
    isOpen: false,
    handleMenuToggle: () => { },
    handleActiveLink: () => { },
});

export const useSidebarContext = () => useContext(SidebarContext);

interface SidebarProviderProps {
    children: React.ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleMenuToggle = () => {
        setIsOpen((prevIsOpen) => !prevIsOpen);
    };

    const handleActiveLink = () => {
        if (window.innerWidth < 768) {
            setIsOpen((prevIsOpen) => !prevIsOpen);
        }
    }

    return (
        <SidebarContext.Provider value={{ isOpen, handleMenuToggle, handleActiveLink }}>
            {children}
        </SidebarContext.Provider>
    );
};