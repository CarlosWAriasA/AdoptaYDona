import React from 'react';
import MensajesComponent from '../../components/MensajesList/MensajesList';
import FormularioEnvioMensaje from '../../components/FormEnvioMensaje/FormEnvioMensaje'; 

const ChatPage = () => {
  return (
    <div>
      <h1>Chat en Vivo</h1>
      <MensajesComponent />
      <FormularioEnvioMensaje />
    </div>
  );
};

export default ChatPage;