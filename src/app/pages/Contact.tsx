import React, { useState } from 'react';
import { Footer } from "../components/Footer";
import ContactImage from './imgs/contact.svg';
import emailjs from 'emailjs-com';
import { Nav } from '../components/Nav';

export const Contact = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const templateParams = {
      from_email: email,
      message: message
    };

    // Garantir que as variáveis de ambiente sejam definidas como strings
    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID as string;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID as string;
    const userId = process.env.REACT_APP_EMAILJS_USER_ID as string;

    emailjs.send(
      serviceId,
      templateId,
      templateParams,
      userId
    ).then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      alert('Mensagem enviada com sucesso!');
    }).catch((err) => {
      console.error('FAILED...', err);
      alert('Erro ao enviar mensagem, tente novamente.');
    });
  };

  return (
    <>
      <Nav />
      <section className="w-full h-screen bg-gradient-to-b from-[#bd5465] to-[#CC1C37] gap-20 flex justify-center items-center p-8">
        <form onSubmit={handleSubmit} className="bg-[#f5f5f5] h-auto w-full sm:w-1/2 flex flex-col sm:gap-10 sm:p-20 rounded-lg p-8">
          <div>
            <h1 className="text-[#333] text-4xl font-bold">Contate-<span className="text-[#BF1A33]">nos</span></h1>
          </div>
          <div className="flex flex-col gap-4">
            <input
              type="email"
              required
              placeholder="Digite seu melhor email..."
              className="px-2 lg:px-10 py-4 rounded-lg bg-[#d4d4d4] placeholder-[#6B6B6B] outline-none focus:ring-2 ring-red-500 text-gray-800"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <textarea
              required
              rows={4}
              placeholder="Digite sua mensagem..."
              className="px-2 resize-none lg:px-10 py-4 rounded-lg bg-[#d4d4d4] placeholder-[#6B6B6B] outline-none focus:ring-2 ring-red-500 text-gray-800"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              type="submit"
              className="bg-[#BF1A33] py-3 px-8 rounded-lg text-white text-lg font-bold m-auto"
            >
              Enviar
            </button>
          </div>
        </form>
        <img src={ContactImage} className="hidden lg:block" alt="7Car Logo" />
      </section>
      <Footer />
    </>
  );
};
