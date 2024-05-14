import { Link } from "react-router-dom";
import { Footer } from "../components/Footer";

export const Product = (props:{email:string})=>{  
  let buttonCart;
  if(!props.email){
    buttonCart = (
      <Link to='/login'>
        <button type="button" className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-red-600 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-red-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          + Adicione ao carrinho
        </button>
      </Link>
    )
  }else{
    buttonCart = (
      <button type="button" className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-red-600 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-red-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        + Adicione ao carrinho
      </button>
    )
  }
  
  return(
    <>
    <section className="py-12 sm:py-16"> 
      <div className="container mx-auto px-4">
        <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3 lg:row-end-1">
            <div className="lg:flex lg:items-start max-w-xl">
              <img className="h-full w-full max-w-full object-cover" src="https://cdn.awsli.com.br/300x300/2664/2664112/produto/238491579/virabrequim-etorq-3vk2waf5r1.jpeg" alt="" />
            </div>
          </div>

          <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
            <h1 className="sm: text-2xl font-bold text-gray-900 sm:text-3xl">Virabrequim - Honda Civic</h1>

            <div className="mt-5 flex items-center">
              <p className="ml-2 text-sm font-medium text-gray-500">TOTAL VENDIDOS</p>
            </div>

            <div className="mt-10 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
              <h1 className="text-3xl font-bold">R$359</h1>
              {buttonCart}
            </div>
            <div className="lg:col-span-3">
            <div className="mt-8 flow-root sm:mt-12">
              <h1 className="text-lg mb-4"><span className="font-semibold">Marca:</span> Honda</h1>
              <h1 className="text-lg mb-4"><span className="font-semibold">Modelo:</span> Honda</h1>
              <h1 className="text-3xl font-bold">Descrição</h1>
              <p className="mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia accusantium nesciunt fuga.</p>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
    <Footer />
    </>
  )
}