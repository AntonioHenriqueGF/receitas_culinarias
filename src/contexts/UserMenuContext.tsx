import { createContext, ReactNode, useState } from "react";

export type UserModalState = {
    type: 'login' | 'signin';
    isOpen: boolean;
    onSetOpen: () => void;
    onSetClose: () => void;
    onSetType: (type: 'login' | 'signin') => void;
};

type UserMenuProviderProps = {
    children: ReactNode;
}

export const UserMenuContext = createContext({} as UserModalState);

export function UserMenuProvider({ children }: UserMenuProviderProps) {
    const [type, setType] = useState<'login' | 'signin'>('login');
    const [isOpen, setIsOpen] = useState(false);

    function onSetType(type: 'login' | 'signin') {
        setType(type);
    }

    function onSetOpen() {
        setIsOpen(true);
    }

    function onSetClose() {
        setIsOpen(false);
    }

    return (
        <UserMenuContext.Provider value={{ type, isOpen, onSetOpen, onSetClose, onSetType }}>
            {children}
        </UserMenuContext.Provider>
    );
}