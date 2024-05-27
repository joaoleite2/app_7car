import { Footer } from "../components/Footer"
import ContactImage from './imgs/contact.svg'

export const Contact = () =>{
  return(
    <>
    <section className="w-full h-screen bg-gradient-to-b from-[#660E1C] to-[#CC1C37] gap-20 flex justify-center items-center">
      <form className="bg-[#252525] h-auto w-full sm:w-1/2 flex flex-col gap-4 sm:gap-10 sm:p-20 rounded-lg">
        <div>
          <h1 className="text-white text-4xl font-bold">Contate-<span className="text-[#BF1A33]">nos</span></h1>
        </div>
        <div className="flex flex-col">
          <input
            type="email"
            required
            placeholder="Digite seu melhor email..."
            className="px-2 lg:px-10 py-4 rounded-lg bg-[#333] placeholder-[#6B6B6B] outline-none focus:ring-2 ring-red-500 text-gray-200"
          />
          <textarea
            required
            rows={6}
            placeholder="Digite sua mensagem..."
            className="px-2 lg:px-10 py-4 rounded-lg bg-[#333] placeholder-[#6B6B6B] outline-none focus:ring-2 ring-red-500 text-gray-200"
          />
          <button
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
  )
}