'use client'
import React, { createContext, useState, useContext, useEffect } from 'react';

interface SidebarContextType {
    isOpen: boolean;
    accountOpen: boolean;
    setAccountIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleMenuToggle: () => void;
    handleActiveLink: () => void;
}

const SidebarContext = createContext<SidebarContextType>({
    isOpen: false,
    accountOpen: false,
    setAccountIsOpen: () => { },
    handleMenuToggle: () => { },
    handleActiveLink: () => { },
});

export const useSidebarContext = () => useContext(SidebarContext);

interface SidebarProviderProps {
    children: React.ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [accountOpen, setAccountIsOpen] = useState(false)

    const handleMenuToggle = () => {
        setIsOpen((prevIsOpen) => !prevIsOpen);
    };

    const handleActiveLink = () => {
        if (window.innerWidth <= 768) {
            setIsOpen((prevIsOpen) => !prevIsOpen);
            setAccountIsOpen(false)
        } else {
            setAccountIsOpen(false)
        }
    }

    return (
        <SidebarContext.Provider value={{ isOpen, handleMenuToggle, handleActiveLink, accountOpen, setAccountIsOpen }}>
            {children}
        </SidebarContext.Provider>
    );
};