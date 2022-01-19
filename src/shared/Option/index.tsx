import { Category } from "../../contexts/RecipesContext";

interface OptionProps {
    category: Category;
}

export function Option( { category }: OptionProps ) {
    return (
        <option key={`option-${category.nome}-${category.id}`} value={category.id}>{category.nome}</option>
    )
}