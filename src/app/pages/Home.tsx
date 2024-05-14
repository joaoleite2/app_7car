import { useEffect, useState } from "react"
import { Nav } from "../components/Nav"
import { Link } from "react-router-dom"
import { Footer } from "../components/Footer"

const products = [
  {
    id: 1,
    name: 'Virabrequim Civic',
    imageSrc: 'https://cdn.awsli.com.br/300x300/2664/2664112/produto/238491579/virabrequim-etorq-3vk2waf5r1.jpeg',
    imageAlt: "Virabrequim",
    price: '$359,90',
    color: 'Black',
  },
  {
    id: 1,
    name: 'Virabrequim Civic',
    imageSrc: 'https://cdn.awsli.com.br/300x300/2664/2664112/produto/238491579/virabrequim-etorq-3vk2waf5r1.jpeg',
    imageAlt: "Virabrequim",
    price: '$359,90',
    color: 'Black',
  },
  {
    id: 1,
    name: 'Virabrequim Civic',
    imageSrc: 'https://cdn.awsli.com.br/300x300/2664/2664112/produto/238491579/virabrequim-etorq-3vk2waf5r1.jpeg',
    imageAlt: "Virabrequim",
    price: '$359,90',
    color: 'Black',
  },
  {
    id: 1,
    name: 'Virabrequim Civic',
    imageSrc: 'https://cdn.awsli.com.br/300x300/2664/2664112/produto/238491579/virabrequim-etorq-3vk2waf5r1.jpeg',
    imageAlt: "Virabrequim",
    price: '$359,90',
    color: 'Black',
  },
  {
    id: 1,
    name: 'Virabrequim Civic',
    imageSrc: 'https://cdn.awsli.com.br/300x300/2664/2664112/produto/238491579/virabrequim-etorq-3vk2waf5r1.jpeg',
    imageAlt: "Virabrequim",
    price: '$359,90',
    color: 'Black',
  },
  {
    id: 1,
    name: 'Virabrequim Civic',
    imageSrc: 'https://cdn.awsli.com.br/300x300/2664/2664112/produto/238491579/virabrequim-etorq-3vk2waf5r1.jpeg',
    imageAlt: "Virabrequim",
    price: '$359,90',
    color: 'Black',
  },
  {
    id: 1,
    name: 'Virabrequim Civic',
    imageSrc: 'https://cdn.awsli.com.br/300x300/2664/2664112/produto/238491579/virabrequim-etorq-3vk2waf5r1.jpeg',
    imageAlt: "Virabrequim",
    price: '$359,90',
    color: 'Black',
  },
  {
    id: 1,
    name: 'Virabrequim Civic',
    imageSrc: 'https://cdn.awsli.com.br/300x300/2664/2664112/produto/238491579/virabrequim-etorq-3vk2waf5r1.jpeg',
    imageAlt: "Virabrequim",
    price: '$359,90',
    color: 'Black',
  },
]

export const Home = (props:{pEmail:string}) =>{
  return(
    <>
    <Nav />
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    <h1 className="font-bold text-2xl"> 
      {props.pEmail ? `Olá ${props.pEmail}`: `Você não está logado na loja`}
    </h1>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <Link to='/product'>
            <div key={product.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-md text-gray-700 font-bold">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">R{product.price}</p>
              </div>
            </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
    <Footer />
    </>
  )
}