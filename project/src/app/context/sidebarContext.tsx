'use client'
import React, { createContext, useState, useContext, useEffect } from 'react';

interface SidebarContextType {
    isOpen: boolean;
    handleMenuToggle: () => void;
    handleActiveLink: (newId: number) => void;
    id: number;
    setId: (newId: number) => void;
}

const SidebarContext = createContext<SidebarContextType>({
    isOpen: false,
    handleMenuToggle: () => { },
    handleActiveLink: () => { },
    id: 0,
    setId: () => { },
});

export const useSidebarContext = () => useContext(SidebarContext);

interface SidebarProviderProps {
    children: React.ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [id, setId] = useState<number>(() => {
        const savedId = localStorage.getItem('sidebarId');
        return savedId ? parseInt(savedId, 10) : 0;
    });

    useEffect(() => {
        localStorage.setItem('sidebarId', id.toString());
    }, [id]);

    const handleMenuToggle = () => {
        setIsOpen((prevIsOpen) => !prevIsOpen);
    };

    const handleActiveLink = (newId: number) => {
        setIsOpen((prevIsOpen) => !prevIsOpen);
        setId(newId)
    }

    return (
        <SidebarContext.Provider value={{ isOpen, handleMenuToggle, handleActiveLink, id, setId }}>
            {children}
        </SidebarContext.Provider>
    );
};