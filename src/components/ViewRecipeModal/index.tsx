import Modal from "react-modal";
import { Container, ModalHeader } from "./styles";
import closeIcon from '../../assets/Close.svg';
import { Recipe } from "../../contexts/RecipesContext";

interface ViewRecipeModalProps {
    recipe: Recipe;
    isOpen: boolean;
    onRequestClose: () => void;
}

export function ViewRecipeModal({ recipe, isOpen, onRequestClose }: ViewRecipeModalProps) {

    function convertDate(date: Date): string {
        const dateFormated = new Date(date);
        return dateFormated.toLocaleDateString();
    }

    return (
        <Modal
            isOpen={isOpen} 
            onRequestClose={onRequestClose}
            overlayClassName={'react-modal-overlay'}
            className={'react-recipe-modal-content'}
        >
            <button type="button" onClick={onRequestClose} className="react-modal-close">
                <img src={closeIcon} alt="Fechar modal" />
            </button>
            <Container className="printableItem">
                <ModalHeader>
                    <h2>{recipe.nome}</h2>
                    <button onClick={window.print}>Imprimir</button>
                </ModalHeader>
                <p>
                    <span><strong>Categoria:</strong> {recipe.categoria.nome}</span><br />
                    <span><strong>Craido em:</strong> {convertDate(recipe.criado_em)}</span><br />
                    <span><strong>Alterado em:</strong> {convertDate(recipe.alterado_em)}</span><br />
                    <span><strong>Tempo de preparo:</strong> {recipe.tempo_preparo_minutos} minutos</span><br />
                    <span><strong>Serve:</strong> {recipe.porcoes} porções</span><br />
                </p>
                <h3>Ingredientes:</h3>
                <p>{recipe.ingredientes.split('\n').map(
                    (line, i) => (
                        <span key={`ingredientes-${i}-${recipe.id}`}>
                            {line}
                            <br/>
                        </span>
                    ))
                }</p>
                <h3>Modo de preparo:</h3>
                <p>{recipe.modo_preparo.split('\n').map(
                    (line, i) => (
                        <span key={`modo_preparo-${i}-${recipe.id}`}>
                            {line}
                            <br/>
                        </span>
                    ))
                }</p>
            </Container>
        </Modal>
    );
}