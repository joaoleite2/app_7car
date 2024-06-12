import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  id_Usu: number;
  nome_Usu: string;
  email_Usu: string;
  senha_Usu: string;
  id_Tel: string | null;
  id_End: string | null;
  status_Usu: string | null | boolean;
}

export const Admin = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/user');
        setUsers(response.data);
      } catch (error) {
        console.error('Request error to users', error);
      }
    };

    fetchUsers();
  }, []);

  const activeUsers = users.filter(user => user.status_Usu === true);
  const handleDeleteUser = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/user/${id}`);
      setUsers(users.filter(user => user.id_Usu !== id));
    } catch (error) {
      console.error('Error', error);
    }
  };

  return (
    <>
      <main className="flex flex-col px-20 justify-center bg-red-100 min-h-screen h-auto gap-4">
        <h1 className="text-3xl font-bold">Funcionários</h1>
        <section className="h-auto bg-white w-full rounded-3xl flex items-start gap-10 p-8 flex-col">
          <div className="ml-0">Pesquisar</div>
          <div className="w-full max-h-[50vh] overflow-y-auto">
            <table className="table-fixed text-center w-full">
              <thead>
                <tr>
                  <th className="w-[120px] h-[50px]">Nome</th>
                  <th className="w-[120px] h-[50px]">E-mail</th>
                  <th className="w-[120px] h-[50px]">Senha</th>
                  <th className="w-[120px] h-[50px]">Cargo</th>
                  <th className="w-[80px] h-[50px]"></th>
                </tr>
              </thead>
              <tbody>
                {activeUsers.map(user => (
                  <tr key={user.id_Usu} className="group/item hover:bg-slate-100 cursor-pointer">
                    <td className="w-[120px] h-[50px] p-8">{user.nome_Usu}</td>
                    <td className="w-[120px] h-[50px] p-8">{user.email_Usu}</td>
                    <td className="w-[120px] h-[50px] p-8">*****</td>
                    <td className="w-[120px] h-[50px] p-8">Admin</td>
                    <td className="w-[120px] h-[50px] p-8 flex gap-4">
                      <MdModeEdit 
                      className="grupo/edit invisible group-hover/item:visible text-blue-400 text-3xl"
                      
                      />

                      <RiDeleteBin6Fill 
                      onClick={()=>handleDeleteUser(user.id_Usu)} 
                      className="group/delete invisible text-red-400 text-3xl group-hover/item:visible"/>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );
};
