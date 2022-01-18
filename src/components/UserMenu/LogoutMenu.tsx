import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export function LogoutMenu() {
    const { signOut, user } = useContext(AuthContext);

    return (
        <ul className="header__nav">
            <p>
                {user?.nome}
            </p>
            <li>
                <button onClick={signOut}>
                <span>Logout</span>
                </button>
            </li>
        </ul>
    );
}