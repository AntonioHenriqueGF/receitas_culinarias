import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Recipe, RecipesContext, RecipesProvider } from '../../contexts/RecipesContext';
import { api } from '../../services/api';
import { NewRecipeModal } from '../NewRecipeModal';
import { RecipeItem } from '../RecipeItem';
import { Container, ListHeader } from './styles';

export function RecipeList( ) {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const { isAuthenticated } = useContext(AuthContext);
    const { deleteRecipe } = useContext(RecipesContext);
    const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);

    function handleOpenRecipeModal(){
        setIsRecipeModalOpen(true);
    }
  
    function handleCloseRecipeModal(){
        setIsRecipeModalOpen(false);
    }

    async function handleRefreshList(){
        const response = await api.get('/recipes');
        const { data } = response;
        setRecipes(data);
    }

    useEffect(() => {
        if (isAuthenticated) {
            api.get('/recipes').then(response => {
                const { data } = response;
                setRecipes(data);
            });
        }
    }, [isAuthenticated]);

    async function handleDeleteRecipe(id: number) {
        await deleteRecipe(id);
        // try {
        //     await api.delete(`/recipes`, { data: { id } });
        //     const response = await api.get('/recipes');
        //     const { data } = response;
        //     setRecipes(data);
        // } catch (error) {
        //     console.log(error);
        // }
    }

    async function handleUpdateRecipe() {
        
    }
    
    if (!isAuthenticated) {
        return null;
    }

    function handleDisplayList(recipes: Recipe[]) {
        if (recipes.length !== 0) {
            return recipes.map(recipe => (
                <RecipeItem key={recipe.id} recipe={recipe} onDeleteRecipe={handleDeleteRecipe} onUpdateRecipe={handleUpdateRecipe} />
            ));
        }
        return (<div><p>Você ainda não possui receitas cadastradas!</p></div>)
    }

    return (
        <RecipesProvider>
            <Container>
                <ListHeader>
                    <div>
                        <h2>Receitas</h2>
                    </div>
                    <div>
                        <button className='refreshListButton' onClick={handleRefreshList}>Recarregar</button>
                        <button className='createItemButton' onClick={handleOpenRecipeModal}>Adicionar receita</button>
                    </div>
                </ListHeader>
                <ul>
                    {handleDisplayList(recipes)}
                </ul>
            </Container>
            <NewRecipeModal isOpen={isRecipeModalOpen} onRequestClose={handleCloseRecipeModal}/>
        </RecipesProvider>
    );
}