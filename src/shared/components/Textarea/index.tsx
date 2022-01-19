import { FormControl, FormLabel, TextareaProps as CTextareaProps, Textarea as CTextarea } from "@chakra-ui/react";

interface TextareaProps extends CTextareaProps {
    name: string;
    label?: string;
    value?: string;
    required?: boolean;
}

export function Textarea( {name, label, value, required, ...rest}: TextareaProps ) {
    return (
        <FormControl className="form-control">
            { !!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
            <CTextarea name={name} id={`inputFor-${name}`} {...rest} required={!!required}>{value}</CTextarea>
        </FormControl>
    )
}