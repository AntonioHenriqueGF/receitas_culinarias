import { useContext } from "react";
import { HeaderProps } from "..";
import { AuthContext } from "../../../contexts/AuthContext";
import { LoginMenu } from "./LoginMenu";
import { LogoutMenu } from "./LogoutMenu";

export function UserMenu({ onOpenLoginModal }: HeaderProps) {
    const { signed } = useContext(AuthContext);
    if (signed) {
        return (
            <LogoutMenu />
        );
    } else {
        return (
            <LoginMenu onOpenLoginModal={onOpenLoginModal} />
        );
    }
}