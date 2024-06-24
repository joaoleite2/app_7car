import React, { useState } from 'react';
import axios from 'axios';

interface CreateUserDto {
  userName: string;
  userEmail: string;
  password: string;
}

interface ModalProps {
  onClose: () => void;
  onSave: (user: CreateUserDto) => void;
}

const CreateUserModal: React.FC<ModalProps> = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState<CreateUserDto>({ userName: '', userEmail: '', password: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.userName) newErrors.userName = 'Nome é obrigatório';
    if (!formData.userEmail) newErrors.userEmail = 'Email é obrigatório';
    if (!formData.password) newErrors.password = 'Senha é obrigatória';

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/user', formData);
      onSave(response.data);
      window.location.reload();
    } catch (error) {
      console.error('Error creating user', error);
      alert('Já existe um usuário com este e-mail');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded p-8 w-1/4 flex flex-col gap-8">
        <h2 className="text-xl font-bold text-red-600">Criar Usuário</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Nome</label>
            <input 
              type="text" 
              name="userName"
              value={formData.userName} 
              onChange={handleChange} 
              className={`bg-slate-200 w-full py-4 px-2 outline-none rounded-lg focus:ring-2 ring-indigo-400 focus:bg-white ${errors.userName && 'ring-red-500'}`}
            />
            {errors.userName && <span className="text-red-500 text-sm">{errors.userName}</span>}
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Email</label>
            <input 
              type="email" 
              name="userEmail" 
              value={formData.userEmail} 
              onChange={handleChange}
              className={`bg-slate-200 w-full py-4 px-2 outline-none rounded-lg focus:ring-2 ring-indigo-400 focus:bg-white ${errors.userEmail && 'ring-red-500'}`}
            />
            {errors.userEmail && <span className="text-red-500 text-sm">{errors.userEmail}</span>}
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Senha</label>
            <input 
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange}
              className={`bg-slate-200 w-full py-4 px-2 outline-none rounded-lg focus:ring-2 ring-indigo-400 focus:bg-white ${errors.password && 'ring-red-500'}`}
            />
            {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
          </div>
          <button 
            type="submit"
            className="p-4 border-4 border-red-500 font-bold text-red-500"
          >
            Salvar
          </button>
          <button 
            type="button" 
            onClick={() => {
              onClose();
              window.location.reload();
            }}
            className="p-4 text-white bg-red-500 font-bold"
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUserModal;
