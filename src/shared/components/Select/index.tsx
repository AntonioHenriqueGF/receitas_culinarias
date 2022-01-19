import { FormControl, FormLabel, SelectProps as CSelectProps, Select as CSelect, Flex } from "@chakra-ui/react";
import { Category } from "../../../contexts/RecipesContext";
import { Option } from "../../Option";

interface SelectProps extends CSelectProps {
    name: string;
    label?: string;
    required?: boolean;
    options: Category[];
}

export function Select( { name, label, required, options, ...rest }: SelectProps ) {
    return (
        <FormControl className="form-control">
            <Flex direction="column">
                { !!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
                <CSelect name={name} id={`inputFor-${name}`} required={!!required} {...rest} >
                    {options.map(option => (
                        <Option category={option}/>
                    ))}
                </CSelect>
            </Flex>
        </FormControl>
    )
}