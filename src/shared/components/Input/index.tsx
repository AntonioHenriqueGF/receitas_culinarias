import { FormControl, FormLabel, Input as CInput, InputProps as CInputProps } from "@chakra-ui/react";

interface InputProps extends CInputProps {
    name: string;
    label?: string;
    required?: boolean;
}

export function Input({name, label, required, ...rest}: InputProps) {
    return (
        <FormControl className="form-control">
            { !!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
            <CInput name={name} id={`inputFor-${name}`} required={!!required} {...rest} />
        </FormControl>
    )
}