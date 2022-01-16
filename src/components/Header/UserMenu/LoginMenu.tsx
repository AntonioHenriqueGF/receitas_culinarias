import { HeaderProps } from "../index";

export function LoginMenu({ onOpenLoginModal }: HeaderProps) {
    return (
        <ul className="header__nav">
            <li>
                <button onClick={onOpenLoginModal}>
                <span>Login</span>
                </button>
            </li>
            <li>
                <button>
                <span>Cadastro</span>
                </button>
            </li>
        </ul>
    );
}