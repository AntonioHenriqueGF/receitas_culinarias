import Modal from "react-modal";
import { Container } from "./styles";
import closeIcon from '../../assets/Close.svg';
import { Recipe } from "../../contexts/RecipesContext";

interface ViewRecipeModalProps {
    recipe: Recipe;
    isOpen: boolean;
    onRequestClose: () => void;
}

export function ViewRecipeModal({ recipe, isOpen, onRequestClose }: ViewRecipeModalProps) {
    return (
        <Modal
            isOpen={isOpen} 
            onRequestClose={onRequestClose}
            overlayClassName={'react-modal-overlay'}
        >
            <button type="button" onClick={onRequestClose} className="react-modal-close">
                <img src={closeIcon} alt="Fechar modal" />
            </button>
            <Container>
                <h2>{recipe.nome}</h2>
                <p>{recipe.categoria.nome}</p>
                <p>Craido em: {recipe.criado_em}, Alterado em: {recipe.alterado_em}</p>
                <p>Tempo de preparo (minutos): {recipe.tempo_preparo_minutos} | Serve: {recipe.porcoes}</p>
                <h3>Ingredientes:</h3>
                <p>{recipe.ingredientes.replace(/(?:\r\n|\r|\n)/g, '<br />')}</p>
                <h3>Modo de preparo:</h3>
                <p>{recipe.modo_preparo.split('\n').map(
                    (line, i) => (
                        <span key={`linebreaker-${i}-${recipe.id}`}>
                            {line}
                            <br/>
                        </span>
                    ))
                }</p>
            </Container>
        </Modal>
    );
}