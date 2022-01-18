import logoSvg from "../../assets/soup512.png";
import { UserMenu } from "../UserMenu";
import { Container, Content } from "./styles";

export interface HeaderProps {
    onOpenLoginModal: () => void;
    onOpenSignInModal: () => void;
}

export function Header({ onOpenLoginModal, onOpenSignInModal }: HeaderProps) {
    return (
        <Container className="header">
            <Content>
                <h1>
                    <button>
                        <img src={logoSvg} alt="Logo" />
                        <p><strong>RG</strong>Cook</p>
                    </button>
                </h1>
                <nav>
                    <UserMenu onOpenLoginModal={onOpenLoginModal} onOpenSignInModal={onOpenSignInModal} />
                </nav>
            </Content>
        </Container>
    );
}