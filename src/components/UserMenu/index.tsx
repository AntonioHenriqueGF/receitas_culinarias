import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { HeaderProps } from "../Header";
import { LoginMenu } from "./LoginMenu";
import { LogoutMenu } from "./LogoutMenu";

export function UserMenu({ onOpenLoginModal, onOpenSignInModal }: HeaderProps) {
    const { isAuthenticated } = useContext(AuthContext);
    if (isAuthenticated) {
        return (
            <LogoutMenu />
        );
    } else {
        return (
            <LoginMenu onOpenLoginModal={onOpenLoginModal} onOpenSignInModal={onOpenSignInModal} />
        );
    }
}