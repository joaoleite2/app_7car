import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  id_Usu: number;
  nome_Usu: string;
  email_Usu: string;
  id_Tel: string | null;
  id_End: string | null;
  status_Usu: string | null | boolean;
}

interface ModalUpdateProps {
  user: User | null;
  onClose: () => void;
  onSave: (user: User) => void;
}

const ModalUpdate: React.FC<ModalUpdateProps> = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState<User>(user || {} as User);

  useEffect(() => {
    setFormData(user || {} as User);
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:8080/user/${formData.id_Usu}`, formData);
      onSave(formData);
    } catch (error) {
      console.error('Error updating user', error);
    }
  };

  if (!user) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded p-8 w-1/4 flex flex-col gap-8">
        <h2 className="text-xl font-bold text-red-600">Editar Usuário</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="gap-10 flex items-center">
            <label className="font-semibold w-1/6">Nome</label>
            <input 
            type="text" 
            name="nome_Usu"
            value={formData.nome_Usu} 
            onChange={handleChange} 
            className="bg-slate-200 w-full py-4 px-2 outline-none rounded-lg focus:ring-2 ring-indigo-400 focus:bg-white"
            />
          </div>
          <div className="gap-10 flex items-center">
            <label className="font-semibold w-1/6">Email</label>
            <input 
            type="email" 
            name="email_Usu" 
            value={formData.email_Usu} 
            onChange={handleChange}
            className="bg-slate-200 w-full py-4 px-2 outline-none rounded-lg focus:ring-2 ring-indigo-400 focus:bg-white"
            />
          </div>
          <button 
          type="submit"
          className="p-4 border-4 border-red-500 font-bold text-red-500"  
          >Salvar</button>
          <button 
          type="button" 
          onClick={onClose}
          className="p-4 text-white bg-red-500 font-bold"
          >Cancelar</button>
        </form>
      </div>
    </div>
  );
};

export default ModalUpdate;
