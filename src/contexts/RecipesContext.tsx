import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { AuthContext } from "./AuthContext";

export type Category = {
    id: number;
    nome: string;
}

export interface ICreateRecipe {
    id_categorias: number;
    nome: string;
    porcoes: number;
    ingredientes: string;
    modo_preparo: string;
    tempo_preparo_minutos: number;
}

export type Recipe = {
    id: number;
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

type RecipesContextData = {
    recipes?: Recipe[];
    getRecipes(): Promise<Recipe[]>;
    createRecipe(recipe: ICreateRecipe): Promise<Recipe[]>;
    updateRecipe(recipe: Recipe): Promise<void>;
    deleteRecipe(id: number): Promise<void>;
}

type RecipesProviderProps = {
    children: ReactNode;
}

export const RecipesContext = createContext({} as RecipesContextData);

export function RecipesProvider({ children }: RecipesProviderProps) {
    const [ recipes, setRecipes ] = useState<Recipe[]>([]);
    const { isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        if (isAuthenticated) {
            api.get('/recipes').then(response => {
                const { data } = response;
                setRecipes(data);
            });
        }
    }, [isAuthenticated])

    async function getRecipes(): Promise<Recipe[]> {
        try {
            const response = await api.get('/recipes');
            const { data } = response;
            setRecipes(data);
            return data;
        } catch (error) {
            return [];
        }
    }

    async function createRecipe(recipe: ICreateRecipe): Promise<Recipe[]> {
        await api.post('/recipes', recipe).then(() => {
        }).catch(error => {
            alert(error.response.data.message);
        });
        const data = await getRecipes();
        return data;
    }

    async function updateRecipe(recipe: Recipe): Promise<void> {
        try {
            await api.put(`/recipes`, recipe);
            const response = await api.get('/recipes');
            const { data } = response;
            setRecipes(data);
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteRecipe(id: number): Promise<void> {
        try {
            console.log(id);
            await api.delete(`/recipes`, { data: { id } });
            const response = await api.get('/recipes');
            const { data } = response;
            setRecipes(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <RecipesContext.Provider value={{ recipes, getRecipes, createRecipe, updateRecipe, deleteRecipe}}>
            {children}
        </RecipesContext.Provider>
    )
}