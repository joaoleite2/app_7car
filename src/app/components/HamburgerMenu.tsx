import { useState } from "react";
import { FaTimes, FaBars, FaUserCircle } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";
import { IoMdHelp, IoMdSettings } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { MdAdminPanelSettings } from "react-icons/md";
import { IoMdExit } from "react-icons/io";
import axios from "axios";

export const HamburgerMenu = () => {
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const handleMenu = () => {
    setOpen(!open);
  };

  const handleLogout = async () => {
    await axios.post('http://localhost:8080/auth/logout', {}, { withCredentials: true });
    history.push('/login');
  };

  const menuItems = [
    {
      "item": "Carrinho",
      "linkTo": "/cart",
      "ico": <FiShoppingCart />
    },
    {
      "item": "Minha conta",
      "linkTo": "/product",
      "ico": <FaUserCircle />
    },
    {
      "item": "Central de ajuda",
      "linkTo": "/contact",
      "ico": <IoMdHelp />
    },
    {
      "item": "Configurações",
      "linkTo": "/configuracoes",
      "ico": <IoMdSettings />
    },
    {
      "item": "Admin",
      "linkTo": "/admin",
      "ico": <MdAdminPanelSettings />
    }
  ];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleMenu}
        className="text-2xl sm:text-3xl outline-none text-white focus:ring-2 rounded-md px-3 py-1 hover:bg-red-500 ring-red-500 transition-all"
      >
        {open ? <FaTimes /> : <FaBars />}
      </button>
      {open && (
        <div className="z-10 mt-4 absolute right-0 top-full bg-gray-200 p-2 rounded-md shadow-lg min-w-52 w-80">
          <ul>
            {menuItems.map((item, index) => (
              <Link to={item.linkTo} key={index}>
                <li
                  className="hover:bg-gray-400 duration-200 hover:text-white transition-400 p-4 rounded-lg flex items-center gap-5"
                >
                  {item.ico}{item.item}
                </li>
              </Link>
            ))}
            <li
              className="hover:bg-gray-400 duration-200 hover:text-white transition-400 p-4 rounded-lg flex items-center gap-5 cursor-pointer"
              onClick={handleLogout}
            >
              <IoMdExit /> Sair
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
