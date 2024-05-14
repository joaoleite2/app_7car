import logo from '../pages/imgs/logowhite.svg'

export const Nav = ()=>{
  return(
    <>
      <nav className="bg-red-800 border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <img src={logo} className="h-10" alt="7Car Logo" />
        <div className="flex md:order-2">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </div>
              <input type="text" id="search-navbar" className="placeholder-gray-700 block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-red-100" placeholder="Buscar..." />
          </div>
        </div>
        </div>
      </nav>
    </>
  )
}