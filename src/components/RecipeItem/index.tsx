import { useState } from "react";
import { Recipe } from "../../contexts/RecipesContext";
import { ViewRecipeModal } from "../ViewRecipeModal";
import { Container, ListMenu, ListPanel } from "./styles";

interface IRecipeItemProps {
    recipe: Recipe;
    onUpdateRecipe: () => Promise<void>;
    onDeleteRecipe: (id: number) => Promise<void>;
}

export function RecipeItem({ recipe, onUpdateRecipe, onDeleteRecipe }: IRecipeItemProps) {
    const [isOpen, setIsOpen] = useState(false);

    function handleOpenModal() {
        setIsOpen(true);
    }

    function handleCloseModal() {
        setIsOpen(false);
    }
    
    return (
        <Container>
            <li>
                <ListPanel onClick={handleOpenModal}>
                    <h3>{recipe.nome}</h3>
                    <p>{recipe.categoria.nome}, {recipe.porcoes} porções</p>
                </ListPanel>
                <ListMenu>
                    <button className="updateItemButton" onClick={onUpdateRecipe}>Editar</button>
                    <button className="deleteItemButton" onClick={() => onDeleteRecipe(recipe.id)}>Remover</button>
                </ListMenu>
            </li>
            <ViewRecipeModal recipe={recipe} isOpen={isOpen} onRequestClose={handleCloseModal}/>
        </Container>
    );
}