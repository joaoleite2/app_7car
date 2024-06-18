import React, { useState } from 'react';
import { CiCirclePlus } from "react-icons/ci";
import { Table } from "./components/Table";
import CreateUserModal from './components/ModalCreate';

export const Admin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveUser = (newUser:any) => {
    console.log('New user saved:', newUser);
    setIsModalOpen(false);
  };

  return (
    <>
      <main className="flex flex-col px-20 justify-center bg-red-100 min-h-screen h-auto gap-4">
        <h1 className="text-3xl font-bold">Funcionários</h1>
        <section className="h-auto bg-white w-full rounded-3xl flex items-start gap-10 p-8 flex-col">
          <div className="ml-0 flex justify-end w-full">
            <button 
              className="flex items-center gap-1 font-bold text-red-500" 
              onClick={handleOpenModal}
            >
              Criar<CiCirclePlus className="text-2xl" />
            </button>
          </div>
          <div className="w-full max-h-[50vh] overflow-y-auto">
            <Table />
          </div>
        </section>
      </main>
      {isModalOpen && (
        <CreateUserModal
          onClose={handleCloseModal}
          onSave={handleSaveUser}
        />
      )}
    </>
  );
};

export default Admin;
