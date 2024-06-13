import { Table } from "./components/Table";

export const Admin = () => {


  return (
    <>
      <main className="flex flex-col px-20 justify-center bg-red-100 min-h-screen h-auto gap-4">
        <h1 className="text-3xl font-bold">Funcionários</h1>
        <section className="h-auto bg-white w-full rounded-3xl flex items-start gap-10 p-8 flex-col">
          <div className="ml-0">Pesquisar</div>
          <div className="w-full max-h-[50vh] overflow-y-auto">
            <Table />
          </div>
        </section>
      </main>
    </>
  );
};
