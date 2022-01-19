import { FormEvent, useContext, useEffect, useState } from 'react';
import Modal from 'react-modal';
import closeIcon from '../../assets/Close.svg';
import { AuthContext } from '../../contexts/AuthContext';
import { Input } from '../../shared/components/Input';
import { Container } from './styles';

interface NewLoginModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewLoginModal({ isOpen, onRequestClose }: NewLoginModalProps) {
    const [ login, setLogin ] = useState('');
    const [ senha, setSenha ] = useState('');
    const { logIn, isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        onRequestClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

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
                <Input name="login" type="text" label="Login" value={login} onChange={event => setLogin(event.target.value)} required />
                <Input name="senha" label="Senha" type="password" value={senha} onChange={event => setSenha(event.target.value)} required />
                <button type="submit">Entrar</button>
            </Container>
        </Modal>
    )
}