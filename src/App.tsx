import { useState } from "react";
import Modal from "react-modal";
import { Header } from "./components/Header";
import { NewUserModal } from "./components/NewUserModal";
import { NewLoginModal } from "./components/NewLoginModal";
import { AuthProvider } from "./contexts/AuthContext";
import { GlobalStyle } from './styles/global';
import { RecipeList } from "./components/RecipeList";

Modal.setAppElement('#root');

export function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  function handleOpenLoginModal(){
      setIsLoginModalOpen(true);
  }

  function handleCloseLoginModal(){
      setIsLoginModalOpen(false);
  }

  function handleOpenSignInModal(){
      setIsSignInModalOpen(true);
  }

  function handleCloseSignInModal(){
      setIsSignInModalOpen(false);
  }

  return (
    <AuthProvider>
      <Header onOpenLoginModal={handleOpenLoginModal} onOpenSignInModal={handleOpenSignInModal}/>

      <RecipeList />

      <NewLoginModal isOpen={isLoginModalOpen} onRequestClose={handleCloseLoginModal} />

      <NewUserModal isOpen={isSignInModalOpen} onRequestClose={handleCloseSignInModal} />
      
      <GlobalStyle />
    </AuthProvider>
  );
}
