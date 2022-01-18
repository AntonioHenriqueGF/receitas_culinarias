import { useState } from "react";
import { Recipe } from "../../contexts/RecipesContext";
import { UpdateRecipeModal } from "../UpdateRecipeModal";
import { ViewRecipeModal } from "../ViewRecipeModal";
import { Container, ListMenu, ListPanel } from "./styles";

interface IRecipeItemProps {
    recipe: Recipe;
    onDeleteRecipe: (id: number) => Promise<void>;
}

export function RecipeItem({ recipe, onDeleteRecipe }: IRecipeItemProps) {
    const [isViewRecipeModalOpen, setIsViewRecipeModalOpen] = useState(false);
    const [isUpdateRecipeModalOpen, setIsUpdateRecipeModalOpen] = useState(false);

    function handleOpenModal() {
        setIsViewRecipeModalOpen(true);
    }

    function handleCloseModal() {
        setIsViewRecipeModalOpen(false);
    }

    function handleOpenUpdateModal() {
        setIsUpdateRecipeModalOpen(true);
    }

    function handleCloseUpdateModal() {
        setIsUpdateRecipeModalOpen(false);
    }
    
    return (
        <Container>
            <li>
                <ListPanel onClick={handleOpenModal}>
                    <h3>{recipe.nome}</h3>
                    <p>{recipe.categoria.nome}, {recipe.porcoes} porções</p>
                </ListPanel>
                <ListMenu>
                    <button className="updateItemButton" onClick={handleOpenUpdateModal}>Editar</button>
                    <button className="deleteItemButton" onClick={() => onDeleteRecipe(recipe.id)}>Remover</button>
                </ListMenu>
            </li>
            <ViewRecipeModal recipe={recipe} isOpen={isViewRecipeModalOpen} onRequestClose={handleCloseModal}/>
            <UpdateRecipeModal recipe={recipe} isOpen={isUpdateRecipeModalOpen} onRequestClose={handleCloseUpdateModal}/>
        </Container>
    );
}