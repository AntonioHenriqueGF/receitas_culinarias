import { FormEvent, useEffect, useState } from "react";
import Modal from "react-modal";
import closeIcon from '../../assets/Close.svg';
import { Recipe } from "../../contexts/RecipesContext";
import { api } from "../../services/api";
import { Container } from "../NewRecipeModal/styles";

interface UpdateRecipeModalProps {
    recipe: Recipe;
    isOpen: boolean;
    onRequestClose: () => void;
}

/** Options:
 * 1 Bolos e tortas doces
 * 2 Carnes
 * 3 Aves
 * 4 Peixes e frutos do mar 
 * 5 Saladas, molhos e acompanhamentos
 * 6 Sopas
 * 7 Massas
 * 8 Bebidas
 * 9 Doces e sobremesas
 * 10 Lanches
 * 11 Prato Único
 * 12 Light
 * 13 Alimentação Saudável 
 *  */

export function UpdateRecipeModal({ recipe, isOpen, onRequestClose }: UpdateRecipeModalProps) {
    const [ nome, setNome ] = useState('');
    const [ ingredientes, setIngredientes ] = useState('');
    const [ modo_preparo, setModo_preparo ] = useState('');
    const [ tempo_preparo_minutos, setTempo_preparo_minutos ] = useState<number>();
    const [ porcoes, setPorcoes ] = useState<number>();
    const [ id_categorias, setId_categorias ] = useState(0);

    useEffect(() => {
        setNome(recipe.nome);
        setIngredientes(recipe.ingredientes);
        setModo_preparo(recipe.modo_preparo);
        setTempo_preparo_minutos(recipe.tempo_preparo_minutos);
        setPorcoes(recipe.porcoes);
        setId_categorias(recipe.id_categorias);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen])

    async function handleUpdateRecipeSubmit(event: FormEvent) {
        event.preventDefault();
        const recipeData = {
            id: recipe.id,
            id_categorias,
            nome,
            porcoes: Number(porcoes),
            ingredientes,
            modo_preparo,
            tempo_preparo_minutos: Number(tempo_preparo_minutos),
        };
        try {
            await api.put('/recipes', recipeData).then(() => {
                document.location.reload();
            }).catch(error => {
                alert(error.response.data.message);
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Modal 
            isOpen={isOpen} 
            onRequestClose={onRequestClose}
            overlayClassName={'react-modal-overlay'}
        >
            <button type="button" onClick={onRequestClose} className="react-modal-close">
                <img src={closeIcon} alt="Fechar modal" />
            </button>
            <Container onSubmit={handleUpdateRecipeSubmit}>
                <h2>Editar Receita</h2>
                <div>
                    <label>Nome</label>
                    <input value={nome} onChange={event => setNome(event.target.value)} type="text" required />
                </div>
                <div>
                    <label>Ingredientes</label>
                    <textarea name="ingredientes" onChange={event => setIngredientes(event.target.value)}>{ingredientes}</textarea>
                </div>
                <div>
                    <label>Modo de preparo</label>
                    <textarea name="modo_preparo" onChange={event => setModo_preparo(event.target.value)}>{modo_preparo}</textarea>
                </div>
                <div>
                    <label>Tempo de Preparo (minutos)</label>
                    <input value={tempo_preparo_minutos} onChange={event => setTempo_preparo_minutos(Number(event.target.value))} type="number" min="0" placeholder="Tempo de Preparo" required />
                </div>
                <div>
                    <label>Porções</label>
                    <input value={porcoes} onChange={event => setPorcoes(Number(event.target.value))} type="number" placeholder="Porções" min="0" required />
                </div>
                <div>
                    <label>Categoria</label>
                    <select value={id_categorias} onChange={event => setId_categorias(Number(event.target.value))} required >
                        <option value={0} selected disabled hidden>Selecione uma categoria</option>
                        <option value={1}>Bolos e tortas doces</option>
                        <option value={2}>Carnes</option>
                        <option value={3}>Aves</option>
                        <option value={4}>Peixes e frutos do mar</option>
                        <option value={5}>Saladas, molhos e acompanhamentos</option>
                        <option value={6}>Sopas</option>
                        <option value={7}>Massas</option>
                        <option value={8}>Bebidas</option>
                        <option value={9}>Doces e sobremesas</option>
                        <option value={10}>Lanches</option>
                        <option value={11}>Prato Único</option>
                        <option value={12}>Light</option>
                        <option value={13}>Alimentação Saudável</option>
                    </select>
                </div>
                <button type="submit">Enviar</button>
            </Container>
        </Modal>
    )
}

