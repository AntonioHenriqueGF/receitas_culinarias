import { FormEvent, useContext, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { AuthContext } from '../../contexts/AuthContext';
import closeIcon from '../../assets/Close.svg';
import { Container } from '../NewLoginModal/styles';
import { Input } from '../../shared/components/Input';

interface NewUserModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewUserModal({ isOpen, onRequestClose }: NewUserModalProps) {
    const [ login, setLogin ] = useState('');
    const [ nome, setNome ] = useState('');
    const [ senha, setSenha ] = useState('');
    const [ repetirSenha, setRepetirSenha ] = useState('');
    const { signIn, isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        onRequestClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    async function handleSignInSubmit(event: FormEvent) {
        event.preventDefault();
        if (senha !== repetirSenha) {
            alert('As senhas não conferem');
            return;
        }
        const userData = { login, nome, senha };

        await signIn(userData);
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName={'react-modal-overlay'}
            className={'react-signin-modal-content'}
        >
            <button type="button" onClick={onRequestClose} className="react-modal-close">
                <img src={closeIcon} alt="Fechar modal" />
            </button>
            <Container onSubmit={handleSignInSubmit}>
                <h2>Cadastro</h2>
                <Input name="login" label="Login" type="text" value={login} onChange={event => setLogin(event.target.value)} required />
                <Input name="nome" label="Nome" type="text" value={nome} onChange={event => setNome(event.target.value)} required />
                <Input name="senha" label="Senha" type="password" value={senha} onChange={event => setSenha(event.target.value)} required />
                <Input name="repetir_senha" label="Repetir senha" type="password" value={repetirSenha} onChange={event => setRepetirSenha(event.target.value)} required />
                <button type="submit">Cadastrar</button>
            </Container>
        </Modal>
    )
}