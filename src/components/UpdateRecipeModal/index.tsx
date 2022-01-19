import { Stack } from "@chakra-ui/react";
import { FormEvent, useEffect, useState } from "react";
import Modal from "react-modal";
import closeIcon from '../../assets/Close.svg';
import { Category, Recipe } from "../../contexts/RecipesContext";
import { api } from "../../services/api";
import { Input } from "../../shared/components/Input";
import { Select } from "../../shared/components/Select";
import { Textarea } from "../../shared/components/Textarea";
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
    const [ categories, setCategories ] = useState<Category[]>([]);

    useEffect(() => {
        api.get('/recipes/categories').then(response => {
            const { data } = response;
            setCategories(data);
        });
    }, [])



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
                <Stack spacing={4}>
                    <Input name="nome" label="Nome" value={nome} onChange={event => setNome(event.target.value)} type="text" required />
                    <Textarea name="ingredientes" label="Ingredientes" onChange={event => setIngredientes(event.target.value)}>{ingredientes}</Textarea>
                    <Textarea name="modo_preparo" label="Modo de preparo" onChange={event => setModo_preparo(event.target.value)}>{modo_preparo}</Textarea>
                    <Input name="tempo_preparo_minutos" label="Tempo de Preparo" value={tempo_preparo_minutos} onChange={event => setTempo_preparo_minutos(() => {
                        if (event.target.value === '') {
                            return undefined;
                        }
                        return Number(event.target.value);
                    })} type="number" min="0" placeholder="Tempo de Preparo" />
                    <Input name="porcoes" label="Porcoes" value={porcoes} onChange={event => setPorcoes(() => {
                        if (event.target.value === '') {
                            return undefined;
                        }
                        return Number(event.target.value);
                    })} type="number" placeholder="Porções" min="0" />
                    <Select name="id_categorias" label="Categoria" options={categories} placeholder="Selecionar" value={id_categorias} onChange={event => setId_categorias(Number(event.target.value))} required />
                    <button type="submit">Enviar</button>
                </Stack>
            </Container>
        </Modal>
    )
}

