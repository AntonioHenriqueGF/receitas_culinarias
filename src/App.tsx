import { useState } from "react";
import Modal from "react-modal";
import { Header } from "./components/Header";
import { NewLoginModal } from "./components/NewLoginModal";
import { AuthProvider } from "./contexts/AuthContext";
import { GlobalStyle } from './styles/global';

Modal.setAppElement('#root');

export function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  function handleOpenLoginModal(){
      setIsLoginModalOpen(true);
  }

  function handleCloseLoginModal(){
      setIsLoginModalOpen(false);
  }
  return (
    <AuthProvider>
      <Header onOpenLoginModal={handleOpenLoginModal}/>

      <NewLoginModal isOpen={isLoginModalOpen} onRequestClose={handleCloseLoginModal} />
      
      <GlobalStyle />
    </AuthProvider>
  );
}
