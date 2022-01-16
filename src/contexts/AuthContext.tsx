import { createContext, ReactNode } from "react";
import { api } from "../services/api";

export type SignInCredentials = {
    login: string;
    senha: string;
}

type AuthContextData = {
    signIn(credentials: SignInCredentials): Promise<void>
    signed: boolean;
    token?: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
    const signed = false;

    async function signIn(credentials: SignInCredentials) {
        try {      
            api.post('/sessions', credentials).then(response => {
                console.log(response.data);
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <AuthContext.Provider value={{ signIn, signed }}>
            {children}
        </AuthContext.Provider>
    )
}