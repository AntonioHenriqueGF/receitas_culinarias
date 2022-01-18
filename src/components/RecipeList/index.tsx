import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Recipe, RecipesProvider } from '../../contexts/RecipesContext';
import { api } from '../../services/api';
import { NewRecipeModal } from '../NewRecipeModal';
import { RecipeItem } from '../RecipeItem';
import { Container, ListHeader } from './styles';

export function RecipeList( ) {
    const { isAuthenticated } = useContext(AuthContext);
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
    const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);
    const [recipeQuery, setRecipeQuery] = useState('');

    useEffect(() => {
        if (isAuthenticated) {
            api.get('/recipes').then(response => {
                const { data } = response;
                setRecipes(data);
                setAllRecipes(data);
            });
        }
    }, [isAuthenticated]);

    useEffect(() => {
        console.log(recipeQuery !== '');
        if (recipeQuery !== '') {
            const filteredRecipes = allRecipes.filter(recipe => recipe.nome.toLowerCase().includes(recipeQuery.toLowerCase()));
            setRecipes(filteredRecipes);
        } else {
            setRecipes(allRecipes);
        }
    }, [allRecipes, recipeQuery])

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

    async function handleDeleteRecipe(id: number) {
        try {
            await api.delete(`/recipes`, { data: { id } }).catch(error => {
                alert(error.response.data.message);
            });
            const response = await api.get('/recipes');
            const { data } = response;
            setRecipes(data);
        } catch (error) {
            console.log(error);
        }
    }
    
    if (!isAuthenticated) {
        return null;
    }

    function handleDisplayList(recipes: Recipe[]) {
        if (recipes.length !== 0) {
            return recipes.map(recipe => (
                <RecipeItem key={recipe.id} recipe={recipe} onDeleteRecipe={handleDeleteRecipe} />
            ));
        }
        return (<div><p>Nenhuma receita para mostrar...</p></div>)
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
                <input type="text" placeholder='Procurar receita...' value={recipeQuery} onChange={event => setRecipeQuery(event.target.value)} />
                <ul>
                    {handleDisplayList(recipes)}
                </ul>
            </Container>
            <NewRecipeModal isOpen={isRecipeModalOpen} onRequestClose={handleCloseRecipeModal}/>
        </RecipesProvider>
    );
}