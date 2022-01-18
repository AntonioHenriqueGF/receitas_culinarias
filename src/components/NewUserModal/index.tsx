import { FormEvent, useContext, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { AuthContext } from '../../contexts/AuthContext';
import closeIcon from '../../assets/Close.svg';
import { Container } from '../NewLoginModal/styles';

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
            className={'react-modal-content'}
        >
            <button type="button" onClick={onRequestClose} className="react-modal-close">
                <img src={closeIcon} alt="Fechar modal" />
            </button>
            <Container onSubmit={handleSignInSubmit}>
                <h2>Cadastro</h2>
                <input type="text" placeholder="Login" value={login} onChange={event => setLogin(event.target.value)} required />
                <input type="text" placeholder="Nome" value={nome} onChange={event => setNome(event.target.value)} required />
                <input type="password" placeholder="Senha" value={senha} onChange={event => setSenha(event.target.value)} required />
                <input type="password" placeholder="Repetir senha" value={repetirSenha} onChange={event => setRepetirSenha(event.target.value)} required />
                <button type="submit">Cadastrar</button>
                <p>OU</p>
                <div>
                    <a href="/#">Já possui uma conta?</a>
                </div>
            </Container>
        </Modal>
    )
}