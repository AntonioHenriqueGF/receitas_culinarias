import { FormEvent, useContext, useState } from 'react';
import Modal from 'react-modal';
import closeIcon from '../../assets/Close.svg';
import { AuthContext } from '../../contexts/AuthContext';
import { Container } from './styles';

interface NewLoginModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewLoginModal({ isOpen, onRequestClose }: NewLoginModalProps) {
    const [ login, setLogin ] = useState('');
    const [ senha, setSenha ] = useState('');
    const { logIn, isAuthenticated } = useContext(AuthContext);

    if (isAuthenticated) {
        onRequestClose();
    }

    async function handleLoginSubmit(event: FormEvent) {
        event.preventDefault();
        const loginData = { login, senha };

        await logIn(loginData);
    }
    return (
        <Modal 
            isOpen={isOpen} 
            onRequestClose={onRequestClose}
            overlayClassName={'react-modal-overlay'}
            className={'react-modal-content'}
        >
            <button type="button" onClick={onRequestClose} className="react-modal-close">
                <img src={closeIcon} alt="Fechar modal" />
            </button>
            <Container onSubmit={handleLoginSubmit}>
                <h2>Login</h2>
                <input type="text" placeholder="Login" value={login} onChange={event => setLogin(event.target.value)}/>
                <input type="password" placeholder="Senha" value={senha} onChange={event => setSenha(event.target.value)}/>
                <button type="submit">Entrar</button>
                <p>OU</p>
                <div>
                    <a href="/#">Criar uma nova conta</a>
                </div>
            </Container>
        </Modal>
    )
}