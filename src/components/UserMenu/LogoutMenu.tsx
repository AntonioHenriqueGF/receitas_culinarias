import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export function LogoutMenu() {
    const { signOut } = useContext(AuthContext);

    return (
        <ul className="header__nav">
            <li>
                <button onClick={signOut}>
                <span>Logout</span>
                </button>
            </li>
        </ul>
    );
}