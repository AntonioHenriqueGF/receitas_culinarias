import { HeaderProps } from "../Header";

export function LoginMenu({ onOpenLoginModal, onOpenSignInModal }: HeaderProps) {
    return (
        <ul className="header__nav">
            <li>
                <button onClick={onOpenLoginModal}>
                <span>Login</span>
                </button>
            </li>
            <li>
                <button onClick={onOpenSignInModal}>
                <span>Cadastro</span>
                </button>
            </li>
        </ul>
    );
}