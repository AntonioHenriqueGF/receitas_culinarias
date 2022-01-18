import { createContext, ReactNode, useEffect, useState } from "react";
import { parseCookies, setCookie } from 'nookies'
import { api } from "../services/api";
import { Recipe } from "./RecipesContext";

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

export type User = {
    id: string;
    nome: string;
    login: string;
    token: string;
    recipes?: Recipe[];
} 

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
    const [ user, setUser ] = useState<User>();
    const [ recipes, setRecipes ] = useState<Recipe[]>();
    const isAuthenticated = !!user;

    useEffect(() => {
        api.get('/recipes').then(response => {
            const { data } = response;
            setRecipes(data);
        });
    }, [])


    useEffect(() => {
        const { 'rpcook.token': token } = parseCookies();

        if (token) {
            api.get('/users/me').then(response => {
                const { data } = response;
                setUser({
                    id: data.id,
                    nome: data.nome,
                    login: data.login,
                    token: token,
                    recipes: recipes
                });
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // console.log(user);

    async function logIn(credentials: LogInCredentials) {
        await api.post('/sessions', credentials).then(response => {
            const { data } = response;
            setUser({
                id: data.id,
                nome: data.nome,
                login: data.login,
                token: data.token,
                recipes: recipes
            });
            setCookie(undefined, 'rpcook.token', data.token, {
                maxAge: 60 * 60 * 24,
                path: '/',
            });
            api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
            window.location.reload();
        }).catch(error => {
            alert(error.response.data.message);
        });;
    }

    async function signIn(credentials: SignInCredentials) {
        try {
            await api.post('/users', credentials);

            window.location.reload();
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

        window.location.reload();
    }

    return (
        <AuthContext.Provider value={{ logIn, signIn, signOut, isAuthenticated, user }}>
            {children}
        </AuthContext.Provider>
    )
}