import logoSvg from "../../assets/soup512.png";
import { Container, Content } from "./styles";
import { UserMenu } from "./UserMenu";

export interface HeaderProps {
    onOpenLoginModal: () => void;
}

export function Header({ onOpenLoginModal }: HeaderProps) {
    return (
        <Container className="header">
            <Content>
                <h1>
                    <button>
                        <img src={logoSvg} alt="Logo" />
                        <p><strong>RP</strong>Cook</p>
                    </button>
                </h1>
                <nav>
                    <UserMenu onOpenLoginModal={onOpenLoginModal} />
                </nav>
            </Content>
        </Container>
    );
}