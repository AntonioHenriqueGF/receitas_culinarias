import { createContext, ReactNode, useEffect, useState } from "react";
import { parseCookies, setCookie } from 'nookies'
import { api } from "../services/api";

export type LogInCredentials = {
    login: string;
    senha: string;
}

export type SignInCredentials = {
    login: string;
    nome: string;
    senha: string;
}

type AuthContextData = {
    logIn(credentials: LogInCredentials): Promise<void>;
    signIn(credentials: SignInCredentials): Promise<void>;
    signOut(): Promise<void>;
    isAuthenticated: boolean;
    user?: User;
}

type AuthProviderProps = {
    children: ReactNode;
}

type Category = {
    id: number;
    nome: string;
}

type Recipe = {
    id: number;
    id_usuarios: number;
    id_categorias: number;
    nome: string;
    tempo_preparo_minutos: number;
    porcoes: number;
    modo_preparo: string;
    ingredientes: string;
    criado_em: Date;
    alterado_em: Date;
    categoria: Category;
}

type User = {
    id: string;
    nome: string;
    login: string;
    token: string;
    recipes?: Recipe[];
} 

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>();
    const isAuthenticated = !!user;

    useEffect(() => {
        const { 'rpcook.token': token } = parseCookies();

        if (token) {
            api.get('/users/me').then(response => {
                const { data } = response;
                setUser({
                    id: data.id,
                    nome: data.nome,
                    login: data.login,
                    token: token
                });
            });

        }
    }, [])

    async function logIn(credentials: LogInCredentials) {
        try {      
            
            const { data } = await api.post('/sessions', credentials);

            setUser({
                id: data.user.id,
                nome: data.user.nome,
                login: data.user.login,
                token: data.token
            });

            setCookie(undefined, 'rpcook.token', data.token, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/',
            });

            api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        } catch (error) {
            console.log(error);
        }
    }

    async function signIn(credentials: SignInCredentials) {
        try {
            await api.post('/users', credentials);
        } catch (error) {
            console.log(error);
        }
    }

    async function signOut(): Promise<void> {
        setUser(undefined);
        api.defaults.headers.common["Authorization"] = `Bearer ${''}`;
        setCookie(undefined, 'rpcook.token', '', {
            maxAge: 0,
            path: '/',
        });
    }

    return (
        <AuthContext.Provider value={{ logIn, signIn, signOut, isAuthenticated, user }}>
            {children}
        </AuthContext.Provider>
    )
}